import { assessTechnicalReviewAssignment, emptyTechnicalReviewAssignment, type TechnicalReviewAssignment } from "./reviewAssignment";

export interface ReviewCampaignEntry {
  slug: string;
  title: string;
  reviewStatus: "pending" | "reviewed";
  assignment?: TechnicalReviewAssignment;
}

export interface ReviewCampaignSummary {
  total: number;
  pending: number;
  reviewed: number;
  unassigned: number;
  inReview: number;
  blocked: number;
  readyForPr: number;
  overdue: number;
  completionPercent: number;
}

export function buildReviewCampaignSummary(entries: ReviewCampaignEntry[], today = new Date().toISOString().slice(0, 10)): ReviewCampaignSummary {
  const counts = { total: entries.length, pending: 0, reviewed: 0, unassigned: 0, inReview: 0, blocked: 0, readyForPr: 0, overdue: 0 };
  for (const entry of entries) {
    if (entry.reviewStatus === "pending") counts.pending += 1;
    else counts.reviewed += 1;
    const assignment = entry.assignment ?? emptyTechnicalReviewAssignment;
    const ready = assignment.status === "ready-for-pr" && assessTechnicalReviewAssignment(assignment).ready;
    if (ready) counts.readyForPr += 1;
    else if (assignment.status === "blocked") counts.blocked += 1;
    else if (assignment.status === "in-review") counts.inReview += 1;
    else counts.unassigned += 1;
    if (assignment.targetDate && assignment.targetDate < today && !ready) counts.overdue += 1;
  }
  return { ...counts, completionPercent: counts.total ? Math.round((counts.readyForPr / counts.total) * 100) : 0 };
}
