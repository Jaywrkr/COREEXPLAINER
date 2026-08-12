# Fase 87 — backlog técnico accionable

Versión: 0.141.0  
Fecha: 2026-08-11

## Objetivo

Que la revisión técnica produzca una siguiente acción clara para implementación, soporte o mantenimiento, sin convertir la aplicación en un sistema operacional ni inventar tareas fuera del contenido autorizado.

## Contrato

Cada fila del informe JSON puede incluir `actions[]` con:

- `id` estable.
- `kind`: `human-review`, `source-refresh`, `content-gate` o `integrity-check`.
- `priority`: `high` o `medium`.
- `title`, `reason` y `evidence`.
- `sourceIds` para volver a la evidencia original.

El resumen incluye el total de acciones. El Markdown del paquete muestra el mismo backlog bajo `Backlog técnico sugerido`.

## Reglas

- `pending` crea una revisión especialista de alta prioridad.
- `review-needed` crea actualización de fuentes de alta prioridad.
- Cada warning del content gate crea una acción de decisión editorial/técnica.
- Un perfil de integridad con `assurance` distinto de `reviewed` crea una inspección de integridad de prioridad media.

Estas acciones son recomendaciones trazables: no ejecutan comandos, no cambian el contenido y no equivalen a aprobación técnica.

## Verificación

- `npm run test:technical-review-report` ✅
- `npm run test:technical-review-package` ✅
- `npm run typecheck` ✅
