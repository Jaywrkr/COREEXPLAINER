export type AudienceMode = "client" | "conceptual" | "technical";

interface AudienceModeToggleProps {
  mode: AudienceMode;
  onChange: (mode: AudienceMode) => void;
}

/** Lets each person choose the depth that matches their context. */
export function AudienceModeToggle({ mode, onChange }: AudienceModeToggleProps) {
  const options: AudienceMode[] = ["client", "conceptual", "technical"];
  const labels: Record<AudienceMode, string> = {
    client: "Cliente",
    conceptual: "Conceptual",
    technical: "Técnico",
  };
  const descriptions: Record<AudienceMode, string> = {
    client: "Qué problema resuelve y por qué importa.",
    conceptual: "Cómo se relacionan las piezas principales.",
    technical: "Detalle de arquitectura, evidencia y límites.",
  };

  return (
    <fieldset className="mb-4 flex items-center gap-2 border-t border-core-border/[0.1] py-2.5">
      <legend className="sr-only">Nivel de explicación</legend>
      <span className="mt-1 shrink-0 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">
        Nivel
      </span>
      <div className="min-w-0 flex-1">
        <div className="grid grid-cols-3 gap-0.5" role="group" aria-label="Seleccionar nivel de explicación">
          {options.map((option) => {
            const selected = option === mode;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                title={descriptions[option]}
                onClick={() => onChange(option)}
                className={`px-1.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.04em] transition-colors ${
                  selected
                    ? "bg-core-accent text-core-bg"
                    : "text-core-text-muted hover:bg-core-accent/10 hover:text-core-text"
                }`}
              >
                {labels[option]}
              </button>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}
