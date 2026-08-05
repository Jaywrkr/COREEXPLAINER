import type { TechnicalReview } from "@/content/types";

interface TechnicalReviewPanelProps {
  review: TechnicalReview;
  activeSourceIds: string[];
}

function formatDate(isoDate: string): string {
  return isoDate;
}

/** Compact, expandable source traceability shown for every explainer topic. */
export function TechnicalReviewPanel({ review, activeSourceIds }: TechnicalReviewPanelProps) {
  const activeSources = review.sources.filter((source) => activeSourceIds.includes(source.id));
  return (
    <section className="relative shrink-0">
      <details>
        <summary className="flex cursor-pointer list-none items-center gap-1.5 whitespace-nowrap border border-core-border/[0.12] bg-core-panel/60 px-2 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.06em] text-core-text-muted [&::-webkit-details-marker]:hidden">
          <span>Trazabilidad</span>
          <span className="text-core-accent">{formatDate(review.lastReviewedAt)}</span>
        </summary>
        <div className="absolute right-0 top-full z-30 mt-1 w-[min(25rem,calc(100vw-3rem))] border border-core-border/[0.14] bg-core-panel p-3 shadow-lg">
          <p className="text-[0.7rem] leading-relaxed text-core-text-secondary">
            <span className="font-semibold text-core-text">Alcance:</span> {review.scope}
          </p>
          <p className="mt-1 text-[0.68rem] leading-relaxed text-core-text-muted">
            Cada enlace indica la fecha en que fue consultado para esta revisión.
          </p>
          <div className="mt-3 border-l-2 border-core-accent/60 pl-2.5">
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">
              Fuentes de esta escena
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {activeSources.map((source) => (
                <li key={source.id} className="text-[0.68rem] leading-relaxed">
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
          <p className="mt-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">
            Fuentes generales del tema
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
