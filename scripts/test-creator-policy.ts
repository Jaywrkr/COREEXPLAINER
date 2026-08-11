import assert from "node:assert/strict";
import { buildCreatorPolicy } from "../src/lib/ai/creatorPolicy";

assert.deepEqual(buildCreatorPolicy(12.4, 1400), { mode: "draft-only", estimatedInputTokens: 13, maxOutputTokens: 1400 });
assert.deepEqual(buildCreatorPolicy(-1, -3, 0.02, "environment"), { mode: "draft-only", estimatedInputTokens: 0, maxOutputTokens: 0, estimatedCostUsd: 0.02, costSource: "environment" });
console.log("Creator policy regression checks passed.");
