import { explainerRegistry, explainerValidationWarnings } from "../src/content/registry";
import { getReviewPriority } from "../src/lib/review/reviewPriority";
import packageJson from "../package.json";

const REPORT_SCHEMA_VERSION = "1.0";

function safe(value: string): string {
  return value.replace(/[\r\n|]+/g, " ").trim();
}

const rows = explainerRegistry.map((entry) => {
  const sources = entry.meta.technicalReview.sources;
  const staleSources = sources.filter((source) => source.validity === "review-needed").length;
  const warnings = explainerValidationWarnings[entry.slug] ?? [];
  const integrity = entry.meta.technicalIntegrity;
  const priority = getReviewPriority({ reviewStatus: entry.meta.reviewStatus, staleSources, warningCount: warnings.length });
  return {
    slug: entry.slug,
    title: entry.meta.title,
    reviewStatus: entry.meta.reviewStatus,
    lastReviewedAt: entry.meta.technicalReview.lastReviewedAt,
    sourceCount: sources.length,
    sources: sources.map((source) => ({
      id: source.id,
      title: source.title,
      url: source.url,
      accessedAt: source.accessedAt,
      publisher: source.publisher ?? null,
      product: source.product ?? null,
      version: source.version ?? null,
      reference: source.reference ?? null,
      validity: source.validity ?? "review-needed",
    })),
    staleSources,
    warnings,
    failureScenarios: entry.meta.failureScenarios?.length ?? 0,
    integrity: integrity ? `${integrity.domain}/${integrity.assurance} (${Object.keys(integrity.scenes).length} escenas)` : "no declarado",
    roadmap: entry.meta.targetArchitecture?.roadmap?.length ?? 0,
    priority,
  };
}).sort((a, b) => b.priority - a.priority || a.slug.localeCompare(b.slug));

const pending = rows.filter((row) => row.reviewStatus === "pending").length;
const stale = rows.reduce((sum, row) => sum + row.staleSources, 0);
const warningCount = rows.reduce((sum, row) => sum + row.warnings.length, 0);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({
    schemaVersion: REPORT_SCHEMA_VERSION,
    appVersion: packageJson.version,
    generatedAt: new Date().toISOString(),
    summary: { explainers: rows.length, pending, staleSources: stale, warnings: warningCount },
    rows,
    priorityRule: { pending: 100, staleSource: 10, warning: 5 },
  }, null, 2));
  process.exit(0);
}

console.log("# CORESOLUTIONS - informe reproducible de revision tecnica");
console.log("");
console.log(`Esquema ${REPORT_SCHEMA_VERSION} - aplicacion ${packageJson.version}`);
console.log("");
console.log("> Informe de priorizacion. No aprueba contenido ni sustituye una revision especialista.");
console.log("");
console.log(`Resumen: ${rows.length} explainers - ${pending} pendientes - ${stale} fuentes review-needed - ${warningCount} advertencias del gate`);
console.log("");
console.log("| Prioridad | Explainer | Estado | Ultima revision | Fuentes | Review-needed | Fallos | Integridad | Roadmap |");
console.log("|---:|---|---|---|---:|---:|---:|---|---:|");
for (const row of rows) {
  console.log(`| ${row.priority} | ${safe(row.title)} (${row.slug}) | ${row.reviewStatus} | ${row.lastReviewedAt} | ${row.sourceCount} | ${row.staleSources} | ${row.failureScenarios} | ${safe(row.integrity)} | ${row.roadmap} |`);
}
console.log("");
console.log("## Fuentes y evidencia");
console.log("");
for (const row of rows) {
  console.log(`### ${safe(row.title)} (${row.slug})`);
  for (const source of row.sources) {
    const product = safe(source.product ?? "producto no declarado");
    const version = safe(source.version ?? "version no declarada");
    console.log(`- [${safe(source.title)}](${source.url}) - ${source.id} - ${source.validity} - consultada ${source.accessedAt} - ${product} - ${version}`);
  }
  console.log("");
}
console.log("");
console.log("## Criterio de prioridad");
console.log("- 100 puntos: `reviewStatus: pending`.");
console.log("- 10 puntos por fuente `review-needed`.");
console.log("- 5 puntos por advertencia del content gate.");
console.log("- El orden solo ayuda a organizar trabajo; no es una aprobacion automatica.");
