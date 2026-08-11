import type { ExplainerDefinition } from "@/content/registry";
import { buildImplementationWorkPackage, type ImplementationWorkPackage } from "./workPackage";

export interface ImplementationCatalogRow {
  slug: string;
  title: string;
  brands: string[];
  readiness: ImplementationWorkPackage["readiness"];
  workstreams: number;
  impacts: number;
  highRiskImpacts: number;
  impactsWithScenarios: number;
}

export interface ImplementationCatalogReport {
  schemaVersion: "1.0";
  appVersion: string;
  generatedAt: string;
  summary: { explainers: number; ready: number; notReady: number; workstreams: number; impacts: number; highRiskImpacts: number; impactsWithScenarios: number };
  rows: ImplementationCatalogRow[];
  limitations: string[];
}

export function buildImplementationCatalogReport(entries: ExplainerDefinition[], appVersion: string, generatedAt: string): ImplementationCatalogReport {
  const rows = entries.map((entry) => {
    const pkg = buildImplementationWorkPackage({ slug: entry.slug, meta: entry.meta, steps: entry.steps, appVersion, generatedAt });
    return {
      slug: entry.slug,
      title: entry.meta.title,
      brands: pkg.brands,
      readiness: pkg.readiness,
      workstreams: pkg.workstreams.length,
      impacts: pkg.changeImpacts.length,
      highRiskImpacts: pkg.changeImpacts.filter((impact) => impact.risk === "high").length,
      impactsWithScenarios: pkg.changeImpacts.filter((impact) => impact.scenarioIds.length > 0).length,
    };
  }).sort((a, b) => b.highRiskImpacts - a.highRiskImpacts || a.readiness.score - b.readiness.score || a.slug.localeCompare(b.slug));
  return {
    schemaVersion: "1.0",
    appVersion,
    generatedAt,
    summary: {
      explainers: rows.length,
      ready: rows.filter((row) => row.readiness.ready).length,
      notReady: rows.filter((row) => !row.readiness.ready).length,
      workstreams: rows.reduce((sum, row) => sum + row.workstreams, 0),
      impacts: rows.reduce((sum, row) => sum + row.impacts, 0),
      highRiskImpacts: rows.reduce((sum, row) => sum + row.highRiskImpacts, 0),
      impactsWithScenarios: rows.reduce((sum, row) => sum + row.impactsWithScenarios, 0),
    },
    rows,
    limitations: [
      "Informe editorial derivado del contenido autorado; no mide un entorno real.",
      "Readiness y riesgo requieren revisión especialista, fuentes vigentes y adaptación al cliente.",
      "No ejecuta cambios, no abre tickets y no sustituye un runbook o una aprobación operacional.",
    ],
  };
}

export function buildImplementationCatalogMarkdown(report: ImplementationCatalogReport): string {
  const lines = [
    `Versión de la aplicación: ${report.appVersion}`,
    `Generado: ${report.generatedAt}`,
    "# CORESOLUTIONS · Informe de preparación de implementación",
    `Preparados: ${report.summary.ready}/${report.summary.explainers} · No preparados: ${report.summary.notReady}`,
    `Workstreams: ${report.summary.workstreams} · Impactos: ${report.summary.impacts} · Alto riesgo: ${report.summary.highRiskImpacts} · Con escenarios: ${report.summary.impactsWithScenarios}`,
    "",
    "> Informe conceptual para priorizar assessment, implementación y mantenimiento. No certifica ni opera infraestructura.",
    "",
    "## Temas",
    "| Tema | Marcas | Preparación | Faltantes | Workstreams | Impactos | Alto riesgo | Escenarios |",
    "|---|---|---:|---|---:|---:|---:|---:|",
    ...report.rows.map((row) => `| ${row.title} (${row.slug}) | ${row.brands.join("; ")} | ${row.readiness.score}% | ${row.readiness.missing.join(", ") || "—"} | ${row.workstreams} | ${row.impacts} | ${row.highRiskImpacts} | ${row.impactsWithScenarios} |`),
    "",
    "## Límites",
    ...report.limitations.map((limitation) => `- ${limitation}`),
  ];
  return lines.join("\n");
}
