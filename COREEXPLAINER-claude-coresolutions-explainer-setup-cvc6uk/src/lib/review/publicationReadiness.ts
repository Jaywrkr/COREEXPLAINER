export type PublicationTrack = "client" | "support";
export type PublicationStatus = "ready" | "review-needed" | "blocked";

export interface PublicationReadinessInput {
  reviewStatus: "pending" | "reviewed";
  sourceValidities: Array<"current" | "review-needed" | undefined>;
  validationWarningCount: number;
  technicalIntegrity?: "baseline" | "source-backed" | "reviewed";
  scenariosTotal: number;
  scenariosReadyForSupport: number;
}

export interface PublicationReadiness {
  client: PublicationStatus;
  support: PublicationStatus;
  reasons: string[];
}

export function assessPublicationReadiness(input: PublicationReadinessInput): PublicationReadiness {
  const reasons: string[] = [];
  const hasStaleSources = input.sourceValidities.some((validity) => validity !== "current");
  const hasWarnings = input.validationWarningCount > 0;
  const supportScenarioGap = input.scenariosReadyForSupport < input.scenariosTotal;

  if (input.reviewStatus === "pending") reasons.push("la revisión humana sigue pendiente");
  if (hasStaleSources) reasons.push("hay fuentes por revisar o sin estado vigente");
  if (hasWarnings) reasons.push(`${input.validationWarningCount} advertencia(s) de validación requieren decisión`);
  if (supportScenarioGap) reasons.push("uno o más escenarios no cumplen el perfil de soporte");
  if (input.technicalIntegrity !== "reviewed") reasons.push("la integridad técnica no está marcada como revisada");

  // Validation warnings are editorial signals (for example, a pending human
  // review), not infrastructure faults. They keep a route in review-needed.
  // A support route is blocked only when its declared scenario coverage is
  // structurally incomplete; this avoids presenting pending review as failure.
  const client: PublicationStatus = input.reviewStatus === "reviewed" && !hasStaleSources && !hasWarnings ? "ready" : "review-needed";
  const support: PublicationStatus = supportScenarioGap ? "blocked" : input.reviewStatus === "reviewed" && !hasStaleSources && !hasWarnings && input.technicalIntegrity === "reviewed" ? "ready" : "review-needed";
  return { client, support, reasons };
}

export const publicationStatusLabels: Record<PublicationStatus, string> = {
  ready: "Listo",
  "review-needed": "Requiere revisión",
  blocked: "Bloqueado",
};
