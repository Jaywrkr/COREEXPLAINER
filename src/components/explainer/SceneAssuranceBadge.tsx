"use client";

import { useState } from "react";
import type { TechnicalIntegrityReport } from "@/content/types";
import { GlossaryText } from "./GlossaryText";

interface SceneAssuranceBadgeProps {
  report?: TechnicalIntegrityReport | null;
  sourceCount: number;
  technical: boolean;
}

const ASSURANCE_LABELS: Record<TechnicalIntegrityReport["assurance"], string> = {
  baseline: "Cobertura base",
  "source-backed": "Fuentes específicas",
  reviewed: "Modelo revisado",
};

const STATUS_LABELS: Record<TechnicalIntegrityReport["status"], string> = {
  valid: "Sin alertas del modelo",
  warning: "Requiere revisión",
  error: "Revisar relaciones",
};

/** Makes the boundary between authored model, sources and observed environment explicit. */
export function SceneAssuranceBadge({ report, sourceCount, technical }: SceneAssuranceBadgeProps) {
  const [open, setOpen] = useState(false);
  const status = report?.status ?? "valid";
  const hasAlert = status !== "valid";
  const label = report ? ASSURANCE_LABELS[report.assurance] : "Modelo autorado";

  return (
    <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className={`absolute left-4 top-14 z-10 w-fit max-w-[min(20rem,calc(100%-2rem))] border bg-core-panel/90 font-mono text-[0.57rem] shadow-sm backdrop-blur-sm ${hasAlert ? "border-core-warning/40" : "border-core-border/[0.14]"}`}>
      <summary className="flex cursor-pointer list-none items-center gap-2 px-2.5 py-1.5 text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className={hasAlert ? "text-core-warning" : "text-core-success"}>●</span>
        <span>{technical ? label : "Modelo autorado"}</span>
        <span aria-hidden="true" className="text-core-accent">ⓘ</span>
      </summary>
      <div className="border-t border-core-border/[0.12] px-2.5 py-2 text-[0.62rem] leading-relaxed text-core-text-secondary">
        <p><span className="font-semibold text-core-text">Estado:</span> <GlossaryText text={technical ? STATUS_LABELS[status] : "Representación conceptual para explicar la idea"} /></p>
        {technical && report ? <p className="mt-1"><span className="font-semibold text-core-text">Reglas:</span> {report.checkedRules} comprobaciones · {report.diagnostics.length} hallazgos</p> : null}
        {technical ? <p className="mt-1"><span className="font-semibold text-core-text">Fuentes declaradas:</span> {sourceCount}</p> : null}
        <p className="mt-1 border-t border-core-border/[0.1] pt-1 text-core-text-muted">Esto valida el modelo autorado, no demuestra el estado de la red real del cliente.</p>
      </div>
    </details>
  );
}
