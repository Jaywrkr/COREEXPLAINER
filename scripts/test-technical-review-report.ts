import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const output = execFileSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/technical-review-report.ts", "--json"], { encoding: "utf8" });
const report = JSON.parse(output) as {
  schemaVersion: string;
  appVersion: string;
  generatedAt: string;
  summary: { explainers: number; pending: number; staleSources: number; warnings: number; actions: number; coverage: { explainers: number; reviewed: number; pending: number; sources: number; actions: number; impactCount: number; highRiskImpactCount: number; impactsWithScenarios: number } };
  rows: Array<{ priority: number; slug: string; title: string; sourceCount: number; impactCount: number; highRiskImpactCount: number; impactsWithScenarios: number; sources: Array<{ id: string; title: string; url: string; accessedAt: string; validity: string }>; actions: Array<{ id: string; kind: string; priority: string; sourceIds: string[] }> }>;
  priorityRule: { pending: number; staleSource: number; warning: number };
};

assert.match(report.generatedAt, /^\d{4}-\d{2}-\d{2}T/);
assert.equal(report.schemaVersion, "1.3");
  assert.equal(report.appVersion, "0.173.0");
assert.equal(report.summary.explainers, 22);
assert.equal(report.summary.pending, 22);
assert.equal(report.rows.length, report.summary.explainers);
assert.ok(report.summary.actions > 0);
assert.equal(report.summary.coverage.explainers, report.summary.explainers);
assert.equal(report.summary.coverage.pending, report.summary.pending);
assert.equal(report.summary.coverage.actions, report.summary.actions);
assert.ok(report.summary.coverage.impactCount > 0);
assert.ok(report.summary.coverage.highRiskImpactCount >= 0);
assert.ok(report.summary.coverage.impactsWithScenarios <= report.summary.coverage.impactCount);
assert.deepEqual(report.priorityRule, { pending: 100, staleSource: 10, warning: 5 });
assert.ok(report.rows.every((row) => row.slug && row.title));
assert.ok(report.rows.every((row) => row.impactCount > 0 && row.highRiskImpactCount >= 0 && row.impactsWithScenarios <= row.impactCount));
assert.ok(report.rows.every((row) => row.sourceCount === row.sources.length && row.sources.length > 0));
assert.ok(report.rows.every((row) => row.sources.every((source) => source.id && source.title && /^https:\/\//.test(source.url) && source.accessedAt && ["current", "review-needed"].includes(source.validity))));
assert.ok(report.rows.every((row) => row.actions.every((action) => action.id && action.kind && ["high", "medium"].includes(action.priority) && Array.isArray(action.sourceIds))));
assert.ok(report.rows.every((row, index) => index === 0 || report.rows[index - 1]!.priority >= row.priority));

console.log("Technical review report regression checks passed.");
