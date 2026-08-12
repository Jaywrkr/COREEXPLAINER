"use client";

import { useMemo, useRef, useState, type RefObject } from "react";
import { compatiblePortTypes, componentById, studioCatalog, type StudioConnection, type StudioDiagram, type StudioNode, validateStudioDiagram } from "@/lib/architecture/studio";

const nodeColors: Record<string, string> = { external: "border-core-text-muted/40", network: "border-cyan-400/50", security: "border-red-400/55", compute: "border-core-accent/55", storage: "border-violet-400/55", platform: "border-amber-400/55", observability: "border-emerald-400/55", backup: "border-fuchsia-400/55" };

export function ArchitectureGenerator() {
  const [prompt, setPrompt] = useState("");
  const [diagram, setDiagram] = useState<StudioDiagram | null>(null);
  const [notice, setNotice] = useState("Describe el contexto del cliente para empezar.");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const validation = useMemo(() => diagram ? validateStudioDiagram(diagram) : null, [diagram]);

  async function generate() {
    setLoading(true); setNotice("Analizando el contexto contra el catálogo CORESOLUTIONS…");
    try {
      const response = await fetch("/api/architecture/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const payload = await response.json() as { diagram?: StudioDiagram; error?: string; issues?: string[] };
      if (!response.ok || !payload.diagram) { setNotice([payload.error, ...(payload.issues ?? [])].filter(Boolean).join(" ")); return; }
      setDiagram(payload.diagram); setNotice("Propuesta conceptual creada. Revisa los supuestos antes de usarla con el cliente.");
    } catch { setNotice("No hubo respuesta del servicio de IA. Ningún cambio fue aplicado."); }
    finally { setLoading(false); }
  }

  function updateNode(id: string, patch: Partial<StudioNode>) { setDiagram((current) => current ? { ...current, nodes: current.nodes.map((node) => node.id === id ? { ...node, ...patch } : node) } : current); }
  function addNode(componentId: string) { const component = componentById(componentId); if (!component) return; setDiagram((current) => current ? { ...current, nodes: [...current.nodes, { id: `node-${Date.now()}`, componentId, label: component.name, x: 50, y: 50 }] } : current); }
  function removeNode(id: string) { setDiagram((current) => current ? { ...current, nodes: current.nodes.filter((node) => node.id !== id), connections: current.connections.filter((connection) => connection.from !== id && connection.to !== id) } : current); }
  function updateConnection(id: string, patch: Partial<StudioConnection>) { setDiagram((current) => current ? { ...current, connections: current.connections.map((connection) => connection.id === id ? { ...connection, ...patch } : connection) } : current); }
  function addConnection() { if (!diagram || diagram.nodes.length < 2) return; for (const from of diagram.nodes) for (const to of diagram.nodes) { if (from.id === to.id) continue; const pair = componentById(from.componentId)?.ports.flatMap((fromPort) => (componentById(to.componentId)?.ports ?? []).filter((toPort) => compatiblePortTypes(fromPort.type, toPort.type)).map((toPort) => ({ fromPort, toPort })))[0]; if (pair) { setDiagram({ ...diagram, connections: [...diagram.connections, { id: `connection-${Date.now()}`, from: from.id, fromPort: pair.fromPort.id, to: to.id, toPort: pair.toPort.id, label: "" }] }); return; } } setNotice("No hay dos equipos con puertos compatibles para conectar."); }

  return <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(19rem,.6fr)_minmax(0,1.4fr)]">
    <section className="border border-core-border/[0.12] bg-core-panel/30 p-4 sm:p-5">
      <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-core-accent">Nueva arquitectura</p>
      <h2 className="mt-2 text-lg font-semibold text-core-text">¿Qué tiene y qué necesita el cliente?</h2>
      <p className="mt-1 text-[0.78rem] leading-relaxed text-core-text-secondary">Incluye sedes, aplicaciones, dolores, continuidad, integración y restricciones. La IA solo usará bloques CORESOLUTIONS autorizados.</p>
      <label className="mt-4 block text-[0.72rem] font-semibold text-core-text" htmlFor="architecture-prompt">Descripción
        <textarea id="architecture-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ej. Dos sedes con ERP virtualizado, storage IBM, necesidad de recuperación ante ransomware y visibilidad de aplicaciones…" className="mt-1.5 min-h-44 w-full resize-y border border-core-border/[0.16] bg-core-bg p-3 text-sm font-normal leading-relaxed text-core-text outline-none focus:border-core-accent/60" />
      </label>
      <button type="button" onClick={generate} disabled={loading || prompt.trim().length < 20} className="mt-3 w-full border border-core-accent bg-core-accent px-3 py-2.5 text-sm font-semibold text-core-bg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45">{loading ? "Generando propuesta…" : "Generar diagrama con IA"}</button>
      <p role="status" className="mt-3 text-[0.72rem] leading-relaxed text-core-text-muted">{notice}</p>
      <details className="mt-5 border-t border-core-border/[0.1] pt-3 text-[0.72rem] text-core-text-secondary"><summary className="cursor-pointer font-semibold text-core-text">Reglas que protege el Studio</summary><ul className="mt-2 space-y-1 leading-relaxed"><li>• Solo productos y bloques del portafolio CORESOLUTIONS.</li><li>• El cable lógico debe terminar en puertos del mismo medio/protocolo.</li><li>• No infiere modelos, HCL, licencias, VLAN, IPs ni sizing.</li><li>• Cualquier supuesto permanece visible para validación humana.</li></ul></details>
    </section>

    <section className="min-w-0 border border-core-border/[0.12] bg-core-panel/30 p-3 sm:p-4">
      {!diagram ? <div className="flex min-h-[35rem] items-center justify-center border border-dashed border-core-border/[0.18] bg-core-bg/40 p-8 text-center"><div className="max-w-sm"><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-core-accent">Canvas vacío</p><h2 className="mt-2 text-lg font-semibold text-core-text">Tu arquitectura aparecerá aquí</h2><p className="mt-2 text-sm leading-relaxed text-core-text-secondary">Describe la necesidad a la izquierda. Luego podrás arrastrar equipos, cambiar sus nombres y corregir cada conexión.</p></div></div> : <>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-core-border/[0.1] pb-3"><div><p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-accent">Arquitectura conceptual</p><input aria-label="Título del diagrama" value={diagram.title} onChange={(event) => setDiagram({ ...diagram, title: event.target.value })} className="mt-1 w-full bg-transparent text-lg font-semibold text-core-text outline-none focus:text-core-accent" /><p className="mt-1 max-w-2xl text-[0.72rem] text-core-text-secondary">{diagram.summary}</p></div><span className={`border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[.06em] ${validation?.valid ? "border-core-success/40 text-core-success" : "border-core-warning/45 text-core-warning"}`}>{validation?.valid ? "Conexiones válidas" : `${validation?.issues.length} revisión(es)`}</span></div>
        <DiagramCanvas diagram={diagram} canvasRef={canvasRef} updateNode={updateNode} />
        <div className="mt-3 grid gap-3 lg:grid-cols-2"><Editor diagram={diagram} updateNode={updateNode} addNode={addNode} removeNode={removeNode} updateConnection={updateConnection} addConnection={addConnection} /><aside className="border border-core-border/[0.1] bg-core-bg/50 p-3"><p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[.08em] text-core-text-muted">Validación y supuestos</p>{validation?.issues.length ? <ul className="mt-2 space-y-1 text-[0.7rem] leading-relaxed text-core-warning">{validation.issues.map((issue) => <li key={issue}>• {issue}</li>)}</ul> : <p className="mt-2 text-[0.72rem] text-core-success">Las conexiones respetan el catálogo lógico actual.</p>}<ul className="mt-3 space-y-1 border-t border-core-border/[.1] pt-3 text-[0.7rem] leading-relaxed text-core-text-secondary">{diagram.assumptions.map((assumption) => <li key={assumption}>• {assumption}</li>)}</ul></aside></div>
      </>}
    </section>
  </div>;
}

