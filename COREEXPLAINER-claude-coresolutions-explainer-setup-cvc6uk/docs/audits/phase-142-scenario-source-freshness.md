# Fase 142 — Frescura de fuentes en escenarios

Fecha de revisión: 2026-08-11
Versión: 0.196.0

## Objetivo

Evitar que una simulación avanzada guíe decisiones usando referencias que el catálogo ya considera vencidas o no declaradas.

## Implementado

- Validación pura de fuentes de `guidedSteps` cuando existe `simulation`.
- Todos los IDs deben resolver a una fuente `current`.
- El gate se integra junto a la validación de narrativa observe/diagnose/recover/validate.
- Regresión para fuentes `review-needed`.

## Límites

Una fuente `current` mantiene frescura editorial según el catálogo, pero no prueba el estado de una configuración concreta ni reemplaza un runbook aprobado.

## Verificación

Regresión de content gate, `validate:content`, typecheck, lint y build.
