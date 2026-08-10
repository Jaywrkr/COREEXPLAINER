import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/explainer/BrandMark";
import { ExplainerFeedback } from "@/components/explainer/ExplainerFeedback";
import { getExplainersByCategory } from "@/content/registry";
import { ExplainerDraftCreator } from "@/components/dashboard/ExplainerDraftCreator";
import { PatternLibrary } from "@/components/dashboard/PatternLibrary";

export const metadata: Metadata = {
  title: "Explicadores técnicos · CORESOLUTIONS",
};

export default function ExplainerDashboardPage() {
  const categories = getExplainersByCategory();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12 sm:px-10">
      <BrandMark />

      <h1 className="mb-2 text-2xl font-bold text-core-text sm:text-3xl">Explicadores técnicos</h1>
      <p className="mb-12 max-w-2xl text-sm leading-relaxed text-core-text-secondary">
        Explicaciones visuales interactivas, organizadas por categoría, listas para usarse en
        conversaciones con clientes.
      </p>

      <ExplainerDraftCreator />
      <PatternLibrary />

      {categories.length === 0 && (
        <p className="font-mono text-sm text-core-text-muted">Todavía no hay explicadores publicados.</p>
      )}

      <div className="flex flex-col gap-12">
        {categories.map(({ category, items }) => (
          <section key={category}>
            <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-core-accent">
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((entry) => (
                <article
                  key={entry.slug}
                  className="group flex flex-col justify-between border border-core-border/[0.09] bg-core-panel p-5 transition-colors hover:border-core-accent"
                >
                  <Link href={`/explainer/${entry.slug}`} className="flex-1">
                    <span className="mb-3 block font-mono text-[0.65rem] uppercase tracking-[0.1em] text-core-text-muted">
                      {entry.steps.length} pasos
                    </span>
                    <h3 className="mb-2 text-base font-bold text-core-text">{entry.meta.title}</h3>
                    <p className="text-sm leading-relaxed text-core-text-secondary">{entry.meta.tagline}</p>
                    <span className="mt-6 block font-mono text-xs font-semibold text-core-accent group-hover:underline">
                      Ver explicación →
                    </span>
                  </Link>
                  <div className="mt-4 border-t border-core-border/[0.1] pt-3">
                    <ExplainerFeedback slug={entry.slug} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
