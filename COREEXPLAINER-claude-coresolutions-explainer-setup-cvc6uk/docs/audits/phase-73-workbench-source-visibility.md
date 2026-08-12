# Fase 73 · Visibilidad de fuentes por tarea

Fecha: 2026-08-10  
Versión: 0.127.0

## Qué cambia

- La UI muestra `sourceIds` en todas las tareas del Workbench, no únicamente enlaces de la vista Mantener.
- Las tareas sin fuente muestran `confirmar antes de ejecutar`.
- El contador del encabezado se describe como tareas con fuentes por confirmar.

## Por qué importa

Un handoff de implementación o soporte debe permitir volver desde una tarea a la fuente que respalda la afirmación. Mostrar el ID en contexto reduce búsquedas y evita interpretar el contador como un número de documentos únicos.

## Verificación

- `npm run test:workbench-export` pendiente de ejecutar después de los cambios.
- `npm run typecheck` pendiente de ejecutar después de los cambios.
- `npm run lint` pendiente de ejecutar después de los cambios.
