import assert from "node:assert/strict";
import type { TechnicalIntegrityProfile } from "../src/content/types";
import { technicalIntegrityAssuranceIssues } from "../src/lib/content-validation/technicalIntegrityGate";

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
