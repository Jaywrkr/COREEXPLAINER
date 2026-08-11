export type WorkflowStatus = "draft" | "technical-review" | "source-review" | "commercial-review" | "approved" | "published" | "review-due";

export interface WorkflowStage {
  id: WorkflowStatus;
  label: string;
  role: string;
}

/**
 * Canonical editorial workflow. `review-due` is visible as an alert state,
 * but it routes back to technical review and is never a normal destination.
 */
export const workflowStages: readonly WorkflowStage[] = [
  { id: "draft", label: "Borrador", role: "Autor" },
  { id: "technical-review", label: "Revisión técnica", role: "Ingeniero revisor" },
  { id: "source-review", label: "Revisión de fuentes", role: "Responsable técnico" },
  { id: "commercial-review", label: "Revisión comercial", role: "Preventa / gerente" },
  { id: "approved", label: "Aprobado", role: "Aprobador" },
  { id: "published", label: "Publicado", role: "Dueño de contenido" },
  { id: "review-due", label: "Revisión vencida", role: "Ingeniero revisor" },
];

export interface WorkflowGuards {
  technicalReviewComplete: boolean;
  sourcesCurrent: boolean;
}

export function isWorkflowStatus(value: string | null | undefined): value is WorkflowStatus {
  return workflowStages.some((stage) => stage.id === value);
}

export function workflowStageFor(status: WorkflowStatus): WorkflowStage {
  return workflowStages.find((stage) => stage.id === status) ?? workflowStages[0]!;
}

export function workflowStageIndex(status: WorkflowStatus): number {
  return workflowStages.findIndex((stage) => stage.id === status);
}

export function canAdvanceWorkflow(status: WorkflowStatus, guards: WorkflowGuards): boolean {
  if (status === "published") return false;
  if (status === "technical-review") return guards.technicalReviewComplete;
  if (status === "source-review") return guards.sourcesCurrent;
  return true;
}

export function nextWorkflowStatus(status: WorkflowStatus, guards: WorkflowGuards): WorkflowStatus | null {
  if (!canAdvanceWorkflow(status, guards)) return null;
  if (status === "review-due") return "technical-review";
  const index = workflowStageIndex(status);
  const next = workflowStages[index + 1];
  return next && next.id !== "review-due" ? next.id : null;
}
