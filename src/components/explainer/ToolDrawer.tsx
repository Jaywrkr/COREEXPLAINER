"use client";

import { useState, type ReactNode } from "react";

interface ToolDrawerProps { children: ReactNode; defaultOpen?: boolean; }

/** Keeps optional technical tools outside the first reading path. */
export function ToolDrawer({ children, defaultOpen = false }: ToolDrawerProps) {
  const [open, setOpen] = useState(defaultOpen);
  return <details className="mb-4 border-t border-core-border/[0.1] pt-2" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}><summary className="group flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden"><span>Operar y entregar</span><span aria-hidden="true" className="text-core-accent transition-transform group-open:rotate-180">⌄</span></summary><p className="sr-only">Abre solo lo que necesites para preparar una revisión, un handoff o una operación. Nada de esto cambia la infraestructura del cliente.</p><div className="mt-2 space-y-2">{children}</div></details>;
}
