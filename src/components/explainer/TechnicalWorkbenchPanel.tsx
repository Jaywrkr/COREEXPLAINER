"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { currentVersion } from "@/content/changelog";
import { buildWorkbenchMarkdown, isSafeHttpUrl, type WorkbenchExportItem } from "@/lib/workbench/exportMarkdown";

type WorkbenchMode = "implement" | "support" | "maintain" | "validate";
interface WorkItem { id: string; title: string; detail: string; evidence: string; sourceIds: string[]; sourceLabel?: string }

interface TechnicalWorkbenchPanelProps {
  slug: string;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
}

const modeLabels: Record<WorkbenchMode, string> = { implement: "Implementar", support: "Soportar", maintain: "Mantener", validate: "Validar" };

function safeText(value: string) { return value.replace(/[\r\n]+/g, " ").trim(); }

export function TechnicalWorkbenchPanel({ slug, meta, steps }: TechnicalWorkbenchPanelProps) {
  const [mode, setMode] = useState<WorkbenchMode>("implement");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const storageKey = `core-explainer:workbench:${slug}`;
  const sources = meta.technicalReview.sources;

  const items = useMemo<Record<WorkbenchMode, WorkItem[]>>(() => {
    const implementation = meta.targetArchitecture?.roadmap?.map((phase) => ({
      id: `roadmap:${phase.id}`,
      title: phase.title,
      detail: phase.objective,
      evidence: `${phase.evidence} Salida: ${phase.exitCriteria}`,
      sourceIds: phase.sourceIds ?? [],
    })) ?? steps.map((step) => ({
      id: `step:${step.id}`,
      title: step.title,
      detail: step.paragraphs[0] ?? "Definir el objetivo técnico de esta fase.",
      evidence: step.businessImpact,
      sourceIds: step.sourceIds,
    }));
    const support = (meta.failureScenarios ?? []).flatMap((scenario) => scenario.guidedSteps?.length
      ? scenario.guidedSteps.map((step) => ({
        id: `scenario:${scenario.id}:step:${step.id}`,
        title: `${scenario.label} · ${step.title}`,
        detail: `${step.kind}: ${step.instruction}`,
        evidence: `Esperado: ${step.expected} Evidencia: ${step.evidence}`,
        sourceIds: step.sourceIds ?? [],
      }))
      : [{
        id: `scenario:${scenario.id}`,
        title: scenario.label,
        detail: scenario.detail,
        evidence: scenario.limitation,
        sourceIds: [],
      }]);
    const maintain = sources.map((source) => ({
      id: `source:${source.id}`,
      title: source.title,
      detail: `${source.product ?? "Fuente técnica"} · ${source.version ?? "alcance conceptual"}`,
      evidence: `Confirmar que la documentación sigue vigente desde ${source.accessedAt}. Estado: ${source.validity ?? "no declarado"}.`,
      sourceIds: [source.id],
      sourceLabel: source.url,
    }));
    const validation: WorkItem[] = [
      {
        id: "validation:human-review",
        title: "Revisión técnica humana",
        detail: meta.reviewStatus === "reviewed" ? "El contenido declara una revisión técnica completada." : "El contenido sigue pendiente de revisión técnica especialista.",
        evidence: `Estado declarado: ${meta.reviewStatus}. Confirmar nodos, aristas, animación, texto y límites en el entorno de referencia.`,
        sourceIds: [],
      },
      {
        id: "validation:source-freshness",
        title: "Vigencia de fuentes",
        detail: `${sources.filter((source) => source.validity === "current").length}/${sources.length} fuentes están marcadas como vigentes.`,
        evidence: sources.filter((source) => source.validity === "review-needed").length ? "Existen fuentes review-needed que deben confirmarse." : "No hay fuentes review-needed declaradas.",
        sourceIds: sources.map((source) => source.id),
      },
    ];
    if (meta.technicalIntegrity) {
      Object.entries(meta.technicalIntegrity.scenes).forEach(([sceneId, contract]) => {
        const ruleCount = (contract.requiredNodes?.length ?? 0) + (contract.requiredEdges?.length ?? 0) + (contract.requiredPaths?.length ?? 0);
        validation.push({
          id: `validation:integrity:${sceneId}`,
          title: `Contrato de integridad · ${sceneId}`,
          detail: `${ruleCount} regla(s) declarada(s) para la escena.`,
          evidence: `Confirmar que los nodos, relaciones y rutas requeridos están representados y que los huérfanos son intencionales (${contract.checkOrphans === false ? "sí" : "no"}).`,
          sourceIds: [
            ...(contract.requiredEdges ?? []).flatMap((rule) => rule.sourceIds ?? []),
            ...(contract.requiredPaths ?? []).flatMap((rule) => rule.sourceIds ?? []),
          ],
        });
      });
    }
    return { implement: implementation, support, maintain, validate: validation };
  }, [meta.failureScenarios, meta.reviewStatus, meta.targetArchitecture?.roadmap, meta.technicalIntegrity, sources, steps]);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "null") as Partial<Record<string, boolean>> | null;
      if (saved && typeof saved === "object") {
        const valid = Object.fromEntries(Object.entries(saved).filter(([, value]) => typeof value === "boolean")) as Record<string, boolean>;
        setChecked(valid);
      }
    } catch { /* local progress is best effort */ }
  }, [storageKey]);

  const currentItems = items[mode];
  const allModes = Object.keys(modeLabels) as WorkbenchMode[];
  const progress = allModes.map((candidate) => ({
    mode: candidate,
    total: items[candidate].length,
    completed: items[candidate].filter((item) => checked[item.id]).length,
  }));
  const totalItems = progress.reduce((sum, entry) => sum + entry.total, 0);
  const totalCompleted = progress.reduce((sum, entry) => sum + entry.completed, 0);
  const itemsNeedingSourceConfirmation = allModes.flatMap((candidate) => items[candidate]).filter((item) => {
    if (!item.sourceIds.length) return true;
    return item.sourceIds.some((id) => sources.find((source) => source.id === id)?.validity === "review-needed");
  });
  const toExportItem = (item: WorkItem): WorkbenchExportItem => ({
    ...item,
    checked: Boolean(checked[item.id]),
    sourceLabels: item.sourceIds.flatMap((id) => {
      const source = sources.find((candidate) => candidate.id === id);
      return source && isSafeHttpUrl(source.url) ? [source.url] : [];
    }),
  });
  const saveMarkdown = (markdown: string, filename: string) => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const downloadCurrentWithContract = () => saveMarkdown(buildWorkbenchMarkdown({
    title: meta.title,
    slug,
    appVersion: currentVersion,
    generatedAt: new Date().toISOString(),
    brands: meta.brandContext.map((brand) => `${brand.name} (${brand.role})`),
    complete: false,
    totalCompleted: currentItems.filter((item) => checked[item.id]).length,
    totalItems: currentItems.length,
    sections: [{ label: modeLabels[mode], items: currentItems.map(toExportItem) }],
    sourcesToConfirm: itemsNeedingSourceConfirmation.filter((item) => currentItems.some((current) => current.id === item.id)).map((item) => `${item.title} · revisar IDs: ${item.sourceIds.join(", ") || "sin fuente declarada"}`),
  }), `coresolutions-${slug}-${mode}-workbench.md`);
  const downloadCompleteWithContract = () => saveMarkdown(buildWorkbenchMarkdown({
    title: meta.title,
    slug,
    appVersion: currentVersion,
    generatedAt: new Date().toISOString(),
    brands: meta.brandContext.map((brand) => `${brand.name} (${brand.role})`),
    complete: true,
    totalCompleted,
    totalItems,
    sections: allModes.map((candidate) => ({ label: modeLabels[candidate], items: items[candidate].map(toExportItem) })),
    sourcesToConfirm: itemsNeedingSourceConfirmation.map((item) => `${item.title} · revisar IDs: ${item.sourceIds.join(", ") || "sin fuente declarada"}`),
  }), `coresolutions-${slug}-workbench-package.md`);
  const toggle = (id: string) => {
    setChecked((current) => {
      const next = { ...current, [id]: !current[id] };
      try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* current session remains usable */ }
      return next;
    });
  };

  const downloadPackage = () => {
    const lines = [
      `# Technical Workbench · ${meta.title}`,
      "",
      `CORESOLUTIONS · ${slug} · paquete completo`,
      `Marcas en alcance: ${meta.brandContext.map((brand) => `${brand.name} (${brand.role})`).join("; ")}`,
      `Progreso local: ${totalCompleted}/${totalItems} revisados`,
      `Tareas con fuentes a confirmar: ${itemsNeedingSourceConfirmation.length}`,
      "",
      "> Documento conceptual generado desde contenido autorado. No ejecuta cambios, no certifica un entorno real y debe adaptarse al runbook aprobado.",
      "",
      ...allModes.flatMap((candidate) => [
        `## ${modeLabels[candidate]}`,
        ...items[candidate].flatMap((item, index) => [
          `### ${index + 1}. ${safeText(item.title)}`,
          `- Estado local: ${checked[item.id] ? "revisado" : "pendiente"}`,
          `- Detalle: ${safeText(item.detail)}`,
          `- Evidencia: ${safeText(item.evidence)}`,
          item.sourceIds.length ? `- Fuentes: ${item.sourceIds.join(", ")}` : "- Fuentes: confirmar antes de ejecutar",
          item.sourceLabel ? `- Referencia: ${item.sourceLabel}` : "",
          "",
        ]),
      ]),
      "## Fuentes a confirmar",
      ...(itemsNeedingSourceConfirmation.length ? itemsNeedingSourceConfirmation.map((item) => `- ${safeText(item.title)} · revisar IDs: ${item.sourceIds.join(", ") || "sin fuente declarada"}`) : ["- Ninguna identificada por las reglas actuales."]),
      "",
      "## Límites",
      "- Validar versiones, compatibilidad, sizing, permisos, ventana y rollback en el entorno real.",
      "- Un estado local revisado no equivale a aprobación técnica ni a ejecución.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `coresolutions-${slug}-workbench-package.md`; anchor.click(); URL.revokeObjectURL(url);
  };

  const download = () => {
    const lines = [
      `# Technical Workbench · ${meta.title}`,
      "",
      `CORESOLUTIONS · ${slug} · modo: ${modeLabels[mode]}`,
      `Marcas en alcance: ${meta.brandContext.map((brand) => `${brand.name} (${brand.role})`).join("; ")}`,
      "",
      "> Documento conceptual generado desde contenido autorado. No ejecuta cambios, no certifica un entorno real y debe adaptarse al runbook aprobado.",
      "",
      ...currentItems.flatMap((item, index) => [
        `## ${index + 1}. ${safeText(item.title)}`,
        `- Estado local: ${checked[item.id] ? "revisado" : "pendiente"}`,
        `- Detalle: ${safeText(item.detail)}`,
        `- Evidencia: ${safeText(item.evidence)}`,
        item.sourceIds.length ? `- Fuentes: ${item.sourceIds.join(", ")}` : "- Fuentes: confirmar antes de ejecutar",
        item.sourceLabel ? `- Referencia: ${item.sourceLabel}` : "",
        "",
      ]),
      "## Límites",
      "- Validar versiones, compatibilidad, sizing, permisos, ventana y rollback en el entorno real.",
      "- Un estado local revisado no equivale a aprobación técnica ni a ejecución.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `coresolutions-${slug}-${mode}-workbench.md`; anchor.click(); URL.revokeObjectURL(url);
  };

  return (
    <details className="mb-3 border border-core-accent/20 bg-core-panel/30">
      <summary className="cursor-pointer list-none px-3 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-accent [&::-webkit-details-marker]:hidden">
        Technical Workbench · {totalCompleted}/{totalItems} revisados · {itemsNeedingSourceConfirmation.length} tareas con fuentes por confirmar
      </summary>
      <div className="border-t border-core-border/[0.1] p-3">
        <p className="mb-1 text-[0.68rem] leading-relaxed text-core-text-muted">Convierte la explicación en una lista técnica de implementación, soporte o mantenimiento. No sustituye el runbook aprobado ni ejecuta acciones.</p>
        <p className="mb-2 text-[0.62rem] leading-relaxed text-core-text-muted"><span className="font-semibold text-core-text">Marcas en alcance:</span> {meta.brandContext.map((brand) => `${brand.name} · ${brand.role}`).join(" · ")}</p>
        <div className="mb-3 flex flex-wrap gap-1">
          {(Object.keys(modeLabels) as WorkbenchMode[]).map((candidate) => <button key={candidate} type="button" onClick={() => setMode(candidate)} className={`border px-2 py-1 text-[0.6rem] font-semibold ${mode === candidate ? "border-core-accent/60 text-core-accent" : "border-core-border/[0.15] text-core-text-muted"}`}>{modeLabels[candidate]}</button>)}
          <button type="button" onClick={downloadCurrentWithContract} className="ml-auto border border-core-border/[0.15] px-2 py-1 text-[0.6rem] font-semibold text-core-text-muted hover:text-core-text">Descargar vista actual</button>
          <button type="button" onClick={downloadCompleteWithContract} className="border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:border-core-accent/70">Descargar paquete completo</button>
        </div>
        {currentItems.length ? <div className="space-y-2">{currentItems.map((item) => <label key={item.id} className="flex gap-2 border border-core-border/[0.1] p-2"><input type="checkbox" checked={Boolean(checked[item.id])} onChange={() => toggle(item.id)} className="mt-0.5 accent-core-accent" /><span className="min-w-0 text-[0.67rem] leading-relaxed"><span className="font-semibold text-core-text">{item.title}</span><span className="mt-0.5 block text-core-text-secondary">{item.detail}</span><span className="mt-0.5 block text-core-text-muted"><span className="font-semibold">Evidencia:</span> {item.evidence}</span><span className="mt-0.5 block text-core-text-muted"><span className="font-semibold">Fuentes:</span> {item.sourceIds.length ? item.sourceIds.map((id, index) => { const source = sources.find((candidate) => candidate.id === id); return <span key={id}>{index ? ", " : ""}{source && isSafeHttpUrl(source.url) ? <a href={source.url} target="_blank" rel="noreferrer" className="text-core-accent hover:underline">{id}</a> : id}</span>; }) : "confirmar antes de ejecutar"}</span>{item.sourceLabel && isSafeHttpUrl(item.sourceLabel) ? <a href={item.sourceLabel} target="_blank" rel="noreferrer" className="mt-0.5 block truncate text-core-accent hover:underline">Fuente: {item.sourceLabel}</a> : null}</span></label>)}</div> : <p className="text-[0.68rem] text-core-text-muted">Este tema aún no declara elementos para esta vista. Añádelos al contenido autorado antes de prometer una guía específica.</p>}
      </div>
    </details>
  );
}
