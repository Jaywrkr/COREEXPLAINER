import { GlossaryText } from "./GlossaryText";

interface ClientStoryCardProps {
  stepTitle: string;
  lead: string;
  businessImpact: string;
  additionalDetail?: string;
}

/** The first reading surface: one idea, its impact, and optional context. */
export function ClientStoryCard({ stepTitle, lead, businessImpact, additionalDetail }: ClientStoryCardProps) {
  return (
    <section aria-label="Resumen para cliente" className="mb-4 border-l-2 border-core-accent bg-core-panel/35 px-3 py-3">
      <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.1em] text-core-accent">Idea clave</p>
      <h2 className="mt-1 text-[0.98rem] font-semibold leading-snug text-core-text"><GlossaryText text={stepTitle} /></h2>
      <p className="mt-1.5 text-[0.76rem] leading-relaxed text-core-text-secondary"><GlossaryText text={lead} /></p>
      <p className="mt-2 border-t border-core-border/[0.1] pt-2 text-[0.7rem] leading-relaxed text-core-text"><span className="font-semibold">Impacto:</span> <GlossaryText text={businessImpact} /></p>
      {additionalDetail ? (
        <details className="mt-2 border-t border-core-border/[0.1] pt-2">
          <summary className="cursor-pointer list-none font-mono text-[0.56rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">Ver contexto</summary>
          <p className="mt-2 text-[0.72rem] leading-relaxed text-core-text-secondary"><GlossaryText text={additionalDetail} /></p>
        </details>
      ) : null}
    </section>
  );
}
