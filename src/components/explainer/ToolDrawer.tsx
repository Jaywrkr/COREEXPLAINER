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
      className="mb-3 border-t border-core-border/[0.1] px-0 py-2"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="group flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-2"><span>Herramientas y evidencia</span><span className="text-[0.52rem] font-normal tracking-normal text-core-text-muted">opcional</span></span>
        <span aria-hidden="true" className="text-core-accent transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <div className="mt-2 space-y-2">{children}</div>
    </details>
  );
}
