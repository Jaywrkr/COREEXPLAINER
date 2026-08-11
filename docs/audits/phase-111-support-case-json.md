# Fase 111 — Exportación JSON del handoff de soporte

Estado: implementado en rama `codex/support-case-json`.

## Objetivo

Permitir que el resultado de un triage conceptual pueda reutilizarse en futuras herramientas de documentación o ITSM sin acoplar CORESOLUTIONS a un backend ni enviar información automáticamente.

## Contrato

`buildSupportCaseJson` devuelve `schemaVersion: "1.0"`, versión de aplicación, fecha de generación, tema, marcas, draft normalizado, readiness, triage seleccionado, rutas disponibles y ledger de evidencia. Comparte la misma fuente de datos que el exportador Markdown.

La UI ofrece una descarga explícita de JSON. El usuario decide dónde almacenarlo o revisarlo.

## Límites

- No hay POST a un sistema externo ni integración ITSM implícita.
- El JSON contiene texto introducido por el usuario; debe sanitizarse antes de compartirlo.
- El esquema no certifica causa raíz, resolución ni autorización de cambios.

## Verificación

- `npm run test:support-case-pack`
- `npm run test:support-triage`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
