# Fase 84 — contrato versionado del informe técnico

Versión: 0.138.0  
Fecha: 2026-08-10

## Objetivo

Hacer que el informe JSON de revisión técnica sea consumible por automatizaciones, futuras sesiones de IA y herramientas externas sin adivinar qué versión de contrato generó los datos.

## Cambios aplicados

- `scripts/technical-review-report.ts` expone `schemaVersion: "1.0"` y `appVersion` en la salida JSON.
- `scripts/test-technical-review-report.ts` valida ambos campos junto con el resto del contrato.
- Se actualizan el changelog y el estado de proyecto.

## Interpretación

`schemaVersion` identifica la forma del JSON; `appVersion` identifica el release que generó el informe. Cambiar campos o su semántica requiere incrementar el esquema y actualizar su regresión. Estos metadatos no convierten el informe en una aprobación técnica automática.

## Verificación

- `npm run test:technical-review-report` ✅
