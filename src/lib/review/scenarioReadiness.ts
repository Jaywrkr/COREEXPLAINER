import type { ExplainerMeta } from "@/content/types";

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

function readinessForScenario(meta: ExplainerMeta, scenario: NonNullable<ExplainerMeta["failureScenarios"]>[number]): ScenarioReadinessItem {
  const guidedSteps = scenario.guidedSteps ?? [];
  const hasSimulation = Boolean(scenario.simulation);
  const hasGuidedFlow = guidedSteps.length >= 4 && new Set(guidedSteps.map((step) => step.kind)).size === 4;
  const hasEvidence = guidedSteps.length > 0 && guidedSteps.every((step) => Boolean(step.evidence?.trim()));
  const hasCurrentSources = guidedSteps.length > 0 && guidedSteps.every((step) => (step.sourceIds ?? []).length > 0 && (step.sourceIds ?? []).every((sourceId) => meta.technicalReview.sources.find((source) => source.id === sourceId)?.validity === "current"));
  const checks = [hasSimulation, hasGuidedFlow, hasEvidence, hasCurrentSources];
  const missing = [
    !hasSimulation ? "simulación tipada" : null,
    !hasGuidedFlow ? "flujo observe/diagnose/recover/validate" : null,
    !hasEvidence ? "evidencia por fase" : null,
    !hasCurrentSources ? "fuentes vigentes" : null,
  ].filter((value): value is string => Boolean(value));
  return { slug: "", title: "", scenarioId: scenario.id, label: scenario.label, score: Math.round((checks.filter(Boolean).length / checks.length) * 100), missing };
}

export function buildScenarioReadinessQueue(entries: ScenarioReadinessInput[]): ScenarioReadinessItem[] {
  return entries.flatMap((entry) => (entry.meta.failureScenarios ?? []).map((scenario) => ({ ...readinessForScenario(entry.meta, scenario), slug: entry.slug, title: entry.title })))
    .filter((item) => item.missing.length > 0)
    .sort((a, b) => a.score - b.score || a.title.localeCompare(b.title) || a.label.localeCompare(b.label));
}
