# Fase 159 — Máquina de estados del workflow editorial

Fecha de revisión: 2026-08-11  
Versión: 0.213.0  
Alcance: estado local del panel `ContentWorkflowPanel`.

## Problema corregido

El estado `review-due` ya existía en el almacenamiento local, pero no estaba en la lista visual de etapas. Al marcar una revisión vencida, el panel podía resolver la etapa como la primera (`Borrador`) y ocultar que el contenido debía volver a revisión técnica.

## Decisión

`src/lib/review/workflowState.ts` es ahora la fuente única de estados, etiquetas, responsables y transiciones. `review-due` es visible como alerta y solo puede avanzar a `technical-review`; nunca es un destino de la progresión normal.

Las transiciones siguen exigiendo revisión humana completa para pasar la revisión técnica y cero fuentes `review-needed` para pasar la revisión de fuentes.

## Límites

- El estado se conserva en `localStorage`; no es un sistema multiusuario ni una aprobación formal.
- No cambia `meta.reviewStatus` ni publica contenido.
- La aprobación real continúa requiriendo el proceso interno de CORESOLUTIONS.

## Comprobaciones

```text
npm run test:workflow-state
npm run typecheck
npm run lint
npm run build
npm run test:version-consistency
```
