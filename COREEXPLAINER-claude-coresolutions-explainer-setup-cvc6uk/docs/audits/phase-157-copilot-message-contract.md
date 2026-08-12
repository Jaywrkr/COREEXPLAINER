# Fase 157 — Contrato de mensajes del copiloto

Versión: 0.211.0  
Fecha: 2026-08-11  
Rama: `codex/copilot-message-contract`

## Objetivo

Tratar la prosa generada por el proveedor como salida no confiable antes de renderizarla. La allowlist de acciones no debe ser la única frontera de seguridad del copiloto.

## Cambios aplicados

- `sanitizeCopilotMessage` acepta solo texto, elimina caracteres de control y limita el tamaño a 5.000 caracteres.
- La ruta `/api/copilot` usa el mensaje normalizado o un fallback seguro.
- Las acciones siguen sanitizándose por separado contra IDs permitidos del contexto.

## Límites

- La normalización protege el contrato de salida, pero no verifica la exactitud técnica del texto.
- El modelo continúa restringido al contexto autorado y a modo `read-only`.

## Revisión

Pasaron `test-copilot-message-contract`, `test:copilot-actions`, typecheck y lint el 2026-08-11.
