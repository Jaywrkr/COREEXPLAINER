import type { CopilotActionType, CopilotPolicy } from "./copilotContract";

const ALLOWED_ACTION_TYPES: CopilotActionType[] = ["open-source", "activate-scenario"];

export function buildCopilotPolicy(inputTokens: number, maxOutputTokens: number, estimatedCostUsd?: number, costSource?: "environment"): CopilotPolicy {
  return {
    mode: "read-only",
    actionTypes: ALLOWED_ACTION_TYPES,
    estimatedInputTokens: Math.max(0, Math.ceil(inputTokens)),
    maxOutputTokens: Math.max(0, Math.floor(maxOutputTokens)),
    ...(estimatedCostUsd !== undefined ? { estimatedCostUsd } : {}),
    ...(costSource ? { costSource } : {}),
  };
}
