# Fase 74 · Enlaces directos a fuentes del Workbench

Fecha: 2026-08-10  
Versión: 0.128.0

## Qué cambia

- Cada `sourceId` de una tarea se resuelve contra `meta.technicalReview.sources`.
- Cuando hay coincidencia exacta, el ID abre la URL registrada en una pestaña nueva.
- Cuando no hay coincidencia, se muestra el ID sin convertirlo en un enlace inventado.

## Límites

El enlace prueba únicamente que existe una referencia declarada en el catálogo. No prueba que la URL siga disponible, que el contenido sea vigente ni que la afirmación sea correcta para un entorno real.

## Verificación

- `npm run test:workbench-export` pendiente de ejecutar.
- `npm run typecheck` pendiente de ejecutar.
- `npm run lint` pendiente de ejecutar.
