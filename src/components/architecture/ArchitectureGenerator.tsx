"use client";

import { useMemo, useState } from "react";
import type { SolutionPattern } from "@/content/patterns";
import { generateArchitectureDraft } from "@/lib/architecture/generator";

export function ArchitectureGenerator({ patterns }: { patterns: SolutionPattern[] }) {
  const [patternId, setPatternId] = useState(patterns[0]?.id ?? "");
  const [objective, setObjective] = useState("");
  const [workload, setWorkload] = useState("");
  const [confirmations, setConfirmations] = useState<Record<string, boolean>>({});
  const draft = useMemo(() => generateArchitectureDraft({ patternId, objective, workload, confirmations }, patterns), [confirmations, objective, patternId, patterns, workload]);
  const selected = draft.pattern;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(17rem,0.75fr)_minmax(0,1.25fr)]">
      <section className="space-y-4 border border-core-border/[0.12] bg-core-panel/30 p-4">
        <div>
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-core-accent">1 · Patrón autorizado</p>
          <label className="mt-2 block text-sm font-semibold text-core-text" htmlFor="architecture-pattern">Selecciona el objetivo</label>
          <select id="architecture-pattern" value={patternId} onChange={(event) => { setPatternId(event.target.value); setConfirmations({}); }} className="mt-1.5 w-full border border-core-border/[0.16] bg-core-bg px-3 py-2 text-sm text-core-text outline-none focus:border-core-accent/60">
            {patterns.map((pattern) => <option key={pattern.id} value={pattern.id}>{pattern.title}</option>)}
          </select>
          <p className="mt-2 text-[0.74rem] leading-relaxed text-core-text-secondary">{selected.problem}</p>
        </div>
        <label className="block text-sm font-semibold text-core-text">Objetivo del cliente<input value={objective} onChange={(event) => setObjective(event.target.value)} placeholder="Ej. reducir impacto de una caída" className="mt-1.5 w-full border border-core-border/[0.16] bg-core-bg px-3 py-2 text-sm font-normal text-core-text outline-none focus:border-core-accent/60" /></label>
        <label className="block text-sm font-semibold text-core-text">Workload o servicio<input value={workload} onChange={(event) => setWorkload(event.target.value)} placeholder="Ej. ERP, e-commerce, archivos" className="mt-1.5 w-full border border-core-border/[0.16] bg-core-bg px-3 py-2 text-sm font-normal text-core-text outline-none focus:border-core-accent/60" /></label>
        <div className="border-t border-core-border/[0.1] pt-3">
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">2 · Datos que deben existir</p>
          <div className="mt-2 space-y-2">
            {selected.evidence.map((item) => <label key={item} className="flex gap-2 text-[0.76rem] leading-snug text-core-text-secondary"><input type="checkbox" checked={Boolean(confirmations[item])} onChange={(event) => setConfirmations((current) => ({ ...current, [item]: event.target.checked }))} className="mt-0.5 accent-core-accent" /><span>{item}</span></label>)}
          </div>
        </div>
      </section>

      <section className="min-w-0 border border-core-border/[0.12] bg-core-panel/30 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-core-accent">Borrador de arquitectura</p><h2 className="mt-1 text-lg font-semibold text-core-text">{draft.title}</h2></div>
          <span className={`border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.06em] ${draft.status === "conceptual" ? "border-core-success/40 text-core-success" : "border-core-warning/40 text-core-warning"}`}>{draft.status === "conceptual" ? "Conceptual completo" : "Faltan datos"}</span>
        </div>
        <div className="mt-4 overflow-hidden border border-core-border/[0.12] bg-core-bg p-3">
          <div className="grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))]">
            {draft.nodes.map((node, index) => <div key={node} className="relative min-w-0 border border-core-accent/25 bg-core-panel px-2.5 py-2 text-center text-[0.7rem] leading-snug text-core-text"><span className="block break-words">{node}</span>{index < draft.nodes.length - 1 ? <span aria-hidden="true" className="absolute -bottom-3 left-1/2 z-10 text-core-accent sm:-right-3 sm:bottom-auto sm:left-auto sm:top-1/2 sm:-translate-y-1/2">→</span> : null}</div>)}
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div><p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">Pendientes de ingeniería</p><ul className="mt-2 space-y-1 text-[0.72rem] text-core-text-secondary">{draft.checks.filter((check) => check.status === "required").map((check) => <li key={check.id}>• {check.label}</li>)}{draft.checks.every((check) => check.status === "confirmed") ? <li>• Validar release, modelo, HCL y pruebas reales.</li> : null}</ul></div>
          <div><p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">Riesgos a no ocultar</p><ul className="mt-2 space-y-1 text-[0.72rem] text-core-text-secondary">{draft.risks.map((risk) => <li key={risk}>• {risk}</li>)}</ul></div>
        </div>
        <p className="mt-4 border-t border-core-border/[0.1] pt-3 text-[0.7rem] leading-relaxed text-core-text-muted">Este generador combina patrones CORESOLUTIONS ya auditados. No calcula compatibilidad, no elige modelos y no aprueba una implementación.</p>
      </section>
    </div>
  );
}
