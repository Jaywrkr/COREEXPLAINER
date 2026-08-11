import assert from "node:assert/strict";
import { sanitizeCopilotActions } from "../src/lib/ai/copilotContract";

const actions = sanitizeCopilotActions([
  { type: "open-source", id: "source-1", label: "Abrir fuente" },
  { type: "open-source", id: "unknown", label: "No mostrar" },
  { type: "activate-scenario", id: "scenario-1", label: "Activar escenario\nlocal" },
  { type: "activate-scenario", id: "scenario-2", label: "Otro" },
  { type: "open-source", id: "source-1", label: "Cuarto" },
], { sourceIds: new Set(["source-1"]), scenarioIds: new Set(["scenario-1"]) });

assert.deepEqual(actions, [
  { type: "open-source", id: "source-1", label: "Abrir fuente" },
  { type: "activate-scenario", id: "scenario-1", label: "Activar escenario local" },
]);
assert.deepEqual(sanitizeCopilotActions([{ type: "open-source", id: "source-1", label: "   " }], { sourceIds: new Set(["source-1"]), scenarioIds: new Set() }), []);
assert.equal(sanitizeCopilotActions(Array.from({ length: 5 }, (_, index) => ({ type: "open-source", id: `source-${index}`, label: String(index) })), { sourceIds: new Set(["source-0", "source-1", "source-2", "source-3", "source-4"]), scenarioIds: new Set() }).length, 3);
console.log("Copilot action contract regression checks passed.");
