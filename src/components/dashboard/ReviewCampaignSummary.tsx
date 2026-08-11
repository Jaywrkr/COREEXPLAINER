"use client";

import { useEffect, useMemo, useState } from "react";
import { buildReviewCampaignJson, buildReviewCampaignMarkdown, buildReviewCampaignSummary, type ReviewCampaignEntry } from "@/lib/review/reviewCampaign";
import { normalizeTechnicalReviewAssignment } from "@/lib/review/reviewAssignment";
import { currentVersion } from "@/content/changelog";

function storageKey(slug: string) { return `core-explainer:technical-review:${slug}`; }

export function ReviewCampaignSummary({ entries }: { entries: Omit<ReviewCampaignEntry, "assignment">[] }) {
  const [assignments, setAssignments] = useState<Record<string, ReviewCampaignEntry["assignment"]>>({});

  useEffect(() => {
    const next: Record<string, ReviewCampaignEntry["assignment"]> = {};
    for (const entry of entries) {
      try {
        const raw = window.localStorage.getItem(storageKey(entry.slug));
        if (raw) next[entry.slug] = normalizeTechnicalReviewAssignment(JSON.parse(raw));
      } catch { /* local-only best effort */ }
    }
    setAssignments(next);
  }, [entries]);

  const summary = useMemo(() => buildReviewCampaignSummary(entries.map((entry) => ({ ...entry, assignment: assignments[entry.slug] }))), [assignments, entries]);
  const exportEntries = useMemo(() => entries.map((entry) => ({ ...entry, assignment: assignments[entry.slug] })), [assignments, entries]);
  const download = (content: string, filename: string, type: string) => {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <details className="mb-6 border border-core-accent/20 bg-core-accent/[0.03] p-4">
      <summary className="cursor-pointer list-none font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-accent hover:text-core-text [&::-webkit-details-marker]:hidden">
        Campaña de revisión · {summary.pending} pendientes · {summary.completionPercent}% listos para PR
      </summary>
      <div className="mt-3 space-y-3">
        <p className="max-w-3xl text-xs leading-relaxed text-core-text-secondary">
          Resumen local del seguimiento de especialistas. “Listo para PR” solo cuenta asignaciones que cumplen el checklist y la evidencia de cierre; no cambia la aprobación editorial.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {[
            ["Sin asignar", summary.unassigned, "text-core-text-muted"],
            ["En revisión", summary.inReview, "text-core-accent"],
            ["Bloqueados", summary.blocked, "text-core-warning"],
            ["Listos para PR", summary.readyForPr, "text-core-success"],
            ["Vencidos", summary.overdue, "text-core-warning"],
          ].map(([label, value, color]) => <div key={label} className="border border-core-border/[0.12] bg-core-panel/50 p-2"><p className="font-mono text-[0.54rem] uppercase tracking-[0.06em] text-core-text-muted">{label}</p><p className={`mt-1 font-mono text-lg font-semibold ${color}`}>{value}</p></div>)}
        </div>
        <p className="font-mono text-[0.56rem] text-core-text-muted">Total de temas: {summary.total} · Revisión declarada: {summary.reviewed} · Pendiente de revisión declarada: {summary.pending}</p>
        <div className="flex flex-wrap gap-1.5 border-t border-core-border/[0.1] pt-2">
          <button type="button" onClick={() => download(buildReviewCampaignMarkdown(exportEntries, currentVersion, new Date().toISOString()), `coresolutions-review-campaign-${currentVersion}.md`, "text/markdown;charset=utf-8")} className="border border-core-accent/35 px-2 py-1 font-mono text-[0.58rem] font-semibold text-core-accent hover:bg-core-accent/10">Descargar Markdown</button>
          <button type="button" onClick={() => download(buildReviewCampaignJson(exportEntries, currentVersion, new Date().toISOString()), `coresolutions-review-campaign-${currentVersion}.json`, "application/json;charset=utf-8")} className="border border-core-border/[0.16] px-2 py-1 font-mono text-[0.58rem] text-core-text-muted hover:border-core-accent/50 hover:text-core-text">Descargar JSON</button>
        </div>
      </div>
    </details>
  );
}
