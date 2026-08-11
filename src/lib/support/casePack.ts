import type { SupportTriageBrief } from "./triage";
import type { EvidenceRecord } from "@/lib/evidence/ledger";

export interface SupportCaseDraft {
  caseId: string;
  summary: string;
  impact: string;
  startedAt: string;
  owner: string;
  selectedTriageId: string;
  notes: string;
  evidenceReceived: string;
  checkResult: string;
  escalationDecision: SupportCaseEscalationDecision;
}

export type SupportCaseEscalationDecision = "pending" | "continue" | "escalate";

export interface SupportCasePackInput {
  slug: string;
  title: string;
  appVersion: string;
  generatedAt: string;
  brands: string[];
  draft: SupportCaseDraft;
  triage: SupportTriageBrief;
  evidence: EvidenceRecord[];
}

export interface SupportCaseReadiness {
  score: number;
  ready: boolean;
  missing: string[];
}

export interface SupportCaseJsonExport {
  schemaVersion: "1.0";
  appVersion: string;
  generatedAt: string;
  slug: string;
  title: string;
  brands: string[];
  draft: SupportCaseDraft;
  readiness: SupportCaseReadiness;
  selectedTriage: SupportTriageBrief["items"][number] | null;
  triage: SupportTriageBrief;
  evidence: EvidenceRecord[];
}

function safe(value: string, max = 1200): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function safeCaseId(value: string): string {
  return safe(value, 80).replace(/[^a-zA-Z0-9._-]/g, "-");
}

export function emptySupportCaseDraft(): SupportCaseDraft {
  return { caseId: "", summary: "", impact: "", startedAt: "", owner: "", selectedTriageId: "", notes: "", evidenceReceived: "", checkResult: "", escalationDecision: "pending" };
}

export function normalizeSupportCaseDraft(value: Partial<SupportCaseDraft> | null | undefined): SupportCaseDraft {
  return {
    caseId: safeCaseId(value?.caseId ?? ""),
    summary: safe(value?.summary ?? ""),
    impact: safe(value?.impact ?? ""),
    startedAt: safe(value?.startedAt ?? "", 80),
    owner: safe(value?.owner ?? "", 120),
    selectedTriageId: safe(value?.selectedTriageId ?? "", 120),
    notes: safe(value?.notes ?? "", 2000),
    evidenceReceived: safe(value?.evidenceReceived ?? "", 2000),
    checkResult: safe(value?.checkResult ?? "", 2000),
    escalationDecision: value?.escalationDecision === "continue" || value?.escalationDecision === "escalate" ? value.escalationDecision : "pending",
  };
}

/** Deterministic handoff checklist; it never asserts that the incident is solved. */
export function assessSupportCaseReadiness(draft: SupportCaseDraft, triage: SupportTriageBrief): SupportCaseReadiness {
  const normalized = normalizeSupportCaseDraft(draft);
  const checks: Array<[string, boolean]> = [
    ["ID interno", Boolean(normalized.caseId)],
    ["resumen", Boolean(normalized.summary)],
    ["impacto", Boolean(normalized.impact)],
    ["responsable", Boolean(normalized.owner)],
    ["ruta de triage válida", Boolean(triage.items.some((item) => item.id === normalized.selectedTriageId))],
    ["evidencia recibida", Boolean(normalized.evidenceReceived)],
    ["resultado de comprobación", Boolean(normalized.checkResult)],
    ["decisión de escalamiento", normalized.escalationDecision !== "pending"],
  ];
  const missing = checks.filter(([, complete]) => !complete).map(([label]) => label);
  return { score: Math.round(((checks.length - missing.length) / checks.length) * 100), ready: missing.length === 0, missing };
}

