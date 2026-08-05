import type { FailureScenario, GuidedScenarioStep } from "@/content/types";

/**
 * Existing explainers predate authored step-by-step runbooks. This fallback
 * keeps every scenario useful while new content progressively adds richer
 * guidedSteps without requiring a breaking migration of all content at once.
 */
export function getGuidedScenarioSteps(scenario: FailureScenario): GuidedScenarioStep[] {
  if (scenario.guidedSteps?.length) return scenario.guidedSteps;

  const affected = scenario.affectedNodes.join(", ");
  const focusNodeIds = scenario.deadNodeIds;
  return [
    {
      id: "observe",
      kind: "observe",
      title: "Observa el síntoma",
      instruction: scenario.summary,
      evidence: `El escenario declara como afectados: ${affected}.`,
      expected: "Describe qué percibiría el usuario o el equipo de operación antes de buscar una causa.",
      focusNodeIds,
    },
    {
      id: "diagnose",
      kind: "diagnose",
      title: "Formula la hipótesis",
      instruction: scenario.detail,
      evidence: "Relaciona el componente afectado con el camino de datos, control o dependencia que lo utiliza.",
      expected: "Identifica una hipótesis comprobable y qué señal o configuración debería revisarse.",
      focusNodeIds,
    },
    {
      id: "recover",
      kind: "recover",
      title: "Define la recuperación",
      instruction: "Selecciona el runbook, cambio o procedimiento de recuperación aprobado para este entorno.",
      evidence: "La simulación no ejecuta cambios; deja visible el punto donde el equipo debe decidir y autorizar.",
      expected: "Explica qué condición debe restablecerse y qué riesgo debe controlarse durante la acción.",
      focusNodeIds,
    },
    {
      id: "validate",
      kind: "validate",
      title: "Valida el resultado",
      instruction: "Comprueba servicio, dependencias, capacidad, logs y criterio de aceptación después de recuperar.",
      evidence: scenario.limitation,
      expected: "No cierres el incidente hasta tener evidencia del servicio y de la protección que debía conservarse.",
      focusNodeIds: [],
    },
  ];
}
