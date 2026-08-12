export type AssignmentStatus = "unassigned" | "in-review" | "blocked" | "ready-for-pr";

export interface ReviewChecklist {
  narrative: boolean;
  diagram: boolean;
  sources: boolean;
  scenarios: boolean;
  evidence: boolean;
}

export interface TechnicalReviewAssignment {
  reviewer: string;
  targetDate: string;
  notes: string;
  closureEvidence: string;
  status: AssignmentStatus;
  checklist: ReviewChecklist;
}

export interface ReviewAssignmentReadiness {
  ready: boolean;
  missing: string[];
}

export const emptyReviewChecklist: ReviewChecklist = {
  narrative: false,
  diagram: false,
  sources: false,
  scenarios: false,
  evidence: false,
};

export const emptyTechnicalReviewAssignment: TechnicalReviewAssignment = {
  reviewer: "",
  targetDate: "",
  notes: "",
  closureEvidence: "",
  status: "unassigned",
  checklist: emptyReviewChecklist,
};

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

export function normalizeTechnicalReviewAssignment(value: unknown): TechnicalReviewAssignment {
  const candidate = value && typeof value === "object" ? value as Partial<TechnicalReviewAssignment> : {};
  const checklist = candidate.checklist && typeof candidate.checklist === "object" ? candidate.checklist as Partial<ReviewChecklist> : {};
  const status: AssignmentStatus = candidate.status === "in-review" || candidate.status === "blocked" || candidate.status === "ready-for-pr" ? candidate.status : "unassigned";
  return {
    reviewer: text(candidate.reviewer, 120).trim(),
    targetDate: text(candidate.targetDate, 10),
    notes: text(candidate.notes, 1200).trim(),
    closureEvidence: text(candidate.closureEvidence, 1600).trim(),
    status,
    checklist: {
      narrative: checklist.narrative === true,
      diagram: checklist.diagram === true,
      sources: checklist.sources === true,
      scenarios: checklist.scenarios === true,
      evidence: checklist.evidence === true,
    },
  };
}

export function assessTechnicalReviewAssignment(assignment: TechnicalReviewAssignment): ReviewAssignmentReadiness {
  const missing: string[] = [];
  if (!assignment.reviewer) missing.push("responsable");
  if (!assignment.targetDate) missing.push("fecha objetivo");
  if (assignment.notes.length < 8) missing.push("nota de revisión (8+ caracteres)");
  if (assignment.closureEvidence.length < 8) missing.push("evidencia de cierre (8+ caracteres)");
  if (!assignment.checklist.narrative) missing.push("narrativa contrastada");
  if (!assignment.checklist.diagram) missing.push("diagrama contrastado");
  if (!assignment.checklist.sources) missing.push("fuentes contrastadas");
  if (!assignment.checklist.scenarios) missing.push("escenarios contrastados");
  if (!assignment.checklist.evidence) missing.push("ledger de evidencia contrastado");
  return { ready: missing.length === 0, missing };
}

/** Prevents a stale or incomplete local draft from claiming PR readiness. */
export function enforceAssignmentStatus(assignment: TechnicalReviewAssignment): TechnicalReviewAssignment {
  const readiness = assessTechnicalReviewAssignment(assignment);
  if (assignment.status === "ready-for-pr" && !readiness.ready) return { ...assignment, status: "in-review" };
  return assignment;
}
