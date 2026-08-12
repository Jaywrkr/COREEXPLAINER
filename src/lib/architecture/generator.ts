import type { SolutionPattern } from "@/content/patterns";

export interface ArchitectureDraftInput {
  patternId: string;
  objective: string;
  workload: string;
  confirmations: Record<string, boolean>;
}

export interface ArchitectureCheck {
  id: string;
  label: string;
  status: "required" | "confirmed";
}

export interface ArchitectureDraft {
  pattern: SolutionPattern;
  title: string;
  status: "conceptual" | "needs-input";
  checks: ArchitectureCheck[];
  nodes: string[];
  risks: string[];
}

/** Builds only an explicitly conceptual architecture draft from an approved pattern. */
export function generateArchitectureDraft(input: ArchitectureDraftInput, patterns: readonly SolutionPattern[]): ArchitectureDraft {
  const pattern = patterns.find((candidate) => candidate.id === input.patternId) ?? patterns[0];
  if (!pattern) throw new Error("No hay patrones técnicos disponibles");
  const checks = pattern.evidence.map((label) => ({ id: label, label, status: input.confirmations[label] ? "confirmed" as const : "required" as const }));
  const missing = checks.some((check) => check.status === "required") || !input.objective.trim() || !input.workload.trim();
  return {
    pattern,
    title: input.objective.trim() || pattern.title,
    status: missing ? "needs-input" : "conceptual",
    checks,
    nodes: [input.workload.trim() || "Workload por definir", ...pattern.brands, "Evidencia y pruebas", "Aprobación de ingeniería"],
    risks: pattern.risks,
  };
}
