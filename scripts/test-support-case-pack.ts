import assert from "node:assert/strict";
import { buildSupportCaseMarkdown, normalizeSupportCaseDraft } from "../src/lib/support/casePack";
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
assert.equal(draft.summary, "Síntoma");
const markdown = buildSupportCaseMarkdown({ slug: "tema", title: meta.title, appVersion: "0.150.0", generatedAt: "2026-08-11T00:00:00.000Z", brands: ["IBM"], draft: { ...draft, selectedTriageId: "scenario:s1" }, triage, evidence });
assert.match(markdown, /Handoff de soporte/);
assert.match(markdown, /No diagnostica producción/);
assert.match(markdown, /no ejecuta acciones/i);
assert.match(markdown, /Ledger de evidencia/);
console.log("Support case pack regression checks passed.");
