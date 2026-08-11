# Fase 147 — Foco cinematográfico de escenas

Versión: 0.201.0  
Fecha: 2026-08-11  
Rama: `codex/ui-cinematic-focus`

## Objetivo

Hacer que la transición entre pasos guiados explique causalidad visualmente: el encuadre debe llevar la atención a los nodos autorados como relevantes sin mostrar una animación ornamental ni quitar control al usuario.

## Cambios aplicados

- `VisualCanvas` calcula un encuadre a partir de `guidedFocusNodeIds` y los centros normalizados de `SceneNode`.
- El viewport anima escala y posición con easing durante 520 ms.
- El foco automático solo se aplica en modos cliente/conceptual, donde la guía necesita priorizar la comprensión.
- `prefers-reduced-motion` convierte la transición en un cambio inmediato.
- Wheel, reset y arrastre cancelan cualquier transición en curso, priorizando la interacción explícita.

## Garantías

- No se cambian nodos, aristas, reglas, escenarios ni fuentes.
- Si un ID de foco no existe, el encuadre se omite de forma segura.
- El usuario puede restablecer el encuadre con el control existente o la tecla `0`.

## Revisión

Typecheck, lint y build ejecutados el 2026-08-11. Validación de contenido sin cambios semánticos.
