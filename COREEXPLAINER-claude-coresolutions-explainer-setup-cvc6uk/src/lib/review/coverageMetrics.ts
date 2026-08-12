export interface CoverageInput {
  reviewStatus: "pending" | "reviewed";
  sourceValidities: Array<"current" | "review-needed" | undefined>;
  failureScenarioCount: number;
  integrityAssurance?: "baseline" | "source-backed" | "reviewed";
  roadmapCount: number;
  warningCount: number;
  actionCount: number;
  scenarioProfiles?: ScenarioCoverageProfile[];
  impactCount?: number;
  highRiskImpactCount?: number;
  impactsWithScenarios?: number;
}

export interface ScenarioCoverageProfile {
  hasSimulation: boolean;
  hasGuidedFlow: boolean;
  hasEvidence: boolean;
  hasCurrentSources: boolean;
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
  scenariosWithSimulation: number;
  scenariosWithGuidedFlow: number;
  scenariosWithEvidence: number;
  scenariosReadyForSupport: number;
  scenariosWithPartialCoverage: number;
  scenariosWithNoCoverage: number;
  scenarioCoveragePercent: number;
  impactCount: number;
  highRiskImpactCount: number;
  impactsWithScenarios: number;
}

export function calculateTechnicalCoverage(entries: CoverageInput[]): TechnicalCoverage {
  const result = entries.reduce<TechnicalCoverage & { scenarioCoverageTotal: number }>((coverage, entry) => {
    coverage.explainers += 1;
    if (entry.reviewStatus === "reviewed") coverage.reviewed += 1;
    else coverage.pending += 1;
    coverage.sources += entry.sourceValidities.length;
    coverage.currentSources += entry.sourceValidities.filter((validity) => validity === "current").length;
    coverage.reviewNeededSources += entry.sourceValidities.filter((validity) => validity === "review-needed").length;
    if (entry.failureScenarioCount > 0) coverage.explainersWithScenarios += 1;
    coverage.failureScenarios += entry.failureScenarioCount;
    const profiles = entry.scenarioProfiles ?? [];
    coverage.scenariosWithSimulation += profiles.filter((profile) => profile.hasSimulation).length;
    coverage.scenariosWithGuidedFlow += profiles.filter((profile) => profile.hasGuidedFlow).length;
    coverage.scenariosWithEvidence += profiles.filter((profile) => profile.hasEvidence).length;
    coverage.scenariosReadyForSupport += profiles.filter((profile) => profile.hasSimulation && profile.hasGuidedFlow && profile.hasEvidence && profile.hasCurrentSources).length;
    for (const profile of profiles) {
      const score = [profile.hasSimulation, profile.hasGuidedFlow, profile.hasEvidence, profile.hasCurrentSources].filter(Boolean).length;
      coverage.scenarioCoverageTotal += score;
      if (score === 0) coverage.scenariosWithNoCoverage += 1;
      else if (score < 4) coverage.scenariosWithPartialCoverage += 1;
    }
    if (entry.integrityAssurance === "reviewed") coverage.integrityReviewed += 1;
    if (entry.integrityAssurance === "source-backed") coverage.integritySourceBacked += 1;
    if (entry.integrityAssurance === "baseline") coverage.integrityBaseline += 1;
    if (entry.roadmapCount > 0) coverage.explainersWithRoadmap += 1;
    coverage.roadmapPhases += entry.roadmapCount;
    coverage.warnings += entry.warningCount;
    coverage.actions += entry.actionCount;
    coverage.impactCount += entry.impactCount ?? 0;
    coverage.highRiskImpactCount += entry.highRiskImpactCount ?? 0;
    coverage.impactsWithScenarios += entry.impactsWithScenarios ?? 0;
    return coverage;
  }, { explainers: 0, reviewed: 0, pending: 0, sources: 0, currentSources: 0, reviewNeededSources: 0, explainersWithScenarios: 0, failureScenarios: 0, integrityReviewed: 0, integritySourceBacked: 0, integrityBaseline: 0, explainersWithRoadmap: 0, roadmapPhases: 0, warnings: 0, actions: 0, scenariosWithSimulation: 0, scenariosWithGuidedFlow: 0, scenariosWithEvidence: 0, scenariosReadyForSupport: 0, scenariosWithPartialCoverage: 0, scenariosWithNoCoverage: 0, scenarioCoveragePercent: 0, impactCount: 0, highRiskImpactCount: 0, impactsWithScenarios: 0, scenarioCoverageTotal: 0 });
  result.scenarioCoveragePercent = result.failureScenarios === 0 ? 0 : Math.round((result.scenarioCoverageTotal / (result.failureScenarios * 4)) * 100);
  delete (result as Partial<typeof result>).scenarioCoverageTotal;
  return result;
}
