# Fase 135 — Canvas con controles contextuales

Fecha de revisión: 2026-08-11
Versión: 0.189.0

## Objetivo

Reducir la carga visual del diagrama para clientes sin quitar las capacidades que necesita una persona técnica.

## Implementado

- `CanvasViewControls` ofrece una vista compacta con zoom y reset bajo demanda en modo cliente.
- El modo técnico mantiene zoom, porcentaje y restablecer siempre visibles.
- El canvas sigue siendo navegable por arrastre, rueda y teclado.
- El cambio es local a la capa de presentación; no altera escenas, reglas de integridad ni animación.

## Límites

Compactar controles no cambia el significado del diagrama ni convierte la animación en telemetría real. La vista sigue siendo conceptual y debe validarse con evidencia del entorno para decisiones técnicas.

## Verificación

Typecheck, lint y build; se debe repetir la revisión visual en cliente y técnico antes del merge.
