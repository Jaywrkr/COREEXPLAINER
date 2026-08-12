# Auditoría fase 124 — UI con divulgación progresiva

**Fecha:** 2026-08-11
**Versión:** 0.178.0
**Rama:** `codex/ui-progressive-disclosure`

## Objetivo

Reducir la carga visual inicial sin quitar capacidades: la explicación, el modo y la navegación deben ser el primer recorrido; las herramientas de trabajo deben aparecer solo cuando la persona las solicita.

## Cambios aplicados

- `ToolDrawer` agrupa copiloto, evaluación, evidencia, soporte, workflow y paquetes de implementación bajo un único disclosure.
- Cliente inicia el grupo cerrado; técnico lo abre por defecto para conservar su flujo de trabajo.
- Se usa `details/summary` nativo con nombre explícito y una advertencia de alcance: las herramientas no cambian la infraestructura del cliente.
- No se elimina ninguna acción ni se altera el modelo de contenido, fuentes, escenarios o readiness.

## Verificación

Typecheck, lint, build y las regresiones de contenido/revisión deben pasar antes de publicar la rama. La validación semántica sigue mostrando las revisiones especialistas pendientes; no se interpreta como aprobación técnica.
