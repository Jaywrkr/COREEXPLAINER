export type CopilotActionType = "open-source" | "activate-scenario";

export interface CopilotAction {
  type: CopilotActionType;
  id: string;
  label: string;
}

export interface CopilotActionAllowlist {
  sourceIds: ReadonlySet<string>;
  scenarioIds: ReadonlySet<string>;
}

/** Normalizes untrusted model prose before it is rendered in the explainer. */
export function sanitizeCopilotMessage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, 5_000);
  return cleaned || null;
}

/**
 * Converts untrusted model output into actions that point only at resources
 * already authored by the active explainer. It never accepts URLs or commands.
 */
export function sanitizeCopilotActions(value: unknown, allowlist: CopilotActionAllowlist): CopilotAction[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.flatMap((candidate) => {
    if (!candidate || typeof candidate !== "object") return [];
    const action = candidate as Partial<CopilotAction>;
    if ((action.type !== "open-source" && action.type !== "activate-scenario") || typeof action.id !== "string" || typeof action.label !== "string") return [];
    const id = action.id.trim();
    const label = action.label.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
    if (!id || !label) return [];
    if (action.type === "open-source" && !allowlist.sourceIds.has(id)) return [];
    if (action.type === "activate-scenario" && !allowlist.scenarioIds.has(id)) return [];
    const key = `${action.type}:${id}`;
    if (seen.has(key)) return [];
    seen.add(key);
    return [{ type: action.type, id, label } satisfies CopilotAction];
  }).slice(0, 3);
}

export interface CopilotPolicy {
  mode: "read-only";
  actionTypes: CopilotActionType[];
  estimatedInputTokens: number;
  maxOutputTokens: number;
  estimatedCostUsd?: number;
  costSource?: "environment";
  maxEstimatedCostUsd?: number;
}
