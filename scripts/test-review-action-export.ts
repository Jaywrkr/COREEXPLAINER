import assert from "node:assert/strict";
import { buildReviewActionMarkdown } from "../src/lib/review/reviewActionExport";

const markdown = buildReviewActionMarkdown({
  slug: "demo",
  title: "Demo tecnico",
  generatedAt: "2026-08-11T00:00:00.000Z",
  actions: [{ id: "source-refresh", kind: "source-refresh", priority: "high", title: "Actualizar fuente", reason: "La referencia requiere revision.", evidence: "Confirmar release oficial.", sourceIds: ["safe", "unsafe"] }],
  sources: [
    { id: "safe", title: "Fuente oficial", url: "https://example.com/docs" },
    { id: "unsafe", title: "No enlazar", url: "javascript:alert(1)" },
  ],
  statuses: { "source-refresh": "resolved" },
});

assert.match(markdown, /Estado local: Resuelta/);
assert.match(markdown, /https:\/\/example\.com\/docs/);
assert.match(markdown, /Fuente: unsafe/);
assert.doesNotMatch(markdown, /javascript:/);
assert.match(markdown, /No ejecuta cambios/);
console.log("Review action export regression checks passed.");
