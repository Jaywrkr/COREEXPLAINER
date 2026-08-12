# Fase 103 — Allowlist de acciones del copiloto

Estado: implementado en rama `codex/copilot-action-contract`.

## Objetivo

Hacer que la frontera de acciones controladas sea verificable en el servidor y no dependa únicamente del prompt o del filtrado visual del navegador.

## Contrato

La UI envía los IDs de fuentes y escenarios que existen en el explainer activo. `sanitizeCopilotActions` recibe la salida no confiable del modelo y conserva únicamente:

- `open-source` cuyo ID está en `sourceIds`;
- `activate-scenario` cuyo ID está en `scenarioIds`.

Las etiquetas se normalizan, se limitan a 120 caracteres, y la salida queda limitada a tres acciones. URLs, comandos, tipos desconocidos y recursos no autorados se descartan.

## Límites

- La allowlist no convierte la IA en una autoridad: el cliente debe volver a verificar el recurso antes de mostrarlo.
- Las acciones no llaman APIs de fabricantes, no cambian configuración y no modifican contenido.
- El contexto y la allowlist siguen siendo una solicitud del navegador; la acción solo navega o selecciona una escena local.

## Verificación

- `npm run test:copilot-actions`
- `npm run test:copilot-policy`
- `npm run test:ai-guards`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
