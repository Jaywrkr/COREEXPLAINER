export type CopilotActionType = "open-source" | "activate-scenario";

export interface CopilotAction {
  type: CopilotActionType;
  id: string;
  label: string;
}
