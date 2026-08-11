# Fase 138 — Content gate para assurance técnico

Fecha de revisión: 2026-08-11
Versión: 0.192.0

## Objetivo

Evitar que un perfil técnico se etiquete como respaldado o revisado cuando sus reglas no enlazan evidencia declarada.

## Implementado

- Regla pura `technicalIntegrityAssuranceIssues` para auditar perfiles.
- `source-backed` y `reviewed` requieren al menos una referencia de fuente.
- En `reviewed`, cada escena que declara edges/paths debe tener alguna regla con `sourceIds`.
- Escenas que solo describen nodos pueden seguir siendo conceptuales sin inventar evidencia.
- Integración en `validateExplainer` y regresión automatizada.

## Límites

Una referencia de fuente demuestra trazabilidad editorial, no que la configuración del cliente esté instalada, correcta o vigente fuera del repositorio. La revisión humana y la comprobación del entorno siguen siendo necesarias.

## Verificación

`test:technical-integrity-gate`, `validate:content`, typecheck y build.
