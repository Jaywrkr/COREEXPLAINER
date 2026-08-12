# Fase 183 · Resolución de claim paths

Fecha: 2026-08-11  
Versión: 0.237.0

## Objetivo

Evitar que el ledger de evidencia contenga referencias desconectadas del contenido authored. Un path con sintaxis válida no basta: debe resolver a un campo existente.

## Cambios

- Se añadió `resolvesClaimPath`, que valida índices de steps, IDs de escenarios y guided steps, y elementos de roadmap/decision options.
- `validateEvidenceLedger` recibe opcionalmente el contrato authored y emite un error explícito ante campos inexistentes.
- El content gate usa esa resolución antes de publicar cualquier explainer.
- Las regresiones cubren paths válidos, índices ausentes y entidades inexistentes.

## Límites

La resolución valida el contrato editorial local; no prueba que una fuente externa respalde la afirmación ni que el entorno del cliente coincida con ella.

## Verificación

- `npm run test:evidence-ledger`
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run test:version-consistency`
- `npm run build`
