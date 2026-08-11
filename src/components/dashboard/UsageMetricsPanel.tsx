"use client";

import { useEffect, useState } from "react";
import { clearProductMetrics, readProductMetrics, type ProductMetrics } from "@/lib/telemetry/productTelemetry";

const empty: ProductMetrics = { totalEvents: 0, explainers: {}, scenarios: {}, workflows: 0, briefs: 0, drafts: 0 };

export function UsageMetricsPanel() {
  const [metrics, setMetrics] = useState(empty);
  useEffect(() => { setMetrics(readProductMetrics()); }, []);
  const topExplainer = Object.entries(metrics.explainers).sort((a, b) => b[1] - a[1])[0];
  return (
    <details className="mb-10 border border-core-border/[0.12] bg-core-panel/30 p-4">
      <summary className="cursor-pointer list-none font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">Métricas locales de utilidad</summary>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-4"><div><p className="text-core-text-muted">Eventos</p><p className="font-mono text-core-text">{metrics.totalEvents}</p></div><div><p className="text-core-text-muted">Workflows</p><p className="font-mono text-core-text">{metrics.workflows}</p></div><div><p className="text-core-text-muted">Briefs</p><p className="font-mono text-core-text">{metrics.briefs}</p></div><div><p className="text-core-text-muted">Borradores</p><p className="font-mono text-core-text">{metrics.drafts}</p></div></div>
      {topExplainer ? <p className="mt-3 text-xs text-core-text-secondary">Tema más utilizado en este navegador: <span className="font-semibold text-core-text">{topExplainer[0]}</span> ({topExplainer[1]} eventos)</p> : <p className="mt-3 text-xs text-core-text-muted">Aún no hay eventos locales.</p>}
      <button type="button" onClick={() => { clearProductMetrics(); setMetrics(empty); }} className="mt-3 border border-core-border/[0.18] px-2 py-1 text-[0.6rem] text-core-text-muted hover:text-core-text">Borrar métricas locales</button>
      <p className="mt-2 text-[0.56rem] text-core-text-muted">No se envían a CORESOLUTIONS ni a terceros. Sirven para validar utilidad durante una sesión de prueba.</p>
    </details>
  );
}
