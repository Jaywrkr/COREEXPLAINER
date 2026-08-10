import assert from "node:assert/strict";
import { getReviewPriority } from "@/lib/review/reviewPriority";

assert.equal(getReviewPriority({ reviewStatus: "pending", staleSources: 0, warningCount: 0 }), 100);
assert.equal(getReviewPriority({ reviewStatus: "pending", staleSources: 2, warningCount: 3 }), 135);
assert.equal(getReviewPriority({ reviewStatus: "reviewed", staleSources: 1, warningCount: 2 }), 20);
assert.equal(getReviewPriority({ reviewStatus: "reviewed", staleSources: 0, warningCount: 0 }), 0);

console.log("Review priority regression checks passed.");
