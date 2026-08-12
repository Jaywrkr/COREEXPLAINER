# Auditoría fase 130 — Sanitización de entradas para IA

**Fecha:** 2026-08-11
**Versión:** 0.184.0
**Rama:** `codex/ai-input-sanitization`

## Objetivo

Reducir el riesgo de enviar credenciales pegadas accidentalmente al copiloto y asegurar que el cuerpo leído por el endpoint respete el límite configurado incluso cuando no existe `content-length` confiable.

## Cambios aplicados

- `readJsonBody` lee el cuerpo una sola vez y limita sus bytes antes de parsearlo.
- `sanitizeCopilotInput` redacta Bearer tokens, claves con prefijos comunes y valores asociados a password/secret/token/api-key/authorization.
- La redacción ocurre antes del prompt enviado a OpenAI; no se registra ni persiste el texto original.
- Las acciones siguen limitadas por allowlist y la política continúa siendo read-only.

## Límites y verificación

La sanitización es defensa en profundidad, no un producto DLP: no autoriza pegar secretos ni datos de cliente. `test:ai-input-sanitization`, guards de IA, typecheck, lint, build y content gate deben pasar antes de publicar.
