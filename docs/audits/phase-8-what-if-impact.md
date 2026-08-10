# Fase 8 — Análisis what-if de impacto

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.62.0

## Objetivo

Responder técnicamente qué cambia en el grafo cuando una persona activa un fallo, en lugar de limitarse a oscurecer un nodo.

## Resultado aplicado

`src/lib/semantic-model/evaluateWhatIf.ts` recibe la escena y los nodos no disponibles del escenario. Calcula:

- relaciones que pierden uno de sus extremos;
- componentes disponibles que siguen siendo alcanzables desde una entrada;
- componentes que quedan sin camino desde una entrada;
- estado del impacto: contenido, degradado o bloqueado.

El panel de escenarios muestra esta lectura bajo demanda como **Impacto calculado**.

## Decisiones de seguridad

- El cálculo es determinista y usa únicamente nodos y aristas del `animation-spec`.
- No afirma que el servicio real esté caído ni que una red de producción tenga ese camino.
- No ejecuta failover, restore, cambios de configuración ni llamadas externas.
- Si una escena no tiene una entrada disponible, el resultado se marca como bloqueado en lugar de inventar una ruta.

## Próximo paso

Cruzar el impacto calculado con reglas de integridad, RPO/RTO, capacidad y fuentes para explicar qué evidencia debería revisarse antes de aceptar una recuperación.

## Validación ejecutada

- `npm run typecheck`
- ESLint sobre archivos modificados
- `npm run build`
