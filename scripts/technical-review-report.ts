import { explainerRegistry, explainerValidationWarnings } from "../src/content/registry";

function safe(value: string): string {
  return value.replace(/[\r\n|]+/g, " ").trim();
}

const rows = explainerRegistry.map((entry) => {
  const sources = entry.meta.technicalReview.sources;
  const staleSources = sources.filter((source) => source.validity === "review-needed").length;
  const warnings = explainerValidationWarnings[entry.slug] ?? [];
  const integrity = entry.meta.technicalIntegrity;
  const priority = (entry.meta.reviewStatus === "pending" ? 100 : 0) + (staleSources * 10) + (warnings.length * 5);
  return {
    slug: entry.slug,
    title: entry.meta.title,
    reviewStatus: entry.meta.reviewStatus,
    lastReviewedAt: entry.meta.technicalReview.lastReviewedAt,
    sourceCount: sources.length,
    staleSources,
    warnings,
    failureScenarios: entry.meta.failureScenarios?.length ?? 0,
    integrity: integrity ? `${integrity.domain}/${integrity.assurance} (${Object.keys(integrity.scenes).length} escena(s))` : "no declarado",
    roadmap: entry.meta.targetArchitecture?.roadmap?.length ?? 0,
    priority,
  };
}).sort((a, b) => b.priority - a.priority || a.slug.localeCompare(b.slug));

const pending = rows.filter((row) => row.reviewStatus === "pending").length;
const stale = rows.reduce((sum, row) => sum + row.staleSources, 0);
const warningCount = rows.reduce((sum, row) => sum + row.warnings.length, 0);

console.log("# CORESOLUTIONS · informe reproducible de revisión técnica");
console.log("");
console.log("> Informe de priorización. No aprueba contenido ni sustituye una revisión especialista.");
console.log("");
console.log(`Resumen: ${rows.length} explainers · ${pending} pendientes · ${stale} fuentes review-needed · ${warningCount} advertencias del gate`);
console.log("");
console.log("| Prioridad | Explainer | Estado | Última revisión | Fuentes | Review-needed | Fallos | Integridad | Roadmap |");
console.log("|---:|---|---|---|---:|---:|---:|---|---:|");
for (const row of rows) {
  console.log(`| ${row.priority} | ${safe(row.title)} (${row.slug}) | ${row.reviewStatus} | ${row.lastReviewedAt} | ${row.sourceCount} | ${row.staleSources} | ${row.failureScenarios} | ${safe(row.integrity)} | ${row.roadmap} |`);
}
console.log("");
console.log("## Criterio de prioridad");
console.log("- 100 puntos: `reviewStatus: pending`.");
console.log("- 10 puntos por fuente `review-needed`.");
console.log("- 5 puntos por advertencia del content gate.");
console.log("- El orden solo ayuda a organizar trabajo; no es una aprobación automática.");
