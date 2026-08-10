import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const output = execFileSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/technical-review-report.ts", "--json"], { encoding: "utf8" });
const report = JSON.parse(output) as {
  generatedAt: string;
  summary: { explainers: number; pending: number; staleSources: number; warnings: number };
  rows: Array<{ priority: number; slug: string; title: string }>;
  priorityRule: { pending: number; staleSource: number; warning: number };
};

assert.match(report.generatedAt, /^\d{4}-\d{2}-\d{2}T/);
assert.equal(report.summary.explainers, 22);
assert.equal(report.summary.pending, 22);
assert.equal(report.rows.length, report.summary.explainers);
assert.deepEqual(report.priorityRule, { pending: 100, staleSource: 10, warning: 5 });
assert.ok(report.rows.every((row) => row.slug && row.title));
assert.ok(report.rows.every((row, index) => index === 0 || report.rows[index - 1]!.priority >= row.priority));

console.log("Technical review report regression checks passed.");
