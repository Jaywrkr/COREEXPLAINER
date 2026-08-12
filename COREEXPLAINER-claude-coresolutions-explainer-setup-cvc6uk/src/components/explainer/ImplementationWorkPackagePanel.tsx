"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { currentVersion } from "@/content/changelog";
import { buildImplementationWorkPackage, buildImplementationWorkPackageMarkdown } from "@/lib/implementation/workPackage";
import { assessImpactReview, buildImpactReviewJson, buildImpactReviewMarkdown, emptyImpactReviewDecision, normalizeImpactReviewState, type ImpactReviewState, type ImpactReviewStatus } from "@/lib/implementation/impactReview";

interface ImplementationWorkPackagePanelProps {
  slug: string;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
}

function downloadFile(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ImplementationWorkPackagePanel({ slug, meta, steps }: ImplementationWorkPackagePanelProps) {
  const pkg = useMemo(() => buildImplementationWorkPackage({ slug, meta, steps, appVersion: currentVersion, generatedAt: new Date().toISOString() }), [slug, meta, steps]);
  const storageKey = `coresolutions:impact-review:${slug}`;
  const [reviewState, setReviewState] = useState<ImpactReviewState>(() => normalizeImpactReviewState(null, pkg.changeImpacts));
  const [reviewLoaded, setReviewLoaded] = useState(false);
  useEffect(() => {
    try {
      setReviewState(normalizeImpactReviewState(JSON.parse(window.localStorage.getItem(storageKey) ?? "null"), pkg.changeImpacts));
    } catch {
      setReviewState(normalizeImpactReviewState(null, pkg.changeImpacts));
    } finally {
      setReviewLoaded(true);
    }
  }, [pkg.changeImpacts, storageKey]);
  useEffect(() => {
    if (!reviewLoaded) return;
    try { window.localStorage.setItem(storageKey, JSON.stringify(reviewState)); } catch { /* local-only best effort */ }
  }, [reviewLoaded, reviewState, storageKey]);
  const reviewSummary = assessImpactReview(pkg.changeImpacts, reviewState);
  const updateReview = (impactId: string, field: "status" | "note", value: string) => {
    setReviewState((current) => {
      const previous = current[impactId] ?? emptyImpactReviewDecision();
      const status = field === "status" && ["pending", "reviewed", "blocked", "accepted"].includes(value) ? value as ImpactReviewStatus : previous.status;
      const next = { ...current, [impactId]: { ...previous, status, note: field === "note" ? value.slice(0, 1600) : previous.note, updatedAt: new Date().toISOString() } };
      return normalizeImpactReviewState(next, pkg.changeImpacts);
    });
  };
  const filename = `coresolutions-paquete-${slug}`;
  return (
    <details className="border-t border-core-border/[0.1] pt-2">
      <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">
        Paquete técnico de implementación
      </summary>
      <div className="mt-2 space-y-2">
        <p className="text-[0.62rem] leading-relaxed text-core-text-secondary">
          Convierte este tema en prerrequisitos, fases de trabajo, evidencia de aceptación y controles de mantenimiento. Es una guía conceptual: no ejecuta cambios.
        </p>
        <div className="grid grid-cols-4 gap-1 border border-core-border/[0.1] bg-core-panel/30 p-2 text-center">
          <div><p className="font-mono text-[0.58rem] uppercase text-core-text-muted">Preparación</p><p className="font-mono text-sm text-core-accent">{pkg.readiness.score}%</p></div>
          <div><p className="font-mono text-[0.58rem] uppercase text-core-text-muted">Workstreams</p><p className="font-mono text-sm text-core-text">{pkg.workstreams.length}</p></div>
          <div><p className="font-mono text-[0.58rem] uppercase text-core-text-muted">Mantenimiento</p><p className="font-mono text-sm text-core-text">{pkg.maintenanceChecks.length}</p></div>
          <div><p className="font-mono text-[0.58rem] uppercase text-core-text-muted">Impactos</p><p className="font-mono text-sm text-core-text">{pkg.changeImpacts.length}</p></div>
        </div>
        {pkg.readiness.missing.length ? <p className="text-[0.6rem] text-core-text-muted">Falta para estar lista: {pkg.readiness.missing.join(" · ")}</p> : <p className="text-[0.6rem] text-emerald-300">Tiene la estructura mínima para revisión humana.</p>}
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => downloadFile(buildImplementationWorkPackageMarkdown(pkg), `${filename}.md`, "text/markdown;charset=utf-8")} className="border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:bg-core-accent/10">Descargar Markdown</button>
          <button type="button" onClick={() => downloadFile(`${buildImplementationWorkPackageMarkdown(pkg)}${buildImpactReviewMarkdown(pkg, reviewState)}`, `${filename}-revision.md`, "text/markdown;charset=utf-8")} className="border border-core-border/[0.16] px-2 py-1 text-[0.6rem] font-semibold text-core-text-muted hover:text-core-text">Exportar revisión</button>
          <button type="button" onClick={() => downloadFile(JSON.stringify(buildImpactReviewJson(pkg, reviewState), null, 2), `${filename}.json`, "application/json;charset=utf-8")} className="border border-core-border/[0.16] px-2 py-1 text-[0.6rem] font-semibold text-core-text-muted hover:text-core-text">Descargar JSON</button>
        </div>
        <details className="border-t border-core-border/[0.1] pt-2">
          <summary className="cursor-pointer list-none font-mono text-[0.58rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">Revisar impactos · {reviewSummary.score}%</summary>
          <div className="mt-2 space-y-2">
            <p className="text-[0.6rem] text-core-text-muted">Marca cada impacto durante la revisión. Aceptar exige una nota; bloqueado siempre requiere seguimiento.</p>
            {pkg.changeImpacts.map((impact) => {
              const decision = reviewState[impact.id] ?? emptyImpactReviewDecision();
              return <div key={impact.id} className="border border-core-border/[0.1] p-2">
                <div className="flex items-center justify-between gap-2"><span className="text-[0.62rem] font-semibold text-core-text">{impact.workstreamId} · riesgo {impact.risk}</span><select value={decision.status} onChange={(event) => updateReview(impact.id, "status", event.target.value)} className="border border-core-border/[0.16] bg-core-panel px-1 py-0.5 text-[0.58rem] text-core-text"><option value="pending">Pendiente</option><option value="reviewed">Revisado</option><option value="blocked">Bloqueado</option><option value="accepted">Aceptado</option></select></div>
                <p className="mt-1 text-[0.58rem] leading-relaxed text-core-text-muted">Antes: {impact.beforeEvidence}</p>
                <textarea value={decision.note} onChange={(event) => updateReview(impact.id, "note", event.target.value)} placeholder="Nota o evidencia de la revisión" rows={2} className="mt-1 w-full resize-y border border-core-border/[0.14] bg-core-panel px-1.5 py-1 text-[0.6rem] text-core-text outline-none placeholder:text-core-text-muted focus:border-core-accent/50" />
              </div>;
            })}
          </div>
        </details>
      </div>
    </details>
  );
}
