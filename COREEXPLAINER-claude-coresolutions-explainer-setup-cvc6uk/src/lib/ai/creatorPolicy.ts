export interface CreatorPolicy {
  mode: "draft-only";
  estimatedInputTokens: number;
  maxOutputTokens: number;
  estimatedCostUsd?: number;
  costSource?: "environment";
}

export function buildCreatorPolicy(inputTokens: number, maxOutputTokens: number, estimatedCostUsd?: number, costSource?: "environment"): CreatorPolicy {
  return {
    mode: "draft-only",
    estimatedInputTokens: Math.max(0, Math.ceil(inputTokens)),
    maxOutputTokens: Math.max(0, Math.floor(maxOutputTokens)),
    ...(estimatedCostUsd !== undefined ? { estimatedCostUsd } : {}),
    ...(costSource ? { costSource } : {}),
  };
}
