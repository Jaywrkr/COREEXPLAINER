# Fase 181 — Claim paths validados en el ledger

Fecha: 2026-08-11  
Versión: 0.235.0

## Objetivo

Hacer que la trazabilidad de evidencia sea navegable y segura: cada registro debe apuntar a un campo autorado conocido, no a una cadena arbitraria que parezca una ruta.

## Cambios aplicados

- `isValidClaimPath` reconoce paths de `steps`, `failureScenarios.*.guidedSteps.*` y `targetArchitecture.roadmap/decisionOptions.*`.
- `validateEvidenceLedger` rechaza paths fuera de esos contratos y conserva la regla contra duplicados.
- La regresión cubre paths de narrativa, escenarios, un esquema peligroso y un path no autorizado.

## Límites técnicos

Un path válido solo identifica qué campo autorado representa el claim; no demuestra que el claim sea correcto ni que exista evidencia en el cliente. La revisión de fuente, integridad, frescura y entorno continúa siendo obligatoria.

## Verificación

```text
npm run test:evidence-ledger
npm run test:pattern-readiness
npm run test:source-freshness
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
