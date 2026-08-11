# Fase 88 — backlog técnico visible y contrato compartido

Versión: 0.142.0  
Fecha: 2026-08-11

## Objetivo

Hacer visible para una persona que revisa, implementa o mantiene un explainer cuál es la siguiente acción técnica sugerida, sin obligarla a descargar el informe CLI.

## Cambios

- `src/lib/review/reviewActions.ts` centraliza el contrato y las reglas de derivación.
- El informe JSON/Markdown reutiliza el módulo compartido.
- `TechnicalReviewQueue` muestra un bloque colapsado por explainer con prioridad, motivo, evidencia y enlaces a fuentes.
- `test-review-actions.ts` valida campos obligatorios y evita IDs de fuente inexistentes.
- CI ejecuta esta regresión en cada PR y push a `main`.

## Diseño y límites

El backlog aparece cerrado por defecto para preservar la densidad visual. Es una lista de recomendaciones de revisión; no cambia estados, no ejecuta comandos y no certifica un entorno.

## Verificación

- `npm run test:review-actions` ✅
- `npm run test:technical-review-report` ✅
- `npm run typecheck` ✅
- `npm run lint` ✅
