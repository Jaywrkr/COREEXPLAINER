# Fase 164 — Métrica local de progreso de escenarios

Fecha de revisión: 2026-08-11  
Versión: 0.218.0  
Alcance: telemetría local y panel de métricas.

## Decisión

Abrir un escenario demuestra interés, pero no que la explicación se haya recorrido. El panel ahora registra `scenario-step-reviewed` al cambiar un paso del checklist y muestra el agregado `scenarioStepsReviewed`. El identificador solo contiene tema, escenario, paso y estado; no se guarda el texto de la conversación.

El normalizador valida `at` con `Date.parse` y lo convierte a ISO. Los eventos inválidos se descartan antes de agregarse; el límite existente de 500 eventos se mantiene.

## Límites y privacidad

- Son métricas de utilidad del navegador, no analítica de producción ni datos de usuarios.
- El contador no demuestra comprensión, éxito técnico ni aceptación del cliente.
- Los cambios de estado locales pueden generar más de un evento por paso; se interpreta como interacciones, no como usuarios únicos.

## Comprobaciones

```text
npm run test:product-telemetry
npm run typecheck
npm run lint
npm run validate:content
npm run build
npm run test:version-consistency
```
