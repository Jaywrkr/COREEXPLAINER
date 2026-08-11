# Auditoría fase 128 — Resumen de campaña de revisión

**Fecha:** 2026-08-11
**Versión:** 0.182.0
**Rama:** `codex/review-campaign-summary`

## Objetivo

Dar visibilidad agregada al trabajo de revisión especialista sin duplicar ni suavizar el gate de readiness.

## Cambios aplicados

- `reviewCampaign.ts` agrega los estados de cada tema y cuenta readiness real, bloqueos y vencimientos.
- `ReviewCampaignSummary` se muestra cerrado por defecto en el dashboard para no competir con el catálogo.
- La lectura se limita a `localStorage` del navegador y normaliza datos heredados con el mismo contrato de asignación.
- El resumen incluye temas declarados como pending/reviewed, pero nunca cambia esos estados.

## Límites y verificación

La campaña no sincroniza tickets, GitHub, responsables ni aprobaciones. `test:review-campaign`, typecheck, lint, build y validaciones de contenido deben pasar antes de publicar.
