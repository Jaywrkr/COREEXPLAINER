# Fase 149 — Métricas locales en vivo

Versión: 0.203.0  
Fecha: 2026-08-11  
Rama: `codex/metrics-live-refresh`

## Objetivo

Hacer que la evidencia de utilidad sea accionable durante una sesión. El dashboard debe reflejar nuevas interacciones sin depender de una recarga manual ni de un servicio externo.

## Cambios aplicados

- `recordProductEvent` emite `core-explainer:metrics-changed` después de persistir un evento válido.
- `clearProductMetrics` emite el mismo evento para mantener la vista coherente tras borrar datos.
- `UsageMetricsPanel` escucha ese evento y el evento nativo `storage` para sincronizar pestañas del mismo navegador.
- Se expone el contador de `copilotActions` en el resumen.

## Privacidad y límites

- Los datos siguen en `localStorage`; no se añade red, cookie ni identificador de usuario.
- El evento no contiene texto conversacional ni payload adicional.
- La sincronización entre pestañas solo re-lee el ledger local ya existente.

## Revisión

Typecheck, lint, build, validación de contenido y consistencia de versión ejecutados el 2026-08-11.
