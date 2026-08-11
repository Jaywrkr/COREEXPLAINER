import assert from "node:assert/strict";
import { GET as health } from "../app/api/health/route";
import { estimateAiCost } from "@/lib/ai/costEstimate";
import { persistentQuotaRequired, reservePersistentQuota } from "@/lib/ai/persistentQuota";

const names = [
  "AI_INPUT_COST_PER_MILLION_USD",
  "AI_OUTPUT_COST_PER_MILLION_USD",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "AI_ENDPOINT_ENABLED",
  "OPENAI_API_KEY",
  "AI_IDENTITY_SIGNING_SECRET",
  "AI_PERSISTENT_QUOTA_REQUIRED",
] as const;
const original = Object.fromEntries(names.map((name) => [name, process.env[name]]));

async function main() {
try {
  for (const name of names) delete process.env[name];

  assert.equal(estimateAiCost(1_000, 500), undefined, "no se debe inventar un precio sin tarifas");
  process.env.AI_INPUT_COST_PER_MILLION_USD = "2";
  process.env.AI_OUTPUT_COST_PER_MILLION_USD = "4";
  assert.deepEqual(estimateAiCost(1_000, 500), {
    costUsd: 0.004,
    inputRatePerMillion: 2,
    outputRatePerMillion: 4,
    source: "environment",
  });

  delete process.env.AI_INPUT_COST_PER_MILLION_USD;
  delete process.env.AI_OUTPUT_COST_PER_MILLION_USD;
  assert.equal(persistentQuotaRequired(), false);
  process.env.AI_PERSISTENT_QUOTA_REQUIRED = "true";
  assert.equal(persistentQuotaRequired(), true);
  delete process.env.AI_PERSISTENT_QUOTA_REQUIRED;
  assert.equal(await reservePersistentQuota("test", 100, 12_000), undefined, "sin Redis debe usar el fallback local");

  const response = await health();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = (await response.json()) as { status: string; version: string; ai: { providerConfigured: boolean; quotaMode: string } };
  assert.equal(body.status, "ok");
  assert.match(body.version, /^0\.\d+\.\d+$/);
  assert.equal(body.ai.providerConfigured, false);
  assert.equal(body.ai.quotaMode, "process-local");

  console.log("AI guard regression checks passed.");
} finally {
  for (const name of names) {
    if (original[name] === undefined) delete process.env[name];
    else process.env[name] = original[name];
  }
}
}

void main();
