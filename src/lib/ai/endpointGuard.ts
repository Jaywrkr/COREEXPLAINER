const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const requestWindows = new Map<string, { startedAt: number; count: number }>();

export async function readJsonBody<T>(request: Request, maxBytes: number): Promise<T | null> {
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maxBytes) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

export function checkAiAccess(request: Request): { allowed: true } | { allowed: false; status: number; message: string } {
  if (process.env.AI_ENDPOINT_ENABLED === "false") return { allowed: false, status: 503, message: "Las capacidades de IA están desactivadas en este entorno." };
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || request.headers.get("x-real-ip") || "anonymous";
  const now = Date.now();
  const current = requestWindows.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) { requestWindows.set(key, { startedAt: now, count: 1 }); return { allowed: true }; }
  if (current.count >= MAX_REQUESTS_PER_WINDOW) return { allowed: false, status: 429, message: "Se alcanzó el límite temporal de solicitudes de IA. Inténtalo más tarde." };
  current.count += 1;
  return { allowed: true };
}

export function providerSignal() { return AbortSignal.timeout(25_000); }
