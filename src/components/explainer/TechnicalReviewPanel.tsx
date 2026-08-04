import type { TechnicalReview } from "@/content/types";

interface TechnicalReviewPanelProps {
  review: TechnicalReview;
}

function formatDate(isoDate: string): string {
  return isoDate;
}

/** Compact, expandable source traceability shown for every explainer topic. */
export function TechnicalReviewPanel({ review }: TechnicalReviewPanelProps) {
  return (
    <section className="mb-6 border border-core-border/[0.12] bg-core-panel/60">
      <details>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted [&::-webkit-details-marker]:hidden">
          <span>Trazabilidad técnica</span>
          <span className="text-core-accent">Revisión {formatDate(review.lastReviewedAt)}</span>
        </summary>
        <div className="border-t border-core-border/[0.1] px-3 pb-3 pt-2.5">
          <p className="text-[0.7rem] leading-relaxed text-core-text-secondary">
            <span className="font-semibold text-core-text">Alcance:</span> {review.scope}
          </p>
          <p className="mt-1 text-[0.68rem] leading-relaxed text-core-text-muted">
            Cada enlace indica la fecha en que fue consultado para esta revisión.
          </p>
          <ul className="mt-2 space-y-1.5">
            {review.sources.map((source) => (
              <li key={source.url} className="text-[0.68rem] leading-relaxed">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-core-accent underline decoration-core-accent/40 underline-offset-2 hover:text-core-text"
                >
                  {source.title}
                </a>
                <span className="ml-1 text-core-text-muted">· consultada {formatDate(source.accessedAt)}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  );
}
