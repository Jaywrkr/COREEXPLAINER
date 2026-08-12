import { GlossaryText } from "./GlossaryText";

interface ClientStoryCardProps {
  stepTitle: string;
  lead: string;
  businessImpact: string;
}

/**
 * Client-first narrative surface. It keeps the first reading focused on
 * outcome and decision context; the technical detail remains opt-in.
 */
export function ClientStoryCard({ stepTitle, lead, businessImpact }: ClientStoryCardProps) {
  return (
    <section aria-label="Resumen para cliente" className="mb-4 overflow-hidden rounded-sm border border-core-accent/25 bg-gradient-to-br from-core-accent/[0.09] via-core-panel/50 to-transparent shadow-[0_12px_32px_rgb(var(--color-accent)/0.06)]">
      <div className="border-b border-core-accent/15 px-3.5 py-3">
        <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-core-accent">Idea clave</p>
        <h2 className="mt-1 text-[0.98rem] font-semibold leading-snug text-core-text"><GlossaryText text={stepTitle} /></h2>
        <p className="mt-1.5 text-[0.76rem] leading-relaxed text-core-text-secondary"><GlossaryText text={lead} /></p>
      </div>
      <div className="bg-core-panel/45 px-3.5 py-2.5">
        <p className="font-mono text-[0.54rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted">Qué cambia</p>
        <p className="mt-1 text-[0.7rem] leading-relaxed text-core-text"><GlossaryText text={businessImpact} /></p>
      </div>
    </section>
  );
}
