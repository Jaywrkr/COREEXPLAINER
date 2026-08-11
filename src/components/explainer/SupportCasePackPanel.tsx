"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { currentVersion } from "@/content/changelog";
import { buildSupportTriageBrief } from "@/lib/support/triage";
import { buildSupportCaseMarkdown, emptySupportCaseDraft, normalizeSupportCaseDraft, type SupportCaseDraft } from "@/lib/support/casePack";

interface SupportCasePackPanelProps {
  slug: string;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
}

export function SupportCasePackPanel({ slug, meta, steps }: SupportCasePackPanelProps) {
  const storageKey = `core-explainer:support-case:${slug}`;
  const triage = useMemo(() => buildSupportTriageBrief({ slug, meta, steps }), [slug, meta, steps]);
  const [draft, setDraft] = useState<SupportCaseDraft>(() => emptySupportCaseDraft());

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "null") as Partial<SupportCaseDraft> | null;
      if (saved) setDraft(normalizeSupportCaseDraft(saved));
    } catch { /* local context is best effort */ }
  }, [storageKey]);

  useEffect(() => {
    if (!draft.selectedTriageId && triage.items[0]) setDraft((current) => ({ ...current, selectedTriageId: triage.items[0]!.id }));
  }, [draft.selectedTriageId, triage.items]);

  const update = (field: keyof SupportCaseDraft, value: string) => {
    setDraft((current) => {
      const next = normalizeSupportCaseDraft({ ...current, [field]: value });
      try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* current session remains usable */ }
      return next;
    });
  };

  const download = () => {
    const markdown = buildSupportCaseMarkdown({
      slug,
      title: meta.title,
      appVersion: currentVersion,
      generatedAt: new Date().toISOString(),
      brands: meta.brandContext.map((brand) => `${brand.name} (${brand.role})`),
      draft,
      triage,
    });
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `coresolutions-${slug}-support-case.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <details className="mb-3 border border-core-border/[0.16] bg-core-panel/20">
      <summary className="cursor-pointer list-none px-3 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">
        Handoff de soporte · paquete local
      </summary>
      <div className="border-t border-core-border/[0.1] p-3">
        <p className="mb-2 text-[0.66rem] leading-relaxed text-core-text-muted">Registra solo el contexto necesario para un ticket. Los datos quedan en este navegador hasta que descargues el Markdown.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="text-[0.6rem] text-core-text-muted">ID interno<input value={draft.caseId} onChange={(event) => update("caseId", event.target.value)} placeholder="INC-2026-001" className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.66rem] text-core-text outline-none focus:border-core-accent/60" /></label>
          <label className="text-[0.6rem] text-core-text-muted">Responsable<input value={draft.owner} onChange={(event) => update("owner", event.target.value)} placeholder="Equipo o persona" className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.66rem] text-core-text outline-none focus:border-core-accent/60" /></label>
          <label className="text-[0.6rem] text-core-text-muted">Inicio declarado<input value={draft.startedAt} onChange={(event) => update("startedAt", event.target.value)} placeholder="2026-08-11 10:30 UTC" className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.66rem] text-core-text outline-none focus:border-core-accent/60" /></label>
          <label className="text-[0.6rem] text-core-text-muted">Ruta de triage<select value={draft.selectedTriageId} onChange={(event) => update("selectedTriageId", event.target.value)} className="mt-1 w-full border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.66rem] text-core-text outline-none focus:border-core-accent/60">{triage.items.map((item) => <option key={item.id} value={item.id}>{item.symptom}</option>)}</select></label>
          <label className="text-[0.6rem] text-core-text-muted sm:col-span-2">Resumen<textarea value={draft.summary} onChange={(event) => update("summary", event.target.value)} rows={2} placeholder="Qué observa el usuario o servicio" className="mt-1 w-full resize-y border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.66rem] leading-relaxed text-core-text outline-none focus:border-core-accent/60" /></label>
          <label className="text-[0.6rem] text-core-text-muted sm:col-span-2">Impacto<textarea value={draft.impact} onChange={(event) => update("impact", event.target.value)} rows={2} placeholder="Alcance, usuarios afectados o degradación observada" className="mt-1 w-full resize-y border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.66rem] leading-relaxed text-core-text outline-none focus:border-core-accent/60" /></label>
          <label className="text-[0.6rem] text-core-text-muted sm:col-span-2">Notas<textarea value={draft.notes} onChange={(event) => update("notes", event.target.value)} rows={2} placeholder="Supuestos o evidencia pendiente; no pegues secretos" className="mt-1 w-full resize-y border border-core-border/[0.16] bg-core-panel px-2 py-1 text-[0.66rem] leading-relaxed text-core-text outline-none focus:border-core-accent/60" /></label>
        </div>
        <button type="button" onClick={download} className="mt-2 border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:border-core-accent/70">Descargar handoff Markdown</button>
      </div>
    </details>
  );
}
