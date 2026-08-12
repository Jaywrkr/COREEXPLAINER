import assert from "node:assert/strict";
import { buildCopilotPolicy } from "../src/lib/ai/copilotPolicy";

assert.deepEqual(buildCopilotPolicy(12.4, 700), { mode: "read-only", actionTypes: ["open-source", "activate-scenario"], estimatedInputTokens: 13, maxOutputTokens: 700 });
assert.deepEqual(buildCopilotPolicy(-2, -4, 0.0012, "environment"), { mode: "read-only", actionTypes: ["open-source", "activate-scenario"], estimatedInputTokens: 0, maxOutputTokens: 0, estimatedCostUsd: 0.0012, costSource: "environment" });
console.log("Copilot policy regression checks passed.");
