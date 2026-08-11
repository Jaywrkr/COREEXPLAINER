# Fase 190 · Tokens seguros para acciones del copiloto

Fecha: 2026-08-11  
Versión: 0.244.0

## Objetivo

Tratar la allowlist de acciones enviada por el navegador como entrada no confiable y conservar un perímetro read-only verificable.

## Cambios

- Se añadió `isSafeCopilotActionId` para aceptar solo tokens estructurados de hasta 160 caracteres.
- `sanitizeCopilotActions` descarta URLs, comandos, espacios y texto libre como IDs.
- El endpoint aplica la misma regla y limita cada allowlist a 100 elementos antes de llamar al proveedor.
- La UI sigue exigiendo confirmación visible para activar un escenario.

## Límite

La allowlist solo habilita enlaces o escenarios authored; no autoriza comandos, mutaciones de infraestructura ni URLs generadas por el modelo.

## Verificación

- `npm run test:copilot-actions`
- `npm run test:copilot-message-contract`
- `npm run typecheck`
- `npm run lint`
- `npm run validate:content`
- `npm run test:version-consistency`
- `npm run build`
