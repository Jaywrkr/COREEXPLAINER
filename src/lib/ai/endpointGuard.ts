import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { persistentQuotaConfigured, persistentQuotaRequired, reservePersistentQuota } from "@/lib/ai/persistentQuota";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const DEFAULT_TOKEN_BUDGET = 12_000;
const requestWindows = new Map<string, { startedAt: number; count: number }>();
const tokenWindows = new Map<string, { startedAt: number; reserved: number }>();

function signedIdentityKey(request: Request): string | undefined {
  const secret = process.env.AI_IDENTITY_SIGNING_SECRET?.trim();
  const subject = request.headers.get("x-coresolutions-user")?.trim();
  const signature = request.headers.get("x-coresolutions-user-signature")?.trim().toLowerCase();
  if (!secret || secret.length < 16 || !subject || subject.length > 160 || !signature || !/^[a-f0-9]{64}$/.test(signature)) return undefined;
  const expected = createHmac("sha256", secret).update(subject, "utf8").digest("hex");
  const valid = timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
  if (!valid) return undefined;
  return `user:${createHash("sha256").update(subject, "utf8").digest("hex").slice(0, 32)}`;
}

/**
 * Derives a bounded, non-reversible key for process-local quotas. Never use a
 * raw forwarding header as a map key: clients can spoof it or send an
 * unbounded value. `x-real-ip` is preferred when the hosting proxy provides
 * it; the first forwarded address remains a compatibility fallback.
 */
export function deriveAiClientKey(request: Request): string {
  const identity = signedIdentityKey(request);
  if (identity) return identity;
  const direct = request.headers.get("x-real-ip")?.trim();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const networkIdentity = (direct || forwarded || "anonymous").slice(0, 128);
  return `ip:${createHash("sha256").update(networkIdentity, "utf8").digest("hex").slice(0, 32)}`;
}

function tokenBudget() {
  const configured = Number(process.env.AI_TOKEN_BUDGET_PER_WINDOW);
  return Number.isFinite(configured) && configured > 0 ? Math.floor(configured) : DEFAULT_TOKEN_BUDGET;
}

export async function readJsonBody<T>(request: Request, maxBytes: number): Promise<T | null> {
  if (!request.body || !Number.isFinite(maxBytes) || maxBytes < 0) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      const chunk = next.value;
      total += chunk.byteLength;
      if (total > maxBytes) {
        await reader.cancel("request body exceeds limit");
        return null;
      }
      chunks.push(chunk);
    }
  } catch {
    return null;
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try { return JSON.parse(new TextDecoder().decode(bytes)) as T; } catch { return null; }
}

export async function checkAiAccess(request: Request): Promise<{ allowed: true } | { allowed: false; status: number; message: string; retryAfter?: number }> {
  if (process.env.AI_ENDPOINT_ENABLED === "false") return { allowed: false, status: 503, message: "Las capacidades de IA están desactivadas en este entorno." };
  const key = deriveAiClientKey(request);
  const persistent = await reservePersistentQuota(key, 0, Number.MAX_SAFE_INTEGER);
  if (persistent === undefined && persistentQuotaConfigured() && persistentQuotaRequired()) return { allowed: false, status: 503, message: "La cuota compartida de IA no está disponible; no se enviará la solicitud." };
  if (persistent && !persistent.allowed) return { allowed: false, status: 429, retryAfter: persistent.retryAfter, message: "Límite temporal de solicitudes de IA alcanzado. Inténtalo más tarde." };
  const now = Date.now();
  const current = requestWindows.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    requestWindows.set(key, { startedAt: now, count: 1 });
    return { allowed: true };
  }
  if (current.count >= MAX_REQUESTS_PER_WINDOW) return { allowed: false, status: 429, message: "Se alcanzó el límite temporal de solicitudes de IA. Inténtalo más tarde." };
  current.count += 1;
  return { allowed: true };
}

/** Reserves expected output before provider call; instance-local safety brake. */
export async function reserveAiTokens(request: Request, estimatedTokens: number): Promise<{ allowed: true } | { allowed: false; status: number; message: string; retryAfter: number }> {
  const key = deriveAiClientKey(request);
  const persistent = await reservePersistentQuota(key, estimatedTokens, tokenBudget(), Date.now(), false);
  if (persistent === undefined && persistentQuotaConfigured() && persistentQuotaRequired()) return { allowed: false, status: 503, retryAfter: 1, message: "La cuota compartida de IA no está disponible; no se reservarán tokens." };
  if (persistent && !persistent.allowed) return { allowed: false, status: 429, retryAfter: persistent.retryAfter, message: "Presupuesto temporal de tokens de IA alcanzado. Inténtalo más tarde." };
  const now = Date.now();
  const current = tokenWindows.get(key);
  const active = current && now - current.startedAt < WINDOW_MS ? current : { startedAt: now, reserved: 0 };
  const requested = Math.max(0, Math.ceil(estimatedTokens));
  if (active.reserved + requested > tokenBudget()) {
    const retryAfter = Math.max(1, Math.ceil((active.startedAt + WINDOW_MS - now) / 1000));
    tokenWindows.set(key, active);
    return { allowed: false, status: 429, retryAfter, message: "Se alcanzó el presupuesto temporal de tokens de IA. Inténtalo más tarde." };
  }
  active.reserved += requested;
  tokenWindows.set(key, active);
  return { allowed: true };
}

export function providerSignal() { return AbortSignal.timeout(25_000); }
