"use client";

import { useEffect, useState } from "react";
import type { ReviewActionStatus } from "@/lib/review/reviewActionTracking";
import { normalizeReviewActionStatus, reviewActionStatusLabels } from "@/lib/review/reviewActionTracking";

function storageKey(slug: string, actionId: string) {
  return `core-explainer:review-action:${slug}:${actionId}`;
}

export function ReviewActionTracker({ slug, actionId }: { slug: string; actionId: string }) {
  const [status, setStatus] = useState<ReviewActionStatus>("pending");

  useEffect(() => {
    try {
      setStatus(normalizeReviewActionStatus(window.localStorage.getItem(storageKey(slug, actionId))));
    } catch { /* local-only best effort */ }
  }, [slug, actionId]);

  const update = (next: ReviewActionStatus) => {
    setStatus(next);
    try { window.localStorage.setItem(storageKey(slug, actionId), next); } catch { /* local-only best effort */ }
  };

  return (
    <label className="mt-1 inline-flex items-center gap-1 text-[0.56rem] text-core-text-muted">
      Estado local
      <select aria-label={`Estado local de ${actionId}`} value={status} onChange={(event) => update(normalizeReviewActionStatus(event.target.value))} className="border border-core-border/[0.16] bg-core-panel px-1 py-0.5 text-[0.56rem] text-core-text outline-none focus:border-core-accent/60">
        {(Object.keys(reviewActionStatusLabels) as ReviewActionStatus[]).map((value) => <option key={value} value={value}>{reviewActionStatusLabels[value]}</option>)}
      </select>
    </label>
  );
}
