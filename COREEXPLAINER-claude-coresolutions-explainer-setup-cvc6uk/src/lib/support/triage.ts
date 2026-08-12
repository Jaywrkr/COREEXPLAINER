import type { ExplainerMeta, ExplainerStep, FailureScenario } from "@/content/types";

export type TriageConfidence = "authored" | "derived";

export interface SupportTriageItem {
  id: string;
  symptom: string;
  probableLayer: string;
  evidenceToRequest: string;
  safeNextCheck: string;
  escalationCriteria: string;
  sourceIds: string[];
  confidence: TriageConfidence;
}

export interface SupportTriageInput {
  slug: string;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
}

export interface SupportTriageBrief {
  slug: string;
  title: string;
  brands: string[];
  items: SupportTriageItem[];
  limitations: string[];
}

const modeLabels: Record<NonNullable<FailureScenario["simulation"]>["mode"], string> = {
  "hard-down": "disponibilidad",
  degraded: "degradación",
  latency: "latencia",
  capacity: "capacidad",
  dependency: "dependencia",
  observability: "observabilidad",
};

function clean(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function itemFromScenario(scenario: FailureScenario, meta: ExplainerMeta): SupportTriageItem {
  const simulationMode = scenario.simulation?.mode;
  const firstStep = scenario.guidedSteps?.[0];
  const sourceIds = unique([
    ...(firstStep?.sourceIds ?? []),
    ...meta.technicalReview.sources.filter((source) => scenario.detail.includes(source.id)).map((source) => source.id),
  ]);
  const layer = simulationMode ? modeLabels[simulationMode] : "componente afectado";
  return {
    id: `scenario:${scenario.id}`,
    symptom: clean(scenario.summary),
    probableLayer: `${layer}: ${clean(scenario.affectedNodes.join(", "))}`,
    evidenceToRequest: clean(firstStep?.evidence ?? scenario.detail),
    safeNextCheck: clean(firstStep?.instruction ?? "Correlacionar el síntoma con el nodo afectado y revisar la evidencia declarada en el runbook aprobado."),
    escalationCriteria: clean(scenario.limitation),
    sourceIds,
    confidence: firstStep ? "authored" : "derived",
  };
}

/**
 * Builds a support-oriented worksheet from authored explainer data. It never
 * probes an environment and intentionally phrases checks as evidence requests.
 */
export function buildSupportTriageBrief({ slug, meta, steps }: SupportTriageInput): SupportTriageBrief {
  const scenarios = (meta.failureScenarios ?? []).map((scenario) => itemFromScenario(scenario, meta));
  const fallback = steps.slice(0, 3).map((step) => ({
    id: `scene:${step.id}`,
    symptom: `La escena «${clean(step.title)}» no coincide con el comportamiento esperado.`,
    probableLayer: "alcance de la explicación o dependencia representada",
    evidenceToRequest: clean(step.businessImpact),
    safeNextCheck: `Confirmar con el responsable del servicio qué parte de «${clean(step.title)}» se observa y contrastarla con el diagrama.`,
    escalationCriteria: "Escalar cuando el síntoma no pueda aislarse a una escena, dependencia o versión declarada.",
    sourceIds: unique(step.sourceIds),
    confidence: "derived" as const,
  }));
  const items = scenarios.length ? scenarios : fallback;
  return {
    slug,
    title: meta.title,
    brands: meta.brandContext.map((brand) => `${brand.name} (${brand.role})`),
    items,
    limitations: [
      "Es una guía conceptual basada en contenido autorado; no diagnostica un entorno real.",
      "Pedir evidencias antes de cambiar configuración y validar versión, permisos, ventana y rollback.",
      "La confianza «derivada» requiere confirmación del especialista del producto.",
    ],
  };
}

export function buildSupportTriageMarkdown(brief: SupportTriageBrief, generatedAt: string, appVersion: string): string {
  const lines = [
    `Versión de la aplicación: ${clean(appVersion)}`,
    `Generado: ${clean(generatedAt)}`,
    `# CORESOLUTIONS · Brief de triage · ${clean(brief.title)}`,
    `Tema: ${clean(brief.slug)}`,
    `Marcas en alcance: ${brief.brands.join("; ") || "no declaradas"}`,
    "",
    "> Documento conceptual. No ejecuta comandos, no consulta plataformas y no sustituye el runbook aprobado.",
    "",
    ...brief.items.flatMap((item, index) => [
      `## ${index + 1}. ${clean(item.symptom)}`,
      `- Capa probable: ${clean(item.probableLayer)}`,
      `- Evidencia a solicitar: ${clean(item.evidenceToRequest)}`,
      `- Siguiente comprobación segura: ${clean(item.safeNextCheck)}`,
      `- Escalar cuando: ${clean(item.escalationCriteria)}`,
      `- Confianza: ${item.confidence}`,
      `- Fuentes: ${item.sourceIds.length ? item.sourceIds.join(", ") : "confirmar antes de usar"}`,
      "",
    ]),
    "## Límites",
    ...brief.limitations.map((limitation) => `- ${clean(limitation)}`),
  ];
  return lines.join("\n");
}
