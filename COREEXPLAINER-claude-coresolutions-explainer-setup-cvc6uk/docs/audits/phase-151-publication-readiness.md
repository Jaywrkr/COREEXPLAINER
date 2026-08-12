# Fase 151 — Puerta de publicación

Versión: 0.205.0  
Fecha: 2026-08-11  
Rama: `codex/publication-readiness`

## Objetivo

Evitar que “se puede explicar a un cliente” se confunda con “está listo para usarse como apoyo técnico”. La decisión debe ser visible y basada en gates existentes.

## Cambios aplicados

- `assessPublicationReadiness` produce estados independientes para las rutas `client` y `support`.
- La ruta cliente exige ausencia de advertencias bloqueantes y fuentes no vigentes; una revisión pendiente queda como `review-needed`.
- La ruta soporte exige además integridad `reviewed` y todos los escenarios declarados listos para soporte.
- `PublicationReadinessPanel` resume conteos y permite abrir cada explainer para revisar razones.
- `isScenarioReadyForSupport` centraliza el criterio de madurez de escenarios.

## Límites

- La puerta no cambia `reviewStatus`, no crea PRs y no publica contenido.
- Un estado `ready` significa que los contratos editoriales locales pasan; no certifica el entorno del cliente.

## Revisión

Pasaron `test-publication-readiness`, typecheck y lint el 2026-08-11.
