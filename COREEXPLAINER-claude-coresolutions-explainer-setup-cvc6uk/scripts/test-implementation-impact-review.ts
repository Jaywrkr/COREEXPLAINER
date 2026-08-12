import assert from "node:assert/strict";
import { vcfMeta, vcfSteps } from "../src/content/vcf";
import { buildImplementationWorkPackage } from "../src/lib/implementation/workPackage";
import { assessImpactReview, buildImpactReviewJson, buildImpactReviewMarkdown, normalizeImpactReviewState } from "../src/lib/implementation/impactReview";

const pkg = buildImplementationWorkPackage({ slug: "vcf", meta: vcfMeta, steps: vcfSteps, appVersion: "0.170.0", generatedAt: "2026-08-11T00:00:00.000Z" });
const first = pkg.changeImpacts[0]!;
const initial = normalizeImpactReviewState(null, pkg.changeImpacts);
assert.equal(assessImpactReview(pkg.changeImpacts, initial).pending, pkg.changeImpacts.length);

const reviewed = { ...initial, [first.id]: { status: "reviewed" as const, note: "Dependencias revisadas con el responsable.", updatedAt: "2026-08-11T00:00:00.000Z" } };
const summary = assessImpactReview(pkg.changeImpacts, reviewed);
assert.equal(summary.reviewed, 1);
assert.equal(summary.ready, false);

const exported = buildImpactReviewJson(pkg, reviewed);
assert.equal(exported.reviewSummary.reviewed, 1);
assert.equal(exported.review[first.id]!.status, "reviewed");
assert.match(buildImpactReviewMarkdown(pkg, reviewed), /Estado de revisi.n de impactos/);

console.log("Implementation impact review regression checks passed.");
