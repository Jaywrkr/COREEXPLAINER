import Link from "next/link";
import { explainerValidationWarnings, getAllExplainers } from "@/content/registry";

/** Read-only queue for specialists; it never turns pending content into approval. */
export function TechnicalReviewQueue() {
  const pending = getAllExplainers()
    .filter((entry) => entry.meta.reviewStatus !== "reviewed")
    .sort((a, b) => a.meta.technicalReview.lastReviewedAt.localeCompare(b.meta.technicalReview.lastReviewedAt));

  return (
    <details className="mb-10 border border-core-warning/25 bg-core-warning/[0.03] p-4">
      <summary className="cursor-pointer list-none font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-warning hover:text-core-text [&::-webkit-details-marker]:hidden">
        Cola de revisión técnica · {pending.length} pendientes
      </summary>
      <div className="mt-3 space-y-2">
        <p className="max-w-3xl text-xs leading-relaxed text-core-text-secondary">
          Esta lista no aprueba contenido. Cada especialista debe revisar el alcance, las fuentes y el diagrama antes de cambiar el estado editorial.
        </p>
        {pending.map((entry) => {
          const warnings = explainerValidationWarnings[entry.slug] ?? [];
          return (
            <article key={entry.slug} className="border border-core-border/[0.12] bg-core-panel/50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Link href={`/explainer/${entry.slug}`} className="text-sm font-semibold text-core-text hover:text-core-accent hover:underline">
                    {entry.meta.title}
                  </Link>
                  <p className="mt-0.5 text-[0.66rem] text-core-text-muted">
                    Última revisión declarada: {entry.meta.technicalReview.lastReviewedAt} · {entry.meta.technicalReview.sources.length} fuentes
                  </p>
                </div>
                <a href={`/${entry.meta.technicalValidationDoc}`} className="border border-core-accent/35 px-2 py-1 text-[0.58rem] font-semibold text-core-accent hover:bg-core-accent/10">
                  Abrir ficha técnica
                </a>
              </div>
              <p className="mt-2 text-[0.68rem] leading-relaxed text-core-text-secondary">{entry.meta.technicalReview.scope}</p>
              {warnings.length ? <p className="mt-1 text-[0.6rem] text-core-warning">Gate: {warnings.length} advertencia(s) de revisión humana.</p> : null}
            </article>
          );
        })}
      </div>
    </details>
  );
}
