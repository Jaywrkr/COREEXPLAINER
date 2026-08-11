import type { ChangeImpact, ImplementationWorkPackage } from "./workPackage";

export type ImpactReviewStatus = "pending" | "reviewed" | "blocked" | "accepted";

export interface ImpactReviewDecision {
  status: ImpactReviewStatus;
  note: string;
  updatedAt: string;
}

export type ImpactReviewState = Record<string, ImpactReviewDecision>;

export interface ImpactReviewSummary {
  total: number;
  pending: number;
  reviewed: number;
  blocked: number;
  accepted: number;
  score: number;
  ready: boolean;
}

function clean(value: string, max = 1600): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export function emptyImpactReviewDecision(): ImpactReviewDecision {
  return { status: "pending", note: "", updatedAt: "" };
}

export function normalizeImpactReviewDecision(value: Partial<ImpactReviewDecision> | null | undefined): ImpactReviewDecision {
  const status: ImpactReviewStatus = value?.status === "reviewed" || value?.status === "blocked" || value?.status === "accepted" ? value.status : "pending";
  return { status, note: clean(value?.note ?? ""), updatedAt: clean(value?.updatedAt ?? "", 80) };
}

export function canAcceptImpact(decision: ImpactReviewDecision): boolean {
  return decision.status === "accepted" && decision.note.trim().length >= 8;
}

export function normalizeImpactReviewState(value: unknown, impacts: ChangeImpact[]): ImpactReviewState {
  const record = value && typeof value === "object" ? value as Record<string, unknown> : {};
  return Object.fromEntries(impacts.map((impact) => [impact.id, normalizeImpactReviewDecision(record[impact.id] as Partial<ImpactReviewDecision> | undefined)]));
}

export function assessImpactReview(impacts: ChangeImpact[], state: ImpactReviewState): ImpactReviewSummary {
  const counts = { pending: 0, reviewed: 0, blocked: 0, accepted: 0 };
  for (const impact of impacts) {
    const decision = normalizeImpactReviewDecision(state[impact.id]);
    if (decision.status === "accepted" && !canAcceptImpact(decision)) counts.pending += 1;
    else counts[decision.status] += 1;
  }
  const total = impacts.length;
  const completed = counts.reviewed + counts.accepted;
  return { total, ...counts, score: total ? Math.round((completed / total) * 100) : 0, ready: total > 0 && counts.pending === 0 && counts.blocked === 0 };
}

export function buildImpactReviewMarkdown(pkg: ImplementationWorkPackage, state: ImpactReviewState): string {
  const summary = assessImpactReview(pkg.changeImpacts, state);
  const lines = [
    "",
    "## Estado de revisión de impactos",
    `- Preparación de revisión: ${summary.score}% (${summary.ready ? "sin bloqueos abiertos" : "requiere seguimiento"})`,
    `- Pendientes: ${summary.pending} · Revisados: ${summary.reviewed} · Bloqueados: ${summary.blocked} · Aceptados: ${summary.accepted}`,
    ...pkg.changeImpacts.map((impact) => {
      const decision = normalizeImpactReviewDecision(state[impact.id]);
      return `- ${impact.workstreamId} · riesgo ${impact.risk} · estado ${decision.status} · nota: ${decision.note || "sin nota"} · actualizado: ${decision.updatedAt || "pendiente"}`;
    }),
    "",
    "> Estado editorial local. No equivale a aprobación de cambio, autorización operacional ni certificación del cliente.",
  ];
  return lines.join("\n");
}

export function buildImpactReviewJson(pkg: ImplementationWorkPackage, state: ImpactReviewState): ImplementationWorkPackage & { review: ImpactReviewState; reviewSummary: ImpactReviewSummary } {
  return { ...pkg, review: normalizeImpactReviewState(state, pkg.changeImpacts), reviewSummary: assessImpactReview(pkg.changeImpacts, state) };
}
