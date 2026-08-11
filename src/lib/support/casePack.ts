import type { SupportTriageBrief } from "./triage";

export interface SupportCaseDraft {
  caseId: string;
  summary: string;
  impact: string;
  startedAt: string;
  owner: string;
  selectedTriageId: string;
  notes: string;
}

export interface SupportCasePackInput {
  slug: string;
  title: string;
  appVersion: string;
  generatedAt: string;
  brands: string[];
  draft: SupportCaseDraft;
  triage: SupportTriageBrief;
}

function safe(value: string, max = 1200): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function safeCaseId(value: string): string {
  return safe(value, 80).replace(/[^a-zA-Z0-9._-]/g, "-");
}

export function emptySupportCaseDraft(): SupportCaseDraft {
  return { caseId: "", summary: "", impact: "", startedAt: "", owner: "", selectedTriageId: "", notes: "" };
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
  };
}

export function buildSupportCaseMarkdown(input: SupportCasePackInput): string {
  const draft = normalizeSupportCaseDraft(input.draft);
  const selected = input.triage.items.find((item) => item.id === draft.selectedTriageId);
  const lines = [
    `Versión de la aplicación: ${safe(input.appVersion, 40)}`,
    `Generado: ${safe(input.generatedAt, 80)}`,
    `# CORESOLUTIONS · Handoff de soporte · ${safe(input.title, 180)}`,
    `Tema: ${safe(input.slug, 120)}`,
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
    "## Límites y revisión",
    ...input.triage.limitations.map((limitation) => `- ${safe(limitation)}`),
    "- El especialista debe confirmar causa, versión, permisos, ventana, rollback y datos sensibles antes de usar este documento.",
  ];
  return lines.join("\n");
}
