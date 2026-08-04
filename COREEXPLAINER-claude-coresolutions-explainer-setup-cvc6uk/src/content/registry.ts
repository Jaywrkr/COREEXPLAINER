import { parseAnimationSpec } from "@/lib/animation-spec/loadSpec";
import type { AnimationSpec } from "@/lib/animation-spec/types";
import type { ExplainerCategory, ExplainerMeta, ExplainerStep } from "./types";
import { vcfMeta, vcfSteps } from "./vcf";
import vcfRawSpec from "../../docs/examples/vcf/animation-spec.json";

/**
 * Single registry of every explainer topic. This is what the /explainer
 * dashboard (app/explainer/page.tsx) and the dynamic topic route
 * (app/explainer/[slug]/page.tsx) both read — adding a topic means adding
 * one entry here, not a new route file. See docs/ai-context/architecture.md
 * ("Cómo agregar un tema nuevo").
 */
export interface ExplainerDefinition {
  slug: string;
  category: ExplainerCategory;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
  spec: AnimationSpec;
}

export const explainerRegistry: ExplainerDefinition[] = [
  {
    slug: "vcf",
    category: "Virtualización",
    meta: vcfMeta,
    steps: vcfSteps,
    spec: parseAnimationSpec(vcfRawSpec),
  },
];

export function getExplainer(slug: string): ExplainerDefinition | undefined {
  return explainerRegistry.find((entry) => entry.slug === slug);
}

export function getExplainersByCategory(): { category: ExplainerCategory; items: ExplainerDefinition[] }[] {
  const byCategory = new Map<ExplainerCategory, ExplainerDefinition[]>();
  for (const entry of explainerRegistry) {
    const list = byCategory.get(entry.category) ?? [];
    list.push(entry);
    byCategory.set(entry.category, list);
  }
  return Array.from(byCategory.entries()).map(([category, items]) => ({ category, items }));
}
