import Link from "next/link";
import { getAllExplainers, explainerValidationWarnings } from "@/content/registry";
import { isScenarioReadyForSupport } from "@/lib/review/scenarioReadiness";
import { assessPublicationReadiness, publicationStatusLabels, type PublicationStatus } from "@/lib/review/publicationReadiness";

const statusStyles: Record<PublicationStatus, string> = {
  ready: "border-core-success/40 text-core-success",
  "review-needed": "border-core-warning/40 text-core-warning",
  blocked: "border-core-error/40 text-core-error",
};

export function PublicationReadinessPanel() {
  const entries = getAllExplainers();
  const rows = entries.map((entry) => {
    const itemScenarios = entry.meta.failureScenarios ?? [];
    const readiness = assessPublicationReadiness({
      reviewStatus: entry.meta.reviewStatus,
      sourceValidities: entry.meta.technicalReview.sources.map((source) => source.validity),
      validationWarningCount: (explainerValidationWarnings[entry.slug] ?? []).length,
      technicalIntegrity: entry.meta.technicalIntegrity?.assurance,
      scenariosTotal: itemScenarios.length,
      scenariosReadyForSupport: itemScenarios.filter((scenario) => isScenarioReadyForSupport(entry.meta, scenario)).length,
    });
    return { slug: entry.slug, title: entry.meta.title, ...readiness };
  });
  const count = (track: "client" | "support", status: PublicationStatus) => rows.filter((row) => row[track] === status).length;

  return (
    <details className="mb-10 border border-core-border/[0.12] bg-core-panel/30 p-4">
      <summary className="cursor-pointer list-none font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">Puerta de publicación</summary>
      <p className="mt-2 max-w-3xl text-[0.68rem] leading-relaxed text-core-text-secondary">Separa el estado de una explicación para cliente del nivel necesario para usarla como apoyo técnico. No publica ni modifica contenido automáticamente.</p>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
        {(["client", "support"] as const).map((track) => (
          <div key={track} className="border border-core-border/[0.1] p-2">
            <p className="text-core-text-muted">{track === "client" ? "Ruta cliente" : "Ruta soporte"}</p>
            <p className="mt-1 font-mono text-core-text">{count(track, "ready")} listos · {count(track, "review-needed")} por revisar · {count(track, "blocked")} bloqueados</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {rows.map((row) => (
          <div key={row.slug} className="flex flex-wrap items-center justify-between gap-2 border-t border-core-border/[0.08] pt-1.5 text-[0.62rem]">
            <Link href={`/explainer/${row.slug}`} className="font-semibold text-core-accent hover:underline">{row.title}</Link>
            <div className="flex flex-wrap gap-1.5 font-mono text-[0.54rem] uppercase">
              <span className={`border px-1.5 py-0.5 ${statusStyles[row.client]}`}>cliente: {publicationStatusLabels[row.client]}</span>
              <span className={`border px-1.5 py-0.5 ${statusStyles[row.support]}`}>soporte: {publicationStatusLabels[row.support]}</span>
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
