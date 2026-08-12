# Fase 107 — Normalización automática de frescura de fuentes

Estado: implementado en rama `codex/source-freshness-normalization`.

## Objetivo

Evitar que una etiqueta manual `current` oculte una fuente que lleva demasiado tiempo sin contrastarse. La frescura es una señal de revisión, no una prueba de que una URL siga disponible.

## Contrato

`deriveSourceValidity` usa una ventana de 180 días respecto de la fecha actual. Una fuente explícitamente `review-needed` conserva ese estado; una fuente `current` o sin etiqueta pasa a `review-needed` cuando `accessedAt` queda fuera de ventana. La fecha actual puede inyectarse para pruebas deterministas.

El catálogo aplica la normalización durante `enrichTechnicalReview`, antes del content gate y del informe de revisión. Así las fuentes antiguas generan acciones `source-refresh` sin editar silenciosamente el contenido autorado.

## Límites

- No se hace una solicitud HTTP ni se comprueba que el documento siga publicado.
- La ventana de 180 días es una política de triage; una revisión especialista puede exigir una frecuencia distinta por producto.
- `review-needed` no aprueba ni bloquea por sí solo el contenido; prioriza el trabajo de actualización.

## Verificación

- `npm run test:source-freshness`
- `npm run validate:content`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
