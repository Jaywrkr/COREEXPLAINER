import assert from "node:assert/strict";
import { buildEvidenceLedger, validateEvidenceLedger } from "../src/lib/evidence/ledger";
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
assert.ok(ledger.every((record) => record.requestedEvidence.length > 0));
assert.equal(buildSupportTriageBrief({ slug: "ledger", meta, steps }).items.length, 1);
console.log("Evidence ledger regression checks passed.");
