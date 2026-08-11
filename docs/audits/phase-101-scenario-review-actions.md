# Fase 101 · Acciones de revisión para madurez de escenarios

Fecha: 2026-08-11
Versión: 0.155.0
Estado: implementado en rama `codex/scenario-review-actions`

## Objetivo

Conectar la cola de madurez con el workflow técnico existente. Un faltante de escenario debe aparecer como trabajo priorizable, con el mismo seguimiento y exportación que una fuente obsoleta o una advertencia del gate.

## Contrato

`buildReviewActions` añade una acción `scenario-readiness` por escenario incompleto. La prioridad es `high` cuando la cobertura es 0% y `medium` cuando existe parte del contrato. Cada acción incluye motivo, evidencia esperada y `sourceIds` del escenario.

La cola `TechnicalReviewQueue`, `ReviewActionTracker` y `ReviewActionExport` consumen el mismo contrato; resolver localmente una acción no cambia `reviewStatus` ni publica contenido.

## Límites

- La acción indica trabajo editorial/técnico pendiente, no un comando para ejecutar.
- Las fuentes se deben contrastar en la revisión especialista.
- La prioridad ayuda a ordenar el trabajo y no es una aprobación automática.

## Verificación

- `npm run test:review-actions`
- `npm run test:review-action-export`
- `npm run test:review-action-tracking`
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
