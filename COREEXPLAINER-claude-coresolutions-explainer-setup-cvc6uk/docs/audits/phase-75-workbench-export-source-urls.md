# Fase 75 · URLs de fuentes en exportaciones

Fecha: 2026-08-10  
Versión: 0.129.0

## Qué cambia

- `WorkbenchExportItem` admite múltiples `sourceLabels`.
- Las exportaciones focalizada y completa imprimen una referencia por cada URL encontrada en el catálogo.
- El test offline comprueba que una URL registrada no se pierde.

## Límites

La URL se copia del catálogo autorado; no se verifica que esté disponible ni que la documentación siga vigente. Los IDs sin coincidencia no reciben URL por inferencia.

## Verificación

- `npm run test:workbench-export` pendiente de ejecutar.
- `npm run typecheck` pendiente de ejecutar.
- `npm run lint` pendiente de ejecutar.
