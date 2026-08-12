# Fase 184 · Coherencia del estado de fuentes

Fecha: 2026-08-11  
Versión: 0.238.0

## Objetivo

Mantener una relación auditable entre las fuentes que sustentan una evidencia y el estado editorial de cada una.

## Cambios

- `sourceIds` duplicados ahora son un error.
- Cada `sourceId` debe aparecer exactamente en `sourceStatus`.
- Se rechazan estados fuera de `current`, `review-needed` y `missing`.
- Se rechazan claves de `sourceStatus` que no están declaradas en `sourceIds`.

## Límite

El estado es editorial y local: `current` indica que la referencia está dentro de la ventana de revisión, no que el producto o entorno del cliente haya sido probado.

## Verificación

- `npm run test:evidence-ledger`
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run test:version-consistency`
- `npm run build`
