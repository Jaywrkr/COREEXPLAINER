"use client";

import { useEffect, useState } from "react";
import type { TechnicalIntegrityDiagnostic, TechnicalIntegrityReport, TechnicalSource } from "@/content/types";

interface TechnicalIntegrityPanelProps {
  report: TechnicalIntegrityReport;
  technicalSources: TechnicalSource[];
  selectedDiagnosticId: string | null;
  onDiagnosticSelect: (diagnostic: TechnicalIntegrityDiagnostic | null) => void;
}

const STATUS_LABELS: Record<TechnicalIntegrityReport["status"], string> = {
  valid: "Validado",
  warning: "Advertencias",
  error: "Revisar",
};

const STATUS_STYLES: Record<TechnicalIntegrityReport["status"], string> = {
  valid: "border-core-success/40 bg-core-success/10 text-core-success",
  warning: "border-core-warning/50 bg-core-warning/10 text-core-warning",
  error: "border-core-error/50 bg-core-error/10 text-core-error",
};

const DOMAIN_LABELS: Record<TechnicalIntegrityReport["domain"], string> = {
  network: "Modelo de red",
  virtualization: "Modelo de virtualización",
  storage: "Modelo de storage",
  security: "Modelo de seguridad",
  observability: "Modelo de observabilidad",
  continuity: "Modelo de continuidad",
  delivery: "Modelo de delivery",
  application: "Modelo de aplicación",
  generic: "Modelo técnico",
};

const ASSURANCE_LABELS: Record<TechnicalIntegrityReport["assurance"], string> = {
  baseline: "Cobertura base",
  reviewed: "Revisión profunda",
};

/** Shows semantic topology checks without claiming live network monitoring. */
export function TechnicalIntegrityPanel({
  report,
  technicalSources,
  selectedDiagnosticId,
  onDiagnosticSelect,
}: TechnicalIntegrityPanelProps) {
  const [open, setOpen] = useState(report.status === "error");

  useEffect(() => {
    setOpen(report.status === "error");
  }, [report]);

  return (
    <section
      aria-label="Salud técnica del diagrama"
      className="absolute right-4 top-4 z-10 w-[min(23rem,calc(100%-2rem))] border border-core-border/[0.14] bg-core-panel/95 p-3 shadow-sm backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="min-w-0 flex-1 text-left"
        >
          <span className="block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent">
            Integridad técnica
          </span>
          <span className="mt-0.5 block text-[0.64rem] text-core-text-muted">
            {DOMAIN_LABELS[report.domain]} · {ASSURANCE_LABELS[report.assurance]} · {report.checkedRules} comprobaciones
          </span>
        </button>
        <span className={`shrink-0 border px-2 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.06em] ${STATUS_STYLES[report.status]}`}>
          {STATUS_LABELS[report.status]}
        </span>
      </div>

      {open ? (
        <div className="mt-3 border-t border-core-border/[0.1] pt-3">
          {report.diagnostics.length === 0 ? (
            <p className="text-[0.68rem] leading-relaxed text-core-text-secondary">
              Las relaciones y caminos declarados cumplen el contrato técnico de esta escena.
            </p>
          ) : (
            <div className="space-y-1.5" role="group" aria-label="Diagnósticos técnicos">
              {report.diagnostics.map((diagnostic) => {
                const selected = diagnostic.id === selectedDiagnosticId;
                const sources = diagnostic.sourceIds
                  .map((sourceId) => technicalSources.find((source) => source.id === sourceId))
                  .filter((source): source is TechnicalSource => Boolean(source));
                return (
                  <div key={diagnostic.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onDiagnosticSelect(selected ? null : diagnostic)}
                      className={`w-full border px-2.5 py-2 text-left transition-colors ${
                        selected
                          ? STATUS_STYLES[diagnostic.severity === "error" ? "error" : "warning"]
                          : "border-core-border/[0.12] text-core-text-secondary hover:border-core-accent/40 hover:bg-core-accent/[0.06] hover:text-core-text"
                      }`}
                    >
                      <span className="block text-[0.68rem] font-semibold">{diagnostic.title}</span>
                      <span className="mt-0.5 block text-[0.64rem] leading-relaxed text-core-text-muted">
                        {diagnostic.detail}
                      </span>
                    </button>
                    {sources.length ? (
                      <div className="border-x border-b border-core-border/[0.12] px-2.5 py-1.5">
                        <span className="mr-2 font-mono text-[0.54rem] uppercase tracking-[0.06em] text-core-text-muted">
                          Evidencia
                        </span>
                        {sources.map((source) => (
                          <a
                            key={source.id}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mr-2 inline-block max-w-full truncate align-bottom text-[0.6rem] text-core-accent underline decoration-core-accent/40 underline-offset-2 hover:text-core-text"
                            title={source.title}
                          >
                            {source.title}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
          <p className="mt-2 border-t border-core-border/[0.1] pt-2 text-[0.58rem] leading-relaxed text-core-text-muted">
            Valida el modelo representado; no sustituye comprobaciones en la red real.
          </p>
        </div>
      ) : null}
    </section>
  );
}
