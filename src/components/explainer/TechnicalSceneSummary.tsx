import type { Scene } from "@/lib/animation-spec/types";
import type { ExplainerStep, TechnicalReview } from "@/content/types";
import { GlossaryText } from "./GlossaryText";

interface TechnicalSceneSummaryProps {
  scene: Scene;
  step: ExplainerStep;
  review: TechnicalReview;
}

/** Technical audit facts derived from the active scene and its source catalog. */
export function TechnicalSceneSummary({ scene, step, review }: TechnicalSceneSummaryProps) {
  const citedSources = review.sources.filter((source) => step.sourceIds.includes(source.id));
  const relationKinds = Array.from(new Set(scene.edges.map((edge) => edge.kind))).join(" · ");

  return (
    <section className="mb-5 border-l-2 border-core-accent bg-core-panel/50 px-3 py-2.5" aria-label="Ficha técnica de la escena">
      <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent">
        Ficha técnica de la escena
      </p>
      <dl className="mt-2 space-y-1.5 text-[0.68rem] leading-relaxed text-core-text-secondary">
        <div>
          <dt className="inline font-semibold text-core-text">Escena:</dt> <dd className="inline font-mono">{step.sceneId}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-core-text">Componentes:</dt>{" "}
          <dd className="inline"><GlossaryText text={scene.nodes.map((node) => node.name).join(" · ")} /></dd>
        </div>
        <div>
          <dt className="inline font-semibold text-core-text">Relaciones:</dt>{" "}
          <dd className="inline">{scene.edges.length} (<GlossaryText text={relationKinds} />)</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-core-text">Evidencia:</dt>{" "}
          <dd className="inline">{citedSources.length} fuente(s) citada(s) para este paso</dd>
        </div>
      </dl>
    </section>
  );
}
