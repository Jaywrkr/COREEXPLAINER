import type { Metadata } from "next";
import { ExplainerLayout } from "@/components/explainer/ExplainerLayout";
import { parseAnimationSpec } from "@/lib/animation-spec/loadSpec";
import { vcfMeta, vcfSteps } from "@/content/vcf";
import rawSpec from "../../../docs/examples/vcf/animation-spec.json";

export const metadata: Metadata = {
  title: `${vcfMeta.title} · CoreSolutions`,
};

const spec = parseAnimationSpec(rawSpec);

export default function VcfExplainerPage() {
  return <ExplainerLayout meta={vcfMeta} steps={vcfSteps} spec={spec} />;
}
