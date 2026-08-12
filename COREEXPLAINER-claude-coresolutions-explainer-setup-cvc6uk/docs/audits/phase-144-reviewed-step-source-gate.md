# Fase 144 — Gate de fuentes para contenido revisado

Fecha de revisión: 2026-08-11
Versión: 0.198.0

## Objetivo

Mantener el mismo estándar de evidencia en la narrativa textual y en el diagrama cuando un explainer declara revisión técnica completada.

## Implementado

- Regla pura `reviewedStepSourceIssues`.
- Cada paso revisado debe enlazar fuentes `current`.
- Fuentes `review-needed` o ausentes bloquean el estado `reviewed`.
- `pending` no se bloquea: permanece visible en el workflow como revisión pendiente.
- Regresión automatizada para ambos estados.

## Límites

La frescura editorial no demuestra que cada afirmación sea aplicable a un entorno concreto. Aún se requiere revisión especialista y evidencia del cliente.

## Verificación

Regresión de gate, validación de contenido, typecheck, lint y build.
