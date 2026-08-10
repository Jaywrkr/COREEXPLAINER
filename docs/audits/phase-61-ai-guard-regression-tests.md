# Fase 61 — Regresiones automatizadas del guard de IA

Fecha: 2026-08-10  
Versión: 0.115.0

## Resultado

Se añadió `scripts/test-ai-guards.ts`, ejecutable con `npm run test:ai-guards`. Comprueba:

- que no se estime coste si faltan tarifas;
- que la fórmula configurada sea estable;
- que sin Redis se devuelva el fallback local;
- que `/api/health` responda `200`, use `no-store`, no reporte proveedor configurado por defecto y marque `process-local`.

## Seguridad de la prueba

La suite no llama a OpenAI ni a Redis. Guarda una copia de las variables relevantes y las restaura en `finally`, evitando alterar el entorno del proceso que la ejecuta.

## Verificación

`npm run test:ai-guards` pasó. También deben pasar `npm run validate:content`, `npm run typecheck`, `npm run lint` y `npm run build`.
