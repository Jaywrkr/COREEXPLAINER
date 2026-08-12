import { explainerRegistry, explainerTechnicalAuthority } from "../src/content/registry";

const results = explainerRegistry.map((entry) => ({
  slug: entry.slug,
  title: entry.meta.title,
  authority: explainerTechnicalAuthority[entry.slug]!,
}));
const blocked = results.filter((result) => result.authority.status === "blocked");

console.log(`Technical authority audit: ${results.length - blocked.length}/${results.length} topics ready.`);
for (const result of results) {
  const { authority } = result;
  console.log(`${authority.status === "ready" ? "READY" : "BLOCKED"} ${result.slug} — evidence ${authority.verifiedEvidence}/${authority.requiredEvidence}`);
  for (const blocker of authority.blockers) console.log(`  - ${blocker}`);
}

if (blocked.length) {
  console.error(`Technical publication is blocked for ${blocked.length} topic(s).`);
  process.exitCode = 1;
}
