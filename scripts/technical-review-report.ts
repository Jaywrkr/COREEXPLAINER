import { explainerRegistry, explainerValidationWarnings } from "../src/content/registry";
import { getReviewPriority } from "../src/lib/review/reviewPriority";
import { buildReviewActions } from "../src/lib/review/reviewActions";
import { calculateTechnicalCoverage } from "../src/lib/review/coverageMetrics";
import { buildImplementationWorkPackage } from "../src/lib/implementation/workPackage";
import { summarizeSourceFreshness } from "../src/content/technical-source-catalog";
import packageJson from "../package.json";

const REPORT_SCHEMA_VERSION = "1.4";

function safe(value: string): string {
  return value.replace(/[\r\n|]+/g, " ").trim();
}

const rows = explainerRegistry.map((entry) => {
  const sources = entry.meta.technicalReview.sources;
  const sourceFreshness = sources.map((source) => ({ source, freshness: summarizeSourceFreshness(source) }));
  const staleSourceIds = sourceFreshness.filter(({ freshness }) => freshness.status === "review-needed").map(({ source }) => source.id);
  const staleSources = staleSourceIds.length;
  const warnings = explainerValidationWarnings[entry.slug] ?? [];
  const integrity = entry.meta.technicalIntegrity;
  const priority = getReviewPriority({ reviewStatus: entry.meta.reviewStatus, staleSources, warningCount: warnings.length });
  const actions = buildReviewActions(entry.meta, warnings);
  const workPackage = buildImplementationWorkPackage({ slug: entry.slug, meta: entry.meta, steps: entry.steps, appVersion: packageJson.version, generatedAt: "report" });
  return {
    slug: entry.slug,
    title: entry.meta.title,
    reviewStatus: entry.meta.reviewStatus,
    lastReviewedAt: entry.meta.technicalReview.lastReviewedAt,
    sourceCount: sources.length,
    sources: sourceFreshness.map(({ source, freshness }) => ({ id: source.id, title: source.title, url: source.url, accessedAt: source.accessedAt, publisher: source.publisher ?? null, product: source.product ?? null, version: source.version ?? null, reference: source.reference ?? null, validity: source.validity ?? "review-needed", freshness })),
    actions,
    staleSources,
    warnings,
    failureScenarios: entry.meta.failureScenarios?.length ?? 0,
    scenarioProfiles: (entry.meta.failureScenarios ?? []).map((scenario) => ({
      id: scenario.id,
      hasSimulation: Boolean(scenario.simulation),
      hasGuidedFlow: (scenario.guidedSteps?.length ?? 0) >= 4,
      hasEvidence: Boolean(scenario.guidedSteps?.length) && scenario.guidedSteps!.every((step) => Boolean(step.evidence?.trim())),
      hasCurrentSources: Boolean(scenario.guidedSteps?.length) && scenario.guidedSteps!.every((step) => (step.sourceIds ?? []).length > 0 && (step.sourceIds ?? []).every((sourceId) => sources.find((source) => source.id === sourceId)?.validity === "current")),
    })),
    integrityAssurance: integrity?.assurance,
    integrity: integrity ? `${integrity.domain}/${integrity.assurance} (${Object.keys(integrity.scenes).length} escenas)` : "no declarado",
    roadmap: entry.meta.targetArchitecture?.roadmap?.length ?? 0,
    impactCount: workPackage.changeImpacts.length,
    highRiskImpactCount: workPackage.changeImpacts.filter((impact) => impact.risk === "high").length,
    impactsWithScenarios: workPackage.changeImpacts.filter((impact) => impact.scenarioIds.length > 0).length,
    priority,
  };
}).sort((a, b) => b.priority - a.priority || a.slug.localeCompare(b.slug));

