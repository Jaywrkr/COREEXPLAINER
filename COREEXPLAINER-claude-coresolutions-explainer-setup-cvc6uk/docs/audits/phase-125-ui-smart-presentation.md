# Auditoría fase 125 — Modo presentación inteligente

**Fecha:** 2026-08-11
**Versión:** 0.179.0
**Rama:** `codex/ui-smart-presentation`

## Objetivo

Permitir una presentación centrada en el relato: el diagrama ocupa el foco, los controles no compiten con la animación y la persona puede recuperar el control sin perder el contexto.

## Cambios aplicados

- `PresentationHud` ofrece anterior, siguiente, reproducir/pausar, reiniciar y salir dentro del canvas.
- Entrar en presentación activa Focus canvas y guarda el Focus previo para restaurarlo al salir.
- El chrome contextual se oculta después de 3.2 segundos de inactividad y se revela con movimiento del puntero.
- Escape, flechas, PageUp/PageDown, Home, End y Espacio mantienen sus atajos existentes.

## Límites y verificación

La presentación solo cambia la navegación local; no cambia contenido, fuentes, escenarios ni infraestructura. Typecheck, lint, build y regresiones de revisión deben pasar antes de publicar la rama.
