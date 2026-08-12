# Fase 6 — Narrativa visual y movimiento

La animación del diagrama puede pausarse sin detener la navegación entre escenas.
Esto separa el movimiento explicativo del autoplay de la presentación. El control
respeta `prefers-reduced-motion`: cuando el sistema solicita movimiento reducido,
el motor no anima, pero el canvas sigue siendo navegable.

**Rama:** `codex/ui-narrative-motion`
