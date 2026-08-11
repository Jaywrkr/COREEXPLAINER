export interface CoverageInput {
  reviewStatus: "pending" | "reviewed";
  sourceValidities: Array<"current" | "review-needed" | undefined>;
  failureScenarioCount: number;
  integrityAssurance?: "baseline" | "source-backed" | "reviewed";
  roadmapCount: number;
  warningCount: number;
  actionCount: number;
}

export interface TechnicalCoverage {
  explainers: number;
  reviewed: number;
  pending: number;
  sources: number;
  currentSources: number;
  reviewNeededSources: number;
  explainersWithScenarios: number;
  failureScenarios: number;
  integrityReviewed: number;
  integritySourceBacked: number;
  integrityBaseline: number;
  explainersWithRoadmap: number;
  roadmapPhases: number;
  warnings: number;
  actions: number;
}

export function calculateTechnicalCoverage(entries: CoverageInput[]): TechnicalCoverage {
  return entries.reduce<TechnicalCoverage>((coverage, entry) => {
    coverage.explainers += 1;
    if (entry.reviewStatus === "reviewed") coverage.reviewed += 1;
    else coverage.pending += 1;
    coverage.sources += entry.sourceValidities.length;
    coverage.currentSources += entry.sourceValidities.filter((validity) => validity === "current").length;
    coverage.reviewNeededSources += entry.sourceValidities.filter((validity) => validity === "review-needed").length;
    if (entry.failureScenarioCount > 0) coverage.explainersWithScenarios += 1;
    coverage.failureScenarios += entry.failureScenarioCount;
    if (entry.integrityAssurance === "reviewed") coverage.integrityReviewed += 1;
    if (entry.integrityAssurance === "source-backed") coverage.integritySourceBacked += 1;
    if (entry.integrityAssurance === "baseline") coverage.integrityBaseline += 1;
    if (entry.roadmapCount > 0) coverage.explainersWithRoadmap += 1;
    coverage.roadmapPhases += entry.roadmapCount;
    coverage.warnings += entry.warningCount;
    coverage.actions += entry.actionCount;
    return coverage;
  }, { explainers: 0, reviewed: 0, pending: 0, sources: 0, currentSources: 0, reviewNeededSources: 0, explainersWithScenarios: 0, failureScenarios: 0, integrityReviewed: 0, integritySourceBacked: 0, integrityBaseline: 0, explainersWithRoadmap: 0, roadmapPhases: 0, warnings: 0, actions: 0 });
}
