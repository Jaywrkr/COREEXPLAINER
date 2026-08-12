export type ReviewActionStatus = "pending" | "in-progress" | "resolved";

export interface ReviewActionDecision {
  status: ReviewActionStatus;
  note: string;
  updatedAt: string;
}

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

export function reviewActionDecisionStorageKey(slug: string, actionId: string) {
  return `${reviewActionStorageKey(slug, actionId)}:decision`;
}

export function normalizeReviewActionNote(value: unknown): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, 500) : "";
}

export function canResolveReviewAction(note: string): boolean {
  return normalizeReviewActionNote(note).length >= 12;
}

export function readReviewActionStatus(slug: string, actionId: string): ReviewActionStatus {
  try { return normalizeReviewActionStatus(window.localStorage.getItem(reviewActionStorageKey(slug, actionId))); } catch { return "pending"; }
}

export function readReviewActionDecision(slug: string, actionId: string): ReviewActionDecision {
  try {
    const raw = window.localStorage.getItem(reviewActionDecisionStorageKey(slug, actionId));
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ReviewActionDecision>;
      return {
        status: normalizeReviewActionStatus(parsed.status),
        note: normalizeReviewActionNote(parsed.note),
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
      };
    }
  } catch { /* local-only best effort */ }
  return { status: readReviewActionStatus(slug, actionId), note: "", updatedAt: "" };
}
