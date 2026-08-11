import type { SolutionPattern } from "@/content/patterns";

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(parsed) && parsed <= Date.now() + 86_400_000;
}

/** Validates the reusable pattern catalog without making compatibility claims. */
export function validateSolutionPatterns(patterns: readonly SolutionPattern[], explainerSlugs: ReadonlySet<string>): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  for (const [index, pattern] of patterns.entries()) {
    const label = `patterns[${index}]`;
    if (!nonEmpty(pattern.id)) issues.push(`${label}.id must be non-empty`);
    if (ids.has(pattern.id)) issues.push(`${label}.id '${pattern.id}' is duplicated`);
    ids.add(pattern.id);
    for (const field of ["title", "problem", "outcome", "lastReviewedAt"] as const) {
      if (!nonEmpty(pattern[field])) issues.push(`${label}.${field} must be non-empty`);
    }
    if (nonEmpty(pattern.lastReviewedAt) && !validDate(pattern.lastReviewedAt)) issues.push(`${label}.lastReviewedAt must be a valid non-future date`);
    for (const field of ["brands", "signals", "evidence", "risks", "explainerSlugs"] as const) {
      const values = pattern[field];
      if (!Array.isArray(values) || values.length === 0) issues.push(`${label}.${field} must contain at least one item`);
      else if (values.some((value) => !nonEmpty(value))) issues.push(`${label}.${field} cannot contain empty items`);
    }
    for (const slug of pattern.explainerSlugs ?? []) {
      if (!explainerSlugs.has(slug)) issues.push(`${label}.explainerSlugs references unknown explainer '${slug}'`);
    }
  }
  return issues;
}
