"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import type { AnimationSpec, SceneNode } from "@/lib/animation-spec/types";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { LeftPanel } from "./LeftPanel";
import { VisualCanvas } from "./VisualCanvas";
import type { AudienceMode } from "./AudienceModeToggle";
import { getGuidedScenarioSteps } from "@/lib/scenarios/guidedScenario";

const AUTOPLAY_STEP_MS = 6500;
const MIN_LEFT_PANEL_WIDTH = 320;
const MAX_LEFT_PANEL_WIDTH = 560;
const DEFAULT_LEFT_PANEL_WIDTH = 400;

interface ExplainerLayoutProps {
  slug: string;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
  spec: AnimationSpec;
  initialSceneId?: string;
  initialScenarioId?: string | null;
  initialAudienceMode?: AudienceMode;
}

/**
 * Two-column explainer shell: left panel (content + nav) / right panel
 * (animated canvas). This component only orchestrates step state — content
 * (src/content), visuals (animation-spec + engine) and layout (this file)
 * stay separate so any of the three can change independently.
 */
export function ExplainerLayout({
  slug,
  meta,
  steps,
  spec,
  initialSceneId,
  initialScenarioId = null,
  initialAudienceMode = "client",
}: ExplainerLayoutProps) {
  const initialStepIndex = Math.max(0, steps.findIndex((candidate) => candidate.sceneId === initialSceneId));
  const [current, setCurrent] = useState(initialStepIndex);
  const [selectedNode, setSelectedNode] = useState<SceneNode | null>(null);
  const [activeFailureScenarioId, setActiveFailureScenarioId] = useState<string | null>(initialScenarioId);
  const [guidedStepIndex, setGuidedStepIndex] = useState(0);
  const [selectedDecisionOptionId, setSelectedDecisionOptionId] = useState<string | null>(null);
  const [audienceMode, setAudienceMode] = useState<AudienceMode>(initialAudienceMode);
  const [presentationActive, setPresentationActive] = useState(false);
  const [presentationPlaying, setPresentationPlaying] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(DEFAULT_LEFT_PANEL_WIDTH);
  const [isResizingPanel, setIsResizingPanel] = useState(false);
  const initializedFromLink = useRef(false);
  const previousScenarioRef = useRef<string | null>(initialScenarioId);
  const resizePointerRef = useRef<number | null>(null);

  const beginPanelResize = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    resizePointerRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsResizingPanel(true);
    event.preventDefault();
  }, []);

  const handlePanelResize = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    if (resizePointerRef.current !== event.pointerId) return;
    setLeftPanelWidth(Math.min(MAX_LEFT_PANEL_WIDTH, Math.max(MIN_LEFT_PANEL_WIDTH, event.clientX)));
  }, []);

  const endPanelResize = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    if (resizePointerRef.current !== event.pointerId) return;
    resizePointerRef.current = null;
    setIsResizingPanel(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);
  const step = steps[current]!;
  const scene = spec.scenes[step.sceneId];

  if (!scene) {
    throw new Error(`ExplainerLayout: spec has no scene '${step.sceneId}' for step '${step.id}'`);
  }

  const failureScenarios = useMemo(
    () => meta.failureScenarios?.filter((scenario) => scenario.sceneId === step.sceneId) ?? [],
    [meta.failureScenarios, step.sceneId],
  );
  const activeScenario = failureScenarios.find((scenario) => scenario.id === activeFailureScenarioId) ?? null;
  const guidedSteps = useMemo(
    () => (activeScenario ? getGuidedScenarioSteps(activeScenario) : []),
    [activeScenario],
  );
  const activeGuidedStep = guidedSteps[guidedStepIndex] ?? null;
  const selectedDecisionOption = activeGuidedStep?.decision?.options.find(
    (option) => option.id === selectedDecisionOptionId,
  ) ?? null;
  const guidedFocusNodeIds = selectedDecisionOption?.focusNodeIds ?? activeGuidedStep?.focusNodeIds ?? [];

  useEffect(() => {
    setSelectedNode(null);
    if (initializedFromLink.current) setActiveFailureScenarioId(null);
    initializedFromLink.current = true;
  }, [scene]);

  useEffect(() => {
    if (previousScenarioRef.current !== activeFailureScenarioId) setGuidedStepIndex(0);
    previousScenarioRef.current = activeFailureScenarioId;
  }, [activeFailureScenarioId]);

  useEffect(() => {
    setSelectedDecisionOptionId(null);
  }, [activeFailureScenarioId, guidedStepIndex]);

  useEffect(() => {
    setGuidedStepIndex((index) => Math.min(index, Math.max(guidedSteps.length - 1, 0)));
  }, [guidedSteps.length]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("scene", step.sceneId);
    url.searchParams.set("mode", audienceMode);
    if (activeFailureScenarioId) url.searchParams.set("scenario", activeFailureScenarioId);
    else url.searchParams.delete("scenario");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [activeFailureScenarioId, audienceMode, step.sceneId]);

  useEffect(() => {
    if (!presentationActive || !presentationPlaying) return;
    if (current >= steps.length - 1) {
      setPresentationPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setCurrent((c) => Math.min(steps.length - 1, c + 1));
    }, AUTOPLAY_STEP_MS);

    return () => window.clearTimeout(timer);
  }, [current, presentationActive, presentationPlaying, steps.length]);

  useEffect(() => {
    if (!presentationActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setPresentationActive(false);
        setPresentationPlaying(false);
        return;
      }

      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        setPresentationPlaying((playing) => !playing);
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        setPresentationPlaying(false);
        setCurrent((c) => Math.min(steps.length - 1, c + 1));
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setPresentationPlaying(false);
        setCurrent((c) => Math.max(0, c - 1));
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        setPresentationPlaying(false);
        setCurrent(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        setPresentationPlaying(false);
        setCurrent(steps.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentationActive, steps.length]);

  const goPrev = () => {
    setPresentationPlaying(false);
    setCurrent((c) => Math.max(0, c - 1));
  };
  const goNext = () => {
    setPresentationPlaying(false);
    setCurrent((c) => Math.min(steps.length - 1, c + 1));
  };
  const selectStep = (index: number) => {
    setPresentationPlaying(false);
    setCurrent(index);
  };
  const enterPresentation = () => setPresentationActive(true);
  const exitPresentation = () => {
    setPresentationActive(false);
    setPresentationPlaying(false);
  };
  const togglePresentation = () => {
    setPresentationActive(true);
    setPresentationPlaying((playing) => !playing);
  };
  const resetPresentation = () => {
    setCurrent(0);
    setPresentationPlaying(false);
  };

  return (
    <div
      className={`grid h-screen grid-cols-1 md:grid-cols-[var(--left-panel-width)_minmax(0,1fr)] ${isResizingPanel ? "select-none" : ""}`}
      style={{ "--left-panel-width": `${leftPanelWidth}px` } as CSSProperties}
      data-presentation-mode={presentationActive ? "active" : "inactive"}
    >
      <div className="relative min-w-0">
        <LeftPanel
          slug={slug}
          meta={meta}
          steps={steps}
          scene={scene}
          current={current}
          onSelectStep={selectStep}
          onPrev={goPrev}
          onNext={goNext}
          presentationActive={presentationActive}
          presentationPlaying={presentationPlaying}
          onEnterPresentation={enterPresentation}
          onExitPresentation={exitPresentation}
          onTogglePresentation={togglePresentation}
          onResetPresentation={resetPresentation}
          audienceMode={audienceMode}
          onAudienceModeChange={setAudienceMode}
          activeFailureScenarioId={activeFailureScenarioId}
          onSelectScenario={setActiveFailureScenarioId}
        />
        <button
          type="button"
          role="separator"
          aria-label="Ajustar ancho del panel de explicación"
          aria-orientation="vertical"
          aria-valuemin={MIN_LEFT_PANEL_WIDTH}
          aria-valuemax={MAX_LEFT_PANEL_WIDTH}
          aria-valuenow={leftPanelWidth}
          title="Arrastra para ajustar el ancho"
          className="absolute right-0 top-0 z-30 hidden h-full w-1 cursor-col-resize border-0 bg-transparent transition-colors hover:bg-core-accent/60 focus-visible:bg-core-accent/60 md:block"
          onPointerDown={beginPanelResize}
          onPointerMove={handlePanelResize}
          onPointerUp={endPanelResize}
          onPointerCancel={endPanelResize}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") setLeftPanelWidth((width) => Math.max(MIN_LEFT_PANEL_WIDTH, width - 16));
            if (event.key === "ArrowRight") setLeftPanelWidth((width) => Math.min(MAX_LEFT_PANEL_WIDTH, width + 16));
          }}
        />
      </div>
      <div className="relative hidden min-h-[320px] md:block">
        <VisualCanvas
          scene={scene}
          sceneId={step.sceneId}
          explainerSlug={slug}
          targetArchitecture={meta.targetArchitecture}
          audienceMode={audienceMode}
          selectedNode={selectedNode}
          onNodeSelect={setSelectedNode}
          failureScenarios={failureScenarios}
          activeFailureScenarioId={activeFailureScenarioId}
          onFailureScenarioChange={setActiveFailureScenarioId}
          guidedSteps={guidedSteps}
          activeGuidedStepIndex={guidedStepIndex}
          onGuidedStepChange={setGuidedStepIndex}
          technicalSources={meta.technicalReview.sources}
          technicalIntegrity={meta.technicalIntegrity}
          selectedDecisionOptionId={selectedDecisionOptionId}
          onDecisionOptionChange={setSelectedDecisionOptionId}
          guidedFocusNodeIds={guidedFocusNodeIds}
        />
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center font-mono text-[0.74rem] tracking-[0.02em] text-core-text-muted">
          {step.caption}
        </div>
      </div>
    </div>
  );
}
