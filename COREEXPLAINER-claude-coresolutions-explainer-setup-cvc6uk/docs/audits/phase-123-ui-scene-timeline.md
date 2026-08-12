# Auditoría fase 123 — Timeline narrativa de escenas

**Fecha:** 2026-08-11
**Versión:** 0.177.0
**Rama:** `codex/ui-scene-timeline`

## Objetivo

Hacer que el diagrama sea una historia navegable: la persona debe entender dónde está, qué ya recorrió y qué puede explorar después sin abrir paneles secundarios.

## Cambios aplicados

- `SceneTimeline` se renderiza dentro del canvas y permite seleccionar cualquier escena.
- La escena activa usa `aria-current="step"`; las anteriores muestran estado completado.
- La timeline se desplaza horizontalmente y conserva títulos/etiquetas compactos para móvil y Focus.
- No duplica párrafos ni acciones técnicas; solo controla navegación y contexto.

## Límites

La timeline no cambia el contenido, las fuentes ni la semántica del diagrama. La navegación sigue pasando por `ExplainerLayout`, por lo que URL, progreso y controles existentes permanecen alineados.

## Verificación

Typecheck, lint y build validan la integración; el flujo existente de validación de contenido y regresiones técnicas permanece sin cambios.
