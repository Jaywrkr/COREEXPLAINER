import assert from "node:assert/strict";
import { sanitizeCopilotMessage } from "../src/lib/ai/copilotContract";

assert.equal(sanitizeCopilotMessage("  Respuesta\u0000 segura  "), "Respuesta segura");
assert.equal(sanitizeCopilotMessage("\u0000\u0001"), null);
const long = sanitizeCopilotMessage("x".repeat(6_000));
assert.equal(long?.length, 5_000);
assert.equal(sanitizeCopilotMessage({ message: "no" }), null);
console.log("Copilot message contract regression checks passed.");
