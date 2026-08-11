import Link from "next/link";
import { getAllExplainers } from "@/content/registry";
import { buildScenarioReadinessQueue } from "@/lib/review/scenarioReadiness";
import { ScenarioReadinessDownload } from "./ScenarioReadinessDownload";

export function ScenarioReadinessQueue() {
  const queue = buildScenarioReadinessQueue(getAllExplainers().map((entry) => ({ slug: entry.slug, title: entry.meta.title, meta: entry.meta })));
  return (
    <details className="mb-10 border border-core-border/[0.12] bg-core-panel/30 p-4">
      <summary className="cursor-pointer list-none font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">Cola de madurez de escenarios · {queue.length} pendientes</summary>
      <p className="mt-2 max-w-3xl text-[0.68rem] leading-relaxed text-core-text-secondary">Indica qué falta para que un escenario sea útil en soporte. Es una cola editorial: no aprueba contenido ni mide la salud del entorno.</p>
      {queue.length ? <><div className="mt-3 space-y-2">{queue.map((item) => <article key={`${item.slug}:${item.scenarioId}`} className="border border-core-border/[0.1] p-2 text-[0.65rem]"><div className="flex flex-wrap items-baseline justify-between gap-2"><Link href={`/explainer/${item.slug}`} className="font-semibold text-core-accent hover:underline">{item.title} · {item.label}</Link><span className="font-mono text-[0.58rem] text-core-text-muted">{item.score}%</span></div><p className="mt-1 text-core-text-muted">Falta: {item.missing.join(" · ")}</p></article>)}</div><ScenarioReadinessDownload items={queue} /></> : <p className="mt-3 text-[0.68rem] text-core-text-muted">Todos los escenarios declarados cumplen el perfil de soporte actual.</p>}
    </details>
  );
}
