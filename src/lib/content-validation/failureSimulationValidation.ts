import type { FailureSimulationProfile } from "@/content/types";

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
