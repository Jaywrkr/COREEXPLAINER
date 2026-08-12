import { useEffect, useState } from "react";
import type {
  FailureScenario,
  GuidedScenarioStep,
  GuidedScenarioDecisionOutcome,
  TechnicalIntegrityReport,
  TechnicalSource,
  TargetArchitecture,
} from "@/content/types";
import type { Scene } from "@/lib/animation-spec/types";
import { evaluateWhatIfImpact } from "@/lib/semantic-model/evaluateWhatIf";
import { evaluateTechnicalRules, type TechnicalFindingSeverity } from "@/lib/semantic-model/evaluateTechnicalRules";
import { generateAssistedTechnicalReview, type AssistedReviewSeverity, type AssistedTechnicalReview } from "@/lib/ai/technicalReviewAssistant";
import { explainWhatIfImpact } from "@/lib/ai/whatIfImpactAssistant";
import { EvidenceTrackerPanel } from "./EvidenceTrackerPanel";
import { useDraggablePanel } from "./useDraggablePanel";
import { GlossaryText } from "./GlossaryText";
import { canAdvanceGuidedStep, guidedProgress } from "@/lib/scenarios/guidedProgress";
import { recordProductEvent } from "@/lib/telemetry/productTelemetry";

interface FailureScenarioPanelProps {
  scene: Scene;
  explainerSlug: string;
  targetArchitecture?: TargetArchitecture;
  integrityReport: TechnicalIntegrityReport | null;
  scenarios: FailureScenario[];
  activeScenarioId: string | null;
  onSelectScenario: (scenarioId: string | null) => void;
  guidedSteps: GuidedScenarioStep[];
  activeGuidedStepIndex: number;
  onGuidedStepChange: (index: number) => void;
  technicalSources: TechnicalSource[];
  selectedDecisionOptionId: string | null;
  onDecisionOptionChange: (optionId: string | null) => void;
}

const stepLabels: Record<GuidedScenarioStep["kind"], string> = {
  observe: "Observa",
  diagnose: "Diagnostica",
  recover: "Recupera",
  validate: "Valida",
};

const decisionTone: Record<GuidedScenarioDecisionOutcome, string> = {
  recommended: "border-core-success/50 bg-core-success/10 text-core-text",
  incomplete: "border-core-warning/50 bg-core-warning/10 text-core-text",
  unsafe: "border-core-error/50 bg-core-error/10 text-core-text",
};

