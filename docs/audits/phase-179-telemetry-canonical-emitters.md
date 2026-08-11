# Fase 179 — Emisores de telemetría con slugs canónicos

Fecha: 2026-08-11  
Versión: 0.233.0

## Objetivo

Conservar métricas útiles después de limitar la telemetría a identificadores. Los emisores deben enviar claves canónicas, no títulos ni texto introducido por la persona.

## Cambios aplicados

- `AssessmentBriefControl` recibe el `slug` del explainer desde `LeftPanel` y lo usa en `brief-download`.
- `ExplainerDraftCreator` usa el token fijo `creator` para contar intentos sin persistir el tema solicitado.
- La regresión distingue un token estable de una pregunta y una URL rechazadas.

## Límites técnicos

La métrica identifica el explainer o la superficie, no el contenido de la conversación. No se envían eventos a un servidor; el ledger sigue local y limitado a 500 eventos.

## Verificación

```text
npm run test:product-telemetry
npm run test:ai-usage-telemetry
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
