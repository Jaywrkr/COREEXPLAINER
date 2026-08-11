import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import packageJson from "../package.json";
import { explainerRegistry } from "../src/content/registry";
import { buildImplementationCatalogMarkdown, buildImplementationCatalogReport } from "../src/lib/implementation/catalogReport";

const report = buildImplementationCatalogReport(explainerRegistry, packageJson.version, new Date().toISOString());
if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else if (process.argv.includes("--output-dir")) {
  const outputIndex = process.argv.indexOf("--output-dir");
  const outputDir = process.argv[outputIndex + 1];
  if (!outputDir) throw new Error("--output-dir requires a directory");
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "implementation-readiness-report.json"), JSON.stringify(report, null, 2));
  writeFileSync(join(outputDir, "implementation-readiness-report.md"), buildImplementationCatalogMarkdown(report));
  console.log(`Implementation readiness report written to ${outputDir}`);
} else {
  console.log(buildImplementationCatalogMarkdown(report));
}
