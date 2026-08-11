import type { ReviewAction } from "./reviewActions";
import type { ReviewActionStatus } from "./reviewActionTracking";
import { reviewActionStatusLabels } from "./reviewActionTracking";
import { isSafeHttpUrl } from "@/lib/workbench/exportMarkdown";

export interface ReviewActionExportInput {
  slug: string;
  title: string;
  actions: ReviewAction[];
  sources: Array<{ id: string; title: string; url: string }>;
  statuses?: Record<string, ReviewActionStatus>;
  generatedAt?: string;
}

function safe(value: string) { return value.replace(/[\r\n]+/g, " ").trim(); }

/** Pure Markdown contract for a review handoff; safe to regression-test offline. */
export function buildReviewActionMarkdown(input: ReviewActionExportInput): string {
  const sourceMap = new Map(input.sources.map((source) => [source.id, source]));
  const lines = [
    `# CORESOLUTIONS - backlog tecnico - ${safe(input.title)}`,
    "",
    `Explainer: ${safe(input.slug)}`,
    `Generado: ${safe(input.generatedAt ?? new Date().toISOString())}`,
    "",
    "> Seguimiento local generado para soporte, implementacion o mantenimiento. No ejecuta cambios ni equivale a aprobacion tecnica.",
    "",
    ...input.actions.flatMap((action, index) => {
      const status = input.statuses?.[action.id] ?? "pending";
      const sourceLines = action.sourceIds.length
        ? action.sourceIds.map((sourceId) => {
          const source = sourceMap.get(sourceId);
          return source && isSafeHttpUrl(source.url) ? `- Fuente: [${safe(source.title)}](${source.url}) (${sourceId})` : `- Fuente: ${sourceId}`;
        })
        : ["- Fuentes: no aplica"];
      return [
        `## ${index + 1}. ${safe(action.title)}`,
        `- Tipo: ${action.kind}`,
        `- Prioridad: ${action.priority}`,
        `- Estado local: ${reviewActionStatusLabels[status]}`,
        `- Motivo: ${safe(action.reason)}`,
        `- Evidencia esperada: ${safe(action.evidence)}`,
        ...sourceLines,
        "",
      ];
    }),
    "## Limites",
    "- El estado solo existe en este navegador y debe contrastarse con el PR/ticket oficial.",
    "- Resolver una accion no cambia el estado editorial ni certifica el entorno real.",
    "",
  ];
  return lines.join("\n");
}
