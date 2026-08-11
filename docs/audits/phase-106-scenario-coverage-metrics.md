# Fase 106 — Métricas accionables de madurez de escenarios

Estado: implementado en rama `codex/scenario-coverage-metrics`.

## Objetivo

Contar escenarios no era suficiente: un catálogo puede tener escenarios declarados, pero carecer de simulación, flujo guiado, evidencia o fuentes vigentes. La métrica ahora hace visible esa diferencia.

## Contrato

Cada escenario aporta cuatro condiciones binarias: simulación, flujo guiado, evidencia y fuentes vigentes. `scenarioCoveragePercent` es el promedio de esas condiciones sobre todos los escenarios. También se separan:

- listos para soporte: cuatro condiciones;
- cobertura parcial: entre una y tres;
- sin cobertura: cero.

El panel del dashboard y el informe técnico consumen el mismo cálculo puro.
El informe JSON incrementa su `schemaVersion` a `1.2` porque expone nuevos campos de cobertura agregada.

## Límites

El porcentaje mide madurez del contenido autorado, no disponibilidad, rendimiento, MTTR, RPO/RTO ni salud del entorno del cliente. La revisión humana sigue siendo necesaria.

## Verificación

- `npm run test:coverage-metrics`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
