# Fase 41 — Acciones controladas desde el copiloto

Fecha de revisión: 2026-08-09  
Versión: 0.95.0

## Objetivo

Hacer que una respuesta del copiloto pueda llevar a la evidencia o al escenario correcto sin permitir automatización peligrosa.

## Allowlist

- `open-source`: abre una fuente HTTPS ya presente en el contexto;
- `activate-scenario`: selecciona un escenario ya autorado en el explainer.

El servidor descarta acciones con tipos, IDs o etiquetas inválidas y limita la respuesta a tres. El cliente vuelve a comprobar que el recurso exista antes de mostrar el botón.

## Límites

No existe una acción para ejecutar comandos, cambiar configuraciones, llamar APIs de productos, marcar una aprobación formal o modificar contenido publicado. Cada acción requiere interacción explícita del usuario.
