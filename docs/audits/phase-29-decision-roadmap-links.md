# Fase 29 — Decisiones conectadas al roadmap

Fecha de revisión: 2026-08-09  
Versión: 0.83.0

## Objetivo

Cerrar el recorrido entre una decisión técnica y el trabajo de validación que la respalda. Una opción elegida no debe quedarse en una recomendación aislada: debe señalar qué fase del assessment y qué escenario ayudan a comprobarla.

## Resultado aplicado

- **Instana:** cobertura-first enlaza `coverage`; investigation-first enlaza `correlate` y `operate`.
- **Turbonomic:** recommend-first enlaza `plan` y `govern`; optimize-first enlaza `model` y `plan`.
- **webMethods:** api-first enlaza `contracts` y `operate`; hybrid-first enlaza `runtime` y `operate`.

La UI conserva el comportamiento bajo demanda: el usuario abre el laboratorio, selecciona una opción y desde allí puede revisar sus fases y escenarios relacionados.

## Límite

Los enlaces son editoriales; no declaran que la fase esté completada ni ejecutan comprobaciones contra las plataformas. El estado continúa siendo local y manual durante la sesión.
