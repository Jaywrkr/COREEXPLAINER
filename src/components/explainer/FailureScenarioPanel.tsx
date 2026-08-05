import { useState } from "react";
import type { FailureScenario, GuidedScenarioStep } from "@/content/types";

interface FailureScenarioPanelProps {
  scenarios: FailureScenario[];
  activeScenarioId: string | null;
  onSelectScenario: (scenarioId: string | null) => void;
  guidedSteps: GuidedScenarioStep[];
  activeGuidedStepIndex: number;
  onGuidedStepChange: (index: number) => void;
}

const stepLabels: Record<GuidedScenarioStep["kind"], string> = {
  observe: "Observa",
  diagnose: "Diagnostica",
  recover: "Recupera",
  validate: "Valida",
};

/**
 * Guided failure simulations are deliberately content-driven. The panel
 * explains the selected outcome and walks the audience through observation,
 * diagnosis, recovery and validation without implying a production runbook.
 */
export function FailureScenarioPanel({
  scenarios,
  activeScenarioId,
  onSelectScenario,
  guidedSteps,
  activeGuidedStepIndex,
  onGuidedStepChange,
}: FailureScenarioPanelProps) {
  const [minimized, setMinimized] = useState(false);

  if (scenarios.length === 0) return null;

  const activeScenario = scenarios.find((scenario) => scenario.id === activeScenarioId) ?? null;
  const safeStepIndex = Math.min(Math.max(activeGuidedStepIndex, 0), Math.max(guidedSteps.length - 1, 0));
  const activeStep = guidedSteps[safeStepIndex] ?? null;

  return (
    <section
      aria-label="Escenarios interactivos de fallo"
      className={`absolute bottom-14 left-4 z-10 w-[min(26rem,calc(100%-2rem))] border border-core-border/[0.14] bg-core-panel/95 shadow-sm backdrop-blur-sm ${
        minimized ? "p-2.5" : "p-4"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent">
            Escenarios de fallo
          </p>
          {!minimized ? (
            <p className="mt-1 text-xs text-core-text-muted">
              Simulación conceptual: recorre la evidencia sin ejecutar cambios.
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {activeScenario ? (
            <button
              type="button"
              onClick={() => onSelectScenario(null)}
              className="font-mono text-[0.62rem] uppercase tracking-[0.06em] text-core-text-muted transition-colors hover:text-core-text"
            >
              Restaurar
            </button>
          ) : null}
          <button
            type="button"
            aria-expanded={!minimized}
            aria-controls="failure-scenario-content"
            aria-label={minimized ? "Mostrar escenarios de fallo" : "Minimizar escenarios de fallo"}
            onClick={() => setMinimized((value) => !value)}
            className="flex h-6 w-6 items-center justify-center border border-core-border/[0.14] font-mono text-sm leading-none text-core-text-muted transition-colors hover:border-core-accent hover:text-core-text"
          >
            {minimized ? "+" : "−"}
          </button>
        </div>
      </div>

      {!minimized ? (
        <div id="failure-scenario-content">
          <div className="mt-3 grid gap-1.5" role="group" aria-label="Seleccionar escenario de fallo">
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
                  <span className="mt-0.5 block text-[0.68rem] leading-relaxed text-core-text-muted">
                    {scenario.summary}
                  </span>
                </button>
              );
            })}
          </div>

          {activeScenario ? (
            <div className="mt-3 space-y-3 border-t border-core-border/[0.12] pt-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-accent">
                  Guía de análisis
                </p>
                <span className="font-mono text-[0.62rem] text-core-text-muted">
                  {guidedSteps.length ? `Paso ${safeStepIndex + 1} de ${guidedSteps.length}` : "Contexto"}
                </span>
              </div>

              {guidedSteps.length ? (
                <div className="grid grid-cols-4 gap-1" role="tablist" aria-label="Fases del escenario">
                  {guidedSteps.map((step, index) => (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={index === safeStepIndex}
                      onClick={() => onGuidedStepChange(index)}
                      className={`border px-1.5 py-1.5 text-[0.6rem] font-semibold transition-colors ${
                        index === safeStepIndex
                          ? "border-core-accent/60 bg-core-accent/10 text-core-text"
                          : "border-core-border/[0.12] text-core-text-muted hover:border-core-accent/40 hover:text-core-text"
                      }`}
                    >
                      {stepLabels[step.kind]}
                    </button>
                  ))}
                </div>
              ) : null}

              {activeStep ? (
                <div aria-live="polite" className="space-y-2">
                  <div>
                    <p className="text-sm font-semibold text-core-text">{activeStep.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-core-text-secondary">{activeStep.instruction}</p>
                  </div>
                  <div className="border-l-2 border-core-accent/70 pl-2 text-[0.68rem] leading-relaxed text-core-text-muted">
                    <p><span className="font-semibold text-core-text">Evidencia:</span> {activeStep.evidence}</p>
                    <p className="mt-1"><span className="font-semibold text-core-text">Resultado esperado:</span> {activeStep.expected}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs leading-relaxed text-core-text-secondary">{activeScenario.detail}</p>
              )}

              <div className="space-y-2 border-t border-core-border/[0.12] pt-2">
                <p className="text-[0.68rem] leading-relaxed text-core-text-muted">
                  <span className="font-semibold text-core-text">Afecta:</span> {activeScenario.affectedNodes.join(", ")}
                </p>
                <p className="border-l-2 border-core-warning pl-2 text-[0.68rem] leading-relaxed text-core-text-muted">
                  {activeScenario.limitation}
                </p>
              </div>

              {guidedSteps.length > 1 ? (
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onGuidedStepChange(Math.max(0, safeStepIndex - 1))}
                    disabled={safeStepIndex === 0}
                    className="border border-core-border/[0.14] px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.05em] text-core-text-muted transition-colors hover:border-core-accent hover:text-core-text disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={() => onGuidedStepChange(0)}
                    className="px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.05em] text-core-text-muted transition-colors hover:text-core-text"
                  >
                    Reiniciar guía
                  </button>
                  <button
                    type="button"
                    onClick={() => onGuidedStepChange(Math.min(guidedSteps.length - 1, safeStepIndex + 1))}
                    disabled={safeStepIndex === guidedSteps.length - 1}
                    className="border border-core-accent/50 bg-core-accent/10 px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.05em] text-core-text transition-colors hover:bg-core-accent/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Siguiente
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="mt-3 border-t border-core-border/[0.12] pt-3 text-[0.68rem] leading-relaxed text-core-text-muted">
              Selecciona un escenario para recorrer qué cambia, qué evidencia buscar y qué condiciones siguen siendo necesarias.
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}
