import assert from "node:assert/strict";
import { explainerRegistry, explainerValidationWarnings } from "../src/content/registry";
import { buildReviewActions } from "../src/lib/review/reviewActions";

let actionCount = 0;
for (const entry of explainerRegistry) {
  const warnings = explainerValidationWarnings[entry.slug] ?? [];
  const actions = buildReviewActions(entry.meta, warnings);
  const sourceIds = new Set(entry.meta.technicalReview.sources.map((source) => source.id));
  actionCount += actions.length;
  assert.ok(actions.every((action) => action.id && action.title && action.reason && action.evidence));
  assert.ok(actions.every((action) => action.sourceIds.every((sourceId) => sourceIds.has(sourceId))));
  if (entry.meta.reviewStatus === "pending") assert.ok(actions.some((action) => action.kind === "human-review"));
  if (warnings.length) assert.ok(actions.some((action) => action.kind === "content-gate"));
}

assert.ok(actionCount > 0);
console.log(`Review actions regression checks passed: ${actionCount} actions.`);
