"use client";

import { useEffect, useState } from "react";

type AssignmentStatus = "unassigned" | "in-review" | "ready-for-pr";
interface Assignment { reviewer: string; targetDate: string; notes: string; status: AssignmentStatus }

const empty: Assignment = { reviewer: "", targetDate: "", notes: "", status: "unassigned" };
function storageKey(slug: string) { return `core-explainer:technical-review:${slug}`; }

export function TechnicalReviewAssignment({ slug }: { slug: string }) {
  const [assignment, setAssignment] = useState<Assignment>(empty);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(storageKey(slug)) ?? "null") as Partial<Assignment> | null;
      if (parsed) setAssignment({ ...empty, ...parsed });
    } catch { /* local-only best effort */ }
  }, [slug]);
  const update = (patch: Partial<Assignment>) => setAssignment((current) => ({ ...current, ...patch }));
  const save = () => {
    try { window.localStorage.setItem(storageKey(slug), JSON.stringify(assignment)); } catch { /* local-only best effort */ }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };
  return (
    <details className="mt-2 border-t border-core-border/[0.1] pt-2">
      <summary className="cursor-pointer list-none font-mono text-[0.56rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">
        Seguimiento local · {assignment.status === "unassigned" ? "sin asignar" : assignment.status === "in-review" ? "en revisión" : "listo para PR"}
      </summary>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <label className="text-[0.6rem] text-core-text-muted">Responsable<input value={assignment.reviewer} onChange={(event) => update({ reviewer: event.target.value.slice(0, 120) })} placeholder="Nombre o equipo" className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.65rem] text-core-text outline-none focus:border-core-accent/60" /></label>
        <label className="text-[0.6rem] text-core-text-muted">Fecha objetivo<input type="date" value={assignment.targetDate} onChange={(event) => update({ targetDate: event.target.value })} className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.65rem] text-core-text outline-none focus:border-core-accent/60" /></label>
        <label className="text-[0.6rem] text-core-text-muted sm:col-span-2">Estado<select value={assignment.status} onChange={(event) => update({ status: event.target.value as AssignmentStatus })} className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.65rem] text-core-text outline-none focus:border-core-accent/60"><option value="unassigned">Sin asignar</option><option value="in-review">En revisión</option><option value="ready-for-pr">Listo para PR</option></select></label>
        <label className="text-[0.6rem] text-core-text-muted sm:col-span-2">Notas<textarea value={assignment.notes} onChange={(event) => update({ notes: event.target.value.slice(0, 1200) })} rows={2} placeholder="Supuestos, evidencia que falta o cambios sugeridos" className="mt-1 w-full resize-y border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.65rem] leading-relaxed text-core-text outline-none focus:border-core-accent/60" /></label>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2"><span className="text-[0.54rem] text-core-text-muted">Solo este navegador; no sustituye aprobación.</span><button type="button" onClick={save} className="border border-core-accent/35 px-2 py-1 text-[0.58rem] font-semibold text-core-accent hover:bg-core-accent/10">{saved ? "Guardado" : "Guardar seguimiento"}</button></div>
    </details>
  );
}
