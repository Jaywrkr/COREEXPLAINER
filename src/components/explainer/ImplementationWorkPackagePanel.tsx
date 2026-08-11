"use client";

import { useMemo } from "react";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { currentVersion } from "@/content/changelog";
import { buildImplementationWorkPackage, buildImplementationWorkPackageMarkdown } from "@/lib/implementation/workPackage";

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
        <div className="grid grid-cols-3 gap-1 border border-core-border/[0.1] bg-core-panel/30 p-2 text-center">
          <div><p className="font-mono text-[0.58rem] uppercase text-core-text-muted">Preparación</p><p className="font-mono text-sm text-core-accent">{pkg.readiness.score}%</p></div>
          <div><p className="font-mono text-[0.58rem] uppercase text-core-text-muted">Workstreams</p><p className="font-mono text-sm text-core-text">{pkg.workstreams.length}</p></div>
          <div><p className="font-mono text-[0.58rem] uppercase text-core-text-muted">Mantenimiento</p><p className="font-mono text-sm text-core-text">{pkg.maintenanceChecks.length}</p></div>
        </div>
        {pkg.readiness.missing.length ? <p className="text-[0.6rem] text-core-text-muted">Falta para estar lista: {pkg.readiness.missing.join(" · ")}</p> : <p className="text-[0.6rem] text-emerald-300">Tiene la estructura mínima para revisión humana.</p>}
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => downloadFile(buildImplementationWorkPackageMarkdown(pkg), `${filename}.md`, "text/markdown;charset=utf-8")} className="border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:bg-core-accent/10">Descargar Markdown</button>
          <button type="button" onClick={() => downloadFile(JSON.stringify(pkg, null, 2), `${filename}.json`, "application/json;charset=utf-8")} className="border border-core-border/[0.16] px-2 py-1 text-[0.6rem] font-semibold text-core-text-muted hover:text-core-text">Descargar JSON</button>
        </div>
      </div>
    </details>
  );
}
