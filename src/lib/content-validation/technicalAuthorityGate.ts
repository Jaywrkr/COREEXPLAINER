import type { ExplainerMeta, ExplainerStep, TechnicalAuthorityAssessment, TechnicalAuthorityProfile, TechnicalAuthorityRule } from "@/content/types";

const OWNER_ALIASES: Record<string, string[]> = {
  "Broadcom / VMware": ["Broadcom / VMware"],
  "HPE Aruba Networking": ["HPE Aruba Networking"],
  IBM: ["IBM"],
  "Check Point": ["Check Point"],
  Veeam: ["Veeam"],
  Kubernetes: ["Kubernetes"],
  NIST: ["NIST"],
  CISA: ["CISA"],
  OpenTelemetry: ["OpenTelemetry"],
  Synology: ["Synology"],
};

/**
 * Returns publication blockers, never inferred compatibility. A topic is only
 * ready after a human reviewer accepts its current, owner-backed evidence.
 */
export function assessTechnicalAuthority(meta: ExplainerMeta, profile: TechnicalAuthorityProfile | undefined, steps: ExplainerStep[] = [], rules: TechnicalAuthorityRule[] = []): TechnicalAuthorityAssessment {
  const blockers: string[] = [];
  if (!profile) return { status: "blocked", blockers: ["no existe matriz de autoridad técnica para este tema"], verifiedEvidence: 0, requiredEvidence: 0 };
  if (!profile.scope.trim()) blockers.push("la matriz no declara alcance técnico");
  if (!profile.requiredRuleFamilies.length) blockers.push("la matriz no declara familias de reglas");
  const sources = new Map(meta.technicalReview.sources.map((source) => [source.id, source]));
  let verifiedEvidence = 0;
  for (const evidence of profile.requiredEvidence) {
    const evidenceOwner = evidence.owner ?? profile.owner;
    const allowedPublishers = new Set(OWNER_ALIASES[evidenceOwner] ?? [evidenceOwner]);
    const source = sources.get(evidence.sourceId);
    if (!source) { blockers.push(`falta evidencia '${evidence.sourceId}' para ${evidence.control}`); continue; }
    if (source.validity !== "current") { blockers.push(`la evidencia '${evidence.sourceId}' requiere revisión de vigencia`); continue; }
    if (!allowedPublishers.has(source.publisher ?? "")) { blockers.push(`la evidencia '${evidence.sourceId}' no pertenece al fabricante/autoridad '${evidenceOwner}'`); continue; }
    if (!source.product || !source.version || !source.reference) { blockers.push(`la evidencia '${evidence.sourceId}' no identifica producto, versión o referencia`); continue; }
    verifiedEvidence += 1;
  }
  const stepSources = new Map(steps.map((step) => [step.id, new Set(step.sourceIds)]));
  for (const rule of rules) {
    if (!rule.id.trim() || !rule.control.trim() || !rule.sourceIds.length || !rule.stepIds.length) {
      blockers.push("una regla técnica está incompleta");
      continue;
    }
    for (const sourceId of rule.sourceIds) if (!sources.has(sourceId)) blockers.push(`la regla '${rule.id}' referencia una fuente inexistente '${sourceId}'`);
    for (const stepId of rule.stepIds) {
      const stepSourceIds = stepSources.get(stepId);
      if (!stepSourceIds) { blockers.push(`la regla '${rule.id}' referencia un paso inexistente '${stepId}'`); continue; }
      if (!rule.sourceIds.some((sourceId) => stepSourceIds.has(sourceId))) blockers.push(`el paso '${stepId}' no cita evidencia de la regla '${rule.id}'`);
    }
  }
  if (meta.technicalIntegrity?.assurance !== "reviewed") blockers.push("la integridad técnica no está marcada como revisada");
  if (meta.reviewStatus !== "reviewed") blockers.push("la revisión humana experta sigue pendiente");
  return { status: blockers.length === 0 ? "ready" : "blocked", blockers, verifiedEvidence, requiredEvidence: profile.requiredEvidence.length };
}
