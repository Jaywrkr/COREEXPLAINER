import { explainerRegistry, explainerTechnicalAuthority, explainerTechnicalRules } from "../src/content/registry";

const rows = explainerRegistry.map((entry) => {
  const authority = explainerTechnicalAuthority[entry.slug]!;
  const rules = explainerTechnicalRules[entry.slug] ?? [];
  const structuralBlockers = authority.blockers.filter((blocker) => !blocker.includes("integridad técnica") && !blocker.includes("revisión humana"));
  return { slug: entry.slug, rules: rules.length, mandatoryEvidence: authority.requiredEvidence, verifiedEvidence: authority.verifiedEvidence, structuralBlockers };
});

const incomplete = rows.filter((row) => row.rules === 0 || row.structuralBlockers.length > 0);
console.log(`Technical contract audit: ${rows.length - incomplete.length}/${rows.length} topics have source-to-scene rule coverage.`);
for (const row of rows) console.log(`${row.slug}: ${row.rules} rule(s), evidence ${row.verifiedEvidence}/${row.mandatoryEvidence}${row.structuralBlockers.length ? `; ${row.structuralBlockers.join("; ")}` : ""}`);

if (incomplete.length) {
  console.error(`Technical contract audit failed for: ${incomplete.map((row) => row.slug).join(", ")}`);
  process.exitCode = 1;
}
