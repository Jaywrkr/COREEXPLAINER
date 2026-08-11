import type { FailureScenario, FailureSimulationProfile, GuidedScenarioStepKind } from "@/content/types";

interface ScenarioNodeReference {
  id: string;
  name: string;
}

/**
 * Checks that a typed failure mode carries only the parameters that give it
 * technical meaning. This remains conceptual; it never measures a live system.
 */
export function validateFailureSimulationProfile(profile: FailureSimulationProfile): string[] {
  const issues: string[] = [];
  const hasCapacity = profile.remainingCapacityPercent !== undefined;
  const hasLatency = profile.addedLatencyMs !== undefined;
  const hasDependency = Boolean(profile.externalDependency?.trim());
  if (!profile.impact?.trim()) issues.push("impact must be non-empty");
  switch (profile.mode) {
    case "hard-down":
      if (hasCapacity || hasLatency || hasDependency) issues.push("hard-down cannot declare degraded, latency or dependency parameters");
      break;
    case "degraded":
      if (!hasCapacity && !hasLatency) issues.push("degraded requires remainingCapacityPercent or addedLatencyMs");
      if (hasDependency) issues.push("degraded cannot declare externalDependency; use dependency mode");
      break;
    case "capacity":
      if (!hasCapacity) issues.push("capacity requires remainingCapacityPercent");
      if (hasLatency || hasDependency) issues.push("capacity cannot declare latency or externalDependency");
      break;
    case "latency":
      if (!hasLatency) issues.push("latency requires addedLatencyMs");
      if (hasCapacity || hasDependency) issues.push("latency cannot declare capacity or externalDependency");
      break;
    case "dependency":
      if (!hasDependency) issues.push("dependency requires externalDependency");
      if (hasCapacity || hasLatency) issues.push("dependency cannot declare capacity or latency");
      break;
    case "observability":
      if (hasCapacity || hasLatency || hasDependency) issues.push("observability cannot declare capacity, latency or externalDependency");
      break;
    default:
      issues.push("mode is not supported");
  }
  return issues;
}

/** A richer simulation must remain explainable as an observe-to-validate flow. */
export function validateFailureScenarioNarrative(scenario: FailureScenario): string[] {
  if (!scenario.simulation) return [];
  if (!scenario.guidedSteps?.length) return ["simulation requires guidedSteps with observe, diagnose, recover and validate phases"];
  const required = new Set<GuidedScenarioStepKind>(["observe", "diagnose", "recover", "validate"]);
  const present = new Set(scenario.guidedSteps.map((step) => step.kind));
  return [...required].filter((kind) => !present.has(kind)).map((kind) => `simulation narrative is missing '${kind}' phase`);
}

/** Simulated guided steps may not rely on references that are known to need refresh. */
export function validateFailureScenarioSourceFreshness(
  scenario: FailureScenario,
  sourceValidityById: ReadonlyMap<string, "current" | "review-needed">,
): string[] {
  if (!scenario.simulation || !scenario.guidedSteps?.length) return [];
  const sourceIds = [...new Set(scenario.guidedSteps.flatMap((step) => step.sourceIds ?? []))];
  const stale = sourceIds.filter((sourceId) => sourceValidityById.get(sourceId) !== "current");
  return stale.length ? [`simulation guided steps require current sources; review-needed or missing: ${stale.join(", ")}`] : [];
}

/** Keeps the failure narrative aligned with the nodes actually visible in its scene. */
export function validateFailureScenarioNodeConsistency(
  scenario: FailureScenario,
  sceneNodes: ReadonlyArray<ScenarioNodeReference>,
): string[] {
  const issues: string[] = [];
  const nodeById = new Map(sceneNodes.map((node) => [node.id, node]));
  const namesById = new Map(sceneNodes.map((node) => [node.id, node.name.trim().toLowerCase()]));
  const affected = new Set((scenario.affectedNodes ?? []).map((value) => value.trim().toLowerCase()).filter(Boolean));
  const seenDead = new Set<string>();
  for (const deadNodeId of scenario.deadNodeIds ?? []) {
    if (seenDead.has(deadNodeId)) issues.push(`deadNodeIds contains duplicate node '${deadNodeId}'`);
    seenDead.add(deadNodeId);
    const node = nodeById.get(deadNodeId);
    if (!node) continue;
    const idMatches = affected.has(node.id.toLowerCase());
    const nameMatches = namesById.get(node.id) ? affected.has(namesById.get(node.id)!) : false;
    if (!idMatches && !nameMatches) {
      issues.push(`dead node '${deadNodeId}' is not represented in affectedNodes`);
    }
  }
  return issues;
}
