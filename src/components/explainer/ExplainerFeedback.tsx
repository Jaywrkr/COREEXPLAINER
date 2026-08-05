"use client";

import { useEffect, useState } from "react";

interface FeedbackState {
  favorite: boolean;
  completed: boolean;
}

interface ExplainerFeedbackProps {
  slug: string;
}

const STORAGE_KEY = "core-explainer-feedback-v1";
const SYNC_EVENT = "core-explainer-feedback-change";
const EMPTY_STATE: FeedbackState = { favorite: false, completed: false };

function readFeedback(slug: string): FeedbackState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Record<string, Partial<FeedbackState>>;
    const entry = parsed[slug];
    return {
      favorite: entry?.favorite === true,
      completed: entry?.completed === true,
    };
  } catch {
    return EMPTY_STATE;
  }
}

function writeFeedback(slug: string, next: FeedbackState) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const current = raw ? (JSON.parse(raw) as Record<string, FeedbackState>) : {};
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [slug]: next }));
    window.dispatchEvent(new Event(SYNC_EVENT));
  } catch {
    // Private browsing or a disabled storage API should not break the explainer.
  }
}

/** Local, browser-only actions for saving and tracking an explainer topic. */
export function ExplainerFeedback({ slug }: ExplainerFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackState>(EMPTY_STATE);

  useEffect(() => {
    const sync = () => setFeedback(readFeedback(slug));
    sync();
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  const toggle = (key: keyof FeedbackState) => {
    const next = { ...feedback, [key]: !feedback[key] };
    setFeedback(next);
    writeFeedback(slug, next);
  };

  return (
    <div className="flex flex-wrap items-center gap-1" aria-label="Guardar progreso de esta explicación">
      <button
        type="button"
        aria-pressed={feedback.favorite}
        aria-label={feedback.favorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        title={feedback.favorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        onClick={() => toggle("favorite")}
        className={`inline-flex items-center gap-1 border px-2 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.05em] transition-colors ${
          feedback.favorite
            ? "border-core-accent/60 bg-core-accent/10 text-core-accent"
            : "border-core-border/[0.12] text-core-text-muted hover:border-core-accent/40 hover:text-core-text"
        }`}
      >
        <span aria-hidden="true">{feedback.favorite ? "♥" : "♡"}</span>
        Favorito
      </button>
      <button
        type="button"
        aria-pressed={feedback.completed}
        aria-label={feedback.completed ? "Marcar como pendiente" : "Marcar como revisado"}
        title={feedback.completed ? "Marcar como pendiente" : "Marcar como revisado"}
        onClick={() => toggle("completed")}
        className={`inline-flex items-center gap-1 border px-2 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.05em] transition-colors ${
          feedback.completed
            ? "border-core-success/50 bg-core-success/10 text-core-success"
            : "border-core-border/[0.12] text-core-text-muted hover:border-core-success/40 hover:text-core-text"
        }`}
      >
        <span aria-hidden="true">{feedback.completed ? "✓" : "○"}</span>
        Revisado
      </button>
    </div>
  );
}
