interface StepNavProps {
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  ctaLabel: string;
  onCta: () => void;
}

export function StepNav({ canGoPrev, canGoNext, onPrev, onNext, ctaLabel, onCta }: StepNavProps) {
  return (
    <div className="mt-auto flex flex-wrap gap-2 pt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev}
        className="border border-core-border/[0.09] bg-core-panel px-4 py-2 font-sans text-sm font-semibold text-core-text-secondary transition-colors hover:border-core-accent hover:text-core-text disabled:cursor-default disabled:opacity-30 disabled:hover:border-core-border/[0.09] disabled:hover:text-core-text-secondary"
      >
        ← Anterior
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className="border border-core-border/[0.09] bg-core-panel px-4 py-2 font-sans text-sm font-semibold text-core-text-secondary transition-colors hover:border-core-accent hover:text-core-text disabled:cursor-default disabled:opacity-30 disabled:hover:border-core-border/[0.09] disabled:hover:text-core-text-secondary"
      >
        Siguiente →
      </button>
      <button
        type="button"
        onClick={onCta}
        className="border border-core-navy bg-core-navy px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#020C70]"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
