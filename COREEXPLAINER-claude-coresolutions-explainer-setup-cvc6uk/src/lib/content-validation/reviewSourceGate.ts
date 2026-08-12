import type { ExplainerStep } from "@/content/types";

/** A reviewed explainer must keep every narrative step tied to current sources. */
export function reviewedStepSourceIssues(
  steps: ExplainerStep[],
  reviewStatus: "pending" | "reviewed",
  sourceValidityById: ReadonlyMap<string, "current" | "review-needed">,
): string[] {
  if (reviewStatus !== "reviewed") return [];
  const issues: string[] = [];
  steps.forEach((step, index) => {
    const stale = [...new Set(step.sourceIds)].filter((sourceId) => sourceValidityById.get(sourceId) !== "current");
    if (stale.length) issues.push(`steps[${index}].sourceIds must be current for reviewed content; review-needed or missing: ${stale.join(", ")}`);
  });
  return issues;
}
