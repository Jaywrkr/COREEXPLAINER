export type AudienceMode = "client" | "conceptual" | "technical";

interface AudienceModeToggleProps {
  mode: AudienceMode;
  onChange: (mode: AudienceMode) => void;
}

/** Keeps the first decision understandable: read simply or open the technical layer. */
export function AudienceModeToggle({ mode, onChange }: AudienceModeToggleProps) {
  const options: AudienceMode[] = ["client", "technical"];
  const labels: Record<AudienceMode, string> = {
    client: "Cliente",
    conceptual: "Conceptual",
    technical: "Detalle técnico",
  };
  const descriptions: Record<AudienceMode, string> = {
    client: "Qué problema resuelve y por qué importa.",
    conceptual: "Cómo se relacionan las piezas principales.",
    technical: "Detalle de arquitectura, evidencia y límites.",
  };

  return (
    <fieldset className="mb-3 border-t border-core-border/[0.1] pt-2.5">
      <legend className="sr-only">Nivel de detalle</legend>
      <div className="flex items-center justify-between gap-3">
        <span className="shrink-0 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">Vista</span>
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-0.5" role="group" aria-label="Seleccionar nivel de detalle">
          {options.map((option) => {
            const selected = option === mode;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                title={descriptions[option]}
                onClick={() => onChange(option)}
                className={`px-1.5 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.04em] transition-colors ${
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
