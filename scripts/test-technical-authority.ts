import assert from "node:assert/strict";
import { assessTechnicalAuthority } from "../src/lib/content-validation/technicalAuthorityGate";
import type { ExplainerMeta, TechnicalAuthorityProfile } from "../src/content/types";

const profile: TechnicalAuthorityProfile = {
  owner: "IBM",
  equipmentClass: "platform",
  scope: "Test scope",
  requiredEvidence: [{ sourceId: "ibm-source", control: "compatibility" }],
  requiredRuleFamilies: ["compatibility"],
};
const meta = {
  reviewStatus: "reviewed",
  technicalIntegrity: { assurance: "reviewed" },
  technicalReview: { sources: [{ id: "ibm-source", publisher: "IBM", product: "Power", version: "10.0", reference: "doc", validity: "current" }] },
} as unknown as ExplainerMeta;

assert.deepEqual(assessTechnicalAuthority(meta, profile), { status: "ready", blockers: [], verifiedEvidence: 1, requiredEvidence: 1 });
assert.match(assessTechnicalAuthority({ ...meta, reviewStatus: "pending" }, profile).blockers.join(" "), /revisión humana/);
assert.match(assessTechnicalAuthority({ ...meta, technicalReview: { ...meta.technicalReview, sources: [{ ...meta.technicalReview.sources[0]!, publisher: "Veeam" }] } }, profile).blockers.join(" "), /fabricante/);
console.log("Technical authority gate regression checks passed.");
