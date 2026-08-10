import type {
  FailureScenario,
  TargetArchitecture,
  TechnicalIntegrityReport,
  TechnicalSource,
} from "@/content/types";
import type { Scene } from "@/lib/animation-spec/types";

export type AssistedReviewSeverity = "critical" | "warning" | "info";

export interface AssistedReviewFinding {
  id: string;
  severity: AssistedReviewSeverity;
  title: string;
  detail: string;
  evidence: string;
  action: string;
  sourceIds?: string[];
}

export interface AssistedTechnicalReview {
  scope: "local-content";
  generatedAt: string;
  confidence: "high" | "medium";
  findings: AssistedReviewFinding[];
}

/**
 * Content-grounded review foundation. It is intentionally deterministic: it
 * never invents an architecture or claims that a customer environment is
 * healthy. A future model can enrich the wording while keeping this contract
 * and the same evidence boundaries.
 */
export function generateAssistedTechnicalReview(input: {
  scene: Scene;
  targetArchitecture?: TargetArchitecture;
  integrityReport?: TechnicalIntegrityReport | null;
  scenarios: FailureScenario[];
  technicalSources: TechnicalSource[];
}): AssistedTechnicalReview {
  const { scene, targetArchitecture, integrityReport, scenarios, technicalSources } = input;
  const findings: AssistedReviewFinding[] = [];
  const staleSourceIds = technicalSources.filter((source) => source.validity === "review-needed").map((source) => source.id);

  if (integrityReport?.status === "error") {
    findings.push({
      id: "integrity-errors",
      severity: "critical",
      title: "La topología tiene reglas incumplidas",
      detail: `${integrityReport.diagnostics.length} diagnóstico(s) requieren revisión antes de presentar el diseño como válido.`,
      evidence: "Abrir cada diagnóstico y comprobar nodos, relaciones, rutas y fuentes asociadas.",
      action: "Resolver primero los errores técnicos o marcarlos explícitamente como una limitación de la explicación.",
    });
  } else if (integrityReport?.status === "warning") {
    findings.push({
      id: "integrity-warnings",
      severity: "warning",
      title: "La topología tiene advertencias técnicas",
      detail: `${integrityReport.diagnostics.length} diagnóstico(s) no bloquean la demo, pero dejan supuestos sin demostrar.`,
      evidence: "Revisar los diagnósticos y confirmar qué evidencia del entorno real falta.",
      action: "No convertir una advertencia en una promesa de disponibilidad o rendimiento.",
    });
  }

  if (!targetArchitecture) {
    findings.push({
      id: "missing-target",
      severity: "info",
      title: "No hay arquitectura objetivo autorada",
      detail: "La explicación presenta el patrón actual, pero no declara cambios esperados ni una intención de evolución.",
      evidence: "Definir objetivo, cambios, límites y fuentes antes de comparar una arquitectura futura.",
      action: "Crear un targetArchitecture cuando el tema necesite una recomendación de evolución.",
    });
  } else {
    if (!targetArchitecture.roadmap?.length) {
      findings.push({
        id: "missing-roadmap",
        severity: "warning",
        title: "La arquitectura objetivo no tiene roadmap",
        detail: "Existe una intención de cambio, pero no hay fases para ordenar la validación con el cliente.",
        evidence: "Definir fases con objetivo, evidencia y criterio de salida.",
        action: "Añadir un roadmap de assessment antes de presentar el target como plan ejecutable.",
      });
    }
    if (!targetArchitecture.decisionOptions || targetArchitecture.decisionOptions.length < 2) {
      findings.push({
        id: "missing-decision-lab",
        severity: "info",
        title: "Faltan alternativas explícitas",
        detail: "La explicación tiene un target, pero todavía no muestra trade-offs entre caminos posibles.",
        evidence: "Documentar al menos dos opciones con beneficios, trade-offs y evidencia.",
        action: "Añadir opciones solo cuando representen decisiones técnicas reales, no variaciones cosméticas.",
      });
    }
  }

  if (scenarios.length === 0) {
    findings.push({
      id: "missing-scenarios",
      severity: "warning",
      title: "No hay escenarios de fallo para comprobar el modelo",
      detail: "La audiencia puede ver el flujo feliz, pero no puede explorar qué ocurre cuando una dependencia falla.",
      evidence: "Definir al menos un fallo relevante, su impacto, limitación y evidencia de recuperación.",
      action: "Añadir escenarios que representen riesgos reales del dominio explicado.",
    });
  }

  if (scene.nodes.length > 0 && !scene.nodes.some((node) => node.killable)) {
    findings.push({
      id: "no-fault-entrypoint",
      severity: "info",
      title: "El diagrama no expone un punto de fallo interactivo",
      detail: "Ningún nodo de esta escena puede activarse como fallo para explorar el comportamiento del sistema.",
      evidence: "Identificar el componente cuya pérdida enseñe mejor el límite del diseño.",
      action: "Hacer killable solo un nodo que represente un riesgo real; no añadir interacción ornamental.",
    });
  }

  if (staleSourceIds.length > 0) {
    findings.push({
      id: "source-review-needed",
      severity: "warning",
      title: "Hay fuentes que requieren revisión",
      detail: `${staleSourceIds.length} fuente(s) están fuera de la ventana editorial definida para el explainer.`,
      evidence: "Contrastar la documentación oficial y actualizar fecha, versión o alcance.",
      action: "No presentar esas afirmaciones como actuales hasta completar la revisión.",
      sourceIds: staleSourceIds,
    });
  }

  return {
    scope: "local-content",
    generatedAt: new Date().toISOString(),
    confidence: integrityReport?.status === "error" ? "medium" : "high",
    findings,
  };
}
