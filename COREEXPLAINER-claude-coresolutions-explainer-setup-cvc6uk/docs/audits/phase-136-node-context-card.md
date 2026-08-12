# Fase 136 — Contexto de conexiones en nodos

Fecha de revisión: 2026-08-11
Versión: 0.190.0

## Objetivo

Evitar que un nodo seleccionado se entienda como una tarjeta aislada: la persona debe poder ver qué relación tiene con el resto de la escena.

## Implementado

- La tarjeta deriva conexiones entrantes y salientes desde `scene.edges`.
- Cliente recibe una lista corta y legible, limitada a tres relaciones para no saturar.
- Técnico recibe todas las relaciones y el tipo semántico de cada vínculo.
- Las etiquetas usan `GlossaryText` para explicar términos y siglas existentes.
- Los datos se derivan del contrato de la escena, sin inferir estado de red o telemetría.

## Verificación

Typecheck, lint, build y consistencia de versión.
