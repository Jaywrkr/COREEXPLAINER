# Fase 100 · Exportación del backlog de escenarios

Fecha: 2026-08-11
Versión: 0.154.0
Estado: implementado en rama `codex/scenario-readiness-export`

## Objetivo

Permitir que la cola editorial se convierta en un artefacto de trabajo para un PR, ticket o reunión técnica sin volver a copiar manualmente los faltantes.

## Contrato

`buildScenarioReadinessMarkdown` produce un documento determinista con versión, fecha, explainer, escenario, porcentaje, faltantes y enlace. La UI solo habilita la descarga cuando existen pendientes.

## Límites

- No cambia el contenido autorado ni el estado de revisión.
- No sincroniza con GitHub, Jira, ServiceNow u otro sistema.
- El porcentaje describe cobertura del contenido, no la salud del entorno.

## Verificación

- `npm run test:scenario-readiness`
- `npm run test:coverage-metrics`
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
