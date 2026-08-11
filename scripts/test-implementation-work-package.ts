import assert from "node:assert/strict";
import { buildImplementationWorkPackage, buildImplementationWorkPackageMarkdown } from "../src/lib/implementation/workPackage";
import { vcfMeta, vcfSteps } from "../src/content/vcf";

const pkg = buildImplementationWorkPackage({ slug: "vcf", meta: vcfMeta, steps: vcfSteps, appVersion: "0.168.0", generatedAt: "2026-08-11T00:00:00.000Z" });

assert.equal(pkg.schemaVersion, "1.1");
assert.equal(pkg.slug, "vcf");
assert.ok(pkg.prerequisites.length >= 3);
assert.ok(pkg.workstreams.length >= 1);
assert.ok(pkg.maintenanceChecks.length >= 3);
assert.equal(pkg.changeImpacts.length, pkg.workstreams.length);
assert.ok(pkg.changeImpacts.every((impact) => ["low", "medium", "high"].includes(impact.risk) && impact.beforeEvidence && impact.afterEvidence && impact.rollbackConcept));
assert.ok(pkg.workstreams.every((stream) => stream.tasks.length > 0 && stream.acceptanceEvidence && stream.exitCriteria));
assert.ok(pkg.readiness.score >= 0 && pkg.readiness.score <= 100);
assert.ok(pkg.limitations.some((limitation) => limitation.includes("no ejecuta")));

const markdown = buildImplementationWorkPackageMarkdown(pkg);
assert.match(markdown, /Paquete t.cnico/);
assert.match(markdown, /Prerrequisitos/);
assert.match(markdown, /Controles de mantenimiento/);
assert.match(markdown, /Matriz de impacto/);
assert.match(markdown, /No ejecuta acciones/);

console.log("Implementation work package regression checks passed.");
