import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const outputDir = mkdtempSync(join(tmpdir(), "coresolutions-review-package-"));
try {
  execFileSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/technical-review-package.ts", "--output-dir", outputDir], { encoding: "utf8" });
  const manifest = JSON.parse(readFileSync(join(outputDir, "manifest.json"), "utf8")) as {
    packageSchemaVersion: string;
    appVersion: string;
    generatedAt: string;
    files: Array<{ path: string; sha256: string }>;
    summary: { explainers: number };
  };
  assert.equal(manifest.packageSchemaVersion, "1.0");
  assert.equal(manifest.appVersion, "0.180.0");
  assert.match(manifest.generatedAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.deepEqual(manifest.files.map((file) => file.path), ["technical-review-report.md", "technical-review-report.json"]);
  assert.ok(manifest.files.every((file) => /^[a-f0-9]{64}$/.test(file.sha256)));
  assert.equal(manifest.summary.explainers, 22);
  assert.match(readFileSync(join(outputDir, "technical-review-report.json"), "utf8"), /"schemaVersion": "1\.3"/);
  console.log("Technical review package regression checks passed.");
} finally {
  rmSync(outputDir, { recursive: true, force: true });
}
