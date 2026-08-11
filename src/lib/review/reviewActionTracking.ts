export type ReviewActionStatus = "pending" | "in-progress" | "resolved";

export const reviewActionStatusLabels: Record<ReviewActionStatus, string> = {
  pending: "Pendiente",
  "in-progress": "En análisis",
  resolved: "Resuelta",
};

export function normalizeReviewActionStatus(value: unknown): ReviewActionStatus {
  return value === "in-progress" || value === "resolved" ? value : "pending";
}

export function reviewActionStorageKey(slug: string, actionId: string) {
  return `core-explainer:review-action:${slug}:${actionId}`;
}

export function readReviewActionStatus(slug: string, actionId: string): ReviewActionStatus {
  try { return normalizeReviewActionStatus(window.localStorage.getItem(reviewActionStorageKey(slug, actionId))); } catch { return "pending"; }
}