function DiagramCanvas({ diagram, canvasRef, updateNode }: { diagram: StudioDiagram; canvasRef: RefObject<HTMLDivElement>; updateNode: (id: string, patch: Partial<StudioNode>) => void }) {
  const dragging = useRef<string | null>(null);
  function move(event: React.PointerEvent<HTMLDivElement>) { if (!dragging.current || !canvasRef.current) return; const bounds = canvasRef.current.getBoundingClientRect(); updateNode(dragging.current, { x: Math.max(7, Math.min(93, ((event.clientX - bounds.left) / bounds.width) * 100)), y: Math.max(8, Math.min(90, ((event.clientY - bounds.top) / bounds.height) * 100)) }); }
  return <div ref={canvasRef} onPointerMove={move} onPointerUp={() => { dragging.current = null; }} onPointerLeave={() => { dragging.current = null; }} className="relative mt-4 h-[32rem] overflow-hidden border border-core-border/[0.12] bg-core-bg" aria-label="Canvas de arquitectura editable">
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">{diagram.connections.map((connection) => { const from = diagram.nodes.find((node) => node.id === connection.from); const to = diagram.nodes.find((node) => node.id === connection.to); if (!from || !to) return null; return <g key={connection.id}><line x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`} stroke="currentColor" className="text-core-accent/70" strokeWidth="2" markerEnd="url(#studio-arrow)" /><text x={`${(from.x + to.x) / 2}%`} y={`${(from.y + to.y) / 2}%`} className="fill-core-text-muted text-[10px]">{connection.label}</text></g>; })}<defs><marker id="studio-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" className="fill-core-accent" /></marker></defs></svg>
    {diagram.nodes.map((node) => { const component = componentById(node.componentId); if (!component) return null; return <div key={node.id} onPointerDown={(event) => { dragging.current = node.id; event.currentTarget.setPointerCapture(event.pointerId); }} style={{ left: `${node.x}%`, top: `${node.y}%` }} className={`absolute w-36 -translate-x-1/2 -translate-y-1/2 touch-none cursor-grab border bg-core-panel px-2 py-2 text-center shadow-lg active:cursor-grabbing ${nodeColors[component.kind]}`}><p className="break-words text-[0.7rem] font-semibold leading-tight text-core-text">{node.label}</p><p className="mt-1 text-[0.57rem] leading-tight text-core-text-muted">{component.vendor}</p></div>; })}
  </div>;
}

function Editor({ diagram, updateNode, addNode, removeNode, updateConnection, addConnection }: { diagram: StudioDiagram; updateNode: (id: string, patch: Partial<StudioNode>) => void; addNode: (componentId: string) => void; removeNode: (id: string) => void; updateConnection: (id: string, patch: Partial<StudioConnection>) => void; addConnection: () => void }) {
  return <div className="space-y-3"><details><summary className="cursor-pointer font-mono text-[0.58rem] font-semibold uppercase tracking-[.08em] text-core-text-muted">Editar equipos ({diagram.nodes.length})</summary><div className="mt-2 space-y-2">{diagram.nodes.map((node) => <div key={node.id} className="grid grid-cols-[1fr_auto] gap-2 border border-core-border/[.1] p-2"><div><input value={node.label} onChange={(event) => updateNode(node.id, { label: event.target.value })} className="w-full bg-transparent text-[.73rem] text-core-text outline-none" /><select value={node.componentId} onChange={(event) => updateNode(node.id, { componentId: event.target.value })} className="mt-1 w-full bg-core-bg text-[.65rem] text-core-text">{studioCatalog.map((component) => <option key={component.id} value={component.id}>{component.vendor} · {component.name}</option>)}</select></div><button type="button" onClick={() => removeNode(node.id)} className="text-[.65rem] text-core-text-muted hover:text-red-400">Quitar</button></div>)}<select aria-label="Agregar equipo" defaultValue="" onChange={(event) => { if (event.target.value) { addNode(event.target.value); event.currentTarget.value = ""; } }} className="w-full border border-core-border/[.16] bg-core-bg p-1.5 text-[.65rem] text-core-text"><option value="">+ Agregar equipo CORESOLUTIONS</option>{studioCatalog.map((component) => <option key={component.id} value={component.id}>{component.vendor} · {component.name}</option>)}</select></div></details>
    <details><summary className="cursor-pointer font-mono text-[0.58rem] font-semibold uppercase tracking-[.08em] text-core-text-muted">Editar conexiones ({diagram.connections.length})</summary><div className="mt-2 space-y-2">{diagram.connections.map((connection) => <ConnectionEditor key={connection.id} diagram={diagram} connection={connection} update={updateConnection} />)}<button type="button" onClick={addConnection} className="border border-core-border/[.18] px-2 py-1 text-[.65rem] text-core-text-secondary hover:border-core-accent">+ Conexión</button></div></details>
  </div>;
}

function ConnectionEditor({ diagram, connection, update }: { diagram: StudioDiagram; connection: StudioConnection; update: (id: string, patch: Partial<StudioConnection>) => void }) {
  const from = diagram.nodes.find((node) => node.id === connection.from); const to = diagram.nodes.find((node) => node.id === connection.to);
  const ports = (node: StudioNode | undefined) => componentById(node?.componentId ?? "")?.ports ?? [];
  const fromPort = ports(from).find((port) => port.id === connection.fromPort);
  const toPort = ports(to).find((port) => port.id === connection.toPort);
  const compatibleToPorts = ports(to).filter((port) => !fromPort || compatiblePortTypes(fromPort.type, port.type));
  const compatibleFromPorts = ports(from).filter((port) => !toPort || compatiblePortTypes(port.type, toPort.type));
  return <div className="border border-core-border/[.1] p-2"><div className="grid grid-cols-2 gap-1"><select value={connection.from} onChange={(event) => update(connection.id, { from: event.target.value, fromPort: "" })} className="bg-core-bg p-1 text-[.64rem] text-core-text">{diagram.nodes.map((node) => <option key={node.id} value={node.id}>{node.label}</option>)}</select><select value={connection.to} onChange={(event) => update(connection.id, { to: event.target.value, toPort: "" })} className="bg-core-bg p-1 text-[.64rem] text-core-text">{diagram.nodes.map((node) => <option key={node.id} value={node.id}>{node.label}</option>)}</select><select value={connection.fromPort} onChange={(event) => update(connection.id, { fromPort: event.target.value })} className="bg-core-bg p-1 text-[.64rem] text-core-text">{compatibleFromPorts.map((port) => <option key={port.id} value={port.id}>{port.label}</option>)}</select><select value={connection.toPort} onChange={(event) => update(connection.id, { toPort: event.target.value })} className="bg-core-bg p-1 text-[.64rem] text-core-text">{compatibleToPorts.map((port) => <option key={port.id} value={port.id}>{port.label}</option>)}</select></div><input value={connection.label} onChange={(event) => update(connection.id, { label: event.target.value })} placeholder="Etiqueta opcional" className="mt-1 w-full bg-transparent text-[.64rem] text-core-text outline-none" /></div>;
}
