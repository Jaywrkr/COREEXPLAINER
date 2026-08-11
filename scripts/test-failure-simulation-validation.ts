import assert from "node:assert/strict";
import { validateFailureScenarioKillability, validateFailureScenarioNarrative, validateFailureScenarioNodeConsistency, validateFailureSimulationProfile } from "../src/lib/content-validation/failureSimulationValidation";

assert.deepEqual(validateFailureSimulationProfile({ mode: "capacity", impact: "Margen reducido", remainingCapacityPercent: 65 }), []);
assert.deepEqual(validateFailureSimulationProfile({ mode: "dependency", impact: "Gestión fuera de servicio", externalDependency: "vCenter" }), []);
assert.ok(validateFailureSimulationProfile({ mode: "latency", impact: "Respuesta lenta" }).some((issue) => issue.includes("addedLatencyMs")));
assert.ok(validateFailureSimulationProfile({ mode: "hard-down", impact: "Caída", remainingCapacityPercent: 0 }).some((issue) => issue.includes("hard-down")));
assert.ok(validateFailureSimulationProfile({ mode: "degraded", impact: "Degradado" }).some((issue) => issue.includes("degraded requires")));
const nodeConsistency = validateFailureScenarioNodeConsistency({ id: "failure", sceneId: "main", label: "Fallo", summary: "Resumen", detail: "Detalle", limitation: "Límite", affectedNodes: ["Compute 1"], deadNodeIds: ["compute-1", "compute-1"] }, [{ id: "compute-1", name: "Compute 1" }]);
assert.ok(nodeConsistency.some((issue) => issue.includes("duplicate")));
assert.ok(nodeConsistency.some((issue) => issue.includes("not represented")) === false);
const missingAffected = validateFailureScenarioNodeConsistency({ id: "failure", sceneId: "main", label: "Fallo", summary: "Resumen", detail: "Detalle", limitation: "Límite", affectedNodes: ["network-1"], deadNodeIds: ["compute-1"] }, [{ id: "compute-1", name: "Compute 1" }, { id: "network-1", name: "Network 1" }]);
assert.ok(missingAffected.some((issue) => issue.includes("not represented")));
assert.deepEqual(validateFailureScenarioKillability({ id: "failure", sceneId: "main", label: "Fallo", summary: "Resumen", detail: "Detalle", limitation: "Límite", affectedNodes: ["Compute 1"], deadNodeIds: ["compute-1"] }, [{ id: "compute-1", name: "Compute 1", killable: true }]), []);
assert.ok(validateFailureScenarioKillability({ id: "failure", sceneId: "main", label: "Fallo", summary: "Resumen", detail: "Detalle", limitation: "Límite", affectedNodes: ["Compute 1"], deadNodeIds: ["compute-1"] }, [{ id: "compute-1", name: "Compute 1" }]).some((issue) => issue.includes("not marked killable")));
const orderedScenario = { id: "guided", sceneId: "main", label: "Guiado", summary: "Resumen", detail: "Detalle", limitation: "Límite", affectedNodes: ["Compute 1"], deadNodeIds: ["compute-1"], simulation: { mode: "degraded" as const, impact: "Impacto", remainingCapacityPercent: 50 }, guidedSteps: [
  { id: "observe", kind: "observe" as const, title: "Observar", instruction: "i", evidence: "e", expected: "x" },
  { id: "diagnose", kind: "diagnose" as const, title: "Diagnosticar", instruction: "i", evidence: "e", expected: "x" },
  { id: "recover", kind: "recover" as const, title: "Recuperar", instruction: "i", evidence: "e", expected: "x" },
  { id: "validate", kind: "validate" as const, title: "Validar", instruction: "i", evidence: "e", expected: "x" },
] };
assert.deepEqual(validateFailureScenarioNarrative(orderedScenario), []);
assert.ok(validateFailureScenarioNarrative({ ...orderedScenario, guidedSteps: [...orderedScenario.guidedSteps].reverse() }).some((issue) => issue.includes("must follow observe")));
console.log("Failure simulation validation regression checks passed.");
