# Fase 4 — Accesibilidad e interacción segura

**Fecha:** 2026-08-06  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.56.0

## Objetivo

Permitir que la explicación pueda presentarse y explorarse sin depender exclusivamente del ratón, y evitar que la animación cause molestias oculovisuales.

## Acciones aplicadas

- El canvas tiene `role="img"`, nombre accesible y `tabIndex`, por lo que puede localizarse con teclado y tecnologías de asistencia.
- Con el canvas enfocado, `+` o `=` acerca, `-` aleja y `0` restablece el viewport.
- `prefers-reduced-motion` pausa la emisión y el desplazamiento de paquetes; el usuario conserva zoom, paneo, selección y escenarios.
- Se añadió una comunicación no visual (`role="status"`) cuando la animación queda pausada.
- La hoja global reduce también transiciones CSS y desplazamiento suave bajo esa preferencia.

## Límites

El canvas sigue siendo una visualización rasterizada: la información detallada debe leerse en los paneles HTML asociados. Una siguiente revisión con lectores de pantalla deberá comprobar el orden de foco completo y la navegación de cada diagnóstico.

## Validación ejecutada

- `npm run typecheck`
- `npm run lint`
- `npm run build`
