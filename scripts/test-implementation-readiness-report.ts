import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const output = execFileSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/implementation-readiness-report.ts", "--json"], { encoding: "utf8" });
const report = JSON.parse(output) as { schemaVersion: string; appVersion: string; generatedAt: string; summary: { explainers: number; ready: number; notReady: number; impacts: number; highRiskImpacts: number; impactsWithScenarios: number }; rows: Array<{ slug: string; brands: string[]; readiness: { score: number; missing: string[] }; workstreams: number; impacts: number; highRiskImpacts: number; impactsWithScenarios: number }> };
assert.equal(report.schemaVersion, "1.0");
assert.equal(report.appVersion, "0.175.0");
assert.match(report.generatedAt, /^\d{4}-\d{2}-\d{2}T/);
assert.equal(report.summary.explainers, 22);
assert.equal(report.rows.length, 22);
assert.equal(report.summary.ready + report.summary.notReady, 22);
assert.ok(report.summary.notReady > 0, "pending specialist review must prevent technical readiness");
assert.ok(report.summary.impacts > 0);
assert.ok(report.summary.highRiskImpacts >= 0 && report.summary.highRiskImpacts <= report.summary.impacts);
assert.ok(report.rows.every((row) => row.brands.length > 0 && row.workstreams > 0 && row.impacts === row.workstreams && row.readiness.score >= 0 && row.readiness.score <= 100));
assert.ok(report.rows.every((row, index) => index === 0 || report.rows[index - 1]!.highRiskImpacts >= row.highRiskImpacts || report.rows[index - 1]!.readiness.score <= row.readiness.score));
console.log("Implementation readiness report regression checks passed.");
