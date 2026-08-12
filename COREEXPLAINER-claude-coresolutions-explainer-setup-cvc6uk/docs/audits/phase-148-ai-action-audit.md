# Fase 148 — Auditoría local de acciones del copiloto

Versión: 0.202.0  
Fecha: 2026-08-11  
Rama: `codex/ai-action-audit`

## Objetivo

Obtener evidencia de qué acciones guiadas ayudan a la explicación sin convertir el copiloto en un operador ni almacenar contenido conversacional sensible.

## Cambios aplicados

- Se añadió el evento tipado `copilot-action` al ledger de telemetría local.
- `ProductMetrics.copilotActions` permite medir adopción junto a escenas, escenarios y presentaciones.
- Abrir una fuente registra `open-source:<id>`; activar un escenario registra `activate-scenario:<id>`.
- El evento se emite únicamente después de que la UI haya encontrado el recurso permitido en sus listas authoradas.

## Límites de seguridad

- No se registra la pregunta, la respuesta, el texto de la etiqueta ni una URL suministrada por el modelo.
- El endpoint y `sanitizeCopilotActions` siguen aceptando solo `open-source` y `activate-scenario` con IDs allowlisted.
- No se ejecutan comandos ni cambios de infraestructura.

## Revisión

Pasaron `test:product-telemetry`, `test:copilot-actions`, `test:copilot-policy`, typecheck y lint el 2026-08-11.
