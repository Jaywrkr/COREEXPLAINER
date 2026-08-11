export interface AiCostEstimate {
  costUsd: number;
  inputRatePerMillion: number;
  outputRatePerMillion: number;
  source: "environment";
}

function configuredRate(name: string): number | null {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value >= 0 && value <= 100_000 ? value : null;
}

/** Estimates cost only when both rates are explicitly configured by deployment. */
export function estimateAiCost(inputTokens = 0, outputTokens = 0): AiCostEstimate | undefined {
  const inputRatePerMillion = configuredRate("AI_INPUT_COST_PER_MILLION_USD");
  const outputRatePerMillion = configuredRate("AI_OUTPUT_COST_PER_MILLION_USD");
  if (inputRatePerMillion === null || outputRatePerMillion === null) return undefined;
  const costUsd = Math.max(0, inputTokens) / 1_000_000 * inputRatePerMillion + Math.max(0, outputTokens) / 1_000_000 * outputRatePerMillion;
  return { costUsd: Number(costUsd.toFixed(8)), inputRatePerMillion, outputRatePerMillion, source: "environment" };
}
