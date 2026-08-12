"use client";

import { useEffect, useState } from "react";
import { clearProductMetrics, emptyProductMetrics, PRODUCT_METRICS_CHANGED_EVENT, readProductEvents, readProductMetrics, recordProductEvent, type ProductMetrics } from "@/lib/telemetry/productTelemetry";

export function UsageMetricsPanel() {
  const [metrics, setMetrics] = useState<ProductMetrics>(() => emptyProductMetrics());
  useEffect(() => {
    const refresh = () => setMetrics(readProductMetrics());
    refresh();
    window.addEventListener(PRODUCT_METRICS_CHANGED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PRODUCT_METRICS_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  const topExplainer = Object.entries(metrics.explainers).sort((a, b) => b[1] - a[1])[0];
  const download = () => {
    recordProductEvent({ name: "campaign-export", id: "product-metrics" });
    const payload = { schemaVersion: "1.1", generatedAt: new Date().toISOString(), scope: "local-browser", metrics, events: readProductEvents() };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "coresolutions-product-metrics-local.json"; anchor.click(); URL.revokeObjectURL(url);
  };
  return (
    <details className="mb-10 border border-core-border/[0.12] bg-core-panel/30 p-4">
      <summary className="cursor-pointer list-none font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">Métricas locales de utilidad</summary>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-4">
        <div><p className="text-core-text-muted">Eventos</p><p className="font-mono text-core-text">{metrics.totalEvents}</p></div>
        <div><p className="text-core-text-muted">Temas únicos</p><p className="font-mono text-core-text">{metrics.uniqueExplainers}</p></div>
        <div><p className="text-core-text-muted">Escenas vistas</p><p className="font-mono text-core-text">{metrics.sceneViews}</p></div>
        <div><p className="text-core-text-muted">Escenarios abiertos</p><p className="font-mono text-core-text">{Object.values(metrics.scenarios).reduce((total, value) => total + value, 0)}</p></div>
        <div><p className="text-core-text-muted">Pasos de escenario revisados</p><p className="font-mono text-core-text">{metrics.scenarioStepsReviewed}</p></div>
        <div><p className="text-core-text-muted">Acciones copiloto</p><p className="font-mono text-core-text">{metrics.copilotActions}</p></div>
      </div>
      <div className="mt-2 grid gap-2 text-xs sm:grid-cols-4">
        <div><p className="text-core-text-muted">Presentaciones</p><p className="font-mono text-core-text">{metrics.presentationsStarted} iniciadas · {metrics.presentationsExited} salidas</p></div>
        <div><p className="text-core-text-muted">Focus canvas</p><p className="font-mono text-core-text">{metrics.focusToggles}</p></div>
        <div><p className="text-core-text-muted">Workflows</p><p className="font-mono text-core-text">{metrics.workflows}</p></div>
        <div><p className="text-core-text-muted">Exportaciones</p><p className="font-mono text-core-text">{metrics.campaignExports}</p></div>
      </div>
      {topExplainer ? <p className="mt-3 text-xs text-core-text-secondary">Tema más utilizado en este navegador: <span className="font-semibold text-core-text">{topExplainer[0]}</span> ({topExplainer[1]} eventos)</p> : <p className="mt-3 text-xs text-core-text-muted">Aún no hay eventos locales.</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={download} className="border border-core-accent/35 px-2 py-1 text-[0.6rem] font-semibold text-core-accent hover:bg-core-accent/10">Exportar métricas JSON</button>
        <button type="button" onClick={() => { clearProductMetrics(); setMetrics(emptyProductMetrics()); }} className="border border-core-border/[0.18] px-2 py-1 text-[0.6rem] text-core-text-muted hover:text-core-text">Borrar métricas locales</button>
      </div>
      <p className="mt-2 text-[0.56rem] text-core-text-muted">No se envían a CORESOLUTIONS ni a terceros. Son métricas de utilidad de este navegador, no analítica de producción.</p>
    </details>
  );
}
