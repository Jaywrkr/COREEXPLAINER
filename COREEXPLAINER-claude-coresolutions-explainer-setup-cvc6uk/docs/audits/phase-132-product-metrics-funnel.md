# Auditoría fase 132 — Funnel de métricas locales de utilidad

**Fecha:** 2026-08-11
**Versión:** 0.186.0
**Rama:** `codex/product-metrics-funnel`

## Objetivo

Medir si el explainer ayuda durante una sesión —sin inventar analítica de producción— y dar una salida portable para revisar esos datos.

## Cambios aplicados

- `productTelemetry.ts` normaliza una allowlist de eventos, limita la retención a 500 y agrega métricas de recorrido, escenarios, presentación, Focus y workflows.
- `ExplainerLayout` registra inicio/salida de presentación y cambios de Focus.
- `UsageMetricsPanel` muestra el funnel y permite exportar o borrar el snapshot local.
- El JSON se marca como `local-browser`; no incluye prompts, respuestas IA ni contenido de cliente.

## Verificación y límites

Las métricas son orientativas y dependen del navegador; no representan usuarios únicos, producción, SLA ni aceptación. `test:product-telemetry`, guards IA, typecheck, lint, build y content gate deben pasar antes de publicar.
