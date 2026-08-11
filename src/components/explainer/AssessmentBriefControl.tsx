"use client";

import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { recordProductEvent } from "@/lib/telemetry/productTelemetry";

interface AssessmentBriefControlProps {
  slug: string;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
}

function buildBrief(meta: ExplainerMeta, steps: ExplainerStep[]) {
  const target = meta.targetArchitecture;
  const sources = meta.technicalReview.sources;
  const lines = [
    `# CORESOLUTIONS — Brief de assessment`,
    ``,
    `Tema: ${meta.title}`,
    `Revisión editorial: ${meta.technicalReview.lastReviewedAt}`,
    `Alcance: ${meta.technicalReview.scope}`,
    ``,
    `## Objetivo de la conversación`,
    meta.tagline,
    ``,
    `## Preguntas de descubrimiento`,
    `- ¿Qué servicio o proceso de negocio debe protegerse?`,
    `- ¿Qué dependencias, datos y equipos participan en el flujo?`,
    `- ¿Qué evidencia existe hoy de capacidad, seguridad, observabilidad y recuperación?`,
    `- ¿Qué cambio se quiere conseguir y qué restricciones no se pueden mover?`,
    `- ¿Quién acepta el resultado y qué prueba define el cierre?`,
    ``,
    `## Escenas a recorrer`,
    ...steps.map((step, index) => `${index + 1}. ${step.title} — ${step.businessImpact}`),
    ``,
    `## Evidencia esperada por fase`,
    ...(target?.roadmap?.length
      ? target.roadmap.flatMap((phase, index) => [
          `${index + 1}. ${phase.title}`,
          `   - Objetivo: ${phase.objective}`,
          `   - Evidencia: ${phase.evidence}`,
          `   - Criterio de salida: ${phase.exitCriteria}`,
        ])
      : [`- No existe roadmap autorado para este tema; definir fases antes de prometer una ruta de implementación.`]),
    ``,
    `## Escenarios de riesgo`,
    ...(meta.failureScenarios?.length
      ? meta.failureScenarios.map((scenario) => `- ${scenario.label}: ${scenario.summary} Evidencia: ${scenario.limitation}`)
      : [`- No hay escenarios de fallo autorados; identificar los riesgos más relevantes del entorno.`]),
    ``,
    `## Decisiones abiertas`,
    ...(target?.decisionOptions?.length
      ? target.decisionOptions.flatMap((option) => [
          `- ${option.title}: ${option.summary}`,
          `  - Beneficio: ${option.benefits}`,
          `  - Trade-off: ${option.tradeoffs}`,
          `  - Evidencia: ${option.evidence}`,
        ])
      : [`- Documentar alternativas y trade-offs cuando exista más de un camino técnicamente válido.`]),
    ``,
    `## Fuentes editoriales`,
    ...sources.map((source) => `- ${source.title} — ${source.url} (revisada ${source.accessedAt})`),
    ``,
    `## Límites`,
    meta.technicalReview.scope,
    `Este brief es una preparación conceptual. No certifica el entorno del cliente ni sustituye pruebas, configuración o aceptación técnica.`,
  ];
  return lines.join("\n");
}

export function AssessmentBriefControl({ slug, meta, steps }: AssessmentBriefControlProps) {
  const download = () => {
    const content = buildBrief(meta, steps);
    recordProductEvent({ name: "brief-download", slug });
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `coresolutions-assessment-${meta.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "brief"}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <details className="border-t border-core-border/[0.1] pt-2">
      <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">
        Preparar assessment
      </summary>
      <div className="mt-2 space-y-2">
        <p className="text-[0.62rem] leading-relaxed text-core-text-secondary">
          Genera un brief editable con preguntas, fases, riesgos, decisiones y fuentes de este tema.
        </p>
        <button type="button" onClick={download} className="border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:bg-core-accent/10">
          Descargar brief Markdown
        </button>
      </div>
    </details>
  );
}
