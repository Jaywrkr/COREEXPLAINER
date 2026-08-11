import assert from "node:assert/strict";
import type { TechnicalIntegrityProfile } from "../src/content/types";
import { technicalIntegrityAssuranceIssues } from "../src/lib/content-validation/technicalIntegrityGate";
import { validateFailureScenarioNarrative } from "../src/lib/content-validation/failureSimulationValidation";

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

assert.deepEqual(validateFailureScenarioNarrative({ id: "plain", sceneId: "scene", label: "x", summary: "x", detail: "x", limitation: "x", affectedNodes: ["node"], deadNodeIds: ["node"] }), []);
assert.match(validateFailureScenarioNarrative({ id: "simulated", sceneId: "scene", label: "x", summary: "x", detail: "x", limitation: "x", affectedNodes: ["node"], deadNodeIds: ["node"], simulation: { mode: "hard-down", impact: "impacto" } })[0]!, /requires guidedSteps/);
console.log("Failure narrative gate checks passed.");
