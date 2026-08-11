# Fase 191 · Envelope estructural del contexto del copiloto

Fecha: 2026-08-11  
Versión: 0.245.0

## Objetivo

Evitar que texto arbitrario llegue al proveedor con la apariencia de contexto authored del explainer.

## Cambios

- `isValidCopilotContextEnvelope` exige `marca: CORESOLUTIONS`, tema, escena con etiqueta/título y arrays acotados de fuentes/escenarios.
- Los IDs de esas colecciones reutilizan el token seguro de acciones.
- `app/api/copilot` responde `400` antes del proveedor si el envelope no cumple el contrato.
- Se agregan regresiones para envelope válido, marca incorrecta y texto libre.

## Límite

El envelope es una validación estructural defensiva. El navegador sigue siendo un boundary no confiable; no se presenta como firma criptográfica ni como prueba de autoría.

## Verificación

- `npm run test:copilot-message-contract`
- `npm run test:copilot-actions`
- `npm run typecheck`
- `npm run lint`
- `npm run validate:content`
- `npm run test:version-consistency`
- `npm run build`
