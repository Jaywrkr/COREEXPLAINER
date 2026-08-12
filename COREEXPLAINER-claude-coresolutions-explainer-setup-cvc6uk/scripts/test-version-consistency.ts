import assert from "node:assert/strict";
import packageJson from "../package.json";
import { changelogEntries, currentVersion } from "../src/content/changelog";

assert.equal(currentVersion, packageJson.version, "La versión visible debe coincidir con package.json");
assert.equal(changelogEntries[0]?.version, packageJson.version, "La primera entrada del changelog debe ser la versión publicada");
assert.match(currentVersion, /^0\.\d+\.\d+$/);
assert.ok(changelogEntries[0]?.changes.length, "La versión visible debe declarar cambios");
console.log("Version consistency regression checks passed.");
