# Fase 182 · UI con divulgación progresiva

Fecha: 2026-08-11  
Versión: 0.236.0

## Objetivo

Reducir la carga visual inicial sin eliminar capacidades: una persona cliente debe poder entender la escena primero y solicitar detalle técnico después.

## Cambios aplicados

- `ToolDrawer` ya no se abre automáticamente en modo técnico; copiloto, evidencia, escenarios y workbench aparecen bajo demanda.
- El modo cliente incorpora el bloque cerrado “Cómo se representa”, con la explicación adicional y una orientación breve para explorar el canvas.
- Se mantienen navegación, zoom, selección de nodos, escenarios y revisión técnica sin cambios de contrato.

## Criterio de diseño

La información contextual aparece en capas: primero propósito y valor, después representación, y por último herramientas y evidencia. No se ocultan hallazgos activos ni se eliminan controles funcionales.

## Verificación

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run validate:content`
- `npm run test:version-consistency`
