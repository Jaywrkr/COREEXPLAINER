import type { TechnicalIntegrityProfile } from "@/content/types";

/**
 * Enforces the meaning of the assurance label. A source-backed/reviewed model
 * must point to evidence; otherwise the UI would imply more confidence than
 * the authored contract can support.
 */
export function technicalIntegrityAssuranceIssues(profile: TechnicalIntegrityProfile): string[] {
  const issues: string[] = [];
  const sceneEntries = Object.entries(profile.scenes);
  const evidenceBearingSceneCount = sceneEntries.filter(([, contract]) => (contract.requiredEdges?.length ?? 0) + (contract.requiredPaths?.length ?? 0) > 0).length;
  const sourcedSceneCount = sceneEntries.filter(([, contract]) => {
    const rules = [...(contract.requiredEdges ?? []), ...(contract.requiredPaths ?? [])];
    return rules.length > 0 && rules.some((rule) => (rule.sourceIds ?? []).length > 0);
  }).length;
  const sourceReferenceCount = sceneEntries.reduce((total, [, contract]) => total + [...(contract.requiredEdges ?? []), ...(contract.requiredPaths ?? [])].reduce((count, rule) => count + (rule.sourceIds?.length ?? 0), 0), 0);

  if (profile.assurance !== "baseline" && sourceReferenceCount === 0) {
    issues.push(`meta.technicalIntegrity.assurance '${profile.assurance}' requires at least one sourceIds reference`);
  }
  if (profile.assurance === "reviewed" && evidenceBearingSceneCount > 0 && sourcedSceneCount !== evidenceBearingSceneCount) {
    issues.push(`meta.technicalIntegrity.assurance 'reviewed' requires sourceIds in every evidence-bearing scene (${sourcedSceneCount}/${evidenceBearingSceneCount})`);
  }
  return issues;
}
