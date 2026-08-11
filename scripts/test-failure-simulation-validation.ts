import assert from "node:assert/strict";
import { validateFailureScenarioNodeConsistency, validateFailureSimulationProfile } from "../src/lib/content-validation/failureSimulationValidation";

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
console.log("Failure simulation validation regression checks passed.");
