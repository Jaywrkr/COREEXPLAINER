import assert from "node:assert/strict";
import {
  canAdvanceWorkflow,
  isWorkflowStatus,
  nextWorkflowStatus,
  workflowStageFor,
} from "../src/lib/review/workflowState";

const complete = { technicalReviewComplete: true, sourcesCurrent: true };
const incomplete = { technicalReviewComplete: false, sourcesCurrent: false };

assert.equal(isWorkflowStatus("review-due"), true);
assert.equal(isWorkflowStatus("unknown"), false);
assert.equal(workflowStageFor("review-due").label, "Revisión vencida");
assert.equal(canAdvanceWorkflow("technical-review", incomplete), false);
assert.equal(nextWorkflowStatus("technical-review", incomplete), null);
assert.equal(nextWorkflowStatus("technical-review", complete), "source-review");
assert.equal(nextWorkflowStatus("source-review", incomplete), null);
assert.equal(nextWorkflowStatus("source-review", complete), "commercial-review");
assert.equal(nextWorkflowStatus("review-due", incomplete), "technical-review");
assert.equal(nextWorkflowStatus("published", complete), null);
assert.equal(nextWorkflowStatus("approved", complete), "published");

console.log("Workflow state tests passed");
