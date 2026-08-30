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
import { GlossaryText } from "./GlossaryText";
import { ClientStoryCard } from "./ClientStoryCard";

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
  const clientNarrative = step.clientNarrative;
  const leadParagraph = clientNarrative?.lead ?? step.paragraphs[0] ?? "";

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-core-border/[0.09] p-4 sm:p-5">
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
      <h1 className="mb-1.5 text-xl font-bold leading-tight text-core-text sm:text-[1.45rem]"><GlossaryText text={meta.title} /></h1>
      <p className="mb-3 line-clamp-2 text-[0.78rem] leading-relaxed text-core-text-secondary"><GlossaryText text={meta.tagline} /></p>
      <AudienceModeToggle mode={audienceMode} onChange={onAudienceModeChange} />
      {!isTechnical ? (
        <ClientStoryCard
          stepTitle={clientNarrative?.title ?? step.title}
          lead={leadParagraph}
          businessImpact={clientNarrative?.impact ?? step.businessImpact}
        />
      ) : null}
      {isTechnical ? (
        <details className="mb-5 border-t border-core-border/[0.1] pt-3">
          <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">Revisión y evidencia</summary>
        <div className="mb-5 flex flex-wrap items-center gap-1.5" aria-label="Acciones de revisión">
          <ExplainerFeedback slug={slug} />
          <SceneShareControl
            sceneId={step.sceneId}
            scenarioId={activeFailureScenarioId}
            audienceMode={audienceMode}
          />
          <BrandContextPanel items={meta.brandContext} />
          <TechnicalReviewPanel review={meta.technicalReview} activeSourceIds={step.sourceIds} />
        </div>
        </details>
      ) : (
        <details className="mb-5 border-t border-core-border/[0.1] pt-3">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
            <span>Más sobre esta explicación</span>
            <span aria-hidden="true" className="text-core-accent">+</span>
          </summary>
          <div className="mt-2 flex flex-wrap items-center gap-1.5" aria-label="Acciones adicionales">
            <ExplainerFeedback slug={slug} />
            <SceneShareControl
              sceneId={step.sceneId}
              scenarioId={activeFailureScenarioId}
              audienceMode={audienceMode}
            />
            <BrandContextPanel items={meta.brandContext} />
            <TechnicalReviewPanel review={meta.technicalReview} activeSourceIds={step.sourceIds} />
          </div>
        </details>
      )}

      {isTechnical ? (
        <details className="mb-4 border-t border-core-border/[0.1] pt-3">
          <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">Ficha de escena</summary>
          <div className="mt-2"><TechnicalSceneSummary scene={scene} step={step} review={meta.technicalReview} /></div>
        </details>
      ) : null}

      {isTechnical ? <div className="border-t border-core-border/[0.1] pt-4">
        <div className="mb-1.5 flex items-center justify-between gap-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-accent">
          <span>Escena {String(current + 1).padStart(2, "0")}</span>
          <span className="text-core-text-muted">{steps.length} pasos</span>
        </div>
        <h2 className="mb-2.5 text-base font-bold leading-snug text-core-text"><GlossaryText text={step.title} /></h2>
        <div className="space-y-2.5">
          {step.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[0.8rem] leading-relaxed text-core-text-secondary">
              <GlossaryText text={paragraph} />
            </p>
          ))}
          <p className="border-l-2 border-core-accent bg-core-panel/40 px-2.5 py-2 text-[0.76rem] leading-relaxed text-core-text">
            <span className="font-semibold text-core-accent">Impacto:</span> <GlossaryText text={step.businessImpact} />
          </p>
        </div>
      </div> : null}

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
