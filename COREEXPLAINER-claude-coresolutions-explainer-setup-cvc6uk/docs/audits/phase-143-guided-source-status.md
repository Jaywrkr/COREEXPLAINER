# Fase 143 — Estado de fuentes en pasos guiados

Fecha de revisión: 2026-08-11
Versión: 0.197.0

## Objetivo

Mostrar el estado de frescura de las fuentes justo donde una persona está siguiendo un escenario de fallo.

## Implementado

- Fuentes del paso activo etiquetadas como `Vigente` o `Revisar`.
- Advertencia contextual si alguna requiere actualización.
- Color y copy adaptados al riesgo sin añadir un panel permanente.
- Se conserva el límite de que la evidencia es editorial y no telemetría.

## Verificación

Typecheck, lint, build y consistencia de versión.
