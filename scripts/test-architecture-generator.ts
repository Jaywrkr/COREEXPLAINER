import assert from "node:assert/strict";
import { solutionPatterns } from "../src/content/patterns";
import { generateArchitectureDraft } from "../src/lib/architecture/generator";

const draft = generateArchitectureDraft({ patternId: "observability-to-action", objective: "", workload: "", confirmations: {} }, solutionPatterns);
assert.equal(draft.status, "needs-input");
assert.ok(draft.checks.every((check) => check.status === "required"));
const ready = generateArchitectureDraft({ patternId: "observability-to-action", objective: "Operar pagos", workload: "Pagos", confirmations: Object.fromEntries(draft.checks.map((check) => [check.id, true])) }, solutionPatterns);
assert.equal(ready.status, "needs-input");
const componentEvidence = Object.fromEntries(ready.pattern.brands.map((brand) => [brand, { product: brand, version: "actual", modelOrSite: "sitio A", source: "fuente oficial" }]));
const validated = generateArchitectureDraft({ patternId: "observability-to-action", objective: "Operar pagos", workload: "Pagos", confirmations: Object.fromEntries(draft.checks.map((check) => [check.id, true])), components: componentEvidence }, solutionPatterns);
assert.equal(validated.status, "conceptual");
assert.ok(ready.nodes.includes("Aprobación de ingeniería"));
console.log("Architecture generator checks passed.");
