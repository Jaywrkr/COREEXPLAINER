"use client";

import { type ReviewAction } from "@/lib/review/reviewActions";
import { buildReviewActionMarkdown } from "@/lib/review/reviewActionExport";
import { readReviewActionStatus } from "@/lib/review/reviewActionTracking";

interface ReviewActionExportProps {
  slug: string;
  title: string;
  actions: ReviewAction[];
  sources: Array<{ id: string; title: string; url: string }>;
}

export function ReviewActionExport({ slug, title, actions, sources }: ReviewActionExportProps) {
  const download = () => {
    const statuses = Object.fromEntries(actions.map((action) => [action.id, readReviewActionStatus(slug, action.id)]));
    const markdown = buildReviewActionMarkdown({ slug, title, actions, sources, statuses, generatedAt: new Date().toISOString() });
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `coresolutions-${slug}-review-actions.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <button type="button" onClick={download} className="border border-core-border/[0.16] px-2 py-1 text-[0.56rem] font-semibold text-core-text-muted hover:border-core-accent/50 hover:text-core-accent">Exportar backlog</button>;
}
