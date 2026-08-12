# Fase 139 — Gate de narrativa para simulaciones

Fecha de revisión: 2026-08-11
Versión: 0.193.0

## Objetivo

Impedir que un escenario de fallo avanzado se limite a cambiar colores o parámetros sin explicar cómo observar, diagnosticar, recuperar y validar el resultado.

## Implementado

- Regla pura `validateFailureScenarioNarrative`.
- Todo escenario con `simulation` debe declarar las cuatro fases guiadas.
- La validación se integra al content gate existente.
- Regresión para escenarios simples y simulados.

## Límites

La presencia de las fases no demuestra que el runbook sea ejecutable ni que la recuperación funcione en un cliente. Las fuentes, pruebas y aprobación especialista siguen siendo necesarias.

## Verificación

`test:technical-integrity-gate`, `validate:content`, typecheck, lint y build.
