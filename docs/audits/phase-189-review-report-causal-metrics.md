# Fase 189 · Métricas causales de revisión

Fecha: 2026-08-11  
Versión: 0.243.0

## Objetivo

Evitar que el informe técnico y sus métricas de cobertura contradigan el content gate o la cola de readiness.

## Cambios

- Se exportaron `hasCausalGuidedFlow` y `hasValidSimulationProfile` como predicados compartidos.
- `scripts/technical-review-report.ts` los usa para construir `scenarioProfiles`.
- La cobertura deja de considerar listo un escenario con parámetros de simulación incompatibles o fases desordenadas.

## Límite

La métrica describe madurez editorial del contenido; no es una métrica de salud, disponibilidad ni cumplimiento operativo del cliente.

## Verificación

- `npm run test:scenario-readiness`
- `npm run test:technical-review-report`
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run test:version-consistency`
- `npm run build`
