# Fase 170 — Razones accionables para refrescar fuentes

Fecha: 2026-08-11  
Versión: 0.224.0

## Objetivo

Evitar que la cola de revisión muestre solo un contador genérico de fuentes antiguas. El especialista necesita saber qué tipo de mantenimiento requiere cada fuente y cuándo volver a revisarla.

## Cambios aplicados

- `buildReviewActions` reutiliza el cálculo central de frescura.
- La acción `source-refresh` agrupa razones: revisión manual, fuera de la ventana de 180 días o fecha inválida.
- La evidencia incluye el `dueAt` sugerido por cada fuente, manteniendo los IDs enlazados al catálogo.
- Se añadió una regresión con una fuente antigua para evitar que el mensaje vuelva a ser genérico.

## Límites técnicos

La cola es un backlog editorial de solo lectura. No actualiza `accessedAt`, no consulta automáticamente al fabricante y no cambia `reviewStatus`. La fecha sugerida ayuda a ordenar trabajo; no es una fecha de caducidad contractual ni una certificación técnica.

## Verificación

```text
npm run test:review-actions
npm run test:review-action-export
npm run test:source-freshness
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
