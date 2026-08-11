export interface AiUsageTelemetry { requests: number; failures: number; totalTokens: number }

const STORAGE_KEY = "core-explainer:ai-usage";

export function readAiUsage(): AiUsageTelemetry {
  if (typeof window === "undefined") return { requests: 0, failures: 0, totalTokens: 0 };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<AiUsageTelemetry> | null;
    return { requests: Number(parsed?.requests) || 0, failures: Number(parsed?.failures) || 0, totalTokens: Number(parsed?.totalTokens) || 0 };
  } catch { return { requests: 0, failures: 0, totalTokens: 0 }; }
}

export function recordAiUsage(success: boolean, totalTokens = 0): AiUsageTelemetry {
  const current = readAiUsage();
  const next = { requests: current.requests + 1, failures: current.failures + (success ? 0 : 1), totalTokens: current.totalTokens + (Number.isFinite(totalTokens) ? totalTokens : 0) };
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* best effort */ }
  return next;
}
