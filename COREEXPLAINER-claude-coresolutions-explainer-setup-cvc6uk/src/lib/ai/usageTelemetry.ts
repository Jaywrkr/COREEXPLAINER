export type AiUsageSurface = "copilot" | "creator" | "unknown";

export interface AiUsageBucket { requests: number; failures: number; totalTokens: number; estimatedCostUsd: number }
export interface AiUsageTelemetry extends AiUsageBucket { bySurface: Record<AiUsageSurface, AiUsageBucket> }

const STORAGE_KEY = "core-explainer:ai-usage";

export function emptyAiUsage(): AiUsageTelemetry {
  const bucket = () => ({ requests: 0, failures: 0, totalTokens: 0, estimatedCostUsd: 0 });
  return { ...bucket(), bySurface: { copilot: bucket(), creator: bucket(), unknown: bucket() } };
}

function normalizeBucket(value: unknown): AiUsageBucket {
  const parsed = value && typeof value === "object" ? value as Partial<AiUsageBucket> : {};
  return { requests: Number(parsed.requests) || 0, failures: Number(parsed.failures) || 0, totalTokens: Number(parsed.totalTokens) || 0, estimatedCostUsd: Number(parsed.estimatedCostUsd) || 0 };
}

export function normalizeAiUsage(value: unknown): AiUsageTelemetry {
  const parsed = value && typeof value === "object" ? value as Partial<AiUsageTelemetry> : {};
  return { ...normalizeBucket(parsed), bySurface: { copilot: normalizeBucket(parsed.bySurface?.copilot), creator: normalizeBucket(parsed.bySurface?.creator), unknown: normalizeBucket(parsed.bySurface?.unknown) } };
}

export function readAiUsage(): AiUsageTelemetry {
  if (typeof window === "undefined") return emptyAiUsage();
  try {
    return normalizeAiUsage(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null"));
  } catch { return emptyAiUsage(); }
}

export function recordAiUsage(success: boolean, totalTokens = 0, estimatedCostUsd = 0, surface: AiUsageSurface = "unknown"): AiUsageTelemetry {
  const current = readAiUsage();
  const safeSurface = surface === "copilot" || surface === "creator" ? surface : "unknown";
  const tokenDelta = Number.isFinite(totalTokens) ? Math.max(0, totalTokens) : 0;
  const costDelta = Number.isFinite(estimatedCostUsd) ? Math.max(0, estimatedCostUsd) : 0;
  const bucket = current.bySurface[safeSurface];
  const nextBucket = { requests: bucket.requests + 1, failures: bucket.failures + (success ? 0 : 1), totalTokens: bucket.totalTokens + tokenDelta, estimatedCostUsd: bucket.estimatedCostUsd + costDelta };
  const next = { requests: current.requests + 1, failures: current.failures + (success ? 0 : 1), totalTokens: current.totalTokens + tokenDelta, estimatedCostUsd: current.estimatedCostUsd + costDelta, bySurface: { ...current.bySurface, [safeSurface]: nextBucket } };
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* best effort */ }
  return next;
}

export function clearAiUsage() { if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY); }
