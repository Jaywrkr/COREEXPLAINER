import Link from "next/link";
import { solutionPatterns } from "@/content/patterns";

export function PatternLibrary() {
  return (
    <section className="mb-14">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div><p className="mb-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-accent">Biblioteca CORESOLUTIONS</p><h2 className="text-xl font-bold text-core-text">Patrones reutilizables</h2></div>
        <p className="max-w-md text-xs leading-relaxed text-core-text-muted">Puntos de partida para workshops y propuestas. Cada patrón requiere confirmar fuentes, alcance y evidencia del proyecto.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {solutionPatterns.map((pattern) => (
          <article key={pattern.id} className="border border-core-border/[0.12] bg-core-panel/50 p-4">
            <div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-core-text">{pattern.title}</h3><span className="font-mono text-[0.52rem] text-core-text-muted">rev. {pattern.lastReviewedAt}</span></div>
            <p className="mt-1 text-xs leading-relaxed text-core-text-secondary">{pattern.problem}</p>
            <p className="mt-2 border-l-2 border-core-accent/60 pl-2 text-xs leading-relaxed text-core-text"><span className="font-semibold text-core-accent">Resultado:</span> {pattern.outcome}</p>
            <div className="mt-3 grid gap-2 text-[0.62rem] sm:grid-cols-2"><div><p className="font-semibold text-core-text">Señales</p><p className="text-core-text-muted">{pattern.signals.join(" · ")}</p></div><div><p className="font-semibold text-core-text">Evidencia</p><p className="text-core-text-muted">{pattern.evidence.join(" · ")}</p></div></div>
            <p className="mt-2 text-[0.6rem] text-core-text-muted"><span className="font-semibold text-core-text">Marcas:</span> {pattern.brands.join(" · ")}</p>
            <div className="mt-3 flex flex-wrap gap-1">{pattern.explainerSlugs.map((slug) => <Link key={slug} href={`/explainer/${slug}`} className="border border-core-accent/35 px-1.5 py-0.5 text-[0.58rem] text-core-accent hover:bg-core-accent/10">Abrir {slug}</Link>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
