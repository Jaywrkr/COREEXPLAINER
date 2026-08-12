import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import packageJson from "../package.json";

const PACKAGE_SCHEMA_VERSION = "1.0";
const root = process.cwd();
const outputFlag = process.argv.indexOf("--output-dir");
const outputDir = resolve(root, outputFlag >= 0 ? process.argv[outputFlag + 1] ?? "technical-review-package" : "technical-review-package");

if (outputDir === root || outputDir.startsWith(`${resolve(root, ".git")}`)) {
  throw new Error("The report package output must be a dedicated child directory.");
}

mkdirSync(outputDir, { recursive: true });

function runReport(json: boolean): string {
  return execFileSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/technical-review-report.ts", ...(json ? ["--json"] : [])], {
    cwd: root,
    encoding: "utf8",
  });
}

function sha256(contents: string): string {
  return createHash("sha256").update(contents, "utf8").digest("hex");
}

const markdown = runReport(false);
const json = runReport(true);
const markdownPath = resolve(outputDir, "technical-review-report.md");
const jsonPath = resolve(outputDir, "technical-review-report.json");
writeFileSync(markdownPath, markdown, "utf8");
writeFileSync(jsonPath, json, "utf8");

const report = JSON.parse(readFileSync(jsonPath, "utf8")) as { generatedAt: string; appVersion: string; summary: unknown };
const manifest = {
  packageSchemaVersion: PACKAGE_SCHEMA_VERSION,
  appVersion: report.appVersion ?? packageJson.version,
  generatedAt: report.generatedAt,
  files: [
    { path: "technical-review-report.md", sha256: sha256(markdown) },
    { path: "technical-review-report.json", sha256: sha256(json) },
  ],
  summary: report.summary,
};
writeFileSync(resolve(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Technical review package written to ${outputDir}`);
