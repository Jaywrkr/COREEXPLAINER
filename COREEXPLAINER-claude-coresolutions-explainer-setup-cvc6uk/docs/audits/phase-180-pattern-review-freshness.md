# Fase 180 — Frescura de patrones reutilizables

Fecha: 2026-08-11  
Versión: 0.234.0

## Objetivo

Evitar que un patrón de arquitectura parezca reutilizable indefinidamente solo porque sus explainers enlazados están vigentes. El patrón también tiene una fecha editorial propia y debe revisarse periódicamente.

## Cambios aplicados

- `assessPatternReadiness` calcula frescura para `lastReviewedAt` con la ventana común de 180 días.
- Un patrón fuera de ventana o con fecha inválida pasa a `review-needed` y muestra motivo y fecha sugerida.
- El estado `blocked` por estructura continúa teniendo prioridad cuando faltan explainers o evidencia mínima.
- La regresión cubre un patrón recién revisado y uno de 2020.

## Límites técnicos

La frescura editorial no convierte un patrón en una recomendación compatible. La reutilización sigue requiriendo revisión de fuentes, escenarios, integridad del diagrama, marcas, alcance y evidencia del cliente.

## Verificación

```text
npm run test:pattern-readiness
npm run test:source-freshness
npm run test:pattern-validation
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
