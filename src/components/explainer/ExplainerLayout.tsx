"use client";

import { useEffect, useMemo, useState } from "react";
import type { AnimationSpec, SceneNode } from "@/lib/animation-spec/types";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { LeftPanel } from "./LeftPanel";
import { VisualCanvas } from "./VisualCanvas";

const AUTOPLAY_STEP_MS = 6500;

interface ExplainerLayoutProps {
  meta: ExplainerMeta;
  steps: ExplainerStep[];
  spec: AnimationSpec;
}

/**
 * Two-column explainer shell: left panel (content + nav) / right panel
 * (animated canvas). This component only orchestrates step state — content
 * (src/content), visuals (animation-spec + engine) and layout (this file)
 * stay separate so any of the three can change independently.
 */
export function ExplainerLayout({ meta, steps, spec }: ExplainerLayoutProps) {
  const [current, setCurrent] = useState(0);
  const [selectedNode, setSelectedNode] = useState<SceneNode | null>(null);
  const [activeFailureScenarioId, setActiveFailureScenarioId] = useState<string | null>(null);
  const [presentationActive, setPresentationActive] = useState(false);
  const [presentationPlaying, setPresentationPlaying] = useState(false);
  const step = steps[current]!;
  const scene = spec.scenes[step.sceneId];

  if (!scene) {
    throw new Error(`ExplainerLayout: spec has no scene '${step.sceneId}' for step '${step.id}'`);
  }

  const failureScenarios = useMemo(
    () => meta.failureScenarios?.filter((scenario) => scenario.sceneId === step.sceneId) ?? [],
    [meta.failureScenarios, step.sceneId],
  );

  useEffect(() => {
    setSelectedNode(null);
    setActiveFailureScenarioId(null);
  }, [scene]);

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
      className="grid h-screen grid-cols-1 md:grid-cols-[440px_1fr]"
      data-presentation-mode={presentationActive ? "active" : "inactive"}
    >
      <LeftPanel
        meta={meta}
        steps={steps}
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
      />
      <div className="relative hidden min-h-[320px] md:block">
        <VisualCanvas
          scene={scene}
          selectedNode={selectedNode}
          onNodeSelect={setSelectedNode}
          failureScenarios={failureScenarios}
          activeFailureScenarioId={activeFailureScenarioId}
          onFailureScenarioChange={setActiveFailureScenarioId}
        />
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center font-mono text-[0.74rem] tracking-[0.02em] text-core-text-muted">
          {step.caption}
        </div>
      </div>
    </div>
  );
}
