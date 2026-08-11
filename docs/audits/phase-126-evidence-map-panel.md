# Auditoría fase 126 — Mapa de evidencia contextual

**Fecha:** 2026-08-11
**Versión:** 0.180.0
**Rama:** `codex/evidence-map-panel`

## Objetivo

Hacer utilizable el ledger de evidencia como objeto de conversación: cada escena debe poder mostrar qué afirmación se está haciendo, qué evidencia pedir y qué fuentes respaldan el contenido, sin sugerir que la evidencia ya existe.

## Cambios aplicados

- `EvidenceMapPanel` reutiliza `buildEvidenceLedger` y `evidenceKindLabels` en lugar de duplicar reglas editoriales.
- Filtra el registro de la escena actual y, si existe, los pasos del escenario seleccionado.
- Enlaza fuentes conocidas y marca explícitamente cualquier ID no encontrado.
- Mantiene visible la frontera entre registro autorado, evidencia observada y aceptación formal.
- Se integra dentro de `ToolDrawer`, por lo que no aumenta la carga inicial del modo cliente.

## Verificación

La validación de contenido sigue aplicando el ledger como gate; typecheck, lint, build y regresiones de revisión deben pasar antes de publicar. El panel no ingiere archivos, no certifica controles y no cambia infraestructura.
