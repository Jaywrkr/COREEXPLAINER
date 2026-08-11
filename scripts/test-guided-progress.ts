import assert from "node:assert/strict";
import type { GuidedScenarioStep } from "../src/content/types";
import { canAdvanceGuidedStep, guidedProgress } from "../src/lib/scenarios/guidedProgress";

const steps: GuidedScenarioStep[] = [
  { id: "observe", kind: "observe", title: "Observar", instruction: "i", evidence: "e", expected: "x" },
  { id: "diagnose", kind: "diagnose", title: "Diagnosticar", instruction: "i", evidence: "e", expected: "x" },
  { id: "recover", kind: "recover", title: "Recuperar", instruction: "i", evidence: "e", expected: "x" },
  { id: "validate", kind: "validate", title: "Validar", instruction: "i", evidence: "e", expected: "x" },
];

assert.equal(canAdvanceGuidedStep(steps, 0, {}), false);
assert.equal(canAdvanceGuidedStep(steps, 0, { observe: "done" }), true);
assert.equal(canAdvanceGuidedStep(steps, 0, { observe: "na" }), true);
assert.equal(canAdvanceGuidedStep(steps, 3, { validate: "done" }), false);
assert.deepEqual(guidedProgress(steps, { observe: "done", diagnose: "na" }), { reviewed: 2, total: 4, percent: 50 });
assert.deepEqual(guidedProgress([], {}), { reviewed: 0, total: 0, percent: 0 });

console.log("Guided progress tests passed");
