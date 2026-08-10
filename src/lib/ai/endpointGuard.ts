import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { reservePersistentQuota } from "@/lib/ai/persistentQuota";

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

function clientKey(request: Request) {
  const identity = signedIdentityKey(request);
  if (identity) return identity;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "anonymous";
}

function tokenBudget() {
  const configured = Number(process.env.AI_TOKEN_BUDGET_PER_WINDOW);
  return Number.isFinite(configured) && configured > 0 ? Math.floor(configured) : DEFAULT_TOKEN_BUDGET;
}

export async function readJsonBody<T>(request: Request, maxBytes: number): Promise<T | null> {
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maxBytes) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

export async function checkAiAccess(request: Request): Promise<{ allowed: true } | { allowed: false; status: number; message: string; retryAfter?: number }> {
  if (process.env.AI_ENDPOINT_ENABLED === "false") return { allowed: false, status: 503, message: "Las capacidades de IA están desactivadas en este entorno." };
  const key = clientKey(request);
  const persistent = await reservePersistentQuota(key, 0, Number.MAX_SAFE_INTEGER);
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
  const key = clientKey(request);
  const persistent = await reservePersistentQuota(key, estimatedTokens, tokenBudget(), Date.now(), false);
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
