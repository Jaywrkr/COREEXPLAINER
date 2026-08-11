# Auditoría fase 127 — Gate de cierre para revisión especialista

**Fecha:** 2026-08-11
**Versión:** 0.181.0
**Rama:** `codex/review-assignment-gate`

## Objetivo

Evitar que un seguimiento local declare “listo para PR” sin un responsable, un plan de revisión y evidencia mínima de cierre.

## Cambios aplicados

- `reviewAssignment.ts` normaliza datos heredados y calcula faltantes de manera determinista.
- El gate exige responsable, fecha objetivo, nota de revisión, evidencia de cierre y cinco comprobaciones: narrativa, diagrama, fuentes, escenarios y ledger de evidencia.
- Se añade el estado `blocked` para que un impedimento no se confunda con trabajo pendiente genérico.
- `TechnicalReviewAssignment` aplica el contrato al guardar y devuelve un estado incompleto a `in-review`.
- La cola sigue siendo local al navegador; no actualiza `reviewStatus`, no aprueba contenido y no sustituye PR, CAB ni revisión especialista.

## Verificación

`test:review-assignment`, typecheck, lint, build, validación de contenido y regresiones de reportes deben pasar antes de publicar.
