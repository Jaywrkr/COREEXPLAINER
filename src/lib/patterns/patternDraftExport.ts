import type { SolutionPattern } from "@/content/patterns";

function safe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function bullets(values: string[]): string[] {
  return values.map((value) => `- ${safe(value)}`);
}

/** Builds an editable review artifact; it never writes to the pattern catalog. */
export function buildPatternDraftMarkdown(pattern: SolutionPattern, appVersion: string, generatedAt: string): string {
  return [
    `# Borrador de patrón · ${safe(pattern.title)}`,
    "",
    `- ID: \`${safe(pattern.id)}\``,
    `- Versión de la aplicación: ${safe(appVersion)}`,
    `- Generado: ${safe(generatedAt)}`,
    `- Última revisión declarada: ${safe(pattern.lastReviewedAt)}`,
    "",
    "> Artefacto editable de CORESOLUTIONS. No es una aprobación, no afirma compatibilidad y no se incorpora al catálogo automáticamente.",
    "",
    "## Problema",
    safe(pattern.problem),
    "",
    "## Resultado esperado",
    safe(pattern.outcome),
    "",
    "## Marcas y productos a confirmar",
    ...bullets(pattern.brands),
    "",
    "## Señales de entrada",
    ...bullets(pattern.signals),
    "",
    "## Evidencia mínima a solicitar",
    ...bullets(pattern.evidence),
    "",
    "## Riesgos y límites",
    ...bullets(pattern.risks),
    "",
    "## Explainers relacionados",
    ...bullets(pattern.explainerSlugs.map((slug) => `[${safe(slug)}](/explainer/${encodeURIComponent(slug)})`)),
    "",
    "## Checklist antes de reutilizar",
    "- [ ] Confirmar versiones, licencias y compatibilidad con documentación oficial.",
    "- [ ] Confirmar fuentes vigentes para cada afirmación.",
    "- [ ] Validar topología, dependencias y límites con el proyecto real.",
    "- [ ] Definir escenario de fallo, evidencia esperada y criterio de aceptación.",
    "- [ ] Obtener revisión especialista antes de presentarlo como recomendación.",
  ].join("\n");
}
