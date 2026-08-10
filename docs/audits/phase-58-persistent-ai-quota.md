# Fase 58 — Cuota persistente de IA

Fecha: 2026-08-10  
Versión: 0.112.0

## Resultado

El guard de `/api/copilot` y `/api/creator` puede compartir sus contadores entre instancias de Vercel mediante Upstash Redis REST. Se incrementan solicitudes y tokens en claves con ventana de diez minutos y expiración automática.

## Configuración

Definir en el entorno server-side:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

La biblioteca oficial `@upstash/redis` usa estas variables para conexiones HTTP adecuadas para funciones serverless. Si faltan, la app no falla: vuelve al mapa local por proceso.

## Seguridad y límites

- Las claves no incluyen prompts ni respuestas.
- Se usa la identidad HMAC validada de la fase anterior; si no existe, se usa IP.
- Las operaciones de Redis tienen expiración de diez minutos.
- Un fallo temporal de Redis activa el fallback local para mantener disponibilidad; por tanto, la persistencia debe monitorizarse si se requiere una cuota contractual estricta.
- La facturación y el límite de proveedor siguen siendo controles independientes.

## Referencias

- [Upstash: conexión con `@upstash/redis`](https://upstash.com/docs/redis/howto/connect-with-upstash-redis)
- [Upstash: App Router en Vercel](https://upstash.com/docs/redis/quickstarts/vercel-functions-app-router)

## Verificación

Pasaron `npm run validate:content`, `npm run typecheck`, `npm run lint` y `npm run build`.
