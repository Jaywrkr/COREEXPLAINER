export type CopilotActionType = "open-source" | "activate-scenario";

export interface CopilotAction {
  type: CopilotActionType;
  id: string;
  label: string;
}

export interface CopilotPolicy {
  mode: "read-only";
  actionTypes: CopilotActionType[];
  estimatedInputTokens: number;
  maxOutputTokens: number;
  estimatedCostUsd?: number;
  costSource?: "environment";
}
