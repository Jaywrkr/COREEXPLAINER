import assert from "node:assert/strict";
import { solutionPatterns, type SolutionPattern } from "../src/content/patterns";
import { validateSolutionPatterns } from "../src/lib/content-validation/patternValidation";

const brandNames = new Map(solutionPatterns.flatMap((pattern) => pattern.explainerSlugs.map((slug) => [slug, pattern.brands] as const)));
assert.deepEqual(validateSolutionPatterns(solutionPatterns, new Set(["vcf", "vsphere-ha", "vsan", "instana", "turbonomic", "observability", "webmethods", "nsx", "zero-trust", "ransomware-resilience", "backup-dr", "veeam-protection", "lan-san", "san-storage", "active-active-dc"]), brandNames), []);
const base = solutionPatterns[0]!;
const invalid: SolutionPattern = { ...base, id: base.id, explainerSlugs: ["missing"], evidence: [] };
const issues = validateSolutionPatterns([base, invalid], new Set(["vcf", "vsphere-ha", "vsan"]));
assert.ok(issues.some((issue) => issue.includes("duplicated")));
assert.ok(issues.some((issue) => issue.includes("evidence")));
assert.ok(issues.some((issue) => issue.includes("unknown explainer")));
const brandIssues = validateSolutionPatterns([{ ...base, id: "brand-test", brands: ["Marca inexistente"] }], new Set(base.explainerSlugs), brandNames);
assert.ok(brandIssues.some((issue) => issue.includes("not declared by any linked explainer")));
console.log("Pattern catalog validation regression checks passed.");
