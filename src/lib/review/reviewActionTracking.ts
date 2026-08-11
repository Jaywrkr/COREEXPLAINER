export type ReviewActionStatus = "pending" | "in-progress" | "resolved";

export const reviewActionStatusLabels: Record<ReviewActionStatus, string> = {
  pending: "Pendiente",
  "in-progress": "En análisis",
  resolved: "Resuelta",
};

export function normalizeReviewActionStatus(value: unknown): ReviewActionStatus {
  return value === "in-progress" || value === "resolved" ? value : "pending";
}
