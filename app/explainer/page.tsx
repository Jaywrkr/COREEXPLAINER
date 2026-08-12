import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/explainer/BrandMark";
import { ExplainerDraftCreator } from "@/components/dashboard/ExplainerDraftCreator";
import { PatternLibrary } from "@/components/dashboard/PatternLibrary";
import { TechnicalReviewQueue } from "@/components/dashboard/TechnicalReviewQueue";
import { TechnicalCoveragePanel } from "@/components/dashboard/TechnicalCoveragePanel";
import { PublicationReadinessPanel } from "@/components/dashboard/PublicationReadinessPanel";
import { ScenarioReadinessQueue } from "@/components/dashboard/ScenarioReadinessQueue";
import { AiUsageGovernancePanel } from "@/components/dashboard/AiUsageGovernancePanel";
import { ReviewCampaignSummary } from "@/components/dashboard/ReviewCampaignSummary";
import { UsageMetricsPanel } from "@/components/dashboard/UsageMetricsPanel";
import { explainerValidationWarnings, getAllExplainers, getExplainersByCategory } from "@/content/registry";
import type { PatternExplainerReadiness } from "@/lib/patterns/patternReadiness";
import { isScenarioReadyForSupport } from "@/lib/review/scenarioReadiness";

export const metadata: Metadata = { title: "Explicadores técnicos · CORESOLUTIONS" };

export default function ExplainerDashboardPage() {
  const categories = getExplainersByCategory();
  const explainers = getAllExplainers();
  const reviewCampaignEntries = explainers.map(({ slug, meta }) => ({ slug, title: meta.title, reviewStatus: meta.reviewStatus }));
  const explainerReadiness: Record<string, PatternExplainerReadiness> = Object.fromEntries(explainers.map(({ slug, meta }) => [slug, {
    slug,
    exists: true,
    reviewStatus: meta.reviewStatus,
    allSourcesCurrent: meta.technicalReview.sources.every((source) => source.validity === "current"),
    warningCount: (explainerValidationWarnings[slug] ?? []).length,
    scenarioCoverage: meta.failureScenarios?.length ? meta.failureScenarios.every((scenario) => isScenarioReadyForSupport(meta, scenario)) ? "ready" : "partial" : "none",
    technicalIntegrity: meta.technicalIntegrity?.assurance,
  }]));

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-7 sm:px-8 sm:py-10">
      <header className="flex items-start justify-between gap-4">
        <BrandMark />
        <details className="mt-1 text-right">
          <summary className="cursor-pointer list-none font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
            Espacio interno <span className="ml-1 text-core-accent">+</span>
          </summary>
          <p className="mt-2 max-w-52 text-left text-[0.68rem] leading-relaxed text-core-text-muted">Revisión técnica, gobierno y creación. No es necesario para presentar un tema.</p>
        </details>
      </header>

      <section className="max-w-2xl pb-10 pt-3 sm:pb-14">
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-core-accent">CORESOLUTIONS · explicadores visuales</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-core-text sm:text-5xl">¿Qué necesitas explicar?</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-core-text-secondary">Elige un tema. Cada recorrido traduce una arquitectura compleja en una conversación clara.</p>
      </section>

      <nav aria-label="Áreas de solución" className="mb-8 flex flex-wrap gap-2">
        {categories.map(({ category, items }) => (
          <a key={category} href={`#${category}`} className="border border-core-border/[0.12] px-3 py-2 font-mono text-[0.62rem] text-core-text-secondary transition-colors hover:border-core-accent/60 hover:text-core-text">
            {category} <span className="ml-1 text-core-text-muted">{items.length}</span>
          </a>
        ))}
      </nav>

      <section aria-label="Temas disponibles" className="space-y-12">
        {categories.map(({ category, items }) => (
          <section key={category} id={category} className="scroll-mt-6">
            <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-core-border/[0.1] pb-3">
              <h2 className="text-lg font-bold text-core-text">{category}</h2>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-core-text-muted">{items.length} temas</p>
            </div>
            <div className="grid gap-px border border-core-border/[0.1] bg-core-border/[0.1] sm:grid-cols-2 lg:grid-cols-3">
              {items.map((entry) => (
                <Link key={entry.slug} href={`/explainer/${entry.slug}`} className="group min-h-44 bg-core-panel p-5 transition-colors hover:bg-core-accent/[0.07]">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.09em] text-core-text-muted">{entry.steps.length} escenas</p>
                  <h3 className="mt-4 text-base font-bold text-core-text">{entry.meta.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-core-text-secondary">{entry.meta.tagline}</p>
                  <span className="mt-5 block font-mono text-[0.62rem] font-semibold text-core-accent">Abrir recorrido <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </section>

      <details className="mt-16 border-t border-core-border/[0.12] pt-5">
        <summary className="cursor-pointer list-none font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
          Abrir operaciones internas <span className="ml-1 text-core-accent">+</span>
        </summary>
        <div className="mt-6 space-y-8">
          <PatternLibrary explainerReadiness={explainerReadiness} />
          <TechnicalCoveragePanel />
          <PublicationReadinessPanel />
          <ScenarioReadinessQueue />
          <ReviewCampaignSummary entries={reviewCampaignEntries} />
          <TechnicalReviewQueue />
          <UsageMetricsPanel />
          <AiUsageGovernancePanel />
          <ExplainerDraftCreator />
        </div>
      </details>
    </main>
  );
}
