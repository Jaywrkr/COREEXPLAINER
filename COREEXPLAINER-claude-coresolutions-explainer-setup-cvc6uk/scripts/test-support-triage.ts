import assert from "node:assert/strict";
import { buildSupportTriageMarkdown, buildSupportTriageBrief } from "../src/lib/support/triage";
import type { ExplainerMeta, ExplainerStep } from "../src/content/types";

const meta: ExplainerMeta = {
  chip: "Test",
  title: "Tema de soporte",
  tagline: "Prueba",
  brandContext: [{ name: "IBM", role: "plataforma", scope: "conceptual" }],
  storyboardDoc: "docs/test.md",
  technicalValidationDoc: "docs/test.md",
  reviewStatus: "pending",
  technicalReview: { lastReviewedAt: "2026-08-11", scope: "test", sources: [] },
  failureScenarios: [{
    id: "network-down",
    sceneId: "normal",
    label: "Red degradada",
    summary: "El servicio deja de responder.",
    detail: "Solicitar métricas y registros del gateway.",
    limitation: "No confirma una causa en producción.",
    affectedNodes: ["gateway", "service"],
    deadNodeIds: ["gateway"],
    simulation: { mode: "degraded", impact: "Respuestas parciales" },
    guidedSteps: [{
      id: "observe",
      kind: "observe",
      title: "Observar",
      instruction: "Comparar el síntoma con las métricas del servicio.",
      evidence: "Tasa de error y latencia.",
      expected: "La señal coincide con el gateway.",
      sourceIds: ["source-1"],
    }],
  }],
};
const steps: ExplainerStep[] = [{ id: "step-1", tag: "01", title: "Flujo", paragraphs: ["Texto"], businessImpact: "Impacto", sceneId: "normal", caption: "", sourceIds: [] }];
const brief = buildSupportTriageBrief({ slug: "test", meta, steps });
assert.equal(brief.items.length, 1);
assert.equal(brief.items[0]?.confidence, "authored");
assert.match(brief.items[0]?.probableLayer ?? "", /degradación/);
assert.match(buildSupportTriageMarkdown(brief, "2026-08-11T00:00:00.000Z", "0.147.0"), /no ejecuta comandos/i);

const fallback = buildSupportTriageBrief({ slug: "fallback", meta: { ...meta, failureScenarios: undefined }, steps });
assert.equal(fallback.items[0]?.confidence, "derived");
console.log("Support triage regression checks passed.");
