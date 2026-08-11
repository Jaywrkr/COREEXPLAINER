# Fase 163 — Endurecimiento de claves de cuota de IA

Fecha de revisión: 2026-08-11  
Versión: 0.217.0  
Alcance: `endpointGuard` y cuotas locales de solicitudes/tokens.

## Problema

La clave anónima de las cuotas se construía con el valor crudo de `x-forwarded-for`. Un cliente podía enviar valores largos o inconsistentes y aumentar la cardinalidad de la memoria local; además, no debía conservarse una dirección de red completa como clave interna.

## Corrección

`deriveAiClientKey` conserva primero la identidad firmada cuando está configurada. Para tráfico anónimo usa `x-real-ip` del proxy, cae a la primera dirección reenviada por compatibilidad, limita la entrada a 128 caracteres y genera un hash SHA-256 truncado (`ip:<32 hex>`). Las cuotas de solicitudes y tokens usan la misma clave estable.

## Límites

- Un rate limit en memoria no sustituye WAF, CDN, autenticación ni cuota persistente Redis.
- La confianza en headers de red depende de la configuración del proxy; en producción se debe impedir que el origen los sobrescriba.
- El hash evita guardar el valor crudo dentro del mapa, pero no convierte una IP en un identificador anónimo perfecto.

## Comprobaciones

```text
npm run test:ai-guards
npm run typecheck
npm run lint
npm run validate:content
npm run build
npm run test:version-consistency
```
