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
  if ((entry.meta.failureScenarios ?? []).some((scenario) => !scenario.simulation || !scenario.guidedSteps?.length)) {
    assert.ok(actions.some((action) => action.kind === "scenario-readiness"));
  }
}

assert.ok(actionCount > 0);

const staleMeta = JSON.parse(JSON.stringify(explainerRegistry[0]!.meta)) as typeof explainerRegistry[number]["meta"];
staleMeta.technicalReview.sources[0] = { ...staleMeta.technicalReview.sources[0]!, accessedAt: "2020-01-01", validity: "current" };
const refreshAction = buildReviewActions(staleMeta, []).find((action) => action.kind === "source-refresh");
assert.ok(refreshAction);
assert.match(refreshAction.reason, /fuera de la ventana/);
assert.match(refreshAction.evidence, /Fechas sugeridas:/);
console.log(`Review actions regression checks passed: ${actionCount} actions.`);
