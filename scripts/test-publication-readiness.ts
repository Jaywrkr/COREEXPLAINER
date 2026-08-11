import assert from "node:assert/strict";
import { assessPublicationReadiness } from "../src/lib/review/publicationReadiness";

const ready = assessPublicationReadiness({ reviewStatus: "reviewed", sourceValidities: ["current"], validationWarningCount: 0, technicalIntegrity: "reviewed", scenariosTotal: 2, scenariosReadyForSupport: 2 });
assert.deepEqual(ready, { client: "ready", support: "ready", reasons: [] });
const pending = assessPublicationReadiness({ reviewStatus: "pending", sourceValidities: ["current"], validationWarningCount: 0, technicalIntegrity: "source-backed", scenariosTotal: 0, scenariosReadyForSupport: 0 });
assert.equal(pending.client, "review-needed");
assert.equal(pending.support, "review-needed");
assert.ok(pending.reasons.some((reason) => reason.includes("revisión humana")));
const blocked = assessPublicationReadiness({ reviewStatus: "reviewed", sourceValidities: ["review-needed"], validationWarningCount: 1, technicalIntegrity: "reviewed", scenariosTotal: 1, scenariosReadyForSupport: 0 });
assert.equal(blocked.client, "review-needed");
assert.equal(blocked.support, "blocked");
console.log("Publication readiness regression checks passed.");
