import assert from "node:assert/strict";
import { assessTechnicalReviewAssignment, normalizeTechnicalReviewAssignment } from "../src/lib/review/reviewAssignment";
import { buildReviewCampaignSummary } from "../src/lib/review/reviewCampaign";

const ready = normalizeTechnicalReviewAssignment({
  reviewer: "Ana", targetDate: "2026-08-20", notes: "Revisión completa", closureEvidence: "Informe PR-1",
  status: "ready-for-pr", checklist: { narrative: true, diagram: true, sources: true, scenarios: true, evidence: true },
});
assert.equal(assessTechnicalReviewAssignment(ready).ready, true);

const summary = buildReviewCampaignSummary([
  { slug: "a", title: "A", reviewStatus: "pending", assignment: ready },
  { slug: "b", title: "B", reviewStatus: "pending", assignment: normalizeTechnicalReviewAssignment({ status: "blocked", targetDate: "2026-08-01" }) },
  { slug: "c", title: "C", reviewStatus: "reviewed" },
], "2026-08-11");
assert.deepEqual(summary, { total: 3, pending: 2, reviewed: 1, unassigned: 1, inReview: 0, blocked: 1, readyForPr: 1, overdue: 1, completionPercent: 33 });
console.log("Review campaign regression checks passed.");
