"use client";

import type { ExplainerStep } from "@/content/types";

interface SceneTimelineProps {
  steps: ExplainerStep[];
  current: number;
  onSelect: (index: number) => void;
}

export function SceneTimeline({ steps, current, onSelect }: SceneTimelineProps) {
  return (
    <nav aria-label="Recorrido de escenas" className="pointer-events-auto border border-core-border/[0.14] bg-core-panel/80 p-1.5 shadow-xl backdrop-blur-md">
      <ol className="grid grid-cols-5 items-stretch gap-1">
        {steps.map((step, index) => {
          const selected = index === current;
          const completed = index < current;
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={selected ? "step" : undefined}
                aria-label={`${index + 1}. ${step.title}`}
                className={`group flex w-full min-w-0 items-center gap-1.5 border px-2 py-1.5 text-left transition-all ${selected ? "border-core-accent bg-core-accent/15 text-core-text shadow-[0_0_0_1px_rgb(var(--color-accent)/0.2)]" : "border-transparent text-core-text-muted hover:border-core-border/[0.18] hover:bg-core-panel hover:text-core-text"}`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[0.58rem] font-semibold ${selected ? "bg-core-accent text-core-bg" : completed ? "bg-core-success/20 text-core-success" : "bg-core-border/[0.1] text-core-text-muted"}`}>{completed ? "✓" : String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0"><span className="block truncate text-[0.62rem] font-semibold">{step.title}</span></span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
