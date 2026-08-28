import { useState } from "react";
import type { EdgeKind, NodeKind, Scene, SceneNode } from "@/lib/animation-spec/types";
import type { AudienceMode } from "./AudienceModeToggle";
import { GlossaryText } from "./GlossaryText";

interface NodeDetailCardProps {
  node: SceneNode;
  scene: Scene;
  audienceMode: AudienceMode;
  isInactive: boolean;
  onToggleAvailability: (nodeId: string) => void;
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

const EDGE_LABELS: Record<EdgeKind, string> = {
  data: "datos",
  control: "control",
  storage: "almacenamiento",
  dependency: "dependencia",
  failure: "falla",
};

/** Shows the selected node at the depth chosen for the current audience. */
export function NodeDetailCard({ node, scene, audienceMode, isInactive, onToggleAvailability, onClose }: NodeDetailCardProps) {
  const isTechnical = audienceMode === "technical";
  const [labView, setLabView] = useState<"none" | "console" | "check">("none");
  const connections = scene.edges
    .filter((edge) => edge.from === node.id || edge.to === node.id)
    .map((edge) => {
      const otherId = edge.from === node.id ? edge.to : edge.from;
      const other = scene.nodes.find((candidate) => candidate.id === otherId);
      return { id: `${otherId}-${edge.kind}`, name: other?.name ?? otherId, kind: edge.kind, direction: edge.from === node.id ? "sale hacia" : "recibe de" };
    });
  const visualReading = node.rps
    ? "Este componente genera actividad que avanza hacia otros componentes."
    : node.capacity
      ? "Este componente recibe actividad y muestra cómo se acumula su uso."
      : "Este componente participa en el recorrido que explica esta escena.";

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
          <h2 className="mt-1 text-base font-bold leading-tight text-core-text"><GlossaryText text={node.name} /></h2>
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
          <p className="text-xs leading-relaxed text-core-text-secondary"><GlossaryText text={KIND_DESCRIPTIONS[node.kind]} /></p>
        </div>

        {node.subtitle ? (
          <div>
            <p className="mb-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted">
              En esta escena
            </p>
            <p className="text-xs leading-relaxed text-core-text-secondary"><GlossaryText text={node.subtitle} /></p>
          </div>
        ) : null}

        {connections.length ? (
          <div className="border-t border-core-border/[0.1] pt-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="mb-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">Cómo se conecta</p>
              <span className="font-mono text-[0.56rem] text-core-text-muted">{connections.length} relación{connections.length === 1 ? "" : "es"}</span>
            </div>
            <ul className="space-y-1.5" aria-label={`Conexiones de ${node.name}`}>
              {connections.slice(0, isTechnical ? connections.length : 3).map((connection) => (
                <li key={connection.id} className="flex items-start gap-2 text-[0.7rem] leading-relaxed text-core-text-secondary">
                  <span aria-hidden="true" className="mt-1 text-core-accent">●</span>
                  <span><GlossaryText text={`${connection.direction} ${connection.name}`} />{isTechnical ? <span className="text-core-text-muted"> · {EDGE_LABELS[connection.kind]}</span> : null}</span>
                </li>
              ))}
            </ul>
            {!isTechnical && connections.length > 3 ? <p className="mt-1 text-[0.62rem] text-core-text-muted">+ {connections.length - 3} conexiones técnicas disponibles en modo técnico.</p> : null}
          </div>
        ) : null}

        <div className="border-t border-core-border/[0.1] pt-3">
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">Laboratorio de comprensión</p>
          <p className="mt-1 text-[0.7rem] leading-relaxed text-core-text-secondary">Explora el comportamiento representado en el diagrama. No se accede ni se modifica infraestructura real.</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <button type="button" onClick={() => setLabView("console")} className="border border-core-border/[0.16] px-2 py-1 text-[0.62rem] font-semibold text-core-text-muted transition-colors hover:border-core-accent/50 hover:text-core-text">Consola conceptual</button>
            <button type="button" onClick={() => setLabView("check")} className="border border-core-border/[0.16] px-2 py-1 text-[0.62rem] font-semibold text-core-text-muted transition-colors hover:border-core-accent/50 hover:text-core-text">Comprobar conexiones</button>
            {node.killable ? <button type="button" onClick={() => onToggleAvailability(node.id)} className={`border px-2 py-1 text-[0.62rem] font-semibold transition-colors ${isInactive ? "border-core-success/50 text-core-success hover:bg-core-success/10" : "border-red-400/45 text-red-400 hover:bg-red-400/10"}`}>{isInactive ? "Restaurar simulación" : "Simular interrupción"}</button> : null}
          </div>
          {labView === "console" ? <div className="mt-2 border border-core-border/[0.12] bg-core-bg p-2 font-mono text-[0.6rem] leading-relaxed text-core-text-secondary"><p>&gt; componente: {node.name}</p><p>&gt; estado simulado: {isInactive ? "no disponible" : "disponible"}</p><p>&gt; relaciones visibles: {connections.length}</p><p className="mt-1 text-core-text-muted">Esta consola explica el modelo visual; no ejecuta comandos ni consulta equipos reales.</p></div> : null}
          {labView === "check" ? <div className="mt-2 border border-core-border/[0.12] bg-core-bg p-2 text-[0.68rem] leading-relaxed text-core-text-secondary">{isInactive ? `Resultado conceptual: ${node.name} está interrumpido en la simulación; sus ${connections.length} relación${connections.length === 1 ? "" : "es"} deben revisarse por impacto.` : connections.length ? `Resultado conceptual: ${node.name} participa en ${connections.length} relación${connections.length === 1 ? "" : "es"} modelada${connections.length === 1 ? "" : "s"}. Revisa cada flecha para seguir el recorrido.` : "Resultado conceptual: este componente no tiene relaciones declaradas en esta escena."}<p className="mt-1 text-core-text-muted">No es un ping, traceroute ni comprobación del entorno del cliente.</p></div> : null}
        </div>

        {isTechnical ? (
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
        ) : (
          <div className="border-t border-core-border/[0.1] pt-3">
            <p className="mb-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">
              Lectura visual
            </p>
            <p className="text-xs leading-relaxed text-core-text-secondary"><GlossaryText text={visualReading} /></p>
            {node.killable ? (
              <p className="mt-2 text-xs leading-relaxed text-core-text-secondary">
                Puedes explorar qué cambia si este componente deja de estar disponible.
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
