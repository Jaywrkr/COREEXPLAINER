import assert from "node:assert/strict";
import { reviewCopilotMessage, sanitizeCopilotMessage } from "../src/lib/ai/copilotContract";

assert.equal(sanitizeCopilotMessage("  Respuesta\u0000 segura  "), "Respuesta segura");
assert.equal(sanitizeCopilotMessage("\u0000\u0001"), null);
const long = sanitizeCopilotMessage("x".repeat(6_000));
assert.equal(long?.length, 5_000);
assert.equal(sanitizeCopilotMessage({ message: "no" }), null);
const cited = reviewCopilotMessage("La señal está documentada [fuente:src-1].\n\nEvidencia a revisar: validar el entorno.", new Set(["src-1"]));
assert.equal(cited.status, "context-backed");
assert.deepEqual(cited.citedSourceIds, ["src-1"]);
const uncited = reviewCopilotMessage("Este cambio garantiza continuidad.", new Set(["src-1"]));
assert.equal(uncited.status, "review-needed");
assert.match(uncited.message, /Evidencia a revisar/i);
assert.ok(uncited.reasons.some((reason) => reason.includes("no incluye")));
const unknown = reviewCopilotMessage("Dato [fuente:not-allowed].", new Set(["src-1"]));
assert.ok(unknown.reasons.some((reason) => reason.includes("cita desconocida")));
console.log("Copilot message contract regression checks passed.");
