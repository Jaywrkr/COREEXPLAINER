import type { FailureScenario } from "@/content/types";

interface FailureScenarioPanelProps {
  scenarios: FailureScenario[];
  activeScenarioId: string | null;
  onSelectScenario: (scenarioId: string | null) => void;
}

/**
 * Guided failure simulations are deliberately content-driven. This panel
 * explains the selected outcome and its limits instead of implying an SLA or
 * a universal recovery guarantee.
 */
export function FailureScenarioPanel({
  scenarios,
  activeScenarioId,
  onSelectScenario,
}: FailureScenarioPanelProps) {
  if (scenarios.length === 0) return null;

  const activeScenario = scenarios.find((scenario) => scenario.id === activeScenarioId) ?? null;

  return (
    <section
      aria-label="Escenarios interactivos de fallo"
      className="absolute bottom-14 left-4 z-10 w-[min(23rem,calc(100%-2rem))] border border-core-border/[0.14] bg-core-panel/95 p-4 shadow-sm backdrop-blur-sm"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent">
            Escenarios de fallo
          </p>
          <p className="mt-1 text-xs text-core-text-muted">Simulación conceptual, no una garantía de disponibilidad.</p>
        </div>
        {activeScenario ? (
          <button
            type="button"
            onClick={() => onSelectScenario(null)}
            className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-core-text-muted transition-colors hover:text-core-text"
          >
            Restaurar
          </button>
        ) : null}
      </div>

      <div className="grid gap-1.5" role="group" aria-label="Seleccionar escenario de fallo">
        {scenarios.map((scenario) => {
          const selected = scenario.id === activeScenarioId;
          return (
            <button
              key={scenario.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelectScenario(selected ? null : scenario.id)}
              className={`border px-3 py-2 text-left transition-colors ${
                selected
                  ? "border-core-accent/60 bg-core-accent/10 text-core-text"
                  : "border-core-border/[0.12] text-core-text-secondary hover:border-core-accent/40 hover:bg-core-accent/[0.06] hover:text-core-text"
              }`}
            >
              <span className="block text-xs font-semibold">{scenario.label}</span>
              <span className="mt-0.5 block text-[0.68rem] leading-relaxed text-core-text-muted">{scenario.summary}</span>
            </button>
          );
        })}
      </div>

      {activeScenario ? (
        <div className="mt-3 space-y-2 border-t border-core-border/[0.12] pt-3">
          <p className="text-xs leading-relaxed text-core-text-secondary">{activeScenario.detail}</p>
          <p className="text-[0.68rem] leading-relaxed text-core-text-muted">
            <span className="font-semibold text-core-text">Afecta:</span> {activeScenario.affectedNodes.join(", ")}
          </p>
          <p className="border-l-2 border-core-warning pl-2 text-[0.68rem] leading-relaxed text-core-text-muted">
            {activeScenario.limitation}
          </p>
        </div>
      ) : (
        <p className="mt-3 border-t border-core-border/[0.12] pt-3 text-[0.68rem] leading-relaxed text-core-text-muted">
          Selecciona un escenario para ver qué cambia y qué condiciones siguen siendo necesarias.
        </p>
      )}
    </section>
  );
}
