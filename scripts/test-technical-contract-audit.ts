import assert from "node:assert/strict";
import { explainerRegistry, explainerTechnicalAuthority, explainerTechnicalRules } from "../src/content/registry";

assert.equal(explainerRegistry.length, 22, "the audit must cover every registered explainer");
for (const entry of explainerRegistry) {
  const rules = explainerTechnicalRules[entry.slug] ?? [];
  assert.ok(rules.length > 0, `${entry.slug} needs at least one source-to-scene rule`);
  const blockers = explainerTechnicalAuthority[entry.slug]!.blockers;
  assert.ok(!blockers.some((blocker) => /regla .*incompleta|regla .*fuente inexistente|regla .*paso inexistente|paso .*no cita evidencia/.test(blocker)), `${entry.slug} has a broken technical rule`);
}
console.log("All-topic technical contract audit passed.");
