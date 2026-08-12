import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import type { AudienceMode } from "./AudienceModeToggle";

interface AudienceOutcomePanelProps {
  mode: AudienceMode;
  meta: ExplainerMeta;
  step: ExplainerStep;
}

/** Keeps the intended takeaway visible without creating a second copy layer. */
export function AudienceOutcomePanel({ mode, meta, step }: AudienceOutcomePanelProps) {
  if (mode === "technical") return null;

  return (
    <details className="mb-5 border border-core-accent/20 bg-core-accent/[0.04] px-3 py-2">
      <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-accent transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
        Qué debe quedar claro
      </summary>
      <div className="mt-2.5 space-y-2 border-t border-core-accent/15 pt-2.5">
        <p className="text-[0.72rem] leading-relaxed text-core-text-secondary">
          <span className="font-semibold text-core-text">Problema:</span> {meta.tagline}
        </p>
        <p className="text-[0.72rem] leading-relaxed text-core-text-secondary">
          <span className="font-semibold text-core-text">Recorrido:</span> {step.caption}
        </p>
        <p className="text-[0.72rem] leading-relaxed text-core-text-secondary">
          <span className="font-semibold text-core-text">Decisión:</span> {step.businessImpact}
        </p>
      </div>
    </details>
  );
}
