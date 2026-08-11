"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import type { FailureScenario, TechnicalSource } from "@/content/types";
import type { CopilotAction, CopilotMessageReview, CopilotPolicy } from "@/lib/ai/copilotContract";
import { emptyAiUsage, readAiUsage, recordAiUsage, type AiUsageTelemetry } from "@/lib/ai/usageTelemetry";
import { recordProductEvent } from "@/lib/telemetry/productTelemetry";

interface CopilotPanelProps {
  slug: string;
  meta: ExplainerMeta;
  step: ExplainerStep;
  audienceMode: "client" | "conceptual" | "technical";
  scenarios: FailureScenario[];
  technicalSources: TechnicalSource[];
  onSelectScenario: (scenarioId: string | null) => void;
}

export function CopilotPanel({ slug, meta, step, audienceMode, scenarios, technicalSources, onSelectScenario }: CopilotPanelProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [actions, setActions] = useState<CopilotAction[]>([]);
  const [policy, setPolicy] = useState<CopilotPolicy | null>(null);
  const [review, setReview] = useState<CopilotMessageReview | null>(null);
  const [usage, setUsage] = useState<AiUsageTelemetry>(() => emptyAiUsage());

  useEffect(() => { setUsage(readAiUsage()); }, []);

  const context = useMemo(() => JSON.stringify({
    marca: "CORESOLUTIONS",
    tema: meta.title,
    resumen: meta.tagline,
    modo: audienceMode,
    escena: { etiqueta: step.tag, titulo: step.title, explicacion: step.paragraphs, impacto: step.businessImpact },
    arquitecturaObjetivo: meta.targetArchitecture,
    fuentes: technicalSources.map((source) => ({ id: source.id, title: source.title, url: source.url })),
    escenarios: scenarios.map((scenario) => ({ id: scenario.id, label: scenario.label, summary: scenario.summary })),
  }), [audienceMode, meta, scenarios, step, technicalSources]);

  const ask = async () => {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setAnswer(null);
    setActions([]);
    setPolicy(null);
    setReview(null);
    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmed,
          context,
          allowedActionIds: {
            sourceIds: technicalSources.map((source) => source.id),
            scenarioIds: scenarios.map((scenario) => scenario.id),
          },
        }),
      });
      const payload = (await response.json()) as { message?: string; actions?: CopilotAction[]; usage?: { totalTokens?: number; estimatedCostUsd?: number }; policy?: CopilotPolicy; review?: CopilotMessageReview };
      setActions(Array.isArray(payload.actions) ? payload.actions : []);
      setPolicy(payload.policy ?? null);
      setReview(payload.review ?? null);
      setUsage(recordAiUsage(response.ok, payload.usage?.totalTokens ?? 0, payload.usage?.estimatedCostUsd ?? 0, "copilot"));
      setAnswer(payload.message ?? "No se recibió respuesta.");
    } catch {
      setUsage(recordAiUsage(false, 0, 0, "copilot"));
      setAnswer("No se pudo conectar con el copiloto. La explicación sigue disponible sin IA.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <details className="border-t border-core-border/[0.1] pt-2">
      <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">
        Copiloto CORESOLUTIONS
      </summary>
      <div className="mt-2 space-y-2">
        <p className="text-[0.62rem] leading-relaxed text-core-text-secondary">
          Pregunta sobre esta escena. Responde solo con el contenido y fuentes de la explicación; no consulta tu entorno.
        </p>
        <p className="border-l-2 border-core-accent/50 pl-2 text-[0.58rem] leading-relaxed text-core-text-muted">
          Política: solo lectura. Acciones permitidas: abrir fuentes y activar escenarios locales; no ejecuta cambios en infraestructura.
          {policy ? ` Presupuesto estimado: ${policy.estimatedInputTokens} tokens de entrada · máximo ${policy.maxOutputTokens} de salida${policy.estimatedCostUsd !== undefined ? ` · hasta US$ ${policy.estimatedCostUsd.toFixed(4)}` : " · coste no configurado"}${policy.maxEstimatedCostUsd !== undefined ? ` · tope US$ ${policy.maxEstimatedCostUsd.toFixed(4)}` : ""}.` : ""}
        </p>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value.slice(0, 600))}
          onKeyDown={(event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") void ask();
          }}
          rows={2}
          placeholder="¿Qué evidencia debería pedir al cliente?"
          className="w-full resize-y border border-core-border/[0.16] bg-core-panel/30 px-2 py-1.5 text-[0.68rem] leading-relaxed text-core-text outline-none placeholder:text-core-text-muted focus:border-core-accent/60"
        />
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.56rem] text-core-text-muted">Ctrl/⌘ + Enter para enviar</span>
          <button type="button" onClick={() => void ask()} disabled={!question.trim() || busy} className="border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:bg-core-accent/10 disabled:cursor-not-allowed disabled:opacity-50">
            {busy ? "Consultando…" : "Preguntar"}
          </button>
        </div>
        {answer ? <div className="border-l-2 border-core-accent/60 pl-2 text-[0.66rem] leading-relaxed text-core-text-secondary whitespace-pre-wrap">{answer}{review ? <span className={`mt-2 block text-[0.56rem] ${review.status === "context-backed" ? "text-core-accent" : "text-core-warning"}`}>{review.status === "context-backed" ? `Contexto citado · ${review.citedSourceIds.join(", ")}` : `Requiere revisión humana · ${review.reasons.join(" · ")}`}</span> : null}</div> : null}
        {usage.requests ? <p className="text-[0.54rem] text-core-text-muted">Uso local: {usage.requests} consulta(s) · {usage.totalTokens || "—"} tokens{usage.estimatedCostUsd ? ` · coste estimado US$ ${usage.estimatedCostUsd.toFixed(4)}` : ""}{usage.failures ? ` · ${usage.failures} fallo(s)` : ""}</p> : null}
        {actions.length ? (
          <div className="flex flex-wrap gap-1.5">
            {actions.map((action) => {
              const source = action.type === "open-source" ? technicalSources.find((candidate) => candidate.id === action.id) : null;
              const scenario = action.type === "activate-scenario" ? scenarios.find((candidate) => candidate.id === action.id) : null;
              if (!source && !scenario) return null;
              return source ? (
                <a key={`${action.type}:${action.id}`} href={source.url} target="_blank" rel="noreferrer" onClick={() => recordProductEvent({ name: "copilot-action", slug, id: `${action.type}:${action.id}` })} className="border border-core-accent/40 px-1.5 py-0.5 text-[0.58rem] text-core-accent hover:bg-core-accent/10">{action.label}</a>
              ) : (
                <button key={`${action.type}:${action.id}`} type="button" onClick={() => { recordProductEvent({ name: "copilot-action", slug, id: `${action.type}:${action.id}` }); onSelectScenario(scenario!.id); }} className="border border-core-warning/40 px-1.5 py-0.5 text-[0.58rem] text-core-warning hover:bg-core-warning/10">{action.label}</button>
              );
            })}
          </div>
        ) : null}
      </div>
    </details>
  );
}
