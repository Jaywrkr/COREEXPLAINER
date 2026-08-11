# Fase 110 — Readiness del handoff de soporte

Estado: implementado en rama `codex/support-case-readiness`.

## Objetivo

Evitar que un documento descargado con campos vacíos parezca un handoff listo para otro especialista. La aplicación calcula una checklist determinista y declara los faltantes sin bloquear el trabajo.

## Contrato

`assessSupportCaseReadiness` comprueba ocho elementos: ID, resumen, impacto, responsable, ruta de triage válida, evidencia recibida, resultado de comprobación y decisión distinta de `pending`. Devuelve `score`, `ready` y `missing`.

El panel muestra el porcentaje y los faltantes. El Markdown conserva la misma evaluación. Descargar sigue permitido para facilitar un borrador temprano, pero el estado incompleto queda visible.

## Límites

Readiness significa “contexto suficientemente registrado para revisión”, no “incidente resuelto”, “causa raíz confirmada” ni “cambio aprobado”. Los datos permanecen locales y deben sanitizarse.

## Verificación

- `npm run test:support-case-pack`
- `npm run test:support-triage`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
