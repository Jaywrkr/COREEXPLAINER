import assert from "node:assert/strict";
import { validateFailureSimulationProfile } from "../src/lib/content-validation/failureSimulationValidation";

assert.deepEqual(validateFailureSimulationProfile({ mode: "capacity", impact: "Margen reducido", remainingCapacityPercent: 65 }), []);
assert.deepEqual(validateFailureSimulationProfile({ mode: "dependency", impact: "Gestión fuera de servicio", externalDependency: "vCenter" }), []);
assert.ok(validateFailureSimulationProfile({ mode: "latency", impact: "Respuesta lenta" }).some((issue) => issue.includes("addedLatencyMs")));
assert.ok(validateFailureSimulationProfile({ mode: "hard-down", impact: "Caída", remainingCapacityPercent: 0 }).some((issue) => issue.includes("hard-down")));
assert.ok(validateFailureSimulationProfile({ mode: "degraded", impact: "Degradado" }).some((issue) => issue.includes("degraded requires")));
console.log("Failure simulation validation regression checks passed.");
