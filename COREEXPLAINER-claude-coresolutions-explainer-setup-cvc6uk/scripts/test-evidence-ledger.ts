import assert from "node:assert/strict";
import { buildEvidenceLedger, isValidClaimPath, resolvesClaimPath, validateEvidenceLedger } from "../src/lib/evidence/ledger";
import { buildSupportTriageBrief } from "../src/lib/support/triage";
import type { ExplainerMeta, ExplainerStep } from "../src/content/types";

const meta: ExplainerMeta = {
  chip: "Test", title: "Ledger", tagline: "Prueba", brandContext: [{ name: "IBM", role: "plataforma", scope: "conceptual" }], storyboardDoc: "docs/test.md", technicalValidationDoc: "docs/test.md", reviewStatus: "pending", technicalReview: { lastReviewedAt: "2026-08-11", scope: "test", sources: [{ id: "src-1", title: "Fuente", url: "https://example.com/source", accessedAt: "2026-08-11", publisher: "Test", product: "Test", version: "1", reference: "ref", validity: "current" }] },
  failureScenarios: [{ id: "s1", sceneId: "scene", label: "Fallo", summary: "No responde", detail: "Detalle", limitation: "Límite", affectedNodes: ["api"], deadNodeIds: ["api"], guidedSteps: [{ id: "observe", kind: "observe", title: "Observar", instruction: "Pedir señal", evidence: "Métrica", expected: "Señal", sourceIds: ["src-1"] }] }],
  targetArchitecture: { label: "Objetivo", summary: "Resumen", expectedChanges: ["Cambio"], limitations: "Límite", roadmap: [{ id: "phase-1", title: "Fase", objective: "Objetivo", evidence: "Evidencia", exitCriteria: "Salida", sourceIds: ["src-1"] }], decisionOptions: [{ id: "a", title: "Opción A", summary: "A", benefits: "Beneficio", tradeoffs: "Tradeoff", evidence: "Evidencia", sourceIds: ["src-1"] }, { id: "b", title: "Opción B", summary: "B", benefits: "Beneficio", tradeoffs: "Tradeoff", evidence: "Evidencia", sourceIds: ["src-1"] }] },
};
const steps: ExplainerStep[] = [{ id: "step-1", tag: "01", title: "Escena", paragraphs: ["Uno", "Dos"], businessImpact: "Impacto", sceneId: "scene", caption: "Caption", sourceIds: ["src-1"] }];
const ledger = buildEvidenceLedger({ meta, steps });
assert.deepEqual(ledger.map((record) => record.kind), ["documentary", "observed", "acceptance", "hypothesis", "hypothesis"]);
assert.equal(validateEvidenceLedger(ledger, new Set(["src-1"])).length, 0);
assert.deepEqual(ledger[0]?.claimPaths, ["steps[0].title", "steps[0].paragraphs[0]", "steps[0].paragraphs[1]", "steps[0].businessImpact", "steps[0].caption"]);
assert.ok(ledger.every((record) => record.claimPaths.length > 0));
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, id: "", sourceIds: ["missing"] }], new Set(["src-1"])).some((error) => error.includes("id must be non-empty")));
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, id: "invalid", sourceIds: ["missing"] }], new Set(["src-1"])).some((error) => error.includes("unknown source")));
assert.equal(isValidClaimPath("steps[0].paragraphs[1]"), true);
assert.equal(isValidClaimPath("failureScenarios.failure.guidedSteps.observe.evidence"), true);
assert.equal(isValidClaimPath("javascript:alert(1)"), false);
assert.equal(resolvesClaimPath("steps[0].paragraphs[1]", { meta, steps }), true);
assert.equal(resolvesClaimPath("steps[4].title", { meta, steps }), false);
assert.equal(resolvesClaimPath("failureScenarios.s1.guidedSteps.observe.evidence", { meta, steps }), true);
assert.equal(resolvesClaimPath("failureScenarios.missing.guidedSteps.observe.evidence", { meta, steps }), false);
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, claimPaths: ["steps[4].title"] }], new Set(["src-1"]), { meta, steps }).some((error) => error.includes("missing authored field")));
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, sourceStatus: {} }], new Set(["src-1"])).some((error) => error.includes("sourceStatus is missing")));
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, sourceStatus: { "src-1": "unknown" as never } }], new Set(["src-1"])).some((error) => error.includes("invalid status")));
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, sourceStatus: { "src-1": "current", extra: "missing" } }], new Set(["src-1"])).some((error) => error.includes("unexpected source")));
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, sourceIds: ["src-1", "src-1"] }], new Set(["src-1"])).some((error) => error.includes("sourceIds must not contain duplicates")));
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, kind: "claim" as never }], new Set(["src-1"])).some((error) => error.includes("kind has an invalid value")));
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, provenance: "external" as never }], new Set(["src-1"])).some((error) => error.includes("provenance has an invalid value")));
assert.ok(validateEvidenceLedger([{ ...ledger[0]!, claimPaths: ["client.secret"] }], new Set(["src-1"])).some((error) => error.includes("invalid authoring path")));
assert.ok(ledger.every((record) => record.requestedEvidence.length > 0));
assert.equal(buildSupportTriageBrief({ slug: "ledger", meta, steps }).items.length, 1);
console.log("Evidence ledger regression checks passed.");
