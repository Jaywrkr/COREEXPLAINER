# Fase 77 · Proveniencia del paquete técnico

Fecha: 2026-08-10  
Versión: 0.131.0

## Qué cambia

- Cada salida Markdown incluye la versión de la aplicación (`currentVersion`).
- La UI añade la fecha ISO de generación en el momento de descargar.
- La regresión offline comprueba valores deterministas sin depender del reloj local.

## Uso técnico

Un paquete adjunto a un ticket puede relacionarse con el release exacto del explainer y con el momento de su generación. Esto facilita comparar evidencia entre revisiones.

## Límites

La fecha y versión describen el paquete, no el estado de la infraestructura ni la fecha de vigencia de las fuentes. La exportación sigue siendo conceptual.

## Verificación

- `npm run build` ✅ (Next.js 15.5.22, 29 rutas generadas en la fase).
- `npm run test:workbench-export` pendiente de ejecutar después de los cambios.
- `npm run typecheck` pendiente de ejecutar después de los cambios.
- `npm run lint` pendiente de ejecutar después de los cambios.
