"use client";

import { useEffect, useMemo, useState } from "react";
import type { AssessmentRoadmapPhase, GuidedScenarioStep, TechnicalSource } from "@/content/types";

type EvidenceStatus = "pending" | "validated" | "blocked";
type EvidenceKind = "guided-step" | "roadmap-phase";

interface EvidenceItem { id: string; kind: EvidenceKind; label: string; detail: string; sourceIds: string[] }

interface EvidenceTrackerPanelProps {
  explainerSlug: string;
  scenarioId: string | null;
  guidedSteps: GuidedScenarioStep[];
  roadmapPhases: AssessmentRoadmapPhase[];
  technicalSources: TechnicalSource[];
}

const statusLabel: Record<EvidenceStatus, string> = { pending: "Pendiente", validated: "Validada", blocked: "Bloqueada" };

export function EvidenceTrackerPanel({ explainerSlug, scenarioId, guidedSteps, roadmapPhases, technicalSources }: EvidenceTrackerPanelProps) {
  const items = useMemo<EvidenceItem[]>(() => [
    ...guidedSteps.map((step) => ({ id: `step:${step.id}`, kind: "guided-step" as const, label: step.title, detail: step.evidence, sourceIds: step.sourceIds ?? [] })),
    ...roadmapPhases.map((phase) => ({ id: `phase:${phase.id}`, kind: "roadmap-phase" as const, label: phase.title, detail: phase.evidence, sourceIds: phase.sourceIds ?? [] })),
  ], [guidedSteps, roadmapPhases]);
  const storageKey = scenarioId ? `core-explainer:evidence:${explainerSlug}:${scenarioId}` : null;
  const [statuses, setStatuses] = useState<Record<string, EvidenceStatus>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    if (!storageKey) { setStatuses({}); setReady(true); return; }
    try {
      const saved = window.localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : {};
      setStatuses(parsed && typeof parsed === "object" ? parsed : {});
    } catch { setStatuses({}); }
    finally { setReady(true); }
  }, [storageKey]);

  useEffect(() => {
    if (ready && storageKey) window.localStorage.setItem(storageKey, JSON.stringify(statuses));
  }, [ready, statuses, storageKey]);

  if (!scenarioId || items.length === 0) return null;
  const validatedCount = items.filter((item) => statuses[item.id] === "validated").length;
  const cycleStatus = (id: string) => setStatuses((current) => {
    const nextStatus = current[id] === undefined ? "validated" : current[id] === "validated" ? "blocked" : "pending";
    return { ...current, [id]: nextStatus };
  });

  return (
    <details className="border-t border-core-border/[0.12] pt-2">
      <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted [&::-webkit-details-marker]:hidden">
        Registro de evidencia · {validatedCount}/{items.length}
      </summary>
      <div className="mt-2 space-y-1.5">
        <p className="text-[0.6rem] leading-relaxed text-core-text-muted">La evidencia se registra por escenario en este navegador. Validada no significa ejecutada automáticamente.</p>
        {items.map((item) => {
          const status = statuses[item.id] ?? "pending";
          const sources = item.sourceIds.map((sourceId) => technicalSources.find((source) => source.id === sourceId)).filter((source): source is TechnicalSource => Boolean(source));
          return (
            <article key={item.id} className="border-l-2 border-core-accent/50 pl-2 text-[0.62rem] leading-relaxed">
              <button type="button" onClick={() => cycleStatus(item.id)} className="flex w-full items-center justify-between gap-2 text-left" aria-label={`${item.label}: ${statusLabel[status]}. Pulsar para cambiar estado.`}>
                <span className="font-semibold text-core-text">{item.label}</span><span className="shrink-0 font-mono text-[0.54rem] uppercase text-core-text-muted">{statusLabel[status]}</span>
              </button>
              <p className="text-core-text-secondary">{item.detail}</p>
              {sources.length ? <p className="mt-0.5 text-[0.56rem] text-core-text-muted">Fuentes: {sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="mr-1 text-core-accent underline underline-offset-2">{source.title}</a>)}</p> : null}
            </article>
          );
        })}
      </div>
    </details>
  );
}
