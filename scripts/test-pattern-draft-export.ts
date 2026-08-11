import assert from "node:assert/strict";
import { solutionPatterns } from "../src/content/patterns";
import { buildPatternDraftMarkdown } from "../src/lib/patterns/patternDraftExport";

const markdown = buildPatternDraftMarkdown(solutionPatterns[0]!, "0.207.0", "2026-08-11T00:00:00Z");
assert.match(markdown, /Borrador de patrón/);
assert.match(markdown, /Evidencia mínima a solicitar/);
assert.match(markdown, /Confirmar versiones/);
assert.doesNotMatch(markdown, /\r|\n\s*\n\s*\n/);
console.log("Pattern draft export regression checks passed.");
