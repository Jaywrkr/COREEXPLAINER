import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import type { AudienceMode } from "./AudienceModeToggle";
import { GlossaryText } from "./GlossaryText";

interface CanvasContextCardProps {
  meta: ExplainerMeta;
  step: ExplainerStep;
  current: number;
  total: number;
  audienceMode: AudienceMode;
}

const modeLabels: Record<AudienceMode, string> = { client: "Cliente", conceptual: "Conceptual", technical: "Técnico" };

/** Answers “where am I and why does this scene matter?” without duplicating the full panel. */
export function CanvasContextCard({ meta, step, current, total, audienceMode }: CanvasContextCardProps) {
  if (audienceMode === "client") return null;
  const lead = step.paragraphs[0] ?? step.caption;
  return (
    <section className="pointer-events-auto max-w-[min(31rem,72vw)] border border-core-border/[0.14] bg-core-panel/90 px-3 py-2.5 shadow-lg backdrop-blur-md" aria-label="Contexto de la escena">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-core-accent">{meta.title}</p>
        <span className="text-core-text-muted" aria-hidden="true">·</span>
        <p className="text-[0.62rem] text-core-text-secondary">{step.tag}</p>
        <span className="text-core-text-muted" aria-hidden="true">·</span>
        <p className="font-mono text-[0.58rem] text-core-text-muted">Paso {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</p>
        <span className="border border-core-border/[0.12] px-1.5 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.06em] text-core-text-muted">{modeLabels[audienceMode]}</span>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[0.72rem] leading-relaxed text-core-text-secondary"><GlossaryText text={lead} /></p>
      {audienceMode !== "technical" ? (
        <details className="mt-1.5 border-t border-core-border/[0.1] pt-1.5">
          <summary className="cursor-pointer list-none font-mono text-[0.56rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">Por qué importa</summary>
          <p className="mt-1 text-[0.68rem] leading-relaxed text-core-text-secondary"><GlossaryText text={step.businessImpact} /></p>
        </details>
      ) : null}
    </section>
  );
}
