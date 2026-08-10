import type { Scene } from "@/lib/animation-spec/types";
import type { TechnicalIntegrityReport } from "@/content/types";
import type { WhatIfImpact } from "./evaluateWhatIf";

export type TechnicalFindingSeverity = "critical" | "warning" | "info";

export interface TechnicalFinding {
  id: string;
  severity: TechnicalFindingSeverity;
  title: string;
  detail: string;
  evidence: string;
  recommendation: string;
}

/** Turns graph impact into reviewable, vendor-neutral technical findings. */
export function evaluateTechnicalRules(
  scene: Scene,
  impact: WhatIfImpact,
  integrityReport?: TechnicalIntegrityReport | null,
): TechnicalFinding[] {
  const findings: TechnicalFinding[] = [];

  if (integrityReport?.diagnostics.length) {
    for (const diagnostic of integrityReport.diagnostics) {
      findings.push({
        id: `integrity-${diagnostic.id}`,
        severity: diagnostic.severity === "error" ? "critical" : "warning",
        title: `${diagnostic.title} · ${integrityReport.domain}`,
        detail: diagnostic.detail,
        evidence: diagnostic.rationale,
        recommendation: diagnostic.recommendation,
      });
    }
  }

  if (impact.status === "blocked") {
    findings.push({
      id: "no-surviving-entrypoint",
      severity: "critical",
      title: "No queda una entrada disponible",
      detail: "El modelo no encuentra un punto de entrada desde el que pueda continuar el flujo.",
      evidence: "Confirmar el origen real del servicio, el dominio de fallo y si existe un camino alternativo.",
      recommendation: "No presentar la recuperación como disponible hasta demostrar una entrada funcional.",
    });
  }

  if (impact.affectedNodeIds.length > 0) {
    findings.push({
      id: "unreachable-components",
      severity: "critical",
      title: "Hay componentes sin camino",
      detail: `${impact.affectedNodeIds.length} componente(s) disponible(s) quedan fuera del recorrido desde una entrada.`,
      evidence: "Revisar dependencias, routing, paths de storage, identidad y conectividad extremo a extremo.",
      recommendation: "Separar lo que se recuperó de lo que todavía no presta el servicio completo.",
    });
  }

  if (impact.brokenRelationshipCount > 0) {
    findings.push({
      id: "broken-relationships",
      severity: "warning",
      title: "Relaciones interrumpidas",
      detail: `${impact.brokenRelationshipCount} relación(es) toca(n) un componente no disponible.`,
      evidence: "Comprobar estado de enlaces, sesiones, replicación, dependencias y logs de los dos extremos.",
      recommendation: "Identificar qué relación es imprescindible y cuál puede degradarse sin detener el servicio.",
    });
  }

  const capacityNodes = scene.nodes.filter((node) => node.capacity !== undefined);
  if (capacityNodes.length > 0 && impact.unavailableNodeIds.length > 0) {
    findings.push({
      id: "capacity-not-proven",
      severity: "warning",
      title: "La capacidad de recuperación no está demostrada",
      detail: "El grafo declara límites de capacidad, pero la simulación no hace sizing ni calcula reserva disponible.",
      evidence: "Comparar capacidad instalada, consumo, reservas, admission control y prioridades de servicio.",
      recommendation: "Validar que el destino pueda absorber las cargas antes de afirmar continuidad completa.",
    });
  }

  findings.push({
    id: "acceptance-evidence",
    severity: "info",
    title: "Falta evidencia de aceptación",
    detail: "El camino calculado describe conectividad lógica, no demuestra que la aplicación funcione.",
    evidence: "Definir prueba funcional, métricas esperadas, ventana de observación y criterio de rollback.",
    recommendation: "Cerrar el escenario solo después de validar servicio, dependencias y protección de datos.",
  });

  return findings;
}