const pending = rows.filter((row) => row.reviewStatus === "pending").length;
const stale = rows.reduce((sum, row) => sum + row.staleSources, 0);
const warningCount = rows.reduce((sum, row) => sum + row.warnings.length, 0);
const actionCount = rows.reduce((sum, row) => sum + row.actions.length, 0);
const freshnessSummary = rows.flatMap((row) => row.sources).reduce((summary, source) => {
  summary[source.freshness.status === "current" ? "current" : "reviewNeeded"] += 1;
  if (source.freshness.reason === "invalid-date") summary.invalidDates += 1;
  return summary;
}, { current: 0, reviewNeeded: 0, invalidDates: 0 });
const coverage = calculateTechnicalCoverage(rows.map((row) => ({ reviewStatus: row.reviewStatus, sourceValidities: row.sources.map((source) => source.validity), failureScenarioCount: row.failureScenarios, scenarioProfiles: row.scenarioProfiles, integrityAssurance: row.integrityAssurance, roadmapCount: row.roadmap, warningCount: row.warnings.length, actionCount: row.actions.length, impactCount: row.impactCount, highRiskImpactCount: row.highRiskImpactCount, impactsWithScenarios: row.impactsWithScenarios })));

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ schemaVersion: REPORT_SCHEMA_VERSION, appVersion: packageJson.version, generatedAt: new Date().toISOString(), summary: { explainers: rows.length, pending, staleSources: stale, warnings: warningCount, actions: actionCount, freshness: freshnessSummary, coverage }, rows, priorityRule: { pending: 100, staleSource: 10, warning: 5 } }, null, 2));
  process.exit(0);
}

console.log("# CORESOLUTIONS - informe reproducible de revision tecnica");
console.log("");
console.log(`Esquema ${REPORT_SCHEMA_VERSION} - aplicacion ${packageJson.version}`);
console.log("");
console.log("> Informe de priorizacion. No aprueba contenido ni sustituye una revision especialista.");
console.log("");
console.log(`Resumen: ${rows.length} explainers - ${pending} pendientes - ${stale} fuentes review-needed - ${warningCount} advertencias del gate - ${actionCount} acciones sugeridas`);
console.log(`Frescura: ${freshnessSummary.current} vigentes - ${freshnessSummary.reviewNeeded} para revisar - ${freshnessSummary.invalidDates} con fecha inválida`);
console.log(`Cobertura: ${coverage.reviewed}/${coverage.explainers} revisados - ${coverage.currentSources}/${coverage.sources} fuentes vigentes - ${coverage.explainersWithScenarios}/${coverage.explainers} con escenarios - ${coverage.scenariosReadyForSupport}/${coverage.failureScenarios} escenarios listos para soporte - ${coverage.roadmapPhases} fases de roadmap`);
console.log(`Impactos de cambio: ${coverage.impactCount} totales - ${coverage.highRiskImpactCount} alto riesgo - ${coverage.impactsWithScenarios} con escenarios enlazados`);
console.log("");
console.log("| Prioridad | Explainer | Estado | Ultima revision | Fuentes | Review-needed | Fallos | Integridad | Roadmap |");
console.log("|---:|---|---|---|---:|---:|---:|---|---:|");
for (const row of rows) console.log(`| ${row.priority} | ${safe(row.title)} (${row.slug}) | ${row.reviewStatus} | ${row.lastReviewedAt} | ${row.sourceCount} | ${row.staleSources} | ${row.failureScenarios} | ${safe(row.integrity)} | ${row.roadmap} |`);
console.log("");
console.log("## Fuentes y evidencia");
console.log("");
for (const row of rows) {
  console.log(`### ${safe(row.title)} (${row.slug})`);
  for (const source of row.sources) console.log(`- [${safe(source.title)}](${source.url}) - ${source.id} - ${source.validity} - ${source.freshness.reason} - consultada ${source.accessedAt} - revisar antes de ${source.freshness.dueAt ?? "fecha no disponible"} - ${safe(source.product ?? "producto no declarado")} - ${safe(source.version ?? "version no declarada")}`);
  console.log("");
}
console.log("## Backlog tecnico sugerido");
console.log("");
for (const row of rows) {
  if (!row.actions.length) continue;
  console.log(`### ${safe(row.title)} (${row.slug})`);
  for (const action of row.actions) console.log(`- **${action.priority}** ${action.kind} - ${safe(action.title)} - ${safe(action.reason)} Evidencia: ${safe(action.evidence)} Fuentes: ${action.sourceIds.join(", ") || "no aplica"}`);
  console.log("");
}
console.log("## Criterio de prioridad");
console.log("- 100 puntos: reviewStatus pending.");
console.log("- 10 puntos por fuente review-needed.");
console.log("- 5 puntos por advertencia del content gate.");
console.log("- El orden solo ayuda a organizar trabajo; no es una aprobacion automatica.");
