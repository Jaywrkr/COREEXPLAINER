export type AudienceMode = "client" | "technical";

interface AudienceModeToggleProps {
  mode: AudienceMode;
  onChange: (mode: AudienceMode) => void;
}

/** Switches between the concise client narrative and the technical audit view. */
export function AudienceModeToggle({ mode, onChange }: AudienceModeToggleProps) {
  return (
    <fieldset className="mb-4 flex items-center gap-2 border border-core-border/[0.12] bg-core-panel/50 px-2 py-1.5">
      <legend className="sr-only">Nivel de explicación</legend>
      <span className="shrink-0 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">
        Nivel
      </span>
      <div className="grid flex-1 grid-cols-2 gap-0.5" role="group" aria-label="Seleccionar nivel de explicación">
        {(["client", "technical"] as const).map((option) => {
          const selected = option === mode;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`px-2 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.05em] transition-colors ${
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
    </fieldset>
  );
}
