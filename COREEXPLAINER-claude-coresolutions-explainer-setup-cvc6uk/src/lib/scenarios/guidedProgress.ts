import type { GuidedScenarioStep } from "@/content/types";

export type GuidedChecklistStatus = "done" | "na";

/** A step can be left open for inspection, but advancing requires an explicit review decision. */
export function canAdvanceGuidedStep(
  steps: readonly GuidedScenarioStep[],
  index: number,
  checklist: Readonly<Record<string, GuidedChecklistStatus>>,
): boolean {
  const step = steps[index];
  if (!step || index >= steps.length - 1) return false;
  return checklist[step.id] === "done" || checklist[step.id] === "na";
}

export function guidedProgress(
  steps: readonly GuidedScenarioStep[],
  checklist: Readonly<Record<string, GuidedChecklistStatus>>,
): { reviewed: number; total: number; percent: number } {
  const reviewed = steps.filter((step) => checklist[step.id] === "done" || checklist[step.id] === "na").length;
  return { reviewed, total: steps.length, percent: steps.length ? Math.round((reviewed / steps.length) * 100) : 0 };
}
