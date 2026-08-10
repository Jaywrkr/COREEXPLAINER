export interface ReviewPriorityInput {
  reviewStatus: "pending" | "reviewed";
  staleSources: number;
  warningCount: number;
}

/** Shared with the CLI report and dashboard so reviewers see one ordering rule. */
export function getReviewPriority(input: ReviewPriorityInput): number {
  return (input.reviewStatus === "pending" ? 100 : 0) + (input.staleSources * 10) + (input.warningCount * 5);
}
