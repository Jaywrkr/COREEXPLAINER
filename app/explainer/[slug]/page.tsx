import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExplainerLayout } from "@/components/explainer/ExplainerLayout";
import { explainerRegistry, getExplainer } from "@/content/registry";

interface PageProps {
  params: Promise<{ slug: string }>;
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

export default async function ExplainerTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const explainer = getExplainer(slug);
  if (!explainer) notFound();

  return <ExplainerLayout meta={explainer.meta} steps={explainer.steps} spec={explainer.spec} />;
}
