import type { NodeKind, SceneNode } from "@/lib/animation-spec/types";

interface NodeDetailCardProps {
  node: SceneNode;
  onClose: () => void;
}

const KIND_LABELS: Record<NodeKind, string> = {
  "control-plane": "Plano de control",
  compute: "Cómputo",
  storage: "Almacenamiento",
  network: "Red",
  workload: "Carga de trabajo",
  external: "Sistema externo",
};

const KIND_DESCRIPTIONS: Record<NodeKind, string> = {
  "control-plane": "Administra, coordina u orquesta los componentes de la plataforma.",
  compute: "Aporta los recursos de procesamiento donde se ejecutan las cargas.",
  storage: "Proporciona la capacidad persistente que consumen las cargas.",
  network: "Conecta y controla el tráfico entre componentes y cargas.",
  workload: "Representa una aplicación, máquina virtual o servicio que consume la plataforma.",
  external: "Representa un usuario, sistema o servicio que está fuera de la plataforma.",
};

export function NodeDetailCard({ node, onClose }: NodeDetailCardProps) {
  return (
    <section
      role="dialog"
      aria-label={`Detalle de ${node.name}`}
      className="pointer-events-auto absolute right-4 top-4 w-[calc(100vw-2rem)] max-w-80 border border-core-border/[0.14] bg-core-panel"
    >
      <div className="flex items-start justify-between gap-4 border-b border-core-border/[0.12] px-4 py-3">
        <div>
          <p className="font-mono text-[0.63rem] font-semibold uppercase tracking-[0.1em] text-core-accent">
            {KIND_LABELS[node.kind]}
          </p>
          <h2 className="mt-1 text-base font-bold leading-tight text-core-text">{node.name}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="px-2 py-1 font-mono text-xs text-core-text-muted transition-colors hover:bg-core-accent/10 hover:text-core-text"
          aria-label={`Cerrar detalle de ${node.name}`}
        >
          Cerrar
        </button>
      </div>

      <div className="space-y-4 px-4 py-4">
        <div>
          <p className="mb-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted">
            Qué representa
          </p>
          <p className="text-xs leading-relaxed text-core-text-secondary">{KIND_DESCRIPTIONS[node.kind]}</p>
        </div>

        {node.subtitle ? (
          <div>
            <p className="mb-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted">
              En esta escena
            </p>
            <p className="text-xs leading-relaxed text-core-text-secondary">{node.subtitle}</p>
          </div>
        ) : null}

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-core-border/[0.1] pt-3 text-xs">
          {node.capacity ? (
            <div>
              <dt className="font-mono text-[0.6rem] uppercase text-core-text-muted">Capacidad</dt>
              <dd className="mt-0.5 font-semibold text-core-text">{node.capacity} unidades</dd>
            </div>
          ) : null}
          {node.rps ? (
            <div>
              <dt className="font-mono text-[0.6rem] uppercase text-core-text-muted">Emisión</dt>
              <dd className="mt-0.5 font-semibold text-core-text">{node.rps} paquetes/s</dd>
            </div>
          ) : null}
          {node.killable ? (
            <div className="col-span-2">
              <dt className="font-mono text-[0.6rem] uppercase text-core-text-muted">Interacción</dt>
              <dd className="mt-0.5 font-semibold text-core-text">Admite simulación de falla</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </section>
  );
}
