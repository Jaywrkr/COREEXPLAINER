import { explainerValidationWarnings, getAllExplainers } from "@/content/registry";
import { buildReviewActions } from "@/lib/review/reviewActions";
import { calculateTechnicalCoverage } from "@/lib/review/coverageMetrics";

export function TechnicalCoveragePanel() {
  const coverage = calculateTechnicalCoverage(getAllExplainers().map((entry) => {
    const warnings = explainerValidationWarnings[entry.slug] ?? [];
    return {
      reviewStatus: entry.meta.reviewStatus,
      sourceValidities: entry.meta.technicalReview.sources.map((source) => source.validity),
      failureScenarioCount: entry.meta.failureScenarios?.length ?? 0,
      integrityAssurance: entry.meta.technicalIntegrity?.assurance,
      roadmapCount: entry.meta.targetArchitecture?.roadmap?.length ?? 0,
      warningCount: warnings.length,
      actionCount: buildReviewActions(entry.meta, warnings).length,
      scenarioProfiles: (entry.meta.failureScenarios ?? []).map((scenario) => ({
        hasSimulation: Boolean(scenario.simulation),
        hasGuidedFlow: (scenario.guidedSteps?.length ?? 0) >= 4,
        hasEvidence: Boolean(scenario.guidedSteps?.length) && scenario.guidedSteps!.every((step) => Boolean(step.evidence?.trim())),
        hasCurrentSources: Boolean(scenario.guidedSteps?.length) && scenario.guidedSteps!.every((step) => (step.sourceIds ?? []).length > 0 && (step.sourceIds ?? []).every((sourceId) => entry.meta.technicalReview.sources.find((source) => source.id === sourceId)?.validity === "current")),
      })),
    };
  }));

  return (
    <details className="mb-10 border border-core-border/[0.12] bg-core-panel/30 p-4">
      <summary className="cursor-pointer list-none font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">Cobertura técnica del catálogo</summary>
      <p className="mt-2 max-w-3xl text-[0.68rem] leading-relaxed text-core-text-secondary">Indicadores del contenido autorado para decidir qué revisar o madurar. No son métricas de un entorno de producción.</p>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-4">
        <div><p className="text-core-text-muted">Revisión humana</p><p className="font-mono text-core-text">{coverage.reviewed}/{coverage.explainers}</p></div>
        <div><p className="text-core-text-muted">Fuentes vigentes</p><p className="font-mono text-core-text">{coverage.currentSources}/{coverage.sources}</p></div>
        <div><p className="text-core-text-muted">Explainers con fallos</p><p className="font-mono text-core-text">{coverage.explainersWithScenarios}/{coverage.explainers}</p></div>
        <div><p className="text-core-text-muted">Acciones sugeridas</p><p className="font-mono text-core-text">{coverage.actions}</p></div>
      </div>
      <div className="mt-3 grid gap-2 text-[0.62rem] text-core-text-muted sm:grid-cols-3">
        <p>Escenarios: <span className="font-mono text-core-text">{coverage.failureScenarios}</span></p>
        <p>Madurez de fallos: <span className="font-mono text-core-text">{coverage.scenariosReadyForSupport}/{coverage.failureScenarios}</span> listos para soporte · {coverage.scenariosWithSimulation} con simulación</p>
        <p>Roadmap: <span className="font-mono text-core-text">{coverage.explainersWithRoadmap}/{coverage.explainers}</span> explainers · {coverage.roadmapPhases} fases</p>
        <p>Integridad: <span className="font-mono text-core-text">{coverage.integrityReviewed}</span> reviewed · <span className="font-mono text-core-text">{coverage.integritySourceBacked}</span> source-backed · <span className="font-mono text-core-text">{coverage.integrityBaseline}</span> baseline</p>
      </div>
    </details>
  );
}
