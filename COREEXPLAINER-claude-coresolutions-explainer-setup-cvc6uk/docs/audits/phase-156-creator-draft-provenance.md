# Fase 156 — Proveniencia visible de borradores

Versión: 0.210.0  
Fecha: 2026-08-11  
Rama: `codex/creator-draft-provenance`

## Objetivo

Separar claramente un borrador generado por IA de una plantilla local de fallback. La forma del documento no demuestra exactitud técnica y la UI debe recordarlo en el punto de uso.

## Cambios aplicados

- La API devuelve `generatedBy: "ai"` solo cuando el contrato del modelo pasa.
- Las respuestas fallback declaran `generatedBy: "local-template"`.
- `ExplainerDraftCreator` muestra una etiqueta visible de origen y revisión.
- El estado de fallback mantiene el borrador local editable y su checklist de validación.

## Límites

- La etiqueta de origen no certifica la veracidad del contenido.
- No se persiste el borrador en el catálogo ni se elimina la revisión especialista.

## Revisión

Pasaron `test-creator-contract`, typecheck y lint el 2026-08-11.
