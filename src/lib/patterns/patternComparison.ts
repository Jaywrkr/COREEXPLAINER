import type { SolutionPattern } from "@/content/patterns";

export function filterSolutionPatterns(patterns: SolutionPattern[], query: string, brand: string): SolutionPattern[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return patterns.filter((pattern) => {
    const searchable = [pattern.title, pattern.problem, pattern.outcome, ...pattern.signals, ...pattern.brands]
      .join(" ")
      .toLocaleLowerCase();
    return (!normalizedQuery || searchable.includes(normalizedQuery)) && (brand === "all" || pattern.brands.includes(brand));
  });
}

export function selectComparablePatterns(patterns: SolutionPattern[], selectedIds: string[]): SolutionPattern[] {
  const known = new Set(patterns.map((pattern) => pattern.id));
  return selectedIds.filter((id) => known.has(id)).slice(0, 2).map((id) => patterns.find((pattern) => pattern.id === id)!).filter(Boolean);
}
