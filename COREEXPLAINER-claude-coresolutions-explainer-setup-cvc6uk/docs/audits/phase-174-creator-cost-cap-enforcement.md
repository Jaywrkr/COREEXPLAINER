# Fase 174 — Tope de coste en el creador IA

Fecha: 2026-08-11  
Versión: 0.228.0

## Objetivo

Evitar que una superficie de IA quede protegida mientras otra puede consumir presupuesto sin respetar el mismo límite. El creador de borradores debe bloquearse antes de reservar tokens o llamar al proveedor cuando la estimación supera el tope configurado.

## Cambios aplicados

- `app/api/creator` reutiliza `exceedsAiCostCap` después de estimar entrada y salida.
- La respuesta es `429` con fallback local y la política de coste; no se ejecuta `reserveAiTokens` ni el `fetch` a OpenAI.
- El copiloto y el creador comparten la misma regla `AI_MAX_ESTIMATED_COST_USD`.
- La regresión verifica la decisión de tope con la misma función usada por ambas superficies.

## Límites técnicos

La estimación solo es fiable cuando el despliegue configura tarifas de entrada y salida. Si no hay tarifas explícitas, el sistema no inventa un precio; el presupuesto de tokens y la cuota temporal siguen aplicando. Un coste real del proveedor puede diferir de la estimación.

## Verificación

```text
npm run test:ai-cost-cap
npm run test:ai-guards
npm run test:copilot-policy
npm run test:creator-policy
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
