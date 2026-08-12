import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/explainer/BrandMark";
import { ExplainerFeedback } from "@/components/explainer/ExplainerFeedback";
import { getExplainersByCategory } from "@/content/registry";
import { ExplainerDraftCreator } from "@/components/dashboard/ExplainerDraftCreator";
import { PatternLibrary } from "@/components/dashboard/PatternLibrary";
import { UsageMetricsPanel } from "@/components/dashboard/UsageMetricsPanel";
import { TechnicalReviewQueue } from "@/components/dashboard/TechnicalReviewQueue";
import { TechnicalCoveragePanel } from "@/components/dashboard/TechnicalCoveragePanel";
import { PublicationReadinessPanel } from "@/components/dashboard/PublicationReadinessPanel";
import { ScenarioReadinessQueue } from "@/components/dashboard/ScenarioReadinessQueue";
import { AiUsageGovernancePanel } from "@/components/dashboard/AiUsageGovernancePanel";
import { ReviewCampaignSummary } from "@/components/dashboard/ReviewCampaignSummary";
import { getAllExplainers } from "@/content/registry";
import { explainerValidationWarnings } from "@/content/registry";
import type { PatternExplainerReadiness } from "@/lib/patterns/patternReadiness";
import { isScenarioReadyForSupport } from "@/lib/review/scenarioReadiness";

export const metadata: Metadata = {
  title: "Explicadores técnicos · CORESOLUTIONS",
};

export default function ExplainerDashboardPage() {
  const categories = getExplainersByCategory();
  const reviewCampaignEntries = getAllExplainers().map((entry) => ({ slug: entry.slug, title: entry.meta.title, reviewStatus: entry.meta.reviewStatus }));
  const explainerReadiness: Record<string, PatternExplainerReadiness> = Object.fromEntries(getAllExplainers().map((entry) => [entry.slug, {
    slug: entry.slug,
    exists: true,
    reviewStatus: entry.meta.reviewStatus,
    allSourcesCurrent: entry.meta.technicalReview.sources.every((source) => source.validity === "current"),
    warningCount: (explainerValidationWarnings[entry.slug] ?? []).length,
    scenarioCoverage: entry.meta.failureScenarios?.length ? entry.meta.failureScenarios.every((scenario) => isScenarioReadyForSupport(entry.meta, scenario)) ? "ready" : "partial" : "none",
    technicalIntegrity: entry.meta.technicalIntegrity?.assurance,
  }]));

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12 sm:px-10">
      <BrandMark />

      <h1 className="mb-2 text-2xl font-bold text-core-text sm:text-3xl">Explicadores técnicos</h1>
      <p className="mb-12 max-w-2xl text-sm leading-relaxed text-core-text-secondary">
        Explicaciones visuales interactivas, organizadas por categoría, listas para usarse en
        conversaciones con clientes.
      </p>

      <nav aria-label="Secciones del espacio de trabajo" className="mb-10 grid gap-2 sm:grid-cols-3">
        <a href="#explore" className="border border-core-accent/40 bg-core-accent/10 px-4 py-3 transition-colors hover:border-core-accent">
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-core-accent">01 · Explorar</span>
          <span className="mt-1 block text-sm font-semibold text-core-text">Temas para presentar</span>
        </a>
        <a href="#review" className="border border-core-border/[0.12] bg-core-panel px-4 py-3 transition-colors hover:border-core-accent/60">
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-core-text-muted">02 · Revisar</span>
          <span className="mt-1 block text-sm font-semibold text-core-text">Fuentes y preparación técnica</span>
        </a>
        <a href="#create" className="border border-core-border/[0.12] bg-core-panel px-4 py-3 transition-colors hover:border-core-accent/60">
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-core-text-muted">03 · Crear</span>
          <span className="mt-1 block text-sm font-semibold text-core-text">Nuevas explicaciones</span>
        </a>
      </nav>

      <section id="explore" aria-labelledby="explore-heading" className="scroll-mt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-core-accent">01 · Explorar</p>
            <h2 id="explore-heading" className="mt-1 text-xl font-bold text-core-text">Temas para presentar</h2>
            <p className="mt-1 text-sm text-core-text-secondary">Elige una explicación para usarla con un cliente o equipo interno.</p>
          </div>
          <span className="hidden font-mono text-xs text-core-text-muted sm:block">{getAllExplainers().length} temas</span>
        </div>

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
      </section>

      <section id="review" className="mt-14 scroll-mt-8">
        <details className="group border border-core-border/[0.12] bg-core-panel/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-core-text-muted">02 · Revisar</span>
              <span className="mt-1 block text-base font-bold text-core-text">Fuentes y preparación técnica</span>
              <span className="mt-1 block text-sm text-core-text-secondary">Validación, cobertura, escenarios y seguimiento de revisión.</span>
            </span>
            <span aria-hidden="true" className="font-mono text-lg text-core-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="space-y-8 border-t border-core-border/[0.1] p-5">
            <PatternLibrary explainerReadiness={explainerReadiness} />
            <TechnicalCoveragePanel />
            <PublicationReadinessPanel />
            <ScenarioReadinessQueue />
            <ReviewCampaignSummary entries={reviewCampaignEntries} />
            <TechnicalReviewQueue />
            <UsageMetricsPanel />
            <AiUsageGovernancePanel />
          </div>
        </details>
      </section>

      <section id="create" className="mt-6 scroll-mt-8">
        <details className="group border border-core-border/[0.12] bg-core-panel/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-core-text-muted">03 · Crear</span>
              <span className="mt-1 block text-base font-bold text-core-text">Nuevas explicaciones</span>
              <span className="mt-1 block text-sm text-core-text-secondary">Convierte un patrón de proyecto en un borrador revisable.</span>
            </span>
            <span aria-hidden="true" className="font-mono text-lg text-core-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="border-t border-core-border/[0.1] p-5">
            <ExplainerDraftCreator />
          </div>
        </details>
      </section>
    </main>
  );
}
