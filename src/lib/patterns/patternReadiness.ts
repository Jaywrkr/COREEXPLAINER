import type { SolutionPattern } from "@/content/patterns";

export type PatternReadinessStatus = "ready" | "review-needed" | "blocked";

export interface PatternExplainerReadiness {
  slug: string;
  exists: boolean;
  reviewStatus?: "pending" | "reviewed";
  allSourcesCurrent?: boolean;
  warningCount?: number;
}

export interface PatternReadiness {
  status: PatternReadinessStatus;
  reasons: string[];
}

export function assessPatternReadiness(pattern: SolutionPattern, linked: PatternExplainerReadiness[]): PatternReadiness {
  const reasons: string[] = [];
  const missing = linked.filter((item) => !item.exists);
  const pending = linked.filter((item) => item.exists && item.reviewStatus !== "reviewed");
  const stale = linked.filter((item) => item.exists && item.allSourcesCurrent === false);
  const warnings = linked.reduce((sum, item) => sum + (item.warningCount ?? 0), 0);
  if (missing.length) reasons.push(`explainer(s) no encontrado(s): ${missing.map((item) => item.slug).join(", ")}`);
  if (pending.length) reasons.push(`${pending.length} explainer(s) con revisión pendiente`);
  if (stale.length) reasons.push(`${stale.length} explainer(s) con fuentes por revisar`);
  if (warnings) reasons.push(`${warnings} advertencia(s) de validación en explainers vinculados`);
  if (!pattern.evidence.length) reasons.push("el patrón no declara evidencia mínima");
  if (missing.length || !pattern.evidence.length) return { status: "blocked", reasons };
  if (pending.length || stale.length || warnings) return { status: "review-needed", reasons };
  return { status: "ready", reasons: [] };
}

export const patternReadinessLabels: Record<PatternReadinessStatus, string> = {
  ready: "Listo para reutilizar",
  "review-needed": "Revisar antes de reutilizar",
  blocked: "Bloqueado",
};
