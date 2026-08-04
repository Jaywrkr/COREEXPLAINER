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
import { nsxMeta, nsxSteps } from "./nsx";
import nsxRawSpec from "../../docs/examples/nsx/animation-spec.json";
import { zeroTrustMeta, zeroTrustSteps } from "./zero-trust";
import zeroTrustRawSpec from "../../docs/examples/zero-trust/animation-spec.json";
import { kubernetesMeta, kubernetesSteps } from "./kubernetes";
import kubernetesRawSpec from "../../docs/examples/kubernetes/animation-spec.json";
import { observabilityMeta, observabilitySteps } from "./observability";
import observabilityRawSpec from "../../docs/examples/observability/animation-spec.json";
import { backupDrMeta, backupDrSteps } from "./backup-dr";
import backupDrRawSpec from "../../docs/examples/backup-dr/animation-spec.json";
import { ransomwareResilienceMeta, ransomwareResilienceSteps } from "./ransomware-resilience";
import ransomwareResilienceRawSpec from "../../docs/examples/ransomware-resilience/animation-spec.json";
import { sanStorageMeta, sanStorageSteps } from "./san-storage";
import sanStorageRawSpec from "../../docs/examples/san-storage/animation-spec.json";

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

const nsxDefinition: ExplainerDefinition = {
  slug: "nsx",
  category: "Redes",
  meta: nsxMeta,
  steps: nsxSteps,
  spec: parseAnimationSpec(nsxRawSpec),
};

const zeroTrustDefinition: ExplainerDefinition = {
  slug: "zero-trust",
  category: "Seguridad",
  meta: zeroTrustMeta,
  steps: zeroTrustSteps,
  spec: parseAnimationSpec(zeroTrustRawSpec),
};

const kubernetesDefinition: ExplainerDefinition = {
  slug: "kubernetes",
  category: "Cloud",
  meta: kubernetesMeta,
  steps: kubernetesSteps,
  spec: parseAnimationSpec(kubernetesRawSpec),
};

const observabilityDefinition: ExplainerDefinition = {
  slug: "observability",
  category: "Cloud",
  meta: observabilityMeta,
  steps: observabilitySteps,
  spec: parseAnimationSpec(observabilityRawSpec),
};

const backupDrDefinition: ExplainerDefinition = {
  slug: "backup-dr",
  category: "Cloud",
  meta: backupDrMeta,
  steps: backupDrSteps,
  spec: parseAnimationSpec(backupDrRawSpec),
};

const ransomwareResilienceDefinition: ExplainerDefinition = {
  slug: "ransomware-resilience",
  category: "Seguridad",
  meta: ransomwareResilienceMeta,
  steps: ransomwareResilienceSteps,
  spec: parseAnimationSpec(ransomwareResilienceRawSpec),
};

const sanStorageDefinition: ExplainerDefinition = {
  slug: "san-storage",
  category: "Storage",
  meta: sanStorageMeta,
  steps: sanStorageSteps,
  spec: parseAnimationSpec(sanStorageRawSpec),
};

// The registry is the publication boundary: malformed or incomplete content
// fails during build instead of reaching the client as a partial explainer.
validateExplainerContent(vcfDefinition);
validateExplainerContent(vsphereHaDefinition);
validateExplainerContent(vsanDefinition);
validateExplainerContent(nsxDefinition);
validateExplainerContent(zeroTrustDefinition);
validateExplainerContent(kubernetesDefinition);
validateExplainerContent(observabilityDefinition);
validateExplainerContent(backupDrDefinition);
validateExplainerContent(ransomwareResilienceDefinition);
validateExplainerContent(sanStorageDefinition);

export const explainerRegistry: ExplainerDefinition[] = [vcfDefinition, vsphereHaDefinition, vsanDefinition, nsxDefinition, zeroTrustDefinition, kubernetesDefinition, observabilityDefinition, backupDrDefinition, ransomwareResilienceDefinition, sanStorageDefinition];

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
