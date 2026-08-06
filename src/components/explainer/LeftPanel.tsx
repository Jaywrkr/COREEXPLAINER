import Link from "next/link";
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
import { ExplainerFeedback } from "./ExplainerFeedback";

interface LeftPanelProps {
  slug: string;
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
  slug,
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
  const isTechnical = audienceMode === "technical";
  const isConceptual = audienceMode === "conceptual";
  const leadParagraph = step.paragraphs[0] ?? "";

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-core-border/[0.09] p-6">
      <BrandMark />

      <Link
        href="/explainer"
        className="mb-4 inline-flex w-fit items-center gap-2 border border-core-border/[0.12] px-2.5 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:border-core-accent/50 hover:text-core-text"
      >
        <span aria-hidden="true">←</span>
        Todos los temas
      </Link>

      <span className="mb-2 block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent">
        {step.tag}
      </span>
      <h1 className="mb-1.5 text-xl font-bold leading-tight text-core-text sm:text-[1.45rem]">{meta.title}</h1>
      <p className="mb-4 text-[0.8rem] leading-relaxed text-core-text-secondary">{meta.tagline}</p>
      <AudienceModeToggle mode={audienceMode} onChange={onAudienceModeChange} />
      <div className="mb-5 flex flex-wrap items-center gap-1.5">
        <ExplainerFeedback slug={slug} />
        <SceneShareControl
          sceneId={step.sceneId}
          scenarioId={activeFailureScenarioId}
          audienceMode={audienceMode}
        />
        <BrandContextPanel items={meta.brandContext} />
        <TechnicalReviewPanel review={meta.technicalReview} activeSourceIds={step.sourceIds} />
      </div>

      {isTechnical ? (
        <TechnicalSceneSummary scene={scene} step={step} review={meta.technicalReview} />
      ) : null}

      <div className="border-t border-core-border/[0.1] pt-4">
        <div className="mb-1.5 flex items-center justify-between gap-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-accent">
          <span>Escena {String(current + 1).padStart(2, "0")}</span>
          <span className="text-core-text-muted">{steps.length} pasos</span>
        </div>
        <h2 className="mb-2.5 text-base font-bold leading-snug text-core-text">{step.title}</h2>
        {isTechnical ? (
          <div className="space-y-2.5">
            {step.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[0.8rem] leading-relaxed text-core-text-secondary">
                {paragraph}
              </p>
            ))}
            <p className="border-l-2 border-core-accent bg-core-panel/40 px-2.5 py-2 text-[0.76rem] leading-relaxed text-core-text">
              <span className="font-semibold text-core-accent">Impacto:</span> {step.businessImpact}
            </p>
          </div>
        ) : isConceptual ? (
          <div className="space-y-2.5">
            <div className="border-l-2 border-core-accent bg-core-panel/40 px-2.5 py-2.5">
              <p className="mb-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-accent">
                Cómo funciona
              </p>
              <div className="space-y-2">
                {step.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[0.78rem] leading-relaxed text-core-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <p className="border-l-2 border-core-accent bg-core-panel/40 px-2.5 py-2 text-[0.76rem] leading-relaxed text-core-text">
              <span className="font-semibold text-core-accent">Por qué importa:</span> {step.businessImpact}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <div className="border-l-2 border-core-accent bg-core-panel/40 px-2.5 py-2.5">
              <p className="mb-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-accent">
                Idea clave
              </p>
              <p className="text-[0.82rem] leading-relaxed text-core-text-secondary">{leadParagraph}</p>
            </div>
            <p className="text-[0.78rem] leading-relaxed text-core-text-secondary">
              <span className="font-semibold text-core-text">Valor para el cliente:</span> {step.businessImpact}
            </p>
            {step.paragraphs.length > 1 ? (
              <details className="border-t border-core-border/[0.1] pt-2">
                <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
                  Ver detalle técnico
                </summary>
                <div className="mt-2 space-y-2">
                  {step.paragraphs.slice(1).map((paragraph, index) => (
                    <p key={index} className="text-[0.76rem] leading-relaxed text-core-text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            ) : null}
          </div>
        )}
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
