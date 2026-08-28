import { useEffect, useState } from "react";
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
  "control-plane": "Software de control",
  compute: "Hardware de cómputo",
  storage: "Almacenamiento",
  network: "Infraestructura de red",
  workload: "Aplicación",
  external: "Usuario o sistema externo",
};

const KIND_BADGES: Record<NodeKind, { code: string; label: string; description: string; tone: string }> = {
  "control-plane": { code: "SW", label: "Software", description: "Una capacidad que coordina, configura o gobierna otros elementos.", tone: "border-amber-400/50 bg-amber-400/10 text-amber-300" },
  compute: { code: "HW", label: "Hardware", description: "Un equipo físico que ejecuta software y conecta recursos.", tone: "border-core-accent/50 bg-core-accent/10 text-core-accent" },
  storage: { code: "DATA", label: "Datos", description: "Una capa que conserva y presenta información persistente.", tone: "border-violet-400/50 bg-violet-400/10 text-violet-300" },
  network: { code: "NET", label: "Red", description: "Una conexión o elemento que transporta y separa comunicaciones.", tone: "border-cyan-400/50 bg-cyan-400/10 text-cyan-300" },
  workload: { code: "APP", label: "Aplicación", description: "Una mini aplicación o servicio que usa la plataforma para atender una necesidad de negocio.", tone: "border-emerald-400/50 bg-emerald-400/10 text-emerald-300" },
  external: { code: "EXT", label: "Externo", description: "Una persona, sistema o dependencia que está fuera de la plataforma representada.", tone: "border-slate-400/50 bg-slate-400/10 text-slate-300" },
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
  const [hostBrand, setHostBrand] = useState<"lenovo" | "ibm">("lenovo");
  const badge = KIND_BADGES[node.kind];
  const canChooseHostBrand = node.kind === "compute" && /elige lenovo thinksystem o ibm power/i.test(node.subtitle ?? "");
  const selectedHost = hostBrand === "lenovo"
    ? { name: "Lenovo ThinkSystem", detail: "Servidor físico para ejecutar la aplicación y presentar sus adaptadores hacia la SAN.", tone: "border-[#e2231a]/55 bg-[#e2231a]/10 text-[#ff6b61]" }
    : { name: "IBM Power", detail: "Servidor IBM Power para ejecutar cargas AIX y presentar sus adaptadores hacia la SAN.", tone: "border-[#0f62fe]/55 bg-[#0f62fe]/10 text-[#78a9ff]" };

  useEffect(() => setLabView("none"), [node.id]);
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
        <div className={`border p-3 ${badge.tone}`}>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="grid h-9 w-10 shrink-0 place-items-center border border-current/40 bg-core-bg/40 font-mono text-[0.58rem] font-bold">{badge.code}</span>
            <div>
              <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.09em]">{badge.label}</p>
              <p className="mt-0.5 text-[0.7rem] leading-relaxed text-core-text-secondary">{badge.description}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted">
            Qué hace aquí
          </p>
          <p className="text-xs leading-relaxed text-core-text-secondary"><GlossaryText text={KIND_DESCRIPTIONS[node.kind]} /></p>
        </div>

        {canChooseHostBrand ? (
          <div className="border-t border-core-border/[0.1] pt-3">
            <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted">Tipo de host para explorar</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <button type="button" aria-pressed={hostBrand === "lenovo"} onClick={() => setHostBrand("lenovo")} className={`border px-2 py-2 text-left text-[0.66rem] font-semibold transition-colors ${hostBrand === "lenovo" ? "border-[#e2231a]/70 bg-[#e2231a]/15 text-[#ff6b61]" : "border-core-border/[0.14] text-core-text-muted"}`}>Lenovo<br /><span className="font-normal">ThinkSystem</span></button>
              <button type="button" aria-pressed={hostBrand === "ibm"} onClick={() => setHostBrand("ibm")} className={`border px-2 py-2 text-left text-[0.66rem] font-semibold transition-colors ${hostBrand === "ibm" ? "border-[#0f62fe]/70 bg-[#0f62fe]/15 text-[#78a9ff]" : "border-core-border/[0.14] text-core-text-muted"}`}>IBM<br /><span className="font-normal">Power</span></button>
            </div>
            <div className={`mt-2 border p-2 text-[0.7rem] leading-relaxed ${selectedHost.tone}`}><span className="font-semibold">{selectedHost.name}:</span> {selectedHost.detail}</div>
          </div>
        ) : null}

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
