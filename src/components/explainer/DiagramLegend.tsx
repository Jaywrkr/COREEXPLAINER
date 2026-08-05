"use client";

import { useState } from "react";
import type { EdgeKind, NodeKind } from "@/lib/animation-spec/types";

const NODE_LAYER_LABELS: Array<{ kind: NodeKind; label: string }> = [
  { kind: "control-plane", label: "Gestión" },
  { kind: "compute", label: "Cómputo" },
  { kind: "storage", label: "Storage" },
  { kind: "network", label: "Red" },
  { kind: "workload", label: "Cargas" },
  { kind: "external", label: "Exterior" },
];

const EDGE_LABELS: Record<EdgeKind, string> = {
  data: "Datos",
  control: "Control",
  storage: "Storage",
  dependency: "Dependencia",
  failure: "Fallo",
};

const EDGE_STYLES: Record<EdgeKind, string> = {
  data: "solid",
  control: "dashed",
  storage: "dotted",
  dependency: "dotted",
  failure: "dashed",
};

interface DiagramLegendProps {
  edgeKinds: EdgeKind[];
  activeNodeKinds: ReadonlySet<NodeKind>;
  activeEdgeKinds: ReadonlySet<EdgeKind>;
  onToggleNodeKind: (kind: NodeKind) => void;
  onToggleEdgeKind: (kind: EdgeKind) => void;
  onReset: () => void;
}

export function DiagramLegend({
  edgeKinds,
  activeNodeKinds,
  activeEdgeKinds,
  onToggleNodeKind,
  onToggleEdgeKind,
  onReset,
}: DiagramLegendProps) {
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-label="Leyenda y capas del diagrama"
      className="absolute left-4 top-[4.2rem] z-10 w-[min(17rem,calc(100%-2rem))] border border-core-border/[0.14] bg-core-panel/95 p-3 shadow-sm backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent"
          aria-expanded={open}
        >
          Leyenda y capas
        </button>
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[0.6rem] text-core-text-muted transition-colors hover:text-core-text"
        >
          Mostrar todo
        </button>
      </div>

      {open ? (
        <div className="mt-3 space-y-3">
          <div>
            <p className="mb-1.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-core-text-muted">Capas</p>
            <div className="flex flex-wrap gap-1">
              {NODE_LAYER_LABELS.map(({ kind, label }) => {
                const active = activeNodeKinds.has(kind);
                return (
                  <button
                    key={kind}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onToggleNodeKind(kind)}
                    className={`border px-2 py-1 font-mono text-[0.6rem] transition-colors ${
                      active
                        ? "border-core-accent/50 text-core-text"
                        : "border-core-border/[0.12] text-core-text-muted opacity-60"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {edgeKinds.length > 0 ? (
            <div>
              <p className="mb-1.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-core-text-muted">Relaciones</p>
              <div className="grid grid-cols-2 gap-1">
                {edgeKinds.map((kind) => {
                  const active = activeEdgeKinds.has(kind);
                  return (
                    <button
                      key={kind}
                      type="button"
                      aria-pressed={active}
                      onClick={() => onToggleEdgeKind(kind)}
                      className={`flex items-center gap-2 border px-2 py-1 text-left font-mono text-[0.6rem] transition-colors ${
                        active
                          ? "border-core-accent/40 text-core-text"
                          : "border-core-border/[0.12] text-core-text-muted opacity-60"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="w-4 border-t-2"
                        style={{ borderTopStyle: EDGE_STYLES[kind] as "solid" | "dashed" | "dotted" }}
                      />
                      {EDGE_LABELS[kind]}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
