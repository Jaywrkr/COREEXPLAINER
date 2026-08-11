"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { solutionPatterns, type SolutionPattern } from "@/content/patterns";
import { filterSolutionPatterns, selectComparablePatterns } from "@/lib/patterns/patternComparison";
import { assessPatternReadiness, patternReadinessLabels, type PatternExplainerReadiness, type PatternReadinessStatus } from "@/lib/patterns/patternReadiness";

const comparisonRows: Array<{ label: string; get: (pattern: SolutionPattern) => string }> = [
  { label: "Problema", get: (pattern) => pattern.problem },
  { label: "Resultado", get: (pattern) => pattern.outcome },
  { label: "Señales", get: (pattern) => pattern.signals.join(" · ") },
  { label: "Evidencia", get: (pattern) => pattern.evidence.join(" · ") },
  { label: "Riesgos", get: (pattern) => pattern.risks.join(" · ") },
  { label: "Marcas", get: (pattern) => pattern.brands.join(" · ") },
];

const readinessStyles: Record<PatternReadinessStatus, string> = {
  ready: "border-core-success/40 text-core-success",
  "review-needed": "border-core-warning/40 text-core-warning",
  blocked: "border-core-error/40 text-core-error",
};

export function PatternLibrary({ explainerReadiness }: { explainerReadiness: Record<string, PatternExplainerReadiness> }) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const brands = useMemo(() => [...new Set(solutionPatterns.flatMap((pattern) => pattern.brands))].sort(), []);
  const filtered = useMemo(() => filterSolutionPatterns(solutionPatterns, query, brand), [brand, query]);
  const selected = selectComparablePatterns(solutionPatterns, selectedIds);
  const readinessFor = (pattern: SolutionPattern) => assessPatternReadiness(pattern, pattern.explainerSlugs.map((slug) => explainerReadiness[slug] ?? { slug, exists: false }));
  const toggle = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((value) => value !== id) : current.length < 2 ? [...current, id] : current);

  return (
    <section className="mb-14">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div><p className="mb-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-accent">Biblioteca CORESOLUTIONS</p><h2 className="text-xl font-bold text-core-text">Patrones reutilizables</h2></div>
        <p className="max-w-md text-xs leading-relaxed text-core-text-muted">Puntos de partida para workshops y propuestas. Comparar no certifica compatibilidad: confirma fuentes, alcance y evidencia del proyecto.</p>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        <label className="sr-only" htmlFor="pattern-search">Buscar patrón</label>
        <input id="pattern-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por problema o señal" className="min-w-[16rem] flex-1 border border-core-border/[0.16] bg-core-panel px-2.5 py-2 text-xs text-core-text outline-none focus:border-core-accent/60" />
        <label className="sr-only" htmlFor="pattern-brand">Filtrar por marca</label>
        <select id="pattern-brand" value={brand} onChange={(event) => setBrand(event.target.value)} className="border border-core-border/[0.16] bg-core-panel px-2.5 py-2 text-xs text-core-text outline-none focus:border-core-accent/60"><option value="all">Todas las marcas</option>{brands.map((value) => <option key={value} value={value}>{value}</option>)}</select>
      </div>
      {selected.length === 2 ? (
        <section aria-label="Comparación de patrones" className="mb-4 overflow-x-auto border border-core-accent/30 bg-core-accent/[0.03] p-3">
          <div className="mb-2 flex items-center justify-between gap-2"><p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-accent">Comparación de decisión</p><button type="button" onClick={() => setSelectedIds([])} className="text-[0.58rem] text-core-text-muted hover:text-core-text">Limpiar</button></div>
          <table className="w-full min-w-[38rem] table-fixed text-left text-[0.62rem]"><thead><tr><th className="w-24 p-2 text-core-text-muted">Criterio</th>{selected.map((pattern) => <th key={pattern.id} className="p-2 font-semibold text-core-text">{pattern.title}</th>)}</tr></thead><tbody>{comparisonRows.map((row) => <tr key={row.label} className="border-t border-core-border/[0.1]"><th className="p-2 align-top font-mono text-[0.56rem] uppercase text-core-text-muted">{row.label}</th>{selected.map((pattern) => <td key={pattern.id} className="p-2 align-top leading-relaxed text-core-text-secondary">{row.get(pattern)}</td>)}</tr>)}</tbody></table>
          <p className="mt-2 text-[0.56rem] text-core-text-muted">La comparación organiza conversación y evidencia. No selecciona automáticamente una arquitectura ni valida productos.</p>
        </section>
      ) : null}
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((pattern) => { const isSelected = selectedIds.includes(pattern.id); return (
          <article key={pattern.id} className={`border bg-core-panel/50 p-4 transition-colors ${isSelected ? "border-core-accent shadow-[0_0_0_1px_rgb(var(--color-accent)/0.2)]" : "border-core-border/[0.12]"}`}>
            <div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-core-text">{pattern.title}</h3><span className="font-mono text-[0.52rem] text-core-text-muted">rev. {pattern.lastReviewedAt}</span></div>
            {(() => { const readiness = readinessFor(pattern); return <div className="mt-1 flex flex-wrap items-center gap-2"><span className={`border px-1.5 py-0.5 font-mono text-[0.52rem] uppercase ${readinessStyles[readiness.status]}`}>{patternReadinessLabels[readiness.status]}</span>{readiness.reasons.length ? <span className="text-[0.58rem] text-core-text-muted">{readiness.reasons[0]}</span> : null}</div>; })()}
            <p className="mt-1 text-xs leading-relaxed text-core-text-secondary">{pattern.problem}</p>
            <p className="mt-2 border-l-2 border-core-accent/60 pl-2 text-xs leading-relaxed text-core-text"><span className="font-semibold text-core-accent">Resultado:</span> {pattern.outcome}</p>
            <div className="mt-3 grid gap-2 text-[0.62rem] sm:grid-cols-2"><div><p className="font-semibold text-core-text">Señales</p><p className="text-core-text-muted">{pattern.signals.join(" · ")}</p></div><div><p className="font-semibold text-core-text">Evidencia</p><p className="text-core-text-muted">{pattern.evidence.join(" · ")}</p></div></div>
            <p className="mt-2 text-[0.6rem] text-core-text-muted"><span className="font-semibold text-core-text">Marcas:</span> {pattern.brands.join(" · ")}</p>
            <div className="mt-3 flex flex-wrap gap-1"><button type="button" onClick={() => toggle(pattern.id)} aria-pressed={isSelected} className={`border px-1.5 py-0.5 text-[0.58rem] ${isSelected ? "border-core-accent/60 text-core-accent" : "border-core-border/[0.16] text-core-text-muted hover:border-core-accent/50 hover:text-core-text"}`}>{isSelected ? "Seleccionado" : "Comparar"}</button>{pattern.explainerSlugs.map((slug) => <Link key={slug} href={`/explainer/${slug}`} className="border border-core-accent/35 px-1.5 py-0.5 text-[0.58rem] text-core-accent hover:bg-core-accent/10">Abrir {slug}</Link>)}</div>
          </article>
        );})}
      </div>
      {!filtered.length ? <p className="border border-core-border/[0.12] p-4 text-xs text-core-text-muted">No hay patrones con ese filtro.</p> : null}
    </section>
  );
}
