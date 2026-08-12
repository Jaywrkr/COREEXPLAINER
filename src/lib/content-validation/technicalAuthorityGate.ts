import type { ExplainerMeta, TechnicalAuthorityAssessment, TechnicalAuthorityProfile } from "@/content/types";

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
export function assessTechnicalAuthority(meta: ExplainerMeta, profile: TechnicalAuthorityProfile | undefined): TechnicalAuthorityAssessment {
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
  if (meta.technicalIntegrity?.assurance !== "reviewed") blockers.push("la integridad técnica no está marcada como revisada");
  if (meta.reviewStatus !== "reviewed") blockers.push("la revisión humana experta sigue pendiente");
  return { status: blockers.length === 0 ? "ready" : "blocked", blockers, verifiedEvidence, requiredEvidence: profile.requiredEvidence.length };
}
