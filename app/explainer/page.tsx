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
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-7 sm:px-8 sm:py-10">
      <BrandMark />

      <section className="pb-8 pt-1 sm:pb-10">
        <h1 className="text-2xl font-bold tracking-tight text-core-text sm:text-3xl">Elige un tema para explicar</h1>
        <p className="mt-2 text-sm leading-relaxed text-core-text-secondary">Abre un área y selecciona el recorrido que necesitas.</p>
      </section>

      <section aria-label="Temas disponibles" className="border-y border-core-border/[0.12]">
        {categories.map(({ category, items }, index) => (
          <details key={category} open={index === 0} className="group border-b border-core-border/[0.1] last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-1 py-4 text-core-text transition-colors hover:text-core-accent [&::-webkit-details-marker]:hidden">
              <span className="text-base font-semibold">{category}</span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-core-text-muted"><span>{items.length} temas</span> <span aria-hidden="true" className="ml-2 text-core-accent transition-transform group-open:rotate-45">+</span></span>
            </summary>
            <div className="pb-3">
              {items.map((entry) => (
                <Link key={entry.slug} href={`/explainer/${entry.slug}`} className="group/item flex items-center justify-between gap-4 border-t border-core-border/[0.08] px-1 py-3.5 transition-colors hover:bg-core-accent/[0.05]">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-core-text">{entry.meta.title}</span>
                    <span className="mt-0.5 block truncate text-[0.72rem] text-core-text-secondary">{entry.meta.tagline}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 font-mono text-sm text-core-text-muted transition-colors group-hover/item:text-core-accent">→</span>
                </Link>
              ))}
            </div>
          </details>
        ))}
      </section>

      <details className="mt-12 border-t border-core-border/[0.12] pt-5">
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
