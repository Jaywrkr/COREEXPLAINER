# Fase 108 — Cuota de IA fail-closed configurable

Estado: implementado en rama `codex/ai-quota-fail-closed`.

## Objetivo

El fallback local protege la disponibilidad, pero no puede garantizar un presupuesto global cuando Redis falla y existen varias instancias serverless. Se añade una decisión explícita por entorno.

## Política

- Sin `AI_PERSISTENT_QUOTA_REQUIRED=true`, el comportamiento existente se mantiene: Redis compartido si está disponible y fallback local si falta o falla.
- Con `AI_PERSISTENT_QUOTA_REQUIRED=true` y credenciales Redis configuradas, un fallo de la cuota compartida devuelve `503` antes de llamar al proveedor.
- `/api/health` distingue `process-local`, `shared-redis` y `shared-redis-required`.
- `Redis.fromEnv()` se captura para evitar una excepción de configuración no controlada.

## Límites

El modo fail-closed no sustituye alertas, monitorización ni un sistema de facturación del proveedor. Solo protege las rutas de IA de esta aplicación y no afecta la experiencia local sin IA.

## Verificación

- `npm run test:ai-guards`
- `npm run test:copilot-actions`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
