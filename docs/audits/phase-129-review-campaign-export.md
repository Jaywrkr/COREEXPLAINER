# Auditoría fase 129 — Exportación de campaña de revisión

**Fecha:** 2026-08-11
**Versión:** 0.183.0
**Rama:** `codex/review-campaign-export`

## Objetivo

Permitir que el estado de revisión local salga del navegador como un artefacto revisable, sin crear una falsa sincronización con tickets, GitHub o procesos de aprobación.

## Cambios aplicados

- `buildReviewCampaignMarkdown` produce un handoff legible con resumen, estados, responsables, vencimientos, faltantes, notas y evidencia de cierre.
- `buildReviewCampaignJson` conserva un schema versionado para integraciones futuras.
- La UI ofrece descargas explícitas y declara que el snapshot puede contener notas internas.
- El export reutiliza el mismo `assessTechnicalReviewAssignment` que cuenta readiness en el dashboard.

## Límites y verificación

Descargar no sincroniza ningún sistema externo ni cambia `reviewStatus`. Se debe sanitizar antes de compartir con clientes. `test:review-campaign-export`, typecheck, lint, build y content gate deben pasar antes de publicar.
