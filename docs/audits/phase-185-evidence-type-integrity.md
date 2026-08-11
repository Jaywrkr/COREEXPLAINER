# Fase 185 · Integridad de tipos de evidencia

Fecha: 2026-08-11  
Versión: 0.239.0

## Objetivo

Conservar el significado de cada registro cuando pasa del contenido al workflow de revisión, exportación o soporte.

## Cambios

- Se validan los cuatro tipos permitidos: `documentary`, `observed`, `hypothesis` y `acceptance`.
- Se validan las dos procedencias permitidas: `authored` y `derived`.
- Los valores desconocidos producen errores explícitos en el content gate.
- Se agregan regresiones para `kind` y `provenance` inválidos.

## Límite

La clasificación no transforma una hipótesis en un hecho ni certifica evidencia externa; solo evita perder el significado editorial declarado.

## Verificación

- `npm run test:evidence-ledger`
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run test:version-consistency`
- `npm run build`
