import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExplainerLayout } from "@/components/explainer/ExplainerLayout";
import { explainerRegistry, getExplainer } from "@/content/registry";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ scene?: string | string[]; scenario?: string | string[]; mode?: string | string[] }>;
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function generateStaticParams() {
  return explainerRegistry.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const explainer = getExplainer(slug);
  if (!explainer) return {};
  return { title: `${explainer.meta.title} · CoreSolutions` };
}

export default async function ExplainerTopicPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const explainer = getExplainer(slug);
  if (!explainer) notFound();

  const requestedScene = firstParam(query.scene);
  const requestedScenario = firstParam(query.scenario);
  const scenarioFromLink = explainer.meta.failureScenarios?.find((scenario) => scenario.id === requestedScenario);
  const initialSceneId = explainer.steps.some((step) => step.sceneId === requestedScene)
    ? requestedScene
    : scenarioFromLink?.sceneId;
  const initialScenarioId = scenarioFromLink && (!initialSceneId || scenarioFromLink.sceneId === initialSceneId)
    ? scenarioFromLink.id
    : null;
  const initialAudienceMode = firstParam(query.mode) === "technical" ? "technical" : "client";

  return (
    <ExplainerLayout
      meta={explainer.meta}
      steps={explainer.steps}
      spec={explainer.spec}
      initialSceneId={initialSceneId}
      initialScenarioId={initialScenarioId}
      initialAudienceMode={initialAudienceMode}
    />
  );
}
