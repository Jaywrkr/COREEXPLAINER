# Fase 105 — Gate semántico de simulaciones de fallo

Estado: implementado en rama `codex/failure-simulation-semantic-gate`.

## Objetivo

Evitar que una animación sugiera un tipo de fallo distinto del que describen sus parámetros. Un escenario útil para soporte debe separar caída total, degradación, latencia, capacidad, dependencia externa y pérdida de observabilidad.

## Reglas

- `capacity` requiere `remainingCapacityPercent` y no acepta latencia ni dependencia.
- `latency` requiere `addedLatencyMs` y no acepta capacidad ni dependencia.
- `dependency` requiere `externalDependency` y no acepta capacidad ni latencia.
- `degraded` requiere capacidad o latencia y no sustituye un fallo de dependencia.
- `hard-down` y `observability` no aceptan parámetros de degradación que cambien su significado.

El validador también exige un impacto legible. Un perfil inválido bloquea el registro/build.

## Límites

El modo describe una interacción didáctica; no es un modelo de rendimiento, no calcula disponibilidad y no prueba un entorno real. Las cifras deben contrastarse con sizing, métricas y documentación del cliente.

## Verificación

- `npm run test:failure-simulation-validation`
- `npm run validate:content`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
