import assert from "node:assert/strict";
import { normalizeReviewActionStatus, reviewActionStatusLabels } from "../src/lib/review/reviewActionTracking";

assert.equal(normalizeReviewActionStatus("pending"), "pending");
assert.equal(normalizeReviewActionStatus("in-progress"), "in-progress");
assert.equal(normalizeReviewActionStatus("resolved"), "resolved");
assert.equal(normalizeReviewActionStatus("unexpected"), "pending");
assert.equal(normalizeReviewActionStatus(null), "pending");
assert.deepEqual(Object.keys(reviewActionStatusLabels).sort(), ["in-progress", "pending", "resolved"]);
console.log("Review action tracking regression checks passed.");
