import assert from "node:assert/strict";
import { buildProductMetrics, emptyProductMetrics, normalizeProductEvents } from "../src/lib/telemetry/productTelemetry";

const events = normalizeProductEvents([
  { name: "explainer-view", slug: "vcf", at: "2026-08-11T00:00:00Z" },
  { name: "scene-view", slug: "vcf", id: "scene-1", at: "2026-08-11T00:00:01Z" },
  { name: "presentation-start", slug: "vcf", at: "2026-08-11T00:00:02Z" },
  { name: "presentation-exit", slug: "vcf", at: "2026-08-11T00:00:03Z" },
  { name: "scenario-open", slug: "vcf", id: "failure-1", at: "2026-08-11T00:00:04Z" },
  { name: "scenario-step-reviewed", slug: "vcf", id: "failure-1:observe:done", at: "2026-08-11T00:00:04Z" },
  { name: "copilot-action", slug: "vcf", id: "open-source:source-1", at: "2026-08-11T00:00:04Z" },
  { name: "unknown", slug: "bad", at: "2026-08-11T00:00:05Z" },
  { name: "scene-view", slug: "bad", at: "not-a-date" },
]);
const metrics = buildProductMetrics(events);
assert.equal(metrics.totalEvents, 7);
assert.equal(metrics.uniqueExplainers, 1);
assert.equal(metrics.sceneViews, 1);
assert.equal(metrics.presentationsStarted, 1);
assert.equal(metrics.presentationsExited, 1);
assert.equal(metrics.scenarios["failure-1"], 1);
assert.equal(metrics.copilotActions, 1);
assert.equal(metrics.scenarioStepsReviewed, 1);
assert.equal(events.every((event) => event.at.endsWith("Z")), true);
assert.deepEqual(emptyProductMetrics().explainers, {});
console.log("Product telemetry regression checks passed.");
