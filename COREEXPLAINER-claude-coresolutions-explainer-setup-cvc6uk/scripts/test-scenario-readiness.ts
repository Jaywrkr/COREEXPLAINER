import assert from "node:assert/strict";
import { buildScenarioReadinessMarkdown, buildScenarioReadinessQueue, hasCausalGuidedFlow, hasValidSimulationProfile } from "../src/lib/review/scenarioReadiness";
import type { ExplainerMeta } from "../src/content/types";

const source = { id: "src", title: "Fuente", url: "https://example.com", accessedAt: "2026-08-11", publisher: "Test", product: "Test", version: "1", reference: "ref", validity: "current" as const };
const meta: ExplainerMeta = {
  chip: "Test", title: "Tema", tagline: "", brandContext: [{ name: "IBM", role: "plataforma", scope: "conceptual" }], storyboardDoc: "docs/test.md", technicalValidationDoc: "docs/test.md", reviewStatus: "pending", technicalReview: { lastReviewedAt: "2026-08-11", scope: "test", sources: [source] },
  failureScenarios: [
    { id: "basic", sceneId: "scene", label: "Básico", summary: "", detail: "", limitation: "", affectedNodes: ["node"], deadNodeIds: ["node"] },
    { id: "ready", sceneId: "scene", label: "Listo", summary: "", detail: "", limitation: "", affectedNodes: ["node"], deadNodeIds: ["node"], simulation: { mode: "degraded", impact: "Impacto", remainingCapacityPercent: 50 }, guidedSteps: [
      { id: "observe", kind: "observe", title: "Observar", instruction: "", evidence: "Evidencia", expected: "", sourceIds: ["src"] },
      { id: "diagnose", kind: "diagnose", title: "Diagnosticar", instruction: "", evidence: "Evidencia", expected: "", sourceIds: ["src"] },
      { id: "recover", kind: "recover", title: "Recuperar", instruction: "", evidence: "Evidencia", expected: "", sourceIds: ["src"] },
      { id: "validate", kind: "validate", title: "Validar", instruction: "", evidence: "Evidencia", expected: "", sourceIds: ["src"] },
    ] },
  ],
};
const queue = buildScenarioReadinessQueue([{ slug: "tema", title: "Tema", meta }]);
assert.equal(queue.length, 1);
assert.equal(queue[0]?.scenarioId, "basic");
assert.equal(queue[0]?.score, 0);
assert.ok(queue[0]?.missing.includes("simulación tipada coherente"));
assert.match(buildScenarioReadinessMarkdown(queue, "0.154.0", "2026-08-11T00:00:00.000Z"), /Backlog de madurez/);
assert.match(buildScenarioReadinessMarkdown(queue, "0.154.0", "2026-08-11T00:00:00.000Z"), /no ejecuta acciones/i);
const reorderedMeta = { ...meta, failureScenarios: [{ ...meta.failureScenarios![1]!, guidedSteps: [...meta.failureScenarios![1]!.guidedSteps!].reverse() }] };
const reordered = buildScenarioReadinessQueue([{ slug: "tema", title: "Tema", meta: reorderedMeta }]);
assert.ok(reordered[0]?.missing.includes("flujo causal observe/diagnose/recover/validate"));
const invalidProfile = { ...meta, failureScenarios: [{ ...meta.failureScenarios![1]!, simulation: { mode: "degraded" as const, impact: "Impacto" } }] };
const invalidQueue = buildScenarioReadinessQueue([{ slug: "tema", title: "Tema", meta: invalidProfile }]);
assert.ok(invalidQueue[0]?.missing.includes("simulación tipada coherente"));
assert.equal(hasCausalGuidedFlow(meta.failureScenarios![1]!.guidedSteps), true);
assert.equal(hasCausalGuidedFlow([...meta.failureScenarios![1]!.guidedSteps!].reverse()), false);
assert.equal(hasValidSimulationProfile(meta.failureScenarios![1]!), true);
assert.equal(hasValidSimulationProfile(invalidProfile.failureScenarios![0]!), false);
console.log("Scenario readiness regression checks passed.");
