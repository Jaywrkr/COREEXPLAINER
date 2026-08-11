"use client";

import { useMemo, useState } from "react";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { currentVersion } from "@/content/changelog";
import { buildSupportTriageBrief, buildSupportTriageMarkdown } from "@/lib/support/triage";

interface SupportTriagePanelProps {
  slug: string;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
}

export function SupportTriagePanel({ slug, meta, steps }: SupportTriagePanelProps) {
  const [showAll, setShowAll] = useState(false);
  const brief = useMemo(() => buildSupportTriageBrief({ slug, meta, steps }), [slug, meta, steps]);
  const visibleItems = showAll ? brief.items : brief.items.slice(0, 3);

  const download = () => {
    const markdown = buildSupportTriageMarkdown(brief, new Date().toISOString(), currentVersion);
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `coresolutions-${slug}-support-triage.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <details className="mb-3 border border-core-accent/20 bg-core-panel/30">
      <summary className="cursor-pointer list-none px-3 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-accent [&::-webkit-details-marker]:hidden">
        Brief de triage · {brief.items.length} rutas conceptuales
      </summary>
      <div className="border-t border-core-border/[0.1] p-3">
        <p className="mb-2 text-[0.68rem] leading-relaxed text-core-text-muted">
          Para soporte: relaciona un síntoma con una capa, pide evidencia y decide cuándo escalar. No ejecuta acciones ni consulta el entorno.
        </p>
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={download} className="border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:border-core-accent/70">
            Descargar brief
          </button>
          {brief.items.length > 3 ? (
            <button type="button" onClick={() => setShowAll((value) => !value)} className="border border-core-border/[0.15] px-2 py-1 text-[0.6rem] font-semibold text-core-text-muted hover:text-core-text">
              {showAll ? "Ver menos" : `Ver las ${brief.items.length} rutas`}
            </button>
          ) : null}
        </div>
        <div className="space-y-2">
          {visibleItems.map((item) => (
            <article key={item.id} className="border border-core-border/[0.1] p-2 text-[0.67rem] leading-relaxed">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-core-text">{item.symptom}</h3>
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.06em] text-core-text-muted">{item.confidence}</span>
              </div>
              <p className="mt-1 text-core-text-secondary"><span className="font-semibold text-core-text">Capa:</span> {item.probableLayer}</p>
              <p className="mt-1 text-core-text-muted"><span className="font-semibold text-core-text-secondary">Pedir:</span> {item.evidenceToRequest}</p>
              <p className="mt-1 text-core-text-muted"><span className="font-semibold text-core-text-secondary">Comprobar:</span> {item.safeNextCheck}</p>
              <p className="mt-1 text-core-text-muted"><span className="font-semibold text-core-text-secondary">Escalar:</span> {item.escalationCriteria}</p>
              <p className="mt-1 font-mono text-[0.56rem] text-core-text-muted">Fuentes: {item.sourceIds.length ? item.sourceIds.join(", ") : "confirmar antes de usar"}</p>
            </article>
          ))}
        </div>
        <details className="mt-2 border-t border-core-border/[0.1] pt-2">
          <summary className="cursor-pointer list-none font-mono text-[0.58rem] font-semibold uppercase tracking-[0.06em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">Límites</summary>
          <ul className="mt-1 space-y-1 pl-4 text-[0.62rem] leading-relaxed text-core-text-muted">
            {brief.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
          </ul>
        </details>
      </div>
    </details>
  );
}
