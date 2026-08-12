# Fase 161 — Gate de progreso en escenarios guiados

Fecha de revisión: 2026-08-11  
Versión: 0.215.0  
Alcance: secuencia observe → diagnose → recover → validate.

## Decisión

Un escenario puede explorarse libremente haciendo clic en sus pestañas, pero el control **Siguiente** exige que el paso actual se marque como `Revisado` o `No aplica`. Esto evita que una explicación parezca haber recorrido observación y diagnóstico cuando el usuario saltó directamente a recuperación.

El progreso se calcula desde los pasos actualmente autorados; claves antiguas en `localStorage` no inflan el porcentaje.

## Límites

- Es un guardrail de interacción local, no una aprobación de operación ni un runbook ejecutable.
- El estado vive en el navegador y no sincroniza revisores.
- Marcar un paso no demuestra que la evidencia exista en el entorno del cliente.

## Comprobaciones

```text
npm run test:guided-progress
npm run test:failure-simulation-validation
npm run typecheck
npm run lint
npm run validate:content
npm run build
npm run test:version-consistency
```
