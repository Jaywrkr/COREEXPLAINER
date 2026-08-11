import { assessTechnicalReviewAssignment, emptyTechnicalReviewAssignment, type TechnicalReviewAssignment } from "./reviewAssignment";

export interface ReviewCampaignEntry {
  slug: string;
  title: string;
  reviewStatus: "pending" | "reviewed";
  assignment?: TechnicalReviewAssignment;
}

export interface ReviewCampaignSummary {
  total: number;
  pending: number;
  reviewed: number;
  unassigned: number;
  inReview: number;
  blocked: number;
  readyForPr: number;
  overdue: number;
  completionPercent: number;
}

export function buildReviewCampaignSummary(entries: ReviewCampaignEntry[], today = new Date().toISOString().slice(0, 10)): ReviewCampaignSummary {
  const counts = { total: entries.length, pending: 0, reviewed: 0, unassigned: 0, inReview: 0, blocked: 0, readyForPr: 0, overdue: 0 };
  for (const entry of entries) {
    if (entry.reviewStatus === "pending") counts.pending += 1;
    else counts.reviewed += 1;
    const assignment = entry.assignment ?? emptyTechnicalReviewAssignment;
    const ready = assignment.status === "ready-for-pr" && assessTechnicalReviewAssignment(assignment).ready;
    if (ready) counts.readyForPr += 1;
    else if (assignment.status === "blocked") counts.blocked += 1;
    else if (assignment.status === "in-review") counts.inReview += 1;
    else counts.unassigned += 1;
    if (assignment.targetDate && assignment.targetDate < today && !ready) counts.overdue += 1;
  }
  return { ...counts, completionPercent: counts.total ? Math.round((counts.readyForPr / counts.total) * 100) : 0 };
}

function safe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function statusLabel(entry: ReviewCampaignEntry): string {
  const assignment = entry.assignment ?? emptyTechnicalReviewAssignment;
  if (assignment.status === "ready-for-pr" && assessTechnicalReviewAssignment(assignment).ready) return "listo para PR";
  if (assignment.status === "blocked") return "bloqueado";
  if (assignment.status === "in-review") return "en revisión";
  return "sin asignar";
}

/** Deterministic handoff artifact; it contains local notes and must be sanitized before sharing externally. */
export function buildReviewCampaignMarkdown(entries: ReviewCampaignEntry[], appVersion: string, generatedAt: string, today = new Date().toISOString().slice(0, 10)): string {
  const summary = buildReviewCampaignSummary(entries, today);
  const rows = [...entries].sort((a, b) => a.title.localeCompare(b.title)).flatMap((entry) => {
    const assignment = entry.assignment ?? emptyTechnicalReviewAssignment;
    const readiness = assessTechnicalReviewAssignment(assignment);
    const overdue = assignment.targetDate && assignment.targetDate < today && !readiness.ready ? " · vencido" : "";
    return [
      `### ${safe(entry.title)} (${safe(entry.slug)})`,
      `- Revisión declarada: ${entry.reviewStatus}`,
      `- Seguimiento local: ${statusLabel(entry)}${overdue}`,
      `- Responsable: ${safe(assignment.reviewer) || "sin asignar"}`,
      `- Fecha objetivo: ${safe(assignment.targetDate) || "sin fecha"}`,
      `- Faltantes del gate: ${readiness.missing.join(" · ") || "ninguno"}`,
      `- Notas: ${safe(assignment.notes) || "sin notas"}`,
      `- Evidencia de cierre: ${safe(assignment.closureEvidence) || "sin registrar"}`,
      "",
    ];
  });
  return [
    "# CORESOLUTIONS · Campaña de revisión especialista",
    "",
    `- Versión de aplicación: ${safe(appVersion)}`,
    `- Generado: ${safe(generatedAt)}`,
    `- Total: ${summary.total} · pendientes: ${summary.pending} · listos para PR: ${summary.readyForPr} · bloqueados: ${summary.blocked} · vencidos: ${summary.overdue}`,
    "",
    "> Snapshot local del navegador. No aprueba contenido, no cambia reviewStatus, no sincroniza tickets y puede contener notas internas: revisar antes de compartir.",
    "",
    ...rows,
    "## Límites",
    "- ‘Listo para PR’ solo significa que el checklist local está completo; la revisión especialista y el PR siguen siendo obligatorios.",
    "- Los datos no representan salud, configuración ni aceptación del entorno del cliente.",
  ].join("\n");
}

export function buildReviewCampaignJson(entries: ReviewCampaignEntry[], appVersion: string, generatedAt: string, today = new Date().toISOString().slice(0, 10)): string {
  const summary = buildReviewCampaignSummary(entries, today);
  return JSON.stringify({ schemaVersion: "1.0", appVersion, generatedAt, today, summary, entries }, null, 2);
}
