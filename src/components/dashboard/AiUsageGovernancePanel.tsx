"use client";

import { useEffect, useState } from "react";
import { clearAiUsage, emptyAiUsage, readAiUsage, type AiUsageTelemetry } from "@/lib/ai/usageTelemetry";

function downloadUsage(usage: AiUsageTelemetry) {
  const payload = { schemaVersion: "1.0", generatedAt: new Date().toISOString(), scope: "local-browser", usage };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = "coresolutions-ai-usage-local.json"; anchor.click(); URL.revokeObjectURL(url);
}

export function AiUsageGovernancePanel() {
  const [usage, setUsage] = useState<AiUsageTelemetry>(() => emptyAiUsage());
  useEffect(() => { setUsage(readAiUsage()); }, []);
  return (
    <details className="mb-10 border border-core-border/[0.12] bg-core-panel/30 p-4">
      <summary className="cursor-pointer list-none font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">Gobierno local de uso de IA</summary>
      <p className="mt-2 max-w-3xl text-[0.68rem] leading-relaxed text-core-text-secondary">Resume tokens, fallos y coste estimado por superficie para controlar presupuesto durante demos y sesiones de creación. Es telemetría local, no una factura ni una cuota compartida.</p>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-4">
        <div><p className="text-core-text-muted">Consultas</p><p className="font-mono text-core-text">{usage.requests}</p></div>
        <div><p className="text-core-text-muted">Tokens</p><p className="font-mono text-core-text">{usage.totalTokens || "—"}</p></div>
        <div><p className="text-core-text-muted">Fallos</p><p className="font-mono text-core-text">{usage.failures}</p></div>
        <div><p className="text-core-text-muted">Coste estimado</p><p className="font-mono text-core-text">{usage.estimatedCostUsd ? `US$ ${usage.estimatedCostUsd.toFixed(4)}` : "No configurado"}</p></div>
      </div>
      <div className="mt-3 grid gap-2 text-[0.62rem] sm:grid-cols-3">
        {(["copilot", "creator", "unknown"] as const).map((surface) => { const bucket = usage.bySurface[surface]; return <div key={surface} className="border border-core-border/[0.1] p-2"><p className="font-mono uppercase text-core-text-muted">{surface}</p><p className="mt-1 text-core-text">{bucket.requests} consultas · {bucket.totalTokens || "—"} tokens</p><p className="text-core-text-muted">{bucket.failures} fallos · {bucket.estimatedCostUsd ? `US$ ${bucket.estimatedCostUsd.toFixed(4)}` : "coste no configurado"}</p></div>; })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => downloadUsage(usage)} className="border border-core-accent/40 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:bg-core-accent/10">Exportar resumen JSON</button>
        <button type="button" onClick={() => { clearAiUsage(); setUsage(emptyAiUsage()); }} className="border border-core-border/[0.18] px-2 py-1 text-[0.6rem] text-core-text-muted hover:text-core-text">Borrar uso local</button>
      </div>
      <p className="mt-2 text-[0.56rem] text-core-text-muted">No se envía a CORESOLUTIONS ni a terceros. El coste solo es estimable cuando el servidor devuelve tarifas configuradas explícitamente.</p>
    </details>
  );
}
