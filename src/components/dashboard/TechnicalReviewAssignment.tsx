"use client";

import { useEffect, useMemo, useState } from "react";
import {
  assessTechnicalReviewAssignment,
  emptyTechnicalReviewAssignment,
  enforceAssignmentStatus,
  normalizeTechnicalReviewAssignment,
  type AssignmentStatus,
  type TechnicalReviewAssignment as ReviewAssignment,
} from "@/lib/review/reviewAssignment";

function storageKey(slug: string) { return `core-explainer:technical-review:${slug}`; }

const CHECKLIST: Array<{ id: keyof ReviewAssignment["checklist"]; label: string }> = [
  { id: "narrative", label: "Narrativa" },
  { id: "diagram", label: "Diagrama" },
  { id: "sources", label: "Fuentes" },
  { id: "scenarios", label: "Escenarios" },
  { id: "evidence", label: "Ledger de evidencia" },
];

export function TechnicalReviewAssignment({ slug }: { slug: string }) {
  const [assignment, setAssignment] = useState<ReviewAssignment>(emptyTechnicalReviewAssignment);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setAssignment(normalizeTechnicalReviewAssignment(JSON.parse(window.localStorage.getItem(storageKey(slug)) ?? "null")));
    } catch { /* local-only best effort */ }
  }, [slug]);

  const readiness = useMemo(() => assessTechnicalReviewAssignment(assignment), [assignment]);
  const update = (patch: Partial<ReviewAssignment>) => setAssignment((current) => ({ ...current, ...patch }));
  const updateChecklist = (id: keyof ReviewAssignment["checklist"], value: boolean) => setAssignment((current) => ({ ...current, checklist: { ...current.checklist, [id]: value } }));
  const save = () => {
    const normalized = enforceAssignmentStatus(normalizeTechnicalReviewAssignment(assignment));
    try { window.localStorage.setItem(storageKey(slug), JSON.stringify(normalized)); } catch { /* local-only best effort */ }
    setAssignment(normalized);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <details className="mt-2 border-t border-core-border/[0.1] pt-2">
      <summary className="cursor-pointer list-none font-mono text-[0.56rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">
        Seguimiento local · {assignment.status === "unassigned" ? "sin asignar" : assignment.status === "in-review" ? "en revisión" : assignment.status === "blocked" ? "bloqueado" : "listo para PR"}
      </summary>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <label className="text-[0.6rem] text-core-text-muted">Responsable<input value={assignment.reviewer} onChange={(event) => update({ reviewer: event.target.value.slice(0, 120) })} placeholder="Nombre o equipo" className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.65rem] text-core-text outline-none focus:border-core-accent/60" /></label>
        <label className="text-[0.6rem] text-core-text-muted">Fecha objetivo<input type="date" value={assignment.targetDate} onChange={(event) => update({ targetDate: event.target.value })} className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.65rem] text-core-text outline-none focus:border-core-accent/60" /></label>
        <label className="text-[0.6rem] text-core-text-muted sm:col-span-2">Estado<select value={assignment.status} onChange={(event) => update({ status: event.target.value as AssignmentStatus })} className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.65rem] text-core-text outline-none focus:border-core-accent/60"><option value="unassigned">Sin asignar</option><option value="in-review">En revisión</option><option value="blocked">Bloqueado</option><option value="ready-for-pr">Listo para PR</option></select></label>
        <label className="text-[0.6rem] text-core-text-muted sm:col-span-2">Notas de revisión<textarea value={assignment.notes} onChange={(event) => update({ notes: event.target.value.slice(0, 1200) })} rows={2} placeholder="Qué se contrastó, supuestos o bloqueos" className="mt-1 w-full resize-y border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.65rem] leading-relaxed text-core-text outline-none focus:border-core-accent/60" /></label>
        <label className="text-[0.6rem] text-core-text-muted sm:col-span-2">Evidencia de cierre<textarea value={assignment.closureEvidence} onChange={(event) => update({ closureEvidence: event.target.value.slice(0, 1600) })} rows={2} placeholder="Documento, enlace o resultado que respalda la revisión" className="mt-1 w-full resize-y border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.65rem] leading-relaxed text-core-text outline-none focus:border-core-accent/60" /></label>
        <fieldset className="space-y-1 sm:col-span-2">
          <legend className="text-[0.6rem] font-semibold text-core-text">Checklist para “listo para PR”</legend>
          <div className="grid gap-1 sm:grid-cols-2">
            {CHECKLIST.map((item) => <label key={item.id} className="flex items-center gap-1.5 text-[0.6rem] text-core-text-muted"><input type="checkbox" checked={assignment.checklist[item.id]} onChange={(event) => updateChecklist(item.id, event.target.checked)} />{item.label} contrastado</label>)}
          </div>
        </fieldset>
      </div>
      <div className="mt-2 border-l-2 border-core-warning/50 pl-2 text-[0.58rem] leading-relaxed text-core-text-muted">
        {readiness.ready ? <span className="text-core-success">Checklist completo: el seguimiento puede marcarse listo para PR.</span> : <span>Faltan para listo para PR: {readiness.missing.join(" · ")}</span>}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2"><span className="text-[0.54rem] text-core-text-muted">Solo este navegador; no sustituye aprobación especialista.</span><button type="button" onClick={save} disabled={assignment.status === "ready-for-pr" && !readiness.ready} className="border border-core-accent/35 px-2 py-1 text-[0.58rem] font-semibold text-core-accent hover:bg-core-accent/10 disabled:cursor-not-allowed disabled:opacity-50">{saved ? "Guardado" : "Guardar seguimiento"}</button></div>
    </details>
  );
}
