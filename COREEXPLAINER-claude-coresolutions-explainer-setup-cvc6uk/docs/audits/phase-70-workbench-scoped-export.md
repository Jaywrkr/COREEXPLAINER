# Fase 70 · Exportación focalizada del Workbench

Fecha: 2026-08-10  
Versión: 0.124.0

## Qué cambia

- Se añade `Descargar vista actual` junto al paquete completo.
- La salida focalizada conserva modo, estado local, detalle, evidencia, fuentes y límites.
- El paquete completo continúa siendo la salida recomendada para una sesión integral.

## Uso técnico

Un especialista puede compartir solo la lista de mantenimiento, soporte o validación que está revisando, sin mezclarla con las demás vistas. Esto reduce ruido en handoffs y facilita adjuntar un hallazgo a un ticket o revisión.

## Límites

La descarga es local y conceptual. No demuestra que una tarea haya sido ejecutada ni sustituye un ticket, runbook, aprobación o evidencia del entorno.

## Verificación

- `npm run typecheck` pendiente de ejecutar después de los cambios.
- `npm run lint` pendiente de ejecutar después de los cambios.
- `npm run test:ai-guards` pendiente de ejecutar después de los cambios.
- `npm run validate:content` pendiente de ejecutar después de los cambios.
