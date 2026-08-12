# Fase 90 — exportación del backlog con estado local

Versión: 0.144.0  
Fecha: 2026-08-11

## Objetivo

Permitir que el resultado de una revisión local se convierta en un handoff útil para soporte, implementación o mantenimiento, sin crear una integración operacional ni enviar datos fuera del navegador.

## Cambios

- `buildReviewActionMarkdown` genera un contrato Markdown puro y comprobable offline.
- `ReviewActionExport` lee los estados locales y descarga `coresolutions-<slug>-review-actions.md`.
- El documento incluye prioridad, tipo, estado, motivo, evidencia esperada, fuentes y límites.
- Solo URLs `http`/`https` se convierten en enlaces; otras referencias se mantienen como IDs.
- CI ejecuta `test:review-action-export`.

## Límites

El archivo descargado es un handoff informativo. No cambia el estado editorial, no certifica un entorno y debe adjuntarse a un ticket/PR oficial con la revisión del especialista.

## Verificación

- `npm run test:review-action-export` ✅
- `npm run test:review-action-tracking` ✅
- `npm run typecheck` ✅
- `npm run build` ✅
