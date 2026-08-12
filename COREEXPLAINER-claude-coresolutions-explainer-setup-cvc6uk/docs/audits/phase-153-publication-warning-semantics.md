# Fase 153 — Semántica de advertencias de publicación

Versión: 0.207.0  
Fecha: 2026-08-11  
Rama: `codex/publication-warning-semantics`

## Objetivo

Evitar falsos bloqueos en el workflow de revisión. Una advertencia editorial como “revisión humana pendiente” no debe confundirse con un defecto estructural del explainer.

## Cambios aplicados

- `assessPublicationReadiness` clasifica advertencias de validación como `review-needed`.
- La ruta cliente no se marca `blocked` solo porque todavía no exista revisión humana.
- La ruta soporte se marca `blocked` cuando un escenario declarado no cumple la cobertura mínima; de lo contrario permanece `review-needed` hasta completar revisión, fuentes e integridad.
- El test de regresión cubre la diferencia entre advertencia pendiente y bloqueo por cobertura.

## Revisión

Pasaron `test-publication-readiness`, typecheck y lint el 2026-08-11. La corrección evita que los 22 explainers pendientes se presenten falsamente como fallos técnicos.
