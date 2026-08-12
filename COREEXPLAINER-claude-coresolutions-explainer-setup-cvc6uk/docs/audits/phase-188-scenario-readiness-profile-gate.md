# Fase 188 · Readiness del perfil de simulación

Fecha: 2026-08-11  
Versión: 0.242.0

## Objetivo

Evitar que la cola de madurez declare listo un escenario cuyo perfil de simulación contradice las reglas técnicas del modo elegido.

## Cambios

- `scenarioReadiness` reutiliza `validateFailureSimulationProfile`.
- `isScenarioReadyForSupport` exige un perfil compatible, no solo la presencia de `simulation`.
- La regresión cubre un perfil `degraded` sin parámetro de degradación.

## Límite

La validación confirma coherencia del contrato authored; no simula capacidad real ni mide un entorno del cliente.

## Verificación

- `npm run test:scenario-readiness`
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run test:version-consistency`
- `npm run build`
