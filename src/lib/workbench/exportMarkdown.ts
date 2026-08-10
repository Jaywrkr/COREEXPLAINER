export interface WorkbenchExportItem {
  id: string;
  title: string;
  detail: string;
  evidence: string;
  sourceIds: string[];
  sourceLabel?: string;
  sourceLabels?: string[];
  checked?: boolean;
}

export interface WorkbenchExportSection {
  label: string;
  items: WorkbenchExportItem[];
}

export interface WorkbenchExportInput {
  title: string;
  slug: string;
  brands: string[];
  sections: WorkbenchExportSection[];
  sourcesToConfirm: string[];
  complete: boolean;
  totalCompleted: number;
  totalItems: number;
}

function safeText(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function isSafeHttpUrl(value: string): boolean {
  try {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Builds a deterministic, plain-text work package. It intentionally contains
 * no browser APIs so the export contract can be regression-tested offline.
 */
export function buildWorkbenchMarkdown(input: WorkbenchExportInput): string {
  const lines = [
    `# Technical Workbench · ${safeText(input.title)}`,
    "",
    `CORESOLUTIONS · ${safeText(input.slug)} · ${input.complete ? "paquete completo" : "vista actual"}`,
    `Marcas en alcance: ${input.brands.map(safeText).join("; ") || "no declaradas"}`,
    `Progreso local: ${input.totalCompleted}/${input.totalItems} revisados`,
    `Fuentes a confirmar: ${input.sourcesToConfirm.length}`,
    "",
    "> Documento conceptual generado desde contenido autorado. No ejecuta cambios, no certifica un entorno real y debe adaptarse al runbook aprobado.",
    "",
    ...input.sections.flatMap((section) => [
      `## ${safeText(section.label)}`,
      ...section.items.flatMap((item, index) => [
        `### ${index + 1}. ${safeText(item.title)}`,
        `- Estado local: ${item.checked ? "revisado" : "pendiente"}`,
        `- Detalle: ${safeText(item.detail)}`,
        `- Evidencia: ${safeText(item.evidence)}`,
        item.sourceIds.length ? `- Fuentes: ${item.sourceIds.join(", ")}` : "- Fuentes: confirmar antes de ejecutar",
        ...(item.sourceLabels?.filter(isSafeHttpUrl).length ? item.sourceLabels.filter(isSafeHttpUrl).map((label) => `- Referencia: ${safeText(label)}`) : item.sourceLabel && isSafeHttpUrl(item.sourceLabel) ? [`- Referencia: ${safeText(item.sourceLabel)}`] : [""]),
        "",
      ]),
    ]),
    "## Fuentes a confirmar",
    ...(input.sourcesToConfirm.length ? input.sourcesToConfirm.map((item) => `- ${safeText(item)}`) : ["- Ninguna identificada por las reglas actuales."]),
    "",
    "## Límites",
    "- Validar versiones, compatibilidad, sizing, permisos, ventana y rollback en el entorno real.",
    "- Un estado local revisado no equivale a aprobación técnica ni a ejecución.",
  ];
  return lines.join("\n");
}
