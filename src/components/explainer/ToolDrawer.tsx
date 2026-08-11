"use client";

import { useState, type ReactNode } from "react";

interface ToolDrawerProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Keeps optional assessment and support tools out of the first reading path.
 * Native details/summary preserves keyboard, screen-reader and no-JS behavior.
 */
export function ToolDrawer({ children, defaultOpen = false }: ToolDrawerProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      className="mb-4 border border-core-border/[0.12] bg-core-panel/20 px-3 py-2"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="group flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-2"><span>Herramientas opcionales</span><span className="border border-core-border/[0.12] px-1.5 py-0.5 text-[0.52rem] font-normal tracking-normal text-core-text-muted">bajo demanda</span></span>
        <span aria-hidden="true" className="text-core-accent transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <p className="mt-2 border-t border-core-border/[0.1] pt-2 text-[0.62rem] leading-relaxed text-core-text-secondary">
        Abre solo lo que necesites: copiloto, evidencia, escenarios y preparación técnica. Nada de esto cambia la infraestructura del cliente.
      </p>
      <div className="mt-2 space-y-2">{children}</div>
    </details>
  );
}