export function buildSupportCaseMarkdown(input: SupportCasePackInput): string {
  const draft = normalizeSupportCaseDraft(input.draft);
  const selected = input.triage.items.find((item) => item.id === draft.selectedTriageId);
  const readiness = assessSupportCaseReadiness(draft, input.triage);
  const lines = [
    `Versión de la aplicación: ${safe(input.appVersion, 40)}`,
    `Generado: ${safe(input.generatedAt, 80)}`,
    `# CORESOLUTIONS · Handoff de soporte · ${safe(input.title, 180)}`,
    `Tema: ${safe(input.slug, 120)}`,
    `PreparaciÃ³n del handoff: ${readiness.score}% (${readiness.ready ? "completo" : `faltan: ${readiness.missing.join(", ")}`})`,
    `Marcas en alcance: ${input.brands.map((brand) => safe(brand, 160)).join("; ") || "no declaradas"}`,
    "",
    "> Paquete conceptual creado en el navegador. No contiene una conexión al entorno, no ejecuta acciones y debe revisarse antes de adjuntarse a un ticket.",
    "",
    "## Contexto del caso",
    `- ID interno: ${draft.caseId || "pendiente"}`,
    `- Resumen: ${draft.summary || "pendiente de registrar"}`,
    `- Impacto reportado: ${draft.impact || "pendiente de registrar"}`,
    `- Inicio declarado: ${draft.startedAt || "pendiente de registrar"}`,
    `- Responsable: ${draft.owner || "pendiente de asignar"}`,
    `- Notas: ${draft.notes || "sin notas"}`,
    `- Evidencia recibida: ${draft.evidenceReceived || "pendiente de registrar"}`,
    `- Resultado de comprobación: ${draft.checkResult || "pendiente de registrar"}`,
    `- Decisión de escalamiento: ${draft.escalationDecision}`,
    "",
    "## Ruta de triage seleccionada",
    ...(selected ? [
      `- Síntoma: ${selected.symptom}`,
      `- Capa probable: ${selected.probableLayer}`,
      `- Evidencia a solicitar: ${selected.evidenceToRequest}`,
      `- Siguiente comprobación segura: ${selected.safeNextCheck}`,
      `- Escalar cuando: ${selected.escalationCriteria}`,
      `- Confianza: ${selected.confidence}`,
      `- Fuentes: ${selected.sourceIds.join(", ") || "confirmar antes de usar"}`,
    ] : ["- No se ha seleccionado una ruta de triage."]),
    "",
    "## Rutas disponibles",
    ...input.triage.items.map((item) => `- ${item.id}: ${safe(item.symptom, 240)} (${item.confidence})`),
    "",
    "## Ledger de evidencia",
    ...input.evidence.map((record) => `- ${record.id} · ${record.kind} · ${safe(record.claim, 240)} · campos: ${record.claimPaths.join(", ")} · solicitar: ${safe(record.requestedEvidence, 400)} · fuentes: ${record.sourceIds.join(", ") || "confirmar"}`),
    ...(input.evidence.length ? [] : ["- No hay registros de evidencia declarados."]),
    "",
    "## Límites y revisión",
    ...input.triage.limitations.map((limitation) => `- ${safe(limitation)}`),
    "- El especialista debe confirmar causa, versión, permisos, ventana, rollback y datos sensibles antes de usar este documento.",
  ];
  return lines.join("\n");
}

/** Versioned structured handoff for future ticketing/documentation adapters. */
export function buildSupportCaseJson(input: SupportCasePackInput): SupportCaseJsonExport {
  const draft = normalizeSupportCaseDraft(input.draft);
  return {
    schemaVersion: "1.0",
    appVersion: input.appVersion,
    generatedAt: input.generatedAt,
    slug: input.slug,
    title: input.title,
    brands: input.brands.map((brand) => safe(brand, 160)),
    draft,
    readiness: assessSupportCaseReadiness(draft, input.triage),
    selectedTriage: input.triage.items.find((item) => item.id === draft.selectedTriageId) ?? null,
    triage: input.triage,
    evidence: input.evidence,
  };
}
