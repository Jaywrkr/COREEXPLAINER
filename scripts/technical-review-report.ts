import { explainerRegistry, explainerValidationWarnings } from "../src/content/registry";
import { getReviewPriority } from "../src/lib/review/reviewPriority";
import packageJson from "../package.json";

const REPORT_SCHEMA_VERSION = "1.1";

type ReviewAction = {
  id: string;
  kind: "human-review" | "source-refresh" | "content-gate" | "integrity-check";
  priority: "high" | "medium";
  title: string;
  reason: string;
  evidence: string;
  sourceIds: string[];
};

function safe(value: string): string {
  return value.replace(/[\r\n|]+/g, " ").trim();
}

const rows = explainerRegistry.map((entry) => {
  const sources = entry.meta.technicalReview.sources;
  const staleSourceIds = sources.filter((source) => source.validity === "review-needed").map((source) => source.id);
  const staleSources = staleSourceIds.length;
  const warnings = explainerValidationWarnings[entry.slug] ?? [];
  const integrity = entry.meta.technicalIntegrity;
  const priority = getReviewPriority({ reviewStatus: entry.meta.reviewStatus, staleSources, warningCount: warnings.length });
  const actions: ReviewAction[] = [];
  if (entry.meta.reviewStatus === "pending") {
    actions.push({ id: "human-review", kind: "human-review", priority: "high", title: "Completar revision tecnica especialista", reason: "El contenido aun no declara una revision humana aprobada.", evidence: "Contrastar narrativa, escenas, nodos, aristas, animacion, escenarios y limites contra la documentacion del alcance.", sourceIds: sources.map((source) => source.id) });
  }
  if (staleSourceIds.length) {
    actions.push({ id: "refresh-sources", kind: "source-refresh", priority: "high", title: "Actualizar fuentes marcadas review-needed", reason: `${staleSourceIds.length} fuente(s) estan fuera de la ventana declarada de revision.`, evidence: "Confirmar release, capacidades, limites y URL oficial; despues actualizar accessedAt y validity en el contenido.", sourceIds: staleSourceIds });
  }
  if (warnings.length) {
    actions.push({ id: "resolve-content-gate", kind: "content-gate", priority: "medium", title: "Resolver advertencias del content gate", reason: `${warnings.length} advertencia(s) requieren una decision editorial o tecnica explicita.`, evidence: warnings.join(" "), sourceIds: [] });
  }
  if (integrity && integrity.assurance !== "reviewed") {
    actions.push({ id: "inspect-integrity", kind: "integrity-check", priority: "medium", title: "Revisar integridad tecnica de escenas", reason: `El perfil declara assurance ${integrity.assurance}, no reviewed.`, evidence: "Revisar los diagnosticos de nodos, relaciones y rutas antes de presentar la escena como explicacion confiable.", sourceIds: Object.values(integrity.scenes).flatMap((scene) => [ ...(scene.requiredEdges ?? []).flatMap((rule) => rule.sourceIds ?? []), ...(scene.requiredPaths ?? []).flatMap((rule) => rule.sourceIds ?? []) ]) });
  }
  return {
    slug: entry.slug,
    title: entry.meta.title,
    reviewStatus: entry.meta.reviewStatus,
    lastReviewedAt: entry.meta.technicalReview.lastReviewedAt,
    sourceCount: sources.length,
    sources: sources.map((source) => ({ id: source.id, title: source.title, url: source.url, accessedAt: source.accessedAt, publisher: source.publisher ?? null, product: source.product ?? null, version: source.version ?? null, reference: source.reference ?? null, validity: source.validity ?? "review-needed" })),
    actions,
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
const actionCount = rows.reduce((sum, row) => sum + row.actions.length, 0);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ schemaVersion: REPORT_SCHEMA_VERSION, appVersion: packageJson.version, generatedAt: new Date().toISOString(), summary: { explainers: rows.length, pending, staleSources: stale, warnings: warningCount, actions: actionCount }, rows, priorityRule: { pending: 100, staleSource: 10, warning: 5 } }, null, 2));
  process.exit(0);
}

console.log("# CORESOLUTIONS - informe reproducible de revision tecnica");
console.log("");
console.log(`Esquema ${REPORT_SCHEMA_VERSION} - aplicacion ${packageJson.version}`);
console.log("");
console.log("> Informe de priorizacion. No aprueba contenido ni sustituye una revision especialista.");
console.log("");
console.log(`Resumen: ${rows.length} explainers - ${pending} pendientes - ${stale} fuentes review-needed - ${warningCount} advertencias del gate - ${actionCount} acciones sugeridas`);
console.log("");
console.log("| Prioridad | Explainer | Estado | Ultima revision | Fuentes | Review-needed | Fallos | Integridad | Roadmap |");
console.log("|---:|---|---|---|---:|---:|---:|---|---:|");
for (const row of rows) console.log(`| ${row.priority} | ${safe(row.title)} (${row.slug}) | ${row.reviewStatus} | ${row.lastReviewedAt} | ${row.sourceCount} | ${row.staleSources} | ${row.failureScenarios} | ${safe(row.integrity)} | ${row.roadmap} |`);
console.log("");
console.log("## Fuentes y evidencia");
console.log("");
for (const row of rows) {
  console.log(`### ${safe(row.title)} (${row.slug})`);
  for (const source of row.sources) console.log(`- [${safe(source.title)}](${source.url}) - ${source.id} - ${source.validity} - consultada ${source.accessedAt} - ${safe(source.product ?? "producto no declarado")} - ${safe(source.version ?? "version no declarada")}`);
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
