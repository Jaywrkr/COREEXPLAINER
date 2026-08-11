"use client";

import { useMemo, useState } from "react";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";

interface CopilotPanelProps {
  meta: ExplainerMeta;
  step: ExplainerStep;
  audienceMode: "client" | "conceptual" | "technical";
}

export function CopilotPanel({ meta, step, audienceMode }: CopilotPanelProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const context = useMemo(() => JSON.stringify({
    marca: "CORESOLUTIONS",
    tema: meta.title,
    resumen: meta.tagline,
    modo: audienceMode,
    escena: { etiqueta: step.tag, titulo: step.title, explicacion: step.paragraphs, impacto: step.businessImpact },
    arquitecturaObjetivo: meta.targetArchitecture,
    fuentes: meta.technicalReview.sources,
  }), [audienceMode, meta, step]);

  const ask = async () => {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setAnswer(null);
    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, context }),
      });
      const payload = (await response.json()) as { message?: string };
      setAnswer(payload.message ?? "No se recibió respuesta.");
    } catch {
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
        {answer ? <div className="border-l-2 border-core-accent/60 pl-2 text-[0.66rem] leading-relaxed text-core-text-secondary whitespace-pre-wrap">{answer}</div> : null}
      </div>
    </details>
  );
}
