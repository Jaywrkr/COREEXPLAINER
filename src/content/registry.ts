import { parseAnimationSpec } from "@/lib/animation-spec/loadSpec";
import type { AnimationSpec } from "@/lib/animation-spec/types";
import { validateExplainerContent } from "@/lib/content-validation/validateExplainer";
import type { ExplainerCategory, ExplainerMeta, ExplainerStep } from "./types";
import { vcfMeta, vcfSteps } from "./vcf";
import vcfRawSpec from "../../docs/examples/vcf/animation-spec.json";
import { vsphereHaMeta, vsphereHaSteps } from "./vsphere-ha";
import vsphereHaRawSpec from "../../docs/examples/vsphere-ha/animation-spec.json";
import { vsanMeta, vsanSteps } from "./vsan";
import vsanRawSpec from "../../docs/examples/vsan/animation-spec.json";

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

const vcfDefinition: ExplainerDefinition = {
  slug: "vcf",
  category: "Virtualización",
  meta: vcfMeta,
  steps: vcfSteps,
  spec: parseAnimationSpec(vcfRawSpec),
};

const vsphereHaDefinition: ExplainerDefinition = {
  slug: "vsphere-ha",
  category: "Virtualización",
  meta: vsphereHaMeta,
  steps: vsphereHaSteps,
  spec: parseAnimationSpec(vsphereHaRawSpec),
};

const vsanDefinition: ExplainerDefinition = {
  slug: "vsan",
  category: "Virtualización",
  meta: vsanMeta,
  steps: vsanSteps,
  spec: parseAnimationSpec(vsanRawSpec),
};

// The registry is the publication boundary: malformed or incomplete content
// fails during build instead of reaching the client as a partial explainer.
validateExplainerContent(vcfDefinition);
validateExplainerContent(vsphereHaDefinition);
validateExplainerContent(vsanDefinition);

export const explainerRegistry: ExplainerDefinition[] = [vcfDefinition, vsphereHaDefinition, vsanDefinition];

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
