import assert from "node:assert/strict";
import type { TechnicalIntegrityProfile } from "../src/content/types";
import { technicalIntegrityAssuranceIssues } from "../src/lib/content-validation/technicalIntegrityGate";
import { validateFailureScenarioNarrative, validateFailureScenarioSourceFreshness } from "../src/lib/content-validation/failureSimulationValidation";
import { reviewedStepSourceIssues } from "../src/lib/content-validation/reviewSourceGate";

const base: TechnicalIntegrityProfile = {
  domain: "generic",
  assurance: "baseline",
  scenes: { scene: { requiredNodes: ["node"] } },
};
assert.deepEqual(technicalIntegrityAssuranceIssues(base), []);
assert.match(technicalIntegrityAssuranceIssues({ ...base, assurance: "source-backed" })[0]!, /requires at least one sourceIds/);
assert.match(technicalIntegrityAssuranceIssues({ ...base, assurance: "reviewed" })[0]!, /requires at least one sourceIds/);

const reviewed: TechnicalIntegrityProfile = {
  ...base,
  assurance: "reviewed",
  scenes: {
    first: { requiredEdges: [{ id: "edge", from: "a", to: "b", kind: "data", label: "camino", rationale: "contrato", sourceIds: ["source"] }] },
    second: { requiredNodes: ["node"] },
  },
};
assert.deepEqual(technicalIntegrityAssuranceIssues(reviewed), []);
assert.match(technicalIntegrityAssuranceIssues({ ...reviewed, scenes: { ...reviewed.scenes, second: { requiredEdges: [{ id: "missing-source", from: "a", to: "b", kind: "data", label: "camino", rationale: "contrato" }] } } }).join(" "), /every evidence-bearing scene/);
console.log("Technical integrity assurance gate checks passed.");

assert.match(technicalIntegrityAssuranceIssues(reviewed, new Map([["source", "review-needed"]])).join(" "), /requires current sources/);
assert.deepEqual(validateFailureScenarioNarrative({ id: "plain", sceneId: "scene", label: "x", summary: "x", detail: "x", limitation: "x", affectedNodes: ["node"], deadNodeIds: ["node"] }), []);
assert.match(validateFailureScenarioNarrative({ id: "simulated", sceneId: "scene", label: "x", summary: "x", detail: "x", limitation: "x", affectedNodes: ["node"], deadNodeIds: ["node"], simulation: { mode: "hard-down", impact: "impacto" } })[0]!, /requires guidedSteps/);
const simulatedScenario = { id: "simulated", sceneId: "scene", label: "x", summary: "x", detail: "x", limitation: "x", affectedNodes: ["node"], deadNodeIds: ["node"], simulation: { mode: "hard-down" as const, impact: "impacto" }, guidedSteps: [{ id: "observe", kind: "observe" as const, title: "x", instruction: "x", evidence: "x", expected: "x", sourceIds: ["stale"] }] };
assert.match(validateFailureScenarioSourceFreshness(simulatedScenario, new Map([["stale", "review-needed"]])).join(" "), /require current sources/);
console.log("Failure narrative gate checks passed.");

const step = { id: "step", tag: "01", title: "Paso", paragraphs: ["A", "B"], businessImpact: "Impacto", sceneId: "scene", caption: "Caption", sourceIds: ["stale"] };
assert.deepEqual(reviewedStepSourceIssues([step], "pending", new Map([["stale", "review-needed"]])), []);
assert.match(reviewedStepSourceIssues([step], "reviewed", new Map([["stale", "review-needed"]]))[0]!, /must be current/);
console.log("Reviewed step source gate checks passed.");
