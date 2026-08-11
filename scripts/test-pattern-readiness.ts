import assert from "node:assert/strict";
import { solutionPatterns } from "../src/content/patterns";
import { assessPatternReadiness } from "../src/lib/patterns/patternReadiness";

const pattern = solutionPatterns[0]!;
const ready = assessPatternReadiness(pattern, pattern.explainerSlugs.map((slug) => ({ slug, exists: true, reviewStatus: "reviewed", allSourcesCurrent: true, warningCount: 0, scenarioCoverage: "ready", technicalIntegrity: "reviewed" })));
assert.equal(ready.status, "ready");
const pending = assessPatternReadiness(pattern, pattern.explainerSlugs.map((slug) => ({ slug, exists: true, reviewStatus: "pending", allSourcesCurrent: true, warningCount: 0 })));
assert.equal(pending.status, "review-needed");
const incompleteTechnical = assessPatternReadiness(pattern, pattern.explainerSlugs.map((slug) => ({ slug, exists: true, reviewStatus: "reviewed", allSourcesCurrent: true, warningCount: 0, scenarioCoverage: "partial", technicalIntegrity: "baseline" })));
assert.equal(incompleteTechnical.status, "review-needed");
assert.ok(incompleteTechnical.reasons.some((reason) => reason.includes("escenario")));
const blocked = assessPatternReadiness({ ...pattern, evidence: [] }, [{ slug: "missing", exists: false }]);
assert.equal(blocked.status, "blocked");
assert.ok(blocked.reasons.some((reason) => reason.includes("no encontrado")));
console.log("Pattern readiness regression checks passed.");
