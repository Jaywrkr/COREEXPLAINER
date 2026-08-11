# Fase 102 — Decisiones de revisión con evidencia local

Estado: implementado en rama `codex/review-decision-evidence`.

## Objetivo

Evitar que el backlog técnico parezca resuelto solo porque alguien cambió un selector. Cada acción debe conservar una nota o evidencia breve y una fecha cuando se trabaja o se cierra.

## Contrato

`ReviewActionDecision` contiene `status`, `note` y `updatedAt`. Los estados anteriores guardados en `localStorage` siguen siendo legibles; si no existe un registro nuevo se crea una decisión compatible con nota vacía.

Resolver exige al menos 12 caracteres normalizados de evidencia o decisión. Si una acción resuelta pierde esa evidencia, vuelve a `in-progress`. La nota se limita a 500 caracteres y se normaliza para evitar saltos de línea en el exportable.

## Límites deliberados

- El registro es local al navegador y no sustituye un PR, ticket, CMDB o sistema ITSM.
- No cambia `reviewStatus`, no certifica un entorno real y no ejecuta comandos.
- La fecha indica cuándo se registró la decisión local, no cuándo se verificó la plataforma.
- La exportación conserva la nota para que un especialista pueda contrastarla y trasladarla al sistema oficial.

## Verificación

- `npm run test:review-action-tracking`
- `npm run test:review-action-export`
- `npm run test:review-actions`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
