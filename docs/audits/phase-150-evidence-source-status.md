# Fase 150 — Estado de vigencia en evidencia

Versión: 0.204.0  
Fecha: 2026-08-11  
Rama: `codex/evidence-source-status`

## Objetivo

Evitar que una referencia general parezca respaldo vigente para cada afirmación. El ledger debe conservar la relación entre registro y estado editorial de cada fuente.

## Cambios aplicados

- `EvidenceRecord.sourceStatus` clasifica cada ID como `current`, `review-needed` o `missing`.
- `buildEvidenceLedger` deriva el estado desde `meta.technicalReview.sources` sin consultar sistemas externos.
- `EvidenceMapPanel` muestra “vigente”, “revisar” o “faltante” en los enlaces de fuente.
- Se mantiene la advertencia de que la evidencia autorada no demuestra observación del entorno.

## Garantías

- No se cambia el significado de `EvidenceKind` ni se marca una evidencia como observada automáticamente.
- Fuentes ausentes siguen siendo visibles como errores de trazabilidad.
- El gate de contenido continúa siendo la autoridad para bloquear contenido revisado con fuentes no vigentes.

## Revisión

Pasaron `test:evidence-ledger`, typecheck y lint el 2026-08-11.
