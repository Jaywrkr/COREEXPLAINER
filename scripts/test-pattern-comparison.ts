import assert from "node:assert/strict";
import { solutionPatterns } from "../src/content/patterns";
import { filterSolutionPatterns, selectComparablePatterns } from "../src/lib/patterns/patternComparison";

assert.equal(filterSolutionPatterns(solutionPatterns, "observabilidad", "all").length, 1);
assert.equal(filterSolutionPatterns(solutionPatterns, "", "Turbonomic").length, 1);
assert.equal(filterSolutionPatterns(solutionPatterns, "", "missing-brand").length, 0);
assert.deepEqual(selectComparablePatterns(solutionPatterns, ["observability-to-action", "missing", "cyber-resilient-recovery"])
  .map((pattern) => pattern.id), ["observability-to-action", "cyber-resilient-recovery"]);
assert.equal(selectComparablePatterns(solutionPatterns, solutionPatterns.map((pattern) => pattern.id)).length, 2);
console.log("Pattern comparison checks passed.");
