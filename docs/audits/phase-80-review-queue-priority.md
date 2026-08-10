# Fase 80 · Prioridad compartida de revisión

Fecha: 2026-08-10  
Versión: 0.134.0

## Qué cambia

- `src/lib/review/reviewPriority.ts` centraliza el score de revisión.
- `technical-review-report.ts` y `TechnicalReviewQueue` usan exactamente la misma regla.
- La cola ordena por prioridad y muestra el score junto a fuentes `review-needed`.

## Regla

- 100 puntos si `reviewStatus` está pendiente.
- 10 puntos por fuente `review-needed`.
- 5 puntos por advertencia del gate.

## Límites

El score organiza la atención del especialista. No mide severidad operacional, no evalúa exactitud tecnológica y no cambia el estado editorial.

## Verificación

- `npm run report:technical-review` pendiente de ejecutar.
- `npm run typecheck` pendiente de ejecutar.
- `npm run lint` pendiente de ejecutar.
