"use client";

import { useEffect, useState } from "react";
import type { ReviewActionDecision, ReviewActionStatus } from "@/lib/review/reviewActionTracking";
import { canResolveReviewAction, normalizeReviewActionNote, normalizeReviewActionStatus, readReviewActionDecision, reviewActionDecisionStorageKey, reviewActionStatusLabels, reviewActionStorageKey } from "@/lib/review/reviewActionTracking";

export function ReviewActionTracker({ slug, actionId }: { slug: string; actionId: string }) {
  const [status, setStatus] = useState<ReviewActionStatus>("pending");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const decision = readReviewActionDecision(slug, actionId);
      setStatus(decision.status);
      setNote(decision.note);
    } catch { /* local-only best effort */ }
  }, [slug, actionId]);

  const persist = (next: ReviewActionStatus, nextNote: string) => {
    const decision: ReviewActionDecision = { status: next, note: normalizeReviewActionNote(nextNote), updatedAt: new Date().toISOString() };
    window.localStorage.setItem(reviewActionStorageKey(slug, actionId), next);
    window.localStorage.setItem(reviewActionDecisionStorageKey(slug, actionId), JSON.stringify(decision));
  };

  const update = (next: ReviewActionStatus) => {
    if (next === "resolved" && !canResolveReviewAction(note)) {
      setError("Para resolverla registra al menos 12 caracteres de evidencia o decisión.");
      return;
    }
    setError("");
    setStatus(next);
    try { persist(next, note); } catch { /* local-only best effort */ }
  };

  const updateNote = (value: string) => {
    const nextNote = normalizeReviewActionNote(value);
    setNote(nextNote);
    setError("");
    const nextStatus = status === "resolved" && !canResolveReviewAction(nextNote) ? "in-progress" : status;
    if (nextStatus !== status) setStatus(nextStatus);
    try { persist(nextStatus, nextNote); } catch { /* local-only best effort */ }
  };

  return (
    <label className="mt-1 inline-flex items-center gap-1 text-[0.56rem] text-core-text-muted">
      Estado local
      <select aria-label={`Estado local de ${actionId}`} value={status} onChange={(event) => update(normalizeReviewActionStatus(event.target.value))} className="border border-core-border/[0.16] bg-core-panel px-1 py-0.5 text-[0.56rem] text-core-text outline-none focus:border-core-accent/60">
        {(Object.keys(reviewActionStatusLabels) as ReviewActionStatus[]).map((value) => <option key={value} value={value}>{reviewActionStatusLabels[value]}</option>)}
      </select>
      <input aria-label={`Evidencia o nota de ${actionId}`} value={note} onChange={(event) => updateNote(event.target.value)} placeholder="Nota/evidencia" maxLength={500} className="w-40 border border-core-border/[0.16] bg-core-panel px-1 py-0.5 text-[0.56rem] text-core-text outline-none placeholder:text-core-text-muted focus:border-core-accent/60" />
      {error ? <span className="text-core-warning">{error}</span> : null}
    </label>
  );
}
