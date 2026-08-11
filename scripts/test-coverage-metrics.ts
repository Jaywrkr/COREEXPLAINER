import assert from "node:assert/strict";
import { calculateTechnicalCoverage } from "../src/lib/review/coverageMetrics";

const coverage = calculateTechnicalCoverage([
  { reviewStatus: "reviewed", sourceValidities: ["current", "review-needed"], failureScenarioCount: 2, scenarioProfiles: [{ hasSimulation: true, hasGuidedFlow: true, hasEvidence: true, hasCurrentSources: true }, { hasSimulation: true, hasGuidedFlow: false, hasEvidence: true, hasCurrentSources: true }], integrityAssurance: "reviewed", roadmapCount: 3, warningCount: 0, actionCount: 1 },
  { reviewStatus: "pending", sourceValidities: ["current"], failureScenarioCount: 0, integrityAssurance: "baseline", roadmapCount: 0, warningCount: 2, actionCount: 4 },
]);

assert.deepEqual(coverage, { explainers: 2, reviewed: 1, pending: 1, sources: 3, currentSources: 2, reviewNeededSources: 1, explainersWithScenarios: 1, failureScenarios: 2, integrityReviewed: 1, integritySourceBacked: 0, integrityBaseline: 1, explainersWithRoadmap: 1, roadmapPhases: 3, warnings: 2, actions: 5, scenariosWithSimulation: 2, scenariosWithGuidedFlow: 1, scenariosWithEvidence: 2, scenariosReadyForSupport: 1, scenariosWithPartialCoverage: 1, scenariosWithNoCoverage: 0, scenarioCoveragePercent: 88 });
console.log("Coverage metrics regression checks passed.");
