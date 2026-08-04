export type AudienceMode = "client" | "technical";

interface AudienceModeToggleProps {
  mode: AudienceMode;
  onChange: (mode: AudienceMode) => void;
}

/** Switches between the concise client narrative and the technical audit view. */
export function AudienceModeToggle({ mode, onChange }: AudienceModeToggleProps) {
  return (
    <fieldset className="mb-5 border border-core-border/[0.12] bg-core-panel/50 p-2.5">
      <legend className="px-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted">
        Nivel de explicación
      </legend>
      <div className="mt-1.5 grid grid-cols-2 gap-1" role="group" aria-label="Seleccionar nivel de explicación">
        {(["client", "technical"] as const).map((option) => {
          const selected = option === mode;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`px-2 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.06em] transition-colors ${
                selected
                  ? "bg-core-accent text-core-bg"
                  : "text-core-text-muted hover:bg-core-accent/10 hover:text-core-text"
              }`}
            >
              {option === "client" ? "Cliente" : "Técnico"}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[0.68rem] leading-relaxed text-core-text-muted">
        {mode === "client"
          ? "Resumen orientado a decisiones, impacto y conversación."
          : "Componentes, relaciones, límites y evidencia de la escena activa."}
      </p>
    </fieldset>
  );
}
