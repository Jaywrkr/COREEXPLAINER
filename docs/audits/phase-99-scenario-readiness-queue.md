# Fase 99 · Cola editorial de madurez de escenarios

Fecha: 2026-08-11
Versión: 0.153.0
Estado: implementado en rama `codex/scenario-readiness-queue`

## Objetivo

Convertir la métrica de madurez en una siguiente acción clara para el responsable de contenido o el especialista: qué escenario está incompleto y qué debe añadirse.

## Contrato

`buildScenarioReadinessQueue` recibe el registro autorado y devuelve solo escenarios incompletos, ordenados por porcentaje ascendente. Cada fila conserva explainer, escenario, porcentaje y faltantes:

- simulación tipada;
- flujo `observe`/`diagnose`/`recover`/`validate`;
- evidencia no vacía;
- fuentes marcadas `current`.

La UI enlaza al explainer; no marca el contenido como aprobado ni cambia `reviewStatus`.

## Verificación

- `npm run test:scenario-readiness`
- `npm run test:coverage-metrics`
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
