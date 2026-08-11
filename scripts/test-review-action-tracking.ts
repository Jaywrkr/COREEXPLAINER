import assert from "node:assert/strict";
import { canResolveReviewAction, normalizeReviewActionNote, normalizeReviewActionStatus, reviewActionStatusLabels } from "../src/lib/review/reviewActionTracking";

assert.equal(normalizeReviewActionStatus("pending"), "pending");
assert.equal(normalizeReviewActionStatus("in-progress"), "in-progress");
assert.equal(normalizeReviewActionStatus("resolved"), "resolved");
assert.equal(normalizeReviewActionStatus("unexpected"), "pending");
assert.equal(normalizeReviewActionStatus(null), "pending");
assert.deepEqual(Object.keys(reviewActionStatusLabels).sort(), ["in-progress", "pending", "resolved"]);
assert.equal(normalizeReviewActionNote("  evidencia\nconfirmada  "), "evidencia confirmada");
assert.equal(canResolveReviewAction("evidencia confirmada"), true);
assert.equal(canResolveReviewAction("corto"), false);
console.log("Review action tracking regression checks passed.");
