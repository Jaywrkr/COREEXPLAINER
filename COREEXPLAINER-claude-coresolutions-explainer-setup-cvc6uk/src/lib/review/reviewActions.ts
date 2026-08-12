import type { ExplainerMeta } from "@/content/types";
import { summarizeSourceFreshness } from "@/content/technical-source-catalog";
import { buildScenarioReadinessQueue } from "./scenarioReadiness";

export type ReviewActionKind = "human-review" | "source-refresh" | "content-gate" | "integrity-check" | "scenario-readiness";
export type ReviewActionPriority = "high" | "medium";

export interface ReviewAction {
  id: string;
  kind: ReviewActionKind;
  priority: ReviewActionPriority;
  title: string;
  reason: string;
  evidence: string;
  sourceIds: string[];
}

/**
 * Derives read-only, evidence-linked follow-up work from authored metadata.
 * It never executes a command or changes editorial state.
 */
export function buildReviewActions(meta: ExplainerMeta, warnings: string[]): ReviewAction[] {
  const sources = meta.technicalReview.sources;
  const staleSources = sources
    .map((source) => ({ source, freshness: summarizeSourceFreshness(source) }))
    .filter(({ freshness }) => freshness.status === "review-needed");
  const staleSourceIds = staleSources.map(({ source }) => source.id);
  const actions: ReviewAction[] = [];

  if (meta.reviewStatus === "pending") {
    actions.push({
      id: "human-review",
      kind: "human-review",
      priority: "high",
      title: "Completar revision tecnica especialista",
      reason: "El contenido aun no declara una revision humana aprobada.",
      evidence: "Contrastar narrativa, escenas, nodos, aristas, animacion, escenarios y limites contra la documentacion del alcance.",
      sourceIds: sources.map((source) => source.id),
    });
  }
  if (staleSourceIds.length) {
    const manualCount = staleSources.filter(({ freshness }) => freshness.reason === "manual-review").length;
    const expiredCount = staleSources.filter(({ freshness }) => freshness.reason === "outside-window").length;
    const invalidDateCount = staleSources.filter(({ freshness }) => freshness.reason === "invalid-date").length;
    const reasons = [
      manualCount ? `${manualCount} marcada(s) manualmente` : "",
      expiredCount ? `${expiredCount} fuera de la ventana de 180 días` : "",
      invalidDateCount ? `${invalidDateCount} con fecha inválida` : "",
    ].filter(Boolean).join(", ");
    const dueDates = staleSources.map(({ source, freshness }) => `${source.id}: ${freshness.dueAt ?? "sin fecha"}`).join("; ");
    actions.push({
      id: "refresh-sources",
      kind: "source-refresh",
      priority: "high",
      title: "Actualizar fuentes marcadas review-needed",
      reason: `${staleSourceIds.length} fuente(s) requieren revisión (${reasons || "estado no vigente"}).`,
      evidence: `Confirmar release, capacidades, límites y URL oficial; después actualizar accessedAt y validity en el contenido. Fechas sugeridas: ${dueDates}.`,
      sourceIds: staleSourceIds,
    });
  }
  if (warnings.length) {
    actions.push({
      id: "resolve-content-gate",
      kind: "content-gate",
      priority: "medium",
      title: "Resolver advertencias del content gate",
      reason: `${warnings.length} advertencia(s) requieren una decision editorial o tecnica explicita.`,
      evidence: warnings.join(" "),
      sourceIds: [],
    });
  }
  const integrity = meta.technicalIntegrity;
  if (integrity && integrity.assurance !== "reviewed") {
    actions.push({
      id: "inspect-integrity",
      kind: "integrity-check",
      priority: "medium",
      title: "Revisar integridad tecnica de escenas",
      reason: `El perfil declara assurance ${integrity.assurance}, no reviewed.`,
      evidence: "Revisar los diagnosticos de nodos, relaciones y rutas antes de presentar la escena como explicacion confiable.",
      sourceIds: Object.values(integrity.scenes).flatMap((scene) => [
        ...(scene.requiredEdges ?? []).flatMap((rule) => rule.sourceIds ?? []),
        ...(scene.requiredPaths ?? []).flatMap((rule) => rule.sourceIds ?? []),
      ]),
    });
  }
  const scenarioQueue = buildScenarioReadinessQueue([{ slug: "", title: meta.title, meta }]);
  for (const scenario of scenarioQueue) {
    const sourceIds = (meta.failureScenarios ?? []).find((candidate) => candidate.id === scenario.scenarioId)?.guidedSteps?.flatMap((step) => step.sourceIds ?? []) ?? [];
    actions.push({
      id: `scenario-readiness:${scenario.scenarioId}`,
      kind: "scenario-readiness",
      priority: scenario.score === 0 ? "high" : "medium",
      title: `Madurar escenario: ${scenario.label}`,
      reason: `El escenario tiene ${scenario.score}% de cobertura editorial y aún le faltan ${scenario.missing.join(", ")}.`,
      evidence: "Completar los elementos faltantes y contrastar cada fase con fuentes vigentes antes de usarlo en soporte.",
      sourceIds: [...new Set(sourceIds)],
    });
  }
  return actions;
}
