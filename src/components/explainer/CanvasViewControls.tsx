"use client";

import { useState } from "react";

interface CanvasViewControlsProps {
  scale: number;
  technical: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

/** Keeps viewport controls compact for clients while retaining full access for technical users. */
export function CanvasViewControls({ scale, technical, onZoomIn, onZoomOut, onReset }: CanvasViewControlsProps) {
  const [open, setOpen] = useState(technical);
  const percent = `${Math.round(scale * 100)}%`;

  if (technical) {
    return (
      <div className="absolute left-4 top-4 flex border border-core-border/[0.14] bg-core-panel font-mono text-xs text-core-text-secondary shadow-sm">
        <button type="button" onClick={onZoomOut} className="px-3 py-2 transition-colors hover:bg-core-accent/10 hover:text-core-text" aria-label="Alejar diagrama">−</button>
        <span className="flex min-w-14 items-center justify-center border-x border-core-border/[0.14] px-2 text-core-text" aria-live="polite">{percent}</span>
        <button type="button" onClick={onZoomIn} className="px-3 py-2 transition-colors hover:bg-core-accent/10 hover:text-core-text" aria-label="Acercar diagrama">+</button>
        <button type="button" onClick={onReset} className="border-l border-core-border/[0.14] px-3 py-2 transition-colors hover:bg-core-accent/10 hover:text-core-text">Restablecer</button>
      </div>
    );
  }

  return (
    <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="absolute left-4 top-4 z-20 border border-core-border/[0.14] bg-core-panel/90 font-mono text-[0.6rem] text-core-text shadow-sm backdrop-blur-sm">
      <summary className="cursor-pointer list-none px-2.5 py-2 text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden" aria-label="Controles de vista">
        Vista <span className="text-core-text">{percent}</span> <span aria-hidden="true" className="ml-1 text-core-accent">⌄</span>
      </summary>
      <div className="flex border-t border-core-border/[0.12]">
        <button type="button" onClick={onZoomOut} className="px-3 py-2 transition-colors hover:bg-core-accent/10 hover:text-core-text" aria-label="Alejar diagrama">−</button>
        <button type="button" onClick={onZoomIn} className="border-l border-core-border/[0.12] px-3 py-2 transition-colors hover:bg-core-accent/10 hover:text-core-text" aria-label="Acercar diagrama">+</button>
        <button type="button" onClick={onReset} className="border-l border-core-border/[0.12] px-2.5 py-2 text-core-text-muted transition-colors hover:bg-core-accent/10 hover:text-core-text">Reset</button>
      </div>
    </details>
  );
}
