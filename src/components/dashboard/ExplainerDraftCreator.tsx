"use client";

import { useState } from "react";

interface DraftScene { id: string; title: string; paragraphs: string[]; businessImpact: string }
interface ExplainerDraft { title: string; tagline: string; scenes: DraftScene[]; risks: string[]; evidenceQuestions: string[]; validationGaps: string[]; sourcesToConfirm: string[] }

function localDraft(topic: string, audience: string, brands: string, goal: string): ExplainerDraft {
  return {
    title: topic,
    tagline: `Borrador para explicar ${topic} a ${audience}.`,
    scenes: [
      { id: "problem", title: "El problema y su impacto", paragraphs: [`Qué necesidad o riesgo aborda ${topic}.`, "Qué dependencias y restricciones deben hacerse visibles antes de elegir una solución."], businessImpact: goal },
      { id: "architecture", title: "Cómo se relacionan los componentes", paragraphs: [`Mapa conceptual de los componentes, flujos y responsabilidades de ${topic}.`, `Marcas a contextualizar: ${brands || "confirmar con el equipo comercial"}.`], businessImpact: "El cliente puede relacionar la tecnología con el servicio que quiere proteger." },
      { id: "validation", title: "Qué debe probarse", paragraphs: ["Escenario de fallo, evidencia esperada y criterio de aceptación.", "Separar lo que el diagrama explica de lo que requiere pruebas en el entorno real."], businessImpact: "La conversación termina con próximos pasos verificables y no con una promesa." },
    ],
    risks: ["Confirmar capacidades y versiones con documentación oficial.", "Identificar dependencias, límites de capacidad y camino de rollback."],
    evidenceQuestions: ["¿Qué evidencia existe hoy?", "¿Quién acepta el resultado y con qué criterio?", "¿Qué escenario de fallo debe demostrarse?"],
    validationGaps: ["Fuentes y fecha de revisión pendientes.", "Nodos, relaciones y escenarios deben pasar el content gate."],
    sourcesToConfirm: ["Documentación oficial del fabricante", "Arquitectura y runbook del proyecto real"],
  };
}

export function ExplainerDraftCreator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("Cliente no técnico");
  const [brands, setBrands] = useState("");
  const [goal, setGoal] = useState("");
  const [draft, setDraft] = useState<ExplainerDraft | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    if (!topic.trim() || !goal.trim() || busy) return;
    setBusy(true); setStatus(null);
    try {
      const response = await fetch("/api/creator", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic, audience, brands, goal }) });
      const payload = (await response.json()) as { draft?: ExplainerDraft; fallback?: boolean; message?: string };
      if (payload.draft) { setDraft(payload.draft); setStatus("Borrador generado por IA. Validar antes de publicarlo."); }
      else { setDraft(localDraft(topic, audience, brands, goal)); setStatus(`${payload.message ?? "IA no disponible"} Se generó una plantilla local editable.`); }
    } catch { setDraft(localDraft(topic, audience, brands, goal)); setStatus("No se pudo conectar con IA. Se generó una plantilla local editable."); }
    finally { setBusy(false); }
  };

  const download = () => {
    if (!draft) return;
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "coresolutions-explainer-draft.json"; anchor.click(); URL.revokeObjectURL(url);
  };

  return (
    <section className="mb-14 border border-core-accent/25 bg-core-panel/40 p-5 sm:p-6">
      <p className="mb-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-accent">Crear con CORESOLUTIONS</p>
      <h2 className="mb-2 text-lg font-bold text-core-text">Generador asistido de explainers</h2>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-core-text-secondary">Crea un borrador estructurado para revisar con un especialista. No se publica automáticamente ni reemplaza fuentes oficiales.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Tema o tecnología" className="border border-core-border/[0.16] bg-core-panel px-2.5 py-2 text-sm text-core-text outline-none focus:border-core-accent/60" />
        <select value={audience} onChange={(event) => setAudience(event.target.value)} className="border border-core-border/[0.16] bg-core-panel px-2.5 py-2 text-sm text-core-text outline-none focus:border-core-accent/60"><option>Cliente no técnico</option><option>Equipo técnico</option><option>Gerencia y negocio</option><option>Mixto</option></select>
        <input value={brands} onChange={(event) => setBrands(event.target.value)} placeholder="Marcas o productos a contextualizar" className="border border-core-border/[0.16] bg-core-panel px-2.5 py-2 text-sm text-core-text outline-none focus:border-core-accent/60 sm:col-span-2" />
        <textarea value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="¿Qué debe entender o decidir la audiencia?" rows={2} className="border border-core-border/[0.16] bg-core-panel px-2.5 py-2 text-sm text-core-text outline-none focus:border-core-accent/60 sm:col-span-2" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3"><button type="button" onClick={() => void generate()} disabled={!topic.trim() || !goal.trim() || busy} className="border border-core-accent/50 px-3 py-2 text-xs font-semibold text-core-accent hover:bg-core-accent/10 disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Generando…" : "Generar borrador"}</button>{draft ? <button type="button" onClick={download} className="border border-core-border/[0.2] px-3 py-2 text-xs font-semibold text-core-text-secondary hover:text-core-text">Descargar JSON</button> : null}</div>
      {status ? <p className="mt-3 text-xs text-core-text-muted">{status}</p> : null}
      {draft ? <div className="mt-4 border-t border-core-border/[0.12] pt-4"><h3 className="font-semibold text-core-text">{draft.title}</h3><p className="mt-1 text-sm text-core-text-secondary">{draft.tagline}</p><div className="mt-3 grid gap-2 sm:grid-cols-3">{draft.scenes.map((scene) => <article key={scene.id} className="border border-core-border/[0.12] p-3"><p className="text-xs font-semibold text-core-text">{scene.title}</p><p className="mt-1 text-xs leading-relaxed text-core-text-secondary">{scene.businessImpact}</p></article>)}</div><p className="mt-3 text-xs text-core-text-muted">Pendientes de validar: {draft.validationGaps.join(" · ")}</p></div> : null}
    </section>
  );
}
