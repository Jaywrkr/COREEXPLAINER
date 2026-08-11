# Fase 175 — Guard de coste posterior al uso real

Fecha: 2026-08-11  
Versión: 0.229.0

## Objetivo

Cubrir la diferencia entre el coste estimado antes de una llamada y el consumo reportado por el proveedor. La primera barrera evita llamadas previsiblemente caras; la segunda evita presentar como salida normal una respuesta que excedió el límite observado.

## Cambios aplicados

- Copiloto y creador calculan `estimateAiCost` con `prompt_tokens` y `completion_tokens` recibidos.
- Ambos vuelven a evaluar `exceedsAiCostCap` después del proveedor.
- Copiloto devuelve `429` con uso observado y sin entregar la respuesta como resultado normal.
- Creador devuelve `429`, `fallback: true`, política y uso observado para que la UI pueda usar la plantilla local.

## Límites técnicos

La llamada ya ocurrió cuando se conoce el uso real; esta barrera no puede deshacer un coste facturado. Su función es evitar una salida engañosa y dejar trazabilidad. La prevención principal sigue siendo la estimación previa, la cuota temporal y la configuración de tarifas.

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
