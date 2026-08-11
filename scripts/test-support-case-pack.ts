import assert from "node:assert/strict";
import { assessSupportCaseReadiness, buildSupportCaseJson, buildSupportCaseMarkdown, normalizeSupportCaseDraft } from "../src/lib/support/casePack";
import { buildSupportTriageBrief } from "../src/lib/support/triage";
import { buildEvidenceLedger } from "../src/lib/evidence/ledger";
import type { ExplainerMeta, ExplainerStep } from "../src/content/types";

const meta: ExplainerMeta = {
  chip: "Test",
  title: "Tema",
  tagline: "Prueba",
  brandContext: [{ name: "IBM", role: "plataforma", scope: "conceptual" }],
  storyboardDoc: "docs/test.md",
  technicalValidationDoc: "docs/test.md",
  reviewStatus: "pending",
  technicalReview: { lastReviewedAt: "2026-08-11", scope: "test", sources: [] },
  failureScenarios: [{ id: "s1", sceneId: "scene", label: "Fallo", summary: "No responde", detail: "Pedir registros", limitation: "No diagnostica producción", affectedNodes: ["api"], deadNodeIds: ["api"] }],
};
const steps: ExplainerStep[] = [{ id: "step", tag: "01", title: "Escena", paragraphs: ["Texto"], businessImpact: "Impacto", sceneId: "scene", caption: "", sourceIds: [] }];
const triage = buildSupportTriageBrief({ slug: "tema", meta, steps });
const evidence = buildEvidenceLedger({ meta, steps });
const draft = normalizeSupportCaseDraft({ caseId: "INC 01\n", summary: "Síntoma\n", notes: "no secretos" });
assert.equal(draft.caseId, "INC-01");
assert.equal(draft.escalationDecision, "pending");
assert.equal(draft.summary, "Síntoma");
const captured = normalizeSupportCaseDraft({ evidenceReceived: "Logs sanitizados", checkResult: "Dependencia no confirmada", escalationDecision: "escalate" });
assert.equal(captured.escalationDecision, "escalate");
assert.equal(assessSupportCaseReadiness(captured, triage).ready, false);
assert.ok(assessSupportCaseReadiness(captured, triage).missing.includes("ID interno"));
const complete = normalizeSupportCaseDraft({ caseId: "INC-1", summary: "Síntoma", impact: "Usuarios", owner: "Equipo", selectedTriageId: "scenario:s1", evidenceReceived: "Logs", checkResult: "Sin causa confirmada", escalationDecision: "escalate" });
assert.equal(assessSupportCaseReadiness(complete, triage).ready, true);
const markdown = buildSupportCaseMarkdown({ slug: "tema", title: meta.title, appVersion: "0.150.0", generatedAt: "2026-08-11T00:00:00.000Z", brands: ["IBM"], draft: { ...captured, selectedTriageId: "scenario:s1" }, triage, evidence });
assert.match(markdown, /Handoff de soporte/);
assert.match(markdown, /No diagnostica producción/);
assert.match(markdown, /no ejecuta acciones/i);
assert.match(markdown, /Ledger de evidencia/);
assert.match(markdown, /Logs sanitizados/);
assert.match(markdown, /escalamiento: escalate/);
assert.match(markdown, /PreparaciÃ³n del handoff: 50%/);
const json = buildSupportCaseJson({ slug: "tema", title: meta.title, appVersion: "0.164.0", generatedAt: "2026-08-11T00:00:00.000Z", brands: ["IBM"], draft: { ...captured, selectedTriageId: "scenario:s1" }, triage, evidence });
assert.equal(json.schemaVersion, "1.0");
assert.equal(json.readiness.score, 50);
assert.equal(json.selectedTriage?.id, "scenario:s1");
assert.equal(json.draft.evidenceReceived, "Logs sanitizados");
console.log("Support case pack regression checks passed.");
