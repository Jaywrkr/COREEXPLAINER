import assert from "node:assert/strict";
import { emptyAiUsage, normalizeAiUsage } from "../src/lib/ai/usageTelemetry";

const empty = emptyAiUsage();
assert.deepEqual(empty.bySurface.copilot, { requests: 0, failures: 0, totalTokens: 0, estimatedCostUsd: 0 });
const normalized = normalizeAiUsage({ requests: "2", totalTokens: 1200, estimatedCostUsd: 0.12, bySurface: { copilot: { requests: 1, failures: 1, totalTokens: 400, estimatedCostUsd: 0.04 }, creator: { requests: 1, totalTokens: 800, estimatedCostUsd: 0.08 } } });
assert.equal(normalized.requests, 2);
assert.equal(normalized.bySurface.copilot.failures, 1);
assert.equal(normalized.bySurface.creator.totalTokens, 800);
assert.deepEqual(normalizeAiUsage({ bySurface: { copilot: { requests: "invalid" } } }).bySurface.creator, empty.bySurface.creator);
console.log("AI usage telemetry regression checks passed.");
