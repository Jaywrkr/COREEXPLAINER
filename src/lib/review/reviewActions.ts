import type { ExplainerMeta } from "@/content/types";

export type ReviewActionKind = "human-review" | "source-refresh" | "content-gate" | "integrity-check";
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
  const staleSourceIds = sources.filter((source) => source.validity === "review-needed").map((source) => source.id);
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
    actions.push({
      id: "refresh-sources",
      kind: "source-refresh",
      priority: "high",
      title: "Actualizar fuentes marcadas review-needed",
      reason: `${staleSourceIds.length} fuente(s) estan fuera de la ventana declarada de revision.`,
      evidence: "Confirmar release, capacidades, limites y URL oficial; despues actualizar accessedAt y validity en el contenido.",
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
  return actions;
}
