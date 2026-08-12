# Fase 146 — Contexto visual de escena

Versión: 0.200.0  
Fecha: 2026-08-11  
Rama: `codex/ui-context-rail`

## Objetivo

Evitar que la persona se pierda cuando explora el canvas o activa Focus. El diagrama debe conservar una orientación mínima sin repetir todo el panel de explicación.

## Cambios aplicados

- `CanvasContextCard` resume tema, etiqueta, progreso y audiencia en una tarjeta compacta.
- Muestra el primer párrafo de la escena como propósito inmediato y limita su longitud visual.
- En modo cliente y conceptual, el impacto de negocio se abre con un `<details>` bajo demanda.
- La tarjeta permanece visible en Focus, donde el panel lateral se oculta.

## Criterios de calidad

- No cambia escenas, reglas técnicas, fuentes ni estados de infraestructura.
- La información visible procede directamente de `ExplainerMeta` y `ExplainerStep`.
- Se conserva la accesibilidad con etiqueta de sección y divulgación nativa por teclado.

## Revisión

Typecheck, lint y build ejecutados el 2026-08-11. Revisión de contenido: 22 explainers sin cambios semánticos.
