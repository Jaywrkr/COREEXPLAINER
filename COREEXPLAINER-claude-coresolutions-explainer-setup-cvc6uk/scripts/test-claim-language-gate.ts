import assert from "node:assert/strict";
import { findAbsoluteClaimLanguage } from "../src/lib/content-validation/claimLanguageGate";

const issue = findAbsoluteClaimLanguage([{ path: "steps[0].paragraphs[0]", text: "Este flujo garantiza continuidad." }]);
assert.equal(issue.length, 1);
assert.equal(issue[0]?.phrase, "garantiza");

assert.equal(
  findAbsoluteClaimLanguage([{ path: "steps[0]", text: "Este flujo garantiza continuidad.", sourceIds: ["vendor-doc"] }]).length,
  0,
);
assert.equal(
  findAbsoluteClaimLanguage([{ path: "steps[0]", text: "La continuidad depende de la configuración y debe probarse." }]).length,
  0,
);
assert.equal(
  findAbsoluteClaimLanguage([{ path: "steps[0]", text: "La demo no garantiza una recuperación automática." }]).length,
  0,
);
assert.equal(findAbsoluteClaimLanguage([{ path: "steps[0]", text: "El cliente revisa métricas y dependencias." }]).length, 0);

console.log("Claim language gate tests passed");
