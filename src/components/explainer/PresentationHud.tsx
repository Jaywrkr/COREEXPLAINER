interface PresentationHudProps {
  playing: boolean;
  current: number;
  total: number;
  visible: boolean;
  onTogglePlaying: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onExit: () => void;
  onReset: () => void;
}

/** Minimal, canvas-local controls for client-facing presentations. */
export function PresentationHud({
  playing,
  current,
  total,
  visible,
  onTogglePlaying,
  onPrevious,
  onNext,
  onExit,
  onReset,
}: PresentationHudProps) {
  return (
    <div
      aria-label="Controles de presentación"
      className={`pointer-events-auto absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 border border-core-border/[0.16] bg-core-panel/90 p-1.5 shadow-xl backdrop-blur-md transition-opacity duration-300 sm:bottom-4 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      role="toolbar"
    >
      <button type="button" onClick={onPrevious} disabled={current <= 0} className="h-7 w-7 border border-core-border/[0.14] font-mono text-xs text-core-text-muted transition-colors hover:border-core-accent/60 hover:text-core-text disabled:cursor-not-allowed disabled:opacity-35" aria-label="Escena anterior" title="Escena anterior">
        ←
      </button>
      <button type="button" onClick={onTogglePlaying} className="min-w-[5rem] border border-core-accent/50 px-2 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.06em] text-core-text transition-colors hover:bg-core-accent/10" aria-label={playing ? "Pausar presentación" : "Reproducir presentación"}>
        {playing ? "Pausar" : "Reproducir"}
      </button>
      <button type="button" onClick={onNext} disabled={current >= total - 1} className="h-7 w-7 border border-core-border/[0.14] font-mono text-xs text-core-text-muted transition-colors hover:border-core-accent/60 hover:text-core-text disabled:cursor-not-allowed disabled:opacity-35" aria-label="Escena siguiente" title="Escena siguiente">
        →
      </button>
      <span className="mx-1 min-w-[3.8rem] text-center font-mono text-[0.58rem] text-core-text-muted" aria-live="polite">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <button type="button" onClick={onReset} className="hidden border border-core-border/[0.14] px-2 py-1.5 font-mono text-[0.58rem] text-core-text-muted transition-colors hover:border-core-accent/60 hover:text-core-text sm:block" aria-label="Reiniciar presentación">
        Reiniciar
      </button>
      <button type="button" onClick={onExit} className="border border-core-border/[0.14] px-2 py-1.5 font-mono text-[0.58rem] text-core-text-muted transition-colors hover:border-core-accent/60 hover:text-core-text" aria-label="Salir del modo presentación">
        Salir
      </button>
    </div>
  );
}