const decisionToneLabel: Record<GuidedScenarioDecisionOutcome, string> = {
  recommended: "Lectura recomendada",
  incomplete: "Necesita más evidencia",
  unsafe: "No es suficiente",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'\"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

/**
 * Guided failure simulations are deliberately content-driven. The panel
 * explains the selected outcome and walks the audience through observation,
 * diagnosis, recovery and validation without implying a production runbook.
 */
export function FailureScenarioPanel({
  scene,
  explainerSlug,
  targetArchitecture,
  integrityReport,
  scenarios,
  activeScenarioId,
  onSelectScenario,
  guidedSteps,
  activeGuidedStepIndex,
  onGuidedStepChange,
  technicalSources,
  selectedDecisionOptionId,
  onDecisionOptionChange,
}: FailureScenarioPanelProps) {
  const [minimized, setMinimized] = useState(true);
  const [checklist, setChecklist] = useState<Record<string, "done" | "na">>({});
  const [checklistReady, setChecklistReady] = useState(false);
  const [roadmapStatus, setRoadmapStatus] = useState<Record<string, "done" | "na">>({});
  const [roadmapReady, setRoadmapReady] = useState(false);
  const [selectedDecisionLabId, setSelectedDecisionLabId] = useState<string | null>(null);
  const [assistedReview, setAssistedReview] = useState<AssistedTechnicalReview | null>(null);
  const { panelRef, panelStyle, dragHandleProps, isDragging } = useDraggablePanel();
  const activeScenario = scenarios.find((scenario) => scenario.id === activeScenarioId) ?? null;
  const checklistKey = activeScenario ? `core-explainer:verification:${explainerSlug}:${activeScenario.id}` : null;
  const roadmapKey = activeScenario ? `core-explainer:roadmap:${explainerSlug}:${activeScenario.id}` : null;
  const safeStepIndex = Math.min(Math.max(activeGuidedStepIndex, 0), Math.max(guidedSteps.length - 1, 0));
  const activeStep = guidedSteps[safeStepIndex] ?? null;
  const selectedDecisionOption = activeStep?.decision?.options.find(
    (option) => option.id === selectedDecisionOptionId,
  ) ?? null;
  const activeSources = (activeStep?.sourceIds ?? [])
    .map((sourceId) => technicalSources.find((source) => source.id === sourceId))
    .filter((source): source is TechnicalSource => Boolean(source));
  const whatIfImpact = activeScenario ? evaluateWhatIfImpact(scene, activeScenario.deadNodeIds, activeScenario.simulation) : null;
  const technicalFindings = whatIfImpact ? evaluateTechnicalRules(scene, whatIfImpact, integrityReport) : [];
  const reviewedStepCount = Object.keys(checklist).length;
  const progress = guidedProgress(guidedSteps, checklist);
  const canAdvanceStep = canAdvanceGuidedStep(guidedSteps, safeStepIndex, checklist);
  const openFindingCount = technicalFindings.filter((finding) => finding.severity !== "info").length;
  const criticalFindingCount = technicalFindings.filter((finding) => finding.severity === "critical").length;
  const linkedSourceCount = new Set(technicalFindings.flatMap((finding) => finding.sourceIds ?? [])).size;
  const roadmapPhases = targetArchitecture?.roadmap ?? [];
  const reviewedRoadmapCount = Object.keys(roadmapStatus).length;
  const selectedDecisionLab = targetArchitecture?.decisionOptions?.find((option) => option.id === selectedDecisionLabId) ?? null;
  const whatIfSummary = activeScenario && whatIfImpact
    ? explainWhatIfImpact(scene, activeScenario, whatIfImpact, targetArchitecture)
    : null;
  const runAssistedReview = () => {
    setAssistedReview(generateAssistedTechnicalReview({ scene, targetArchitecture, integrityReport, scenarios, technicalSources }));
  };

  useEffect(() => {
    setChecklistReady(false);
    if (!checklistKey) {
      setChecklist({});
      setChecklistReady(true);
      return;
    }
    try {
      const saved = window.localStorage.getItem(checklistKey);
      const parsed = saved ? JSON.parse(saved) : {};
      setChecklist(parsed && typeof parsed === "object" ? parsed : {});
    } catch {
      setChecklist({});
    } finally {
      setChecklistReady(true);
    }
  }, [checklistKey]);

  useEffect(() => {
    if (!checklistReady || !checklistKey) return;
    try {
      window.localStorage.setItem(checklistKey, JSON.stringify(checklist));
    } catch {
      // The checklist remains usable for the current session if storage is unavailable.
    }
  }, [checklist, checklistKey, checklistReady]);

  useEffect(() => {
    setRoadmapReady(false);
    if (!roadmapKey) {
      setRoadmapStatus({});
      setRoadmapReady(true);
      return;
    }
    try {
      const saved = window.localStorage.getItem(roadmapKey);
      const parsed = saved ? JSON.parse(saved) : {};
      setRoadmapStatus(parsed && typeof parsed === "object" ? parsed : {});
    } catch {
      setRoadmapStatus({});
    } finally {
      setRoadmapReady(true);
    }
  }, [roadmapKey]);

  useEffect(() => {
    if (!roadmapReady || !roadmapKey) return;
    try {
      window.localStorage.setItem(roadmapKey, JSON.stringify(roadmapStatus));
    } catch {
      // Roadmap progress remains usable for the current session if storage is unavailable.
    }
  }, [roadmapKey, roadmapReady, roadmapStatus]);

  const toggleChecklistItem = (stepId: string) => {
    setChecklist((current) => {
      const status = current[stepId];
      const nextStatus = !status ? "done" : status === "done" ? "na" : "pending";
      if (activeScenario) recordProductEvent({ name: "scenario-step-reviewed", slug: explainerSlug, id: `${activeScenario.id}:${stepId}:${nextStatus}` });
      if (!status) return { ...current, [stepId]: "done" };
      if (status === "done") return { ...current, [stepId]: "na" };
      const next = { ...current };
      delete next[stepId];
      return next;
    });
  };

  const toggleRoadmapPhase = (phaseId: string) => {
    setRoadmapStatus((current) => {
      const status = current[phaseId];
      if (!status) return { ...current, [phaseId]: "done" };
      if (status === "done") return { ...current, [phaseId]: "na" };
      const next = { ...current };
      delete next[phaseId];
      return next;
    });
  };

  const downloadSessionSummary = () => {
    if (!activeScenario) return;
    const generatedAt = new Date().toLocaleDateString("es-EC", { dateStyle: "long" });
    const checklistRows = guidedSteps.map((step) => {
      const status = checklist[step.id] === "done" ? "Revisado" : checklist[step.id] === "na" ? "No aplica" : "Pendiente";
      return `<li><strong>${escapeHtml(step.title)}</strong>: ${status}</li>`;
    }).join("");
    const roadmapRows = roadmapPhases.map((phase) => {
      const status = roadmapStatus[phase.id] === "done" ? "Revisada" : roadmapStatus[phase.id] === "na" ? "No aplica" : "Pendiente";
      return `<li><strong>${escapeHtml(phase.title)}</strong>: ${status}<br>${escapeHtml(phase.objective)}<br><em>Evidencia:</em> ${escapeHtml(phase.evidence)}<br><em>Salida:</em> ${escapeHtml(phase.exitCriteria)}</li>`;
    }).join("");
    const findingRows = technicalFindings.map((finding) => (
      `<li><strong>${escapeHtml(finding.title)}</strong><br>${escapeHtml(finding.detail)}<br><em>Evidencia:</em> ${escapeHtml(finding.evidence)}<br><em>Recomendacion:</em> ${escapeHtml(finding.recommendation)}</li>`
    )).join("");
    const sourceIds = new Set(technicalFindings.flatMap((finding) => finding.sourceIds ?? []));
    const sourceRows = technicalSources.filter((source) => sourceIds.has(source.id)).map((source) => (
      `<li><a href="${escapeHtml(source.url)}">${escapeHtml(source.title)}</a> · consultada ${escapeHtml(source.accessedAt)}</li>`
    )).join("");
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Ficha de sesión · ${escapeHtml(activeScenario.label)}</title><style>body{font:16px system-ui,sans-serif;max-width:820px;margin:40px auto;padding:0 20px;color:#172033}h1{margin-bottom:4px}h2{margin-top:28px;border-bottom:1px solid #d8dee8;padding-bottom:6px}li{margin:8px 0;line-height:1.45}.meta{color:#5b6678;font-size:14px}.note{border-left:4px solid #64748b;padding:10px 14px;background:#f4f6f8}@media print{body{margin:0}}</style></head><body><h1>Ficha de sesión</h1><p class="meta">CORESOLUTIONS · ${escapeHtml(explainerSlug)} · ${generatedAt}</p><h2>Escenario</h2><p><strong>${escapeHtml(activeScenario.label)}</strong></p><p>${escapeHtml(activeScenario.summary)}</p><h2>Resumen</h2><ul><li>Pasos revisados: ${reviewedStepCount}/${guidedSteps.length}</li><li>Fases de roadmap revisadas: ${reviewedRoadmapCount}/${roadmapPhases.length}</li><li>Hallazgos abiertos: ${openFindingCount}</li><li>Hallazgos críticos: ${criticalFindingCount}</li><li>Fuentes enlazadas: ${linkedSourceCount}</li></ul><h2>Roadmap de assessment</h2><ul>${roadmapRows || "<li>No hay roadmap autorado.</li>"}</ul><h2>Checklist</h2><ul>${checklistRows || "<li>No hay pasos guiados.</li>"}</ul><h2>Hallazgos</h2><ul>${findingRows || "<li>No hay hallazgos calculados.</li>"}</ul><h2>Fuentes</h2><ul>${sourceRows || "<li>No hay fuentes enlazadas a los hallazgos.</li>"}</ul><p class="note">Esta ficha resume un escenario conceptual del explainer. No certifica una configuración real, no reemplaza pruebas funcionales y no constituye un runbook de producción.</p></body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `coresolutions-${explainerSlug}-${activeScenario.id}-sesion.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!activeStep?.decision && selectedDecisionOptionId) onDecisionOptionChange(null);
  }, [activeStep?.decision, onDecisionOptionChange, selectedDecisionOptionId]);

  if (scenarios.length === 0) return null;

  return (
    <section
      ref={panelRef}
      aria-label="Escenarios interactivos de fallo"
      style={panelStyle}
      className={`absolute right-4 top-[4.2rem] z-10 max-h-[calc(100%-6.2rem)] w-[min(22rem,calc(100%-2rem))] overflow-y-auto border border-core-border/[0.14] bg-core-panel/95 shadow-sm backdrop-blur-sm ${
        minimized ? "p-2.5" : "p-4"
      } ${isDragging ? "select-none" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <button
            type="button"
            aria-label="Arrastrar escenarios de fallo"
            title="Arrastra para mover"
            className="mt-0.5 cursor-grab touch-none select-none px-1 font-mono text-xs text-core-text-muted active:cursor-grabbing"
            {...dragHandleProps}
          >
            ⠿
          </button>
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
          {minimized && activeScenario ? (
            <p className="mt-1 truncate text-[0.66rem] text-core-text-secondary"><GlossaryText text={activeScenario.label} /></p>
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
                  <span className="block text-xs font-semibold"><GlossaryText text={scenario.label} /></span>
                  <span className="mt-0.5 block text-[0.68rem] leading-relaxed text-core-text-muted">
                    <GlossaryText text={scenario.summary} />
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
                    <p className="text-sm font-semibold text-core-text"><GlossaryText text={activeStep.title} /></p>
                    <p className="mt-1 text-xs leading-relaxed text-core-text-secondary"><GlossaryText text={activeStep.instruction} /></p>
                  </div>
                  {roadmapPhases.length ? (
                    <div className="mt-1.5 border border-core-border/[0.12] px-2 py-1.5 text-[0.64rem]">
                      <p className="text-core-text-muted">Roadmap revisado</p>
                      <p className="mt-0.5 font-mono text-core-text">{reviewedRoadmapCount}/{roadmapPhases.length} fases</p>
                    </div>
                  ) : null}
                  <div className="border-l-2 border-core-accent/70 pl-2 text-[0.68rem] leading-relaxed text-core-text-muted">
                    <p><span className="font-semibold text-core-text">Evidencia:</span> <GlossaryText text={activeStep.evidence} /></p>
                    <p className="mt-1"><span className="font-semibold text-core-text">Resultado esperado:</span> <GlossaryText text={activeStep.expected} /></p>
                    {activeSources.some((source) => source.validity === "review-needed") ? <p className="mt-1 text-core-warning">Una o más fuentes requieren revisión antes de usar este paso como respaldo técnico.</p> : null}
                  </div>
                </div>
              ) : (
                <p className="text-xs leading-relaxed text-core-text-secondary"><GlossaryText text={activeScenario.detail} /></p>
              )}

              {activeStep?.decision ? (
                <div className="space-y-2 border-t border-core-border/[0.12] pt-2">
                  <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-accent">
                    Checkpoint de decisiÃ³n
                  </p>
                  <p className="text-xs leading-relaxed text-core-text-secondary">{activeStep.decision.question}</p>
                  <div className="grid gap-1.5" role="group" aria-label="Opciones de diagnÃ³stico">
                    {activeStep.decision.options.map((option) => {
                      const selected = option.id === selectedDecisionOptionId;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => onDecisionOptionChange(selected ? null : option.id)}
                          className={`border px-2.5 py-2 text-left text-[0.68rem] leading-relaxed transition-colors ${
                            selected
                              ? decisionTone[option.outcome]
                              : "border-core-border/[0.12] text-core-text-secondary hover:border-core-accent/40 hover:bg-core-accent/[0.06] hover:text-core-text"
                          }`}
                        >
                          <GlossaryText text={option.label} />
                        </button>
                      );
                    })}
                  </div>
                  {selectedDecisionOption ? (
                    <div className={`border px-2.5 py-2 text-[0.68rem] leading-relaxed ${decisionTone[selectedDecisionOption.outcome]}`}>
                      <p className="font-semibold">{decisionToneLabel[selectedDecisionOption.outcome]}</p>
                      <p className="mt-1"><GlossaryText text={selectedDecisionOption.feedback} /></p>
                    </div>
                  ) : (
                    <p className="text-[0.66rem] leading-relaxed text-core-text-muted">
                      Selecciona una hipÃ³tesis para ver quÃ© evidencia aporta y cÃ³mo cambia el foco del diagrama.
                    </p>
                  )}
                </div>
              ) : null}

              {activeSources.length ? (
                <div className="border-t border-core-border/[0.12] pt-2">
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">
                    Fuentes de esta fase
                  </p>
                  <div className="mt-1.5 grid gap-1">
                    {activeSources.map((source) => (
                      <a
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-[0.65rem] leading-relaxed underline decoration-core-accent/40 underline-offset-2 transition-colors hover:text-core-accent ${source.validity === "review-needed" ? "text-core-warning" : "text-core-text-secondary"}`}
                      > <span className="mr-1 font-semibold">{source.validity === "review-needed" ? "Revisar" : "Vigente"}</span>
                        {source.title} · revisada {source.accessedAt}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {guidedSteps.length ? (
                <details className="border-t border-core-border/[0.12] pt-2">
                  <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted [&::-webkit-details-marker]:hidden">
                    Checklist de verificación · {progress.reviewed}/{progress.total} · {progress.percent}%
                  </summary>
                  <div className="mt-2 space-y-1">
                    {guidedSteps.map((step) => {
                      const status = checklist[step.id];
                      const label = status === "done" ? "Revisado" : status === "na" ? "No aplica" : "Pendiente";
                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => toggleChecklistItem(step.id)}
                          className={`flex w-full items-center justify-between gap-2 border px-2 py-1.5 text-left text-[0.64rem] transition-colors ${
                            status === "done"
                              ? "border-core-success/40 bg-core-success/10 text-core-text"
                              : status === "na"
                                ? "border-core-border/30 bg-core-panel text-core-text-muted"
                                : "border-core-border/[0.12] text-core-text-secondary hover:border-core-accent/40"
                          }`}
                          aria-label={`${step.title}: ${label}. Pulsar para cambiar estado.`}
                        >
                          <span className="min-w-0 truncate"><GlossaryText text={step.title} /></span>
                          <span className="shrink-0 font-mono text-[0.56rem] uppercase tracking-[0.05em]">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1 text-[0.58rem] text-core-text-muted">Solo se guarda en este navegador. Pulsa cada fila para cambiar: pendiente → revisado → no aplica.</p>
                </details>
              ) : null}

              {activeScenario ? (
                <details className="border-t border-core-border/[0.12] pt-2">
                  <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted [&::-webkit-details-marker]:hidden">
                    Resumen de sesión
                  </summary>
                  <div className="mt-2 grid grid-cols-2 gap-1.5 text-[0.64rem]">
                    <div className="border border-core-border/[0.12] px-2 py-1.5">
                      <p className="text-core-text-muted">Pasos revisados</p>
                      <p className="mt-0.5 font-mono text-core-text">{reviewedStepCount}/{guidedSteps.length}</p>
                    </div>
                    <div className="border border-core-border/[0.12] px-2 py-1.5">
                      <p className="text-core-text-muted">Hallazgos abiertos</p>
                      <p className={`mt-0.5 font-mono ${openFindingCount ? "text-core-warning" : "text-core-success"}`}>{openFindingCount}</p>
                    </div>
                    <div className="border border-core-border/[0.12] px-2 py-1.5">
                      <p className="text-core-text-muted">Críticos</p>
                      <p className={`mt-0.5 font-mono ${criticalFindingCount ? "text-core-error" : "text-core-success"}`}>{criticalFindingCount}</p>
                    </div>
                    <div className="border border-core-border/[0.12] px-2 py-1.5">
                      <p className="text-core-text-muted">Fuentes enlazadas</p>
                      <p className="mt-0.5 font-mono text-core-text">{linkedSourceCount}</p>
                    </div>
                  </div>
                  <p className="mt-2 border-l-2 border-core-accent/60 pl-2 text-[0.64rem] leading-relaxed text-core-text-secondary">
                    {criticalFindingCount
                      ? "La sesión aún tiene condiciones críticas que deben revisarse antes de afirmar continuidad."
                      : openFindingCount
                        ? "La sesión tiene advertencias abiertas; conviene completar la evidencia antes de cerrar la explicación."
                        : "No quedan advertencias abiertas en este escenario; confirma igualmente la prueba funcional."}
                  </p>
                  <button
                    type="button"
                    onClick={downloadSessionSummary}
                    className="mt-2 border border-core-accent/40 px-2 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.06em] text-core-accent transition-colors hover:border-core-accent hover:bg-core-accent/10"
                  >
                    Descargar ficha HTML
                  </button>
                </details>
              ) : null}

              {whatIfSummary ? (
                <details className="border-t border-core-border/[0.12] pt-2">
                  <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted [&::-webkit-details-marker]:hidden">
                    Lectura asistida del impacto
                  </summary>
                  <div className="mt-2 space-y-1.5 text-[0.64rem] leading-relaxed text-core-text-secondary">
                    <p className="font-semibold text-core-text">{whatIfSummary.outcome}</p>
                    <p>{whatIfSummary.customerMeaning}</p>
                    <div>
                      <p className="font-semibold text-core-text">Evidencia a revisar</p>
                      <ul className="mt-0.5 list-disc space-y-0.5 pl-4">
                        {whatIfSummary.evidence.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    {whatIfSummary.relatedDecisions.length ? (
                      <div>
                        <p className="font-semibold text-core-text">Decisiones relacionadas</p>
                        <ul className="mt-0.5 list-disc space-y-0.5 pl-4">
                          {whatIfSummary.relatedDecisions.map((decision) => (
                            <li key={decision.title}>{decision.title}{decision.phaseTitles.length ? ` · fases: ${decision.phaseTitles.join(", ")}` : ""}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <p className="text-[0.58rem] text-core-text-muted">Resultado conceptual del grafo: no ejecuta una prueba ni consulta el entorno real.</p>
                  </div>
                </details>
              ) : null}

              <EvidenceTrackerPanel
                explainerSlug={explainerSlug}
                scenarioId={activeScenarioId}
                guidedSteps={guidedSteps}
                roadmapPhases={roadmapPhases}
                technicalSources={technicalSources}
              />

              {whatIfImpact ? (
                <div className="space-y-1.5 border-t border-core-border/[0.12] pt-2 text-[0.66rem] leading-relaxed text-core-text-muted">
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">
                    Impacto calculado
                  </p>
                  <p>
                    <span className="font-semibold text-core-text">Relaciones interrumpidas:</span> {whatIfImpact.brokenRelationshipCount}
                  </p>
                  <p>
                    <span className="font-semibold text-core-text">Componentes alcanzables:</span> {whatIfImpact.reachableNodeIds.length} de {scene.nodes.length}
                  </p>
                  {whatIfImpact.affectedNodeIds.length ? (
                    <p className="border-l-2 border-core-warning pl-2 text-core-warning">
                      Sin camino desde una entrada: {whatIfImpact.affectedNodeIds.map((id) => scene.nodes.find((node) => node.id === id)?.name ?? id).join(", ")}
                    </p>
                  ) : (
                    <p className="border-l-2 border-core-success pl-2 text-core-success">El resto del grafo conserva un camino desde una entrada.</p>
                  )}
                </div>
              ) : null}

              {whatIfImpact ? (
                <details className="border-t border-core-border/[0.12] pt-2">
                  <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted [&::-webkit-details-marker]:hidden">
                    Comparación actual / objetivo
                  </summary>
                  <div className="mt-2 grid grid-cols-2 gap-1.5 text-[0.64rem]">
                    <div className="border border-core-success/30 bg-core-success/5 px-2 py-1.5">
                      <p className="text-core-text-muted">Objetivo · {targetArchitecture?.label ?? "escena base"}</p>
                      <p className="mt-0.5 font-mono text-core-text">{scene.nodes.length} componentes</p>
                      <p className="font-mono text-core-text">{scene.edges.length} relaciones</p>
                    </div>
                    <div className="border border-core-warning/30 bg-core-warning/5 px-2 py-1.5">
                      <p className="text-core-text-muted">Actual · escenario</p>
                      <p className="mt-0.5 font-mono text-core-text">{scene.nodes.length - whatIfImpact.unavailableNodeIds.length} disponibles</p>
                      <p className="font-mono text-core-text">{scene.edges.length - whatIfImpact.brokenRelationshipCount} relaciones activas</p>
                    </div>
                  </div>
                  {whatIfImpact.unavailableNodeIds.length ? (
                    <p className="mt-2 text-[0.64rem] leading-relaxed text-core-text-secondary">
                      <span className="font-semibold text-core-text">Brecha simulada:</span>{" "}
                      {whatIfImpact.unavailableNodeIds.map((id) => scene.nodes.find((node) => node.id === id)?.name ?? id).join(", ")} no está disponible.
                    </p>
                  ) : null}
                  {targetArchitecture ? (
                    <div className="mt-2 border-l-2 border-core-success/60 pl-2 text-[0.64rem] leading-relaxed text-core-text-secondary">
                      <p>{targetArchitecture.summary}</p>
                      <ul className="mt-1 list-disc space-y-0.5 pl-4">
                        {targetArchitecture.expectedChanges.map((change) => <li key={change}>{change}</li>)}
                      </ul>
                      <p className="mt-1 text-[0.6rem] text-core-text-muted">Límite: {targetArchitecture.limitations}</p>
                    </div>
                  ) : null}
                  {targetArchitecture?.roadmap?.length ? (
                    <details className="mt-2 border-t border-core-border/[0.12] pt-2">
                      <summary className="cursor-pointer list-none font-mono text-[0.58rem] font-semibold uppercase tracking-[0.06em] text-core-text-muted [&::-webkit-details-marker]:hidden">
                        Roadmap de assessment · {Object.keys(roadmapStatus).length}/{targetArchitecture.roadmap.length}
                      </summary>
                      <ol className="mt-2 space-y-2">
                        {targetArchitecture.roadmap.map((phase, index) => {
                          const status = roadmapStatus[phase.id];
                          const label = status === "done" ? "Revisada" : status === "na" ? "No aplica" : "Pendiente";
                          return (
                            <li key={phase.id} className="border-l-2 border-core-accent/50 pl-2 text-[0.64rem] leading-relaxed">
                              <button
                                type="button"
                                onClick={() => toggleRoadmapPhase(phase.id)}
                                className="w-full text-left"
                                aria-label={`${phase.title}: ${label}. Pulsar para cambiar estado.`}
                              >
                                <p className="flex items-center justify-between gap-2 font-semibold text-core-text"><span>{index + 1}. {phase.title}</span><span className="shrink-0 font-mono text-[0.54rem] uppercase tracking-[0.05em] text-core-text-muted">{label}</span></p>
                                <p className="text-core-text-secondary">{phase.objective}</p>
                                <p className="mt-0.5 text-core-text-muted"><span className="font-semibold text-core-text">Evidencia:</span> {phase.evidence}</p>
                                <p className="mt-0.5 text-core-text-muted"><span className="font-semibold text-core-text">Salida:</span> {phase.exitCriteria}</p>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                      <p className="mt-1 text-[0.58rem] text-core-text-muted">Solo se guarda en este navegador. Pulsa una fase para cambiar: pendiente → revisada → no aplica.</p>
                    </details>
                  ) : null}
                  {targetArchitecture?.decisionOptions?.length ? (
                    <details className="mt-2 border-t border-core-border/[0.12] pt-2">
                      <summary className="cursor-pointer list-none font-mono text-[0.58rem] font-semibold uppercase tracking-[0.06em] text-core-text-muted [&::-webkit-details-marker]:hidden">
                        Laboratorio de decisiones · {targetArchitecture.decisionOptions.length} opciones
                      </summary>
                      <div className="mt-2 grid gap-1.5">
                        {targetArchitecture.decisionOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedDecisionLabId(option.id)}
                            aria-pressed={selectedDecisionLabId === option.id}
                            className={`border px-2.5 py-2 text-left text-[0.64rem] transition-colors ${selectedDecisionLabId === option.id ? "border-core-accent/60 bg-core-accent/10 text-core-text" : "border-core-border/[0.12] text-core-text-secondary hover:border-core-accent/40"}`}
                          >
                            <span className="block font-semibold">{option.title}</span>
                            <span className="mt-0.5 block leading-relaxed">{option.summary}</span>
                          </button>
                        ))}
                      </div>
                      {selectedDecisionLab ? (
                        <div className="mt-2 space-y-1 border-l-2 border-core-accent/60 pl-2 text-[0.64rem] leading-relaxed text-core-text-secondary">
                          <p><span className="font-semibold text-core-text">Beneficio:</span> {selectedDecisionLab.benefits}</p>
                          <p><span className="font-semibold text-core-text">Trade-off:</span> {selectedDecisionLab.tradeoffs}</p>
                          <p><span className="font-semibold text-core-text">Evidencia:</span> {selectedDecisionLab.evidence}</p>
                          {selectedDecisionLab.roadmapPhaseIds?.length ? (
                            <div>
                              <p className="font-semibold text-core-text">Fases a revisar:</p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {selectedDecisionLab.roadmapPhaseIds.map((phaseId) => {
                                  const phase = targetArchitecture.roadmap?.find((candidate) => candidate.id === phaseId);
                                  const status = roadmapStatus[phaseId];
                                  const statusLabel = status === "done" ? "Revisada" : status === "na" ? "No aplica" : "Pendiente";
                                  return phase ? (
                                    <button
                                      key={phaseId}
                                      type="button"
                                      onClick={() => toggleRoadmapPhase(phaseId)}
                                      className="border border-core-accent/40 px-1.5 py-0.5 text-left text-[0.58rem] text-core-accent hover:bg-core-accent/10"
                                      aria-label={`${phase.title}: ${statusLabel}. Pulsar para cambiar estado.`}
                                    >
                                      {phase.title} · {statusLabel}
                                    </button>
                                  ) : <span key={phaseId} className="text-core-text-muted">{phaseId}</span>;
                                })}
                              </div>
                            </div>
                          ) : null}
                          {selectedDecisionLab.scenarioIds?.length ? (
                            <div>
                              <p className="font-semibold text-core-text">Escenarios para validar:</p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {selectedDecisionLab.scenarioIds.map((scenarioId) => {
                                  const scenario = scenarios.find((candidate) => candidate.id === scenarioId);
                                  return scenario ? (
                                    <button key={scenarioId} type="button" onClick={() => onSelectScenario(scenarioId)} className="border border-core-accent/40 px-1.5 py-0.5 text-[0.58rem] text-core-accent hover:bg-core-accent/10">
                                      {scenario.label}
                                    </button>
                                  ) : <span key={scenarioId} className="text-core-text-muted">{scenarioId}</span>;
                                })}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : <p className="mt-1 text-[0.58rem] text-core-text-muted">Selecciona una opción para comparar beneficio, trade-off y evidencia.</p>}
                    </details>
                  ) : null}
                  <p className="mt-1 text-[0.6rem] leading-relaxed text-core-text-muted">
                    El objetivo representa una intención autorada, no una recomendación automática de diseño.
                  </p>
                </details>
              ) : null}

              <details className="border-t border-core-border/[0.12] pt-2">
                <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted [&::-webkit-details-marker]:hidden">
                  Revisión técnica asistida
                </summary>
                <div className="mt-2 space-y-2">
                  <p className="text-[0.62rem] leading-relaxed text-core-text-secondary">
                    Revisa el contenido local, las reglas del diagrama, los escenarios y el roadmap. No consulta el entorno del cliente ni afirma que la arquitectura esté validada.
                  </p>
                  <button
                    type="button"
                    onClick={runAssistedReview}
                    className="border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:bg-core-accent/10"
                  >
                    {assistedReview ? "Actualizar revisión" : "Revisar esta explicación"}
                  </button>
                  {assistedReview ? (
                    <div className="space-y-1.5">
                      <p className="text-[0.58rem] text-core-text-muted">
                        Alcance: contenido local · confianza: {assistedReview.confidence === "high" ? "alta" : "media"}
                      </p>
                      {assistedReview.findings.length ? assistedReview.findings.map((finding) => {
                        const severityClass: Record<AssistedReviewSeverity, string> = {
                          critical: "border-core-error/60 text-core-error",
                          warning: "border-core-warning/60 text-core-warning",
                          info: "border-core-accent/50 text-core-accent",
                        };
                        return (
                          <article key={finding.id} className={`border-l-2 pl-2 text-[0.62rem] leading-relaxed ${severityClass[finding.severity]}`}>
                            <p className="font-semibold">{finding.title}</p>
                            <p className="text-core-text-secondary">{finding.detail}</p>
                            <p className="mt-0.5 text-core-text-muted"><span className="font-semibold text-core-text">Evidencia:</span> {finding.evidence}</p>
                            <p className="mt-0.5 text-core-text-muted"><span className="font-semibold text-core-text">Acción:</span> {finding.action}</p>
                          </article>
                        );
                      }) : <p className="text-[0.62rem] text-core-text-secondary">No se detectaron gaps con las reglas locales actuales.</p>}
                    </div>
                  ) : null}
                </div>
              </details>

              {technicalFindings.length ? (
                <details className="border-t border-core-border/[0.12] pt-2">
                  <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted [&::-webkit-details-marker]:hidden">
                    Reglas y evidencia · {technicalFindings.length} hallazgos
                  </summary>
                  <div className="mt-2 space-y-1.5">
                    {technicalFindings.map((finding) => {
                      const severityClass: Record<TechnicalFindingSeverity, string> = {
                        critical: "border-core-error/60 text-core-error",
                        warning: "border-core-warning/60 text-core-warning",
                        info: "border-core-accent/50 text-core-accent",
                      };
                      const findingSources = (finding.sourceIds ?? [])
                        .map((sourceId) => technicalSources.find((source) => source.id === sourceId))
                        .filter((source): source is TechnicalSource => Boolean(source));
                      return (
                        <article key={finding.id} className={`border-l-2 pl-2 text-[0.64rem] leading-relaxed ${severityClass[finding.severity]}`}>
                          <p className="font-semibold">{finding.title}</p>
                          <p className="text-core-text-secondary">{finding.detail}</p>
                          <p className="mt-0.5 text-core-text-muted"><span className="font-semibold text-core-text">Evidencia:</span> {finding.evidence}</p>
                          <p className="mt-0.5 text-core-text-muted"><span className="font-semibold text-core-text">Recomendación:</span> {finding.recommendation}</p>
                          {findingSources.length ? (
                            <details className="mt-1 text-core-text-muted">
                              <summary className="cursor-pointer list-none font-mono text-[0.58rem] uppercase tracking-[0.06em] hover:text-core-text [&::-webkit-details-marker]:hidden">
                                Fuentes de la regla · {findingSources.length}
                              </summary>
                              <ul className="mt-1 space-y-0.5 pl-3">
                                {findingSources.map((source) => (
                                  <li key={source.id}>
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-core-accent underline decoration-core-accent/40 underline-offset-2 hover:text-core-text"
                                    >
                                      {source.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : null}
                        </article>
                      );
                    })}
                  </div>
                </details>
              ) : null}

              <div className="space-y-2 border-t border-core-border/[0.12] pt-2">
                <p className="text-[0.68rem] leading-relaxed text-core-text-muted">
                  <span className="font-semibold text-core-text">Afecta:</span> <GlossaryText text={activeScenario.affectedNodes.join(", ")} />
                </p>
                <p className="border-l-2 border-core-warning pl-2 text-[0.68rem] leading-relaxed text-core-text-muted">
                  <GlossaryText text={activeScenario.limitation} />
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
                    disabled={!canAdvanceStep}
                    className="border border-core-accent/50 bg-core-accent/10 px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.05em] text-core-text transition-colors hover:bg-core-accent/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Siguiente
                  </button>
                </div>
              ) : null}
              {guidedSteps.length > 1 && safeStepIndex < guidedSteps.length - 1 && !canAdvanceStep ? (
                <p className="text-right text-[0.58rem] text-core-text-muted">Marca este paso como <span className="font-semibold text-core-text">Revisado</span> o <span className="font-semibold text-core-text">No aplica</span> para continuar.</p>
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
