import { explainerRegistry, explainerValidationWarnings } from "../src/content/registry";

console.log(`Content validation passed: ${explainerRegistry.length} explainers checked.`);
const warnings = Object.entries(explainerValidationWarnings).flatMap(([slug, items]) => items.map((item) => `${slug}: ${item}`));
if (warnings.length) {
  console.log(`Semantic review warnings: ${warnings.length}`);
  for (const warning of warnings) console.log(`- ${warning}`);
} else {
  console.log("Semantic review passed without warnings.");
}
