import assert from "node:assert/strict";
import { isSafeTechnicalSourceUrl } from "../src/lib/content-validation/sourceValidation";

assert.equal(isSafeTechnicalSourceUrl("https://kubernetes.io/docs/"), true);
assert.equal(isSafeTechnicalSourceUrl("https://user:pass@example.com/docs"), false);
assert.equal(isSafeTechnicalSourceUrl("https://"), false);
assert.equal(isSafeTechnicalSourceUrl("http://example.com/docs"), false);
assert.equal(isSafeTechnicalSourceUrl("javascript:alert(1)"), false);
console.log("Technical source URL regression checks passed.");
