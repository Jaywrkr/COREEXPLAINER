import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import type { Scene } from "@/lib/animation-spec/types";
import { AudienceModeToggle, type AudienceMode } from "./AudienceModeToggle";
import { BrandMark } from "./BrandMark";
import { PresentationControls } from "./PresentationControls";
import { ProgressDots } from "./ProgressDots";
import { StepNav } from "./StepNav";
import { TechnicalReviewPanel } from "./TechnicalReviewPanel";
import { TechnicalSceneSummary } from "./TechnicalSceneSummary";
import { SceneShareControl } from "./SceneShareControl";
import { BrandContextPanel } from "./BrandContextPanel";

interface LeftPanelProps {
  meta: ExplainerMeta;
  steps: ExplainerStep[];
  scene: Scene;
  current: number;
  onSelectStep: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  presentationActive: boolean;
  presentationPlaying: boolean;
  onEnterPresentation: () => void;
  onExitPresentation: () => void;
  onTogglePresentation: () => void;
  onResetPresentation: () => void;
  audienceMode: AudienceMode;
  onAudienceModeChange: (mode: AudienceMode) => void;
  activeFailureScenarioId: string | null;
}

export function LeftPanel({
  meta,
  steps,
  scene,
  current,
  onSelectStep,
  onPrev,
  onNext,
  presentationActive,
  presentationPlaying,
  onEnterPresentation,
  onExitPresentation,
  onTogglePresentation,
  onResetPresentation,
  audienceMode,
  onAudienceModeChange,
  activeFailureScenarioId,
}: LeftPanelProps) {
  const step = steps[current]!;

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-core-border/[0.09] p-8">
      <BrandMark />

      <span className="mb-4 block font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-core-accent">
        {step.tag}
      </span>
      <h1 className="mb-2 text-2xl font-bold leading-tight text-core-text sm:text-[1.65rem]">{meta.title}</h1>
      <p className="mb-6 text-sm leading-relaxed text-core-text-secondary">{meta.tagline}</p>
      <AudienceModeToggle mode={audienceMode} onChange={onAudienceModeChange} />
      <SceneShareControl
        sceneId={step.sceneId}
        scenarioId={activeFailureScenarioId}
        audienceMode={audienceMode}
      />
      <BrandContextPanel items={meta.brandContext} />
      <TechnicalReviewPanel review={meta.technicalReview} activeSourceIds={step.sourceIds} />

      {audienceMode === "technical" ? (
        <TechnicalSceneSummary scene={scene} step={step} review={meta.technicalReview} />
      ) : null}

      <div>
        <div className="mb-2 font-mono text-xs font-semibold text-core-accent">
          {String(current + 1).padStart(2, "0")} / {steps.length}
        </div>
        <h2 className="mb-3.5 text-lg font-bold text-core-text">{step.title}</h2>
        <div className="space-y-3.5">
          {step.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed text-core-text-secondary">
              {paragraph}
            </p>
          ))}
          <p className="border-l-2 border-core-accent pl-3 text-[0.85rem] text-core-text">
            {step.businessImpact}
          </p>
        </div>
      </div>

      <StepNav
        canGoPrev={current > 0}
        canGoNext={current < steps.length - 1}
        onPrev={onPrev}
        onNext={onNext}
      />
      <ProgressDots count={steps.length} current={current} onSelect={onSelectStep} />
      <PresentationControls
        active={presentationActive}
        playing={presentationPlaying}
        current={current}
        total={steps.length}
        onEnter={onEnterPresentation}
        onExit={onExitPresentation}
        onTogglePlaying={onTogglePresentation}
        onReset={onResetPresentation}
      />
    </div>
  );
}
