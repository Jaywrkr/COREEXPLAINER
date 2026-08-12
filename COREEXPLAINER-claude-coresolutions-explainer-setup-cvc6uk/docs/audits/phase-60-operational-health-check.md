# Fase 60 — Health check operativo

Fecha: 2026-08-10  
Versión: 0.114.0

## Resultado

Se añadió `GET /api/health` como comprobación segura para Vercel y monitoreo. Devuelve:

- versión actual;
- si el endpoint de IA está habilitado;
- si existe configuración del proveedor, sin mostrar la clave;
- si las cuotas usan Redis compartido o memoria local;
- si existe un secreto HMAC de identidad válido por longitud.

## Límites

El endpoint no hace una llamada de prueba al proveedor ni a Redis: no genera coste ni muta contadores. `shared-redis` significa que las variables están configuradas, no que se haya ejecutado un ping. Los errores de Redis siguen activando el fallback local y deben vigilarse con logs.

## Verificación

Pasaron `npm run validate:content`, `npm run typecheck`, `npm run lint` y `npm run build`.
