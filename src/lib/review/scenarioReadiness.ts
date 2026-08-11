import type { ExplainerMeta } from "@/content/types";
import type { GuidedScenarioStepKind } from "@/content/types";
import { validateFailureSimulationProfile } from "@/lib/content-validation/failureSimulationValidation";

export interface ScenarioReadinessInput {
  slug: string;
  title: string;
  meta: ExplainerMeta;
}

export interface ScenarioReadinessItem {
  slug: string;
  title: string;
  scenarioId: string;
  label: string;
  score: number;
  missing: string[];
}

const CAUSAL_GUIDED_FLOW: readonly GuidedScenarioStepKind[] = ["observe", "diagnose", "recover", "validate"];

export function hasCausalGuidedFlow(steps: NonNullable<ExplainerMeta["failureScenarios"]>[number]["guidedSteps"]): boolean {
  return Boolean(steps && steps.length >= CAUSAL_GUIDED_FLOW.length && CAUSAL_GUIDED_FLOW.every((kind, index) => steps[index]?.kind === kind));
}

export function hasValidSimulationProfile(scenario: NonNullable<ExplainerMeta["failureScenarios"]>[number]): boolean {
  return Boolean(scenario.simulation && validateFailureSimulationProfile(scenario.simulation).length === 0);
}

function readinessForScenario(meta: ExplainerMeta, scenario: NonNullable<ExplainerMeta["failureScenarios"]>[number]): ScenarioReadinessItem {
  const guidedSteps = scenario.guidedSteps ?? [];
  const hasSimulation = hasValidSimulationProfile(scenario);
  const hasGuidedFlow = hasCausalGuidedFlow(guidedSteps);
  const hasEvidence = guidedSteps.length > 0 && guidedSteps.every((step) => Boolean(step.evidence?.trim()));
  const hasCurrentSources = guidedSteps.length > 0 && guidedSteps.every((step) => (step.sourceIds ?? []).length > 0 && (step.sourceIds ?? []).every((sourceId) => meta.technicalReview.sources.find((source) => source.id === sourceId)?.validity === "current"));
  const checks = [hasSimulation, hasGuidedFlow, hasEvidence, hasCurrentSources];
  const missing = [
    !hasSimulation ? "simulación tipada coherente" : null,
    !hasGuidedFlow ? "flujo causal observe/diagnose/recover/validate" : null,
    !hasEvidence ? "evidencia por fase" : null,
    !hasCurrentSources ? "fuentes vigentes" : null,
  ].filter((value): value is string => Boolean(value));
  return { slug: "", title: "", scenarioId: scenario.id, label: scenario.label, score: Math.round((checks.filter(Boolean).length / checks.length) * 100), missing };
}

export function isScenarioReadyForSupport(meta: ExplainerMeta, scenario: NonNullable<ExplainerMeta["failureScenarios"]>[number]): boolean {
  const guidedSteps = scenario.guidedSteps ?? [];
  return hasValidSimulationProfile(scenario)
    && hasCausalGuidedFlow(guidedSteps)
    && guidedSteps.every((step) => Boolean(step.evidence?.trim()))
    && guidedSteps.every((step) => (step.sourceIds ?? []).length > 0 && (step.sourceIds ?? []).every((sourceId) => meta.technicalReview.sources.find((source) => source.id === sourceId)?.validity === "current"));
}

export function buildScenarioReadinessQueue(entries: ScenarioReadinessInput[]): ScenarioReadinessItem[] {
  return entries.flatMap((entry) => (entry.meta.failureScenarios ?? []).map((scenario) => ({ ...readinessForScenario(entry.meta, scenario), slug: entry.slug, title: entry.title })))
    .filter((item) => item.missing.length > 0)
    .sort((a, b) => a.score - b.score || a.title.localeCompare(b.title) || a.label.localeCompare(b.label));
}

export function buildScenarioReadinessMarkdown(items: ScenarioReadinessItem[], appVersion: string, generatedAt: string): string {
  const safe = (value: string) => value.replace(/[\r\n]+/g, " ").trim();
  return [
    `Versión de la aplicación: ${safe(appVersion)}`,
    `Generado: ${safe(generatedAt)}`,
    "# CORESOLUTIONS · Backlog de madurez de escenarios",
    "",
    "> Backlog editorial generado desde contenido autorado. No aprueba contenido, no ejecuta acciones y no mide salud de producción.",
    "",
    ...items.flatMap((item, index) => [
      `## ${index + 1}. ${safe(item.title)} · ${safe(item.label)}`,
      `- Explainer: ${safe(item.slug)}`,
      `- Escenario: ${safe(item.scenarioId)}`,
      `- Madurez: ${item.score}%`,
      `- Faltantes: ${item.missing.map(safe).join(" · ") || "ninguno"}`,
      `- Enlace: /explainer/${encodeURIComponent(item.slug)}`,
      "",
    ]),
    "## Límites",
    "- Completar un faltante requiere revisión especialista, fuentes vigentes y validación del contenido.",
    "- El estado de este archivo no se sincroniza con GitHub, tickets ni plataformas de cliente.",
  ].join("\n");
}
