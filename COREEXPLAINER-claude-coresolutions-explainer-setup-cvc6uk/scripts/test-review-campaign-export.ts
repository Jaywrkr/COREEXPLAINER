import assert from "node:assert/strict";
import { buildReviewCampaignJson, buildReviewCampaignMarkdown } from "../src/lib/review/reviewCampaign";

const entries = [{ slug: "vcf", title: "VCF", reviewStatus: "pending" as const }];
const markdown = buildReviewCampaignMarkdown(entries, "0.182.0", "2026-08-11T00:00:00.000Z", "2026-08-11");
assert.match(markdown, /Campaña de revisión especialista/);
assert.match(markdown, /No aprueba contenido/);
assert.match(markdown, /Faltantes del gate/);
const json = JSON.parse(buildReviewCampaignJson(entries, "0.182.0", "2026-08-11T00:00:00.000Z", "2026-08-11")) as { schemaVersion: string; summary: { total: number }; entries: unknown[] };
assert.equal(json.schemaVersion, "1.0");
assert.equal(json.summary.total, 1);
assert.equal(json.entries.length, 1);
console.log("Review campaign export regression checks passed.");
