import type { FailureScenario, TargetArchitecture } from "@/content/types";
import type { Scene } from "@/lib/animation-spec/types";
import type { WhatIfImpact } from "@/lib/semantic-model/evaluateWhatIf";

export interface WhatIfAssistantSummary {
  outcome: string;
  customerMeaning: string;
  evidence: string[];
  relatedDecisions: Array<{ title: string; phaseTitles: string[] }>;
}

/** Turns graph reachability into language a customer and engineer can use. */
export function explainWhatIfImpact(
  scene: Scene,
  scenario: FailureScenario,
  impact: WhatIfImpact,
  targetArchitecture?: TargetArchitecture,
): WhatIfAssistantSummary {
  const outcome = impact.status === "blocked"
    ? "El flujo queda bloqueado"
    : impact.status === "degraded"
      ? "El flujo queda degradado"
      : "El impacto queda contenido en el modelo";
  const customerMeaning = impact.status === "blocked"
    ? "La pérdida simulada elimina una entrada o dependencia necesaria; no debe presentarse continuidad hasta demostrar un camino alternativo."
    : impact.status === "degraded"
      ? "Algunos componentes siguen disponibles, pero el servicio completo no está demostrado porque existen componentes sin camino."
      : "El grafo conserva un camino lógico, pero eso no demuestra que la aplicación, los datos ni las sesiones funcionen en un entorno real.";
  const profileMeaning = impact.mode === "latency"
    ? `La simulación añade ${impact.addedLatencyMs ?? "una"} ms de latencia conceptual; debe validarse con métricas extremo a extremo.`
    : impact.mode === "capacity"
      ? `La simulación conserva aproximadamente ${impact.remainingCapacityPercent ?? "una parte de la"} capacidad; el sizing real requiere consumo, reserva y política.`
      : impact.mode === "dependency"
        ? `La dependencia externa «${impact.externalDependency ?? "no identificada"}» queda fuera del grafo y necesita una comprobación independiente.`
        : impact.mode === "observability"
          ? "El servicio puede continuar, pero la pérdida de telemetría reduce la capacidad de diagnosticar y demostrar el resultado."
          : impact.impact;
  const enrichedMeaning = [customerMeaning, profileMeaning].filter(Boolean).join(" ");
  const evidence = [
    `Probar el escenario «${scenario.label}» con tráfico o una prueba funcional representativa.`,
    "Confirmar rutas, dependencias, identidad, datos y criterio de rollback.",
    `Revisar los ${impact.brokenRelationshipCount} vínculo(s) afectados y la capacidad del camino alternativo.`,
  ];
  const relatedDecisions = (targetArchitecture?.decisionOptions ?? [])
    .filter((option) => option.scenarioIds?.includes(scenario.id))
    .map((option) => ({
      title: option.title,
      phaseTitles: (option.roadmapPhaseIds ?? []).map((phaseId) => targetArchitecture?.roadmap?.find((phase) => phase.id === phaseId)?.title ?? phaseId),
    }));
  return { outcome, customerMeaning: enrichedMeaning, evidence, relatedDecisions };
}

export function getSceneNodeNames(scene: Scene, ids: readonly string[]) {
  return ids.map((id) => scene.nodes.find((node) => node.id === id)?.name ?? id);
}
