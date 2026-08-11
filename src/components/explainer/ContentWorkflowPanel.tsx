"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExplainerMeta } from "@/content/types";

type WorkflowStatus = "draft" | "technical-review" | "source-review" | "commercial-review" | "approved" | "published" | "review-due";

const stages: Array<{ id: WorkflowStatus; label: string; role: string }> = [
  { id: "draft", label: "Borrador", role: "Autor" },
  { id: "technical-review", label: "Revisión técnica", role: "Ingeniero revisor" },
  { id: "source-review", label: "Revisión de fuentes", role: "Responsable técnico" },
  { id: "commercial-review", label: "Revisión comercial", role: "Preventa / gerente" },
  { id: "approved", label: "Aprobado", role: "Aprobador" },
  { id: "published", label: "Publicado", role: "Dueño de contenido" },
];

interface ContentWorkflowPanelProps { slug: string; meta: ExplainerMeta }

export function ContentWorkflowPanel({ slug, meta }: ContentWorkflowPanelProps) {
  const storageKey = `core-explainer:workflow:${slug}`;
  const [status, setStatus] = useState<WorkflowStatus>(meta.reviewStatus === "reviewed" ? "published" : "draft");
  const [ready, setReady] = useState(false);
  const staleSources = useMemo(() => meta.technicalReview.sources.filter((source) => source.validity === "review-needed").length, [meta.technicalReview.sources]);
  const stageIndex = stages.findIndex((stage) => stage.id === status);
  const currentStage = stages[stageIndex] ?? stages[0]!;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey) as WorkflowStatus | null;
    if (saved && stages.some((stage) => stage.id === saved)) setStatus(saved);
    setReady(true);
  }, [storageKey]);
  useEffect(() => { if (ready) window.localStorage.setItem(storageKey, status); }, [ready, status, storageKey]);

  const canAdvance = status === "technical-review" ? meta.reviewStatus === "reviewed" : status === "source-review" ? staleSources === 0 : true;
  const advance = () => {
    if (!canAdvance) return;
    if (status === "review-due") { setStatus("technical-review"); return; }
    const next = stages[stageIndex + 1];
    if (next) setStatus(next.id);
  };
  const markDue = () => setStatus("review-due");

  return (
    <details className="border-t border-core-border/[0.1] pt-2">
      <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">
        Workflow de contenido · {currentStage.label}
      </summary>
      <div className="mt-2 space-y-2 text-[0.62rem] leading-relaxed">
        <div className="flex flex-wrap gap-1">
          {stages.map((stage, index) => <span key={stage.id} className={`border px-1.5 py-0.5 ${index <= stageIndex && status !== "review-due" ? "border-core-success/40 text-core-success" : "border-core-border/[0.14] text-core-text-muted"}`}>{stage.label}</span>)}
        </div>
        <p className="text-core-text-secondary"><span className="font-semibold text-core-text">Responsable:</span> {currentStage.role}</p>
        {meta.reviewStatus !== "reviewed" ? <p className="text-core-warning">La revisión técnica editorial está pendiente.</p> : null}
        {staleSources ? <p className="text-core-warning">Hay {staleSources} fuente(s) que requieren revisión.</p> : null}
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={advance} disabled={!canAdvance || status === "published"} className="border border-core-accent/40 px-2 py-1 font-semibold text-core-accent hover:bg-core-accent/10 disabled:cursor-not-allowed disabled:opacity-50">Avanzar etapa</button>
          {status === "published" ? <button type="button" onClick={markDue} className="border border-core-warning/40 px-2 py-1 font-semibold text-core-warning hover:bg-core-warning/10">Marcar revisión vencida</button> : null}
        </div>
        <p className="text-[0.56rem] text-core-text-muted">Estado local de preparación; la aprobación formal requiere el proceso interno de CORESOLUTIONS.</p>
      </div>
    </details>
  );
}
