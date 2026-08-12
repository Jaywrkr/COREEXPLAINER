"use client";

import { buildScenarioReadinessMarkdown, type ScenarioReadinessItem } from "@/lib/review/scenarioReadiness";
import { currentVersion } from "@/content/changelog";

export function ScenarioReadinessDownload({ items }: { items: ScenarioReadinessItem[] }) {
  const download = () => {
    const markdown = buildScenarioReadinessMarkdown(items, currentVersion, new Date().toISOString());
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "coresolutions-scenario-readiness-backlog.md";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return <button type="button" onClick={download} className="mt-2 border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:border-core-accent/70">Descargar backlog Markdown</button>;
}
