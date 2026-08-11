import assert from "node:assert/strict";
import { deriveSourceValidity, SOURCE_FRESHNESS_DAYS, enrichTechnicalReview, summarizeSourceFreshness } from "../src/content/technical-source-catalog";
import type { TechnicalSource } from "../src/content/types";

const source = (accessedAt: string, validity?: TechnicalSource["validity"]): TechnicalSource => ({ id: "source", title: "Fuente", url: "https://example.com/source", accessedAt, validity });
assert.equal(SOURCE_FRESHNESS_DAYS, 180);
assert.equal(deriveSourceValidity(source("2026-08-01"), new Date("2026-08-11T00:00:00Z")), "current");
assert.equal(deriveSourceValidity(source("2025-01-01", "current"), new Date("2026-08-11T00:00:00Z")), "review-needed");
assert.equal(deriveSourceValidity(source("2026-08-01", "review-needed"), new Date("2026-08-11T00:00:00Z")), "review-needed");
const enriched = enrichTechnicalReview({ lastReviewedAt: "2026-08-11", scope: "test", sources: [source("2025-01-01", "current")] });
assert.equal(enriched.sources[0]!.validity, "review-needed");
assert.deepEqual(summarizeSourceFreshness(source("2026-08-01"), new Date("2026-08-11T00:00:00Z")), { ageDays: 10, dueAt: "2027-01-28", status: "current", reason: "within-window" });
assert.equal(summarizeSourceFreshness(source("2025-01-01", "review-needed"), new Date("2026-08-11T00:00:00Z")).reason, "manual-review");
assert.equal(summarizeSourceFreshness(source("not-a-date"), new Date("2026-08-11T00:00:00Z")).reason, "invalid-date");
console.log("Source freshness regression checks passed.");
