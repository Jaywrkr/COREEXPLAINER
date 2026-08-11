# Auditoría fase 122 — Focus canvas y shell contextual

**Fecha:** 2026-08-11
**Versión:** 0.176.0
**Rama:** `codex/ui-focus-canvas`

## Objetivo

Reducir carga visual durante explicaciones y presentaciones sin eliminar controles ni información esencial.

## Cambios aplicados

- `ExplainerLayout` incorpora Focus canvas: oculta el panel lateral, expande el diagrama y permite restaurarlo desde el HUD.
- El HUD contextual muestra tema, paso, audiencia y progreso; no duplica los párrafos explicativos.
- El atajo `F` alterna el foco, respetando inputs, textareas y selects.
- Ancho del panel y modo se persisten localmente; `normalizeExplainerUiPreferences` limita valores inválidos.
- El modo Focus hace visible el canvas también en pantallas pequeñas, donde antes estaba oculto.

## Límites UX

Focus no elimina la navegación ni cambia el contenido técnico; solo cambia la composición visual. La preferencia es local y puede resetearse limpiando el almacenamiento del navegador.

## Verificación

La regresión cubre límites, NaN y valores inválidos de preferencias. Typecheck, lint y build deben pasar antes del merge.
