# Fase 46 — Content gate consciente de identificadores

Fecha de revisión: 2026-08-10  
Versión: 0.100.0

## Hallazgo

El modelo de contenido usa IDs técnicos para `affectedNodes`, pero el gate anterior solo buscaba el texto de `node.name`. Eso producía advertencias aunque el escenario apuntara correctamente al nodo.

## Cambio

- La alineación de pasos acepta el nombre visible y el ID normalizado (por ejemplo, `veeam-repository` se interpreta también como `veeam repository`).
- La coherencia de escenarios comprueba `affectedNodes` contra `node.id` y `node.name` sin usar coincidencias parciales ambiguas.
- Se mantienen como errores las relaciones con endpoints inexistentes y como advertencias los casos que requieren juicio editorial.

## Criterio técnico

Aceptar un ID no afirma que la explicación sea completa; únicamente reconoce la referencia formal que el contrato de contenido ya declara. El especialista debe seguir revisando que el nombre, el texto y el comportamiento mostrado sean consistentes.

## Verificación

- `npm run validate:content`
- `npm run typecheck`
- `npm run build`
- Comparar el número y el contenido de advertencias antes/después; no ocultar errores de topología.
