"use client";

import { useEffect, useMemo, useState } from "react";
import type { AnimationSpec, SceneNode } from "@/lib/animation-spec/types";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { LeftPanel } from "./LeftPanel";
import { VisualCanvas } from "./VisualCanvas";

interface ExplainerLayoutProps {
  meta: ExplainerMeta;
  steps: ExplainerStep[];
  spec: AnimationSpec;
  onCta?: () => void;
}

/**
 * Two-column explainer shell: left panel (content + nav) / right panel
 * (animated canvas). This component only orchestrates step state — content
 * (src/content), visuals (animation-spec + engine) and layout (this file)
 * stay separate so any of the three can change independently.
 */
export function ExplainerLayout({ meta, steps, spec, onCta }: ExplainerLayoutProps) {
  const [current, setCurrent] = useState(0);
  const [selectedNode, setSelectedNode] = useState<SceneNode | null>(null);
  const [activeFailureScenarioId, setActiveFailureScenarioId] = useState<string | null>(null);
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

  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));
  const goNext = () => setCurrent((c) => Math.min(steps.length - 1, c + 1));

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[440px_1fr]">
      <LeftPanel
        meta={meta}
        steps={steps}
        current={current}
        onSelectStep={setCurrent}
        onPrev={goPrev}
        onNext={goNext}
        onCta={onCta ?? (() => {})}
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
