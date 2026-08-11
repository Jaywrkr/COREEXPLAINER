import assert from "node:assert/strict";
import {
  assessTechnicalReviewAssignment,
  emptyTechnicalReviewAssignment,
  enforceAssignmentStatus,
  normalizeTechnicalReviewAssignment,
} from "../src/lib/review/reviewAssignment";

const incomplete = normalizeTechnicalReviewAssignment({ status: "ready-for-pr", reviewer: "Ana" });
const incompleteReadiness = assessTechnicalReviewAssignment(incomplete);
assert.equal(incompleteReadiness.ready, false);
assert.equal(enforceAssignmentStatus(incomplete).status, "in-review");
assert.ok(incompleteReadiness.missing.includes("ledger de evidencia contrastado"));

const complete = normalizeTechnicalReviewAssignment({
  reviewer: "Ana",
  targetDate: "2026-08-20",
  notes: "Se contrastó el alcance y los supuestos.",
  closureEvidence: "Informe técnico enlazado en el PR.",
  status: "ready-for-pr",
  checklist: { narrative: true, diagram: true, sources: true, scenarios: true, evidence: true },
});
assert.equal(assessTechnicalReviewAssignment(complete).ready, true);
assert.equal(enforceAssignmentStatus(complete).status, "ready-for-pr");
assert.deepEqual(normalizeTechnicalReviewAssignment(null), emptyTechnicalReviewAssignment);
console.log("Review assignment regression checks passed.");
