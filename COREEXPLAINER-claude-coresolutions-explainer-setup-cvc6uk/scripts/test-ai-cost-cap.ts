import assert from "node:assert/strict";
import { configuredAiCostCap, estimateAiCost, exceedsAiCostCap } from "../src/lib/ai/costEstimate";

const names = ["AI_INPUT_COST_PER_MILLION_USD", "AI_OUTPUT_COST_PER_MILLION_USD", "AI_MAX_ESTIMATED_COST_USD"] as const;
const original = Object.fromEntries(names.map((name) => [name, process.env[name]]));
try {
  process.env.AI_INPUT_COST_PER_MILLION_USD = "2";
  process.env.AI_OUTPUT_COST_PER_MILLION_USD = "4";
  process.env.AI_MAX_ESTIMATED_COST_USD = "0.003";
  const estimate = estimateAiCost(1_000, 500);
  assert.equal(configuredAiCostCap(), 0.003);
  assert.equal(exceedsAiCostCap(estimate), true);
  // Both AI surfaces must use the same pre-provider cap decision.
  assert.equal(exceedsAiCostCap(estimate, configuredAiCostCap()), true);
  assert.equal(exceedsAiCostCap(estimate, 0.01), false);
  delete process.env.AI_MAX_ESTIMATED_COST_USD;
  assert.equal(exceedsAiCostCap(estimate), false);
  console.log("AI cost cap regression checks passed.");
} finally {
  for (const name of names) {
    if (original[name] === undefined) delete process.env[name];
    else process.env[name] = original[name];
  }
}
