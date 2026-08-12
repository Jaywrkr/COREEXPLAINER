interface PresentationControlsProps {
  active: boolean;
  playing: boolean;
  current: number;
  total: number;
  onEnter: () => void;
  onExit: () => void;
  onTogglePlaying: () => void;
  onReset: () => void;
}

/** Controls the guided delivery of an explainer without changing its content. */
export function PresentationControls({
  active,
  playing,
  current,
  total,
  onEnter,
  onExit,
  onTogglePlaying,
  onReset,
}: PresentationControlsProps) {
  if (!active) {
    return (
      <button type="button" onClick={onEnter} className="mt-3 w-full border border-core-border/[0.12] px-3 py-2 text-left font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:border-core-accent/50 hover:text-core-text">
        Presentar <span aria-hidden="true" className="float-right text-core-accent">→</span>
      </button>
    );
  }
  return (
    <section
      aria-label="Modo presentación"
      className="mt-4 border border-core-border/[0.12] bg-core-panel/70 p-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-baseline gap-2">
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent">
            Modo presentación
          </p>
          <p className="text-[0.62rem] leading-relaxed text-core-text-muted">
            {active
              ? `Paso ${current + 1} de ${total} · ${playing ? "reproducción activa" : "pausada"}`
              : "Autoplay y teclado"}
          </p>
        </div>
        <span
          className={`font-mono text-[0.6rem] uppercase tracking-[0.08em] ${
            active ? "text-core-success" : "text-core-text-muted"
          }`}
        >
          {active ? "Activa" : "Inactiva"}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {active ? (
          <>
            <button
              type="button"
              onClick={onTogglePlaying}
              className="border border-core-accent/50 px-2.5 py-1 font-mono text-[0.62rem] font-semibold text-core-text transition-colors hover:bg-core-accent/10"
              aria-label={playing ? "Pausar reproducción" : "Reproducir pasos"}
            >
              {playing ? "Pausar" : "Reproducir"}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="border border-core-border/[0.14] px-2.5 py-1 font-mono text-[0.62rem] text-core-text-secondary transition-colors hover:border-core-accent/50 hover:text-core-text"
            >
              Reiniciar
            </button>
            <button
              type="button"
              onClick={onExit}
              className="border border-core-border/[0.14] px-2.5 py-1 font-mono text-[0.62rem] text-core-text-secondary transition-colors hover:border-core-accent/50 hover:text-core-text"
            >
              Salir
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onEnter}
            className="border border-core-accent/60 bg-core-accent/10 px-2.5 py-1 font-mono text-[0.62rem] font-semibold text-core-text transition-colors hover:bg-core-accent/20"
          >
            Iniciar presentación
          </button>
        )}
      </div>

      {active ? (
        <p className="mt-2 border-t border-core-border/[0.1] pt-2 font-mono text-[0.56rem] leading-relaxed text-core-text-muted">
          ←/→ avanzar · Home/End ir al inicio o final · Espacio pausar · Esc salir
        </p>
      ) : null}
    </section>
  );
}
