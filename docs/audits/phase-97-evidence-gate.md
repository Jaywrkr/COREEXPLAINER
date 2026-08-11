# Fase 97 · Ledger como regla del content gate

Fecha: 2026-08-11
Versión: 0.151.0
Estado: implementado en rama `codex/evidence-gate`

## Cambio

El ledger dejó de ser únicamente una salida de soporte. La frontera de publicación (`validateExplainerContent`) lo construye para cada explicación y aplica `validateEvidenceLedger` con el catálogo real de fuentes.

## Errores bloqueantes

- ID de evidencia vacío o duplicado.
- Afirmación o solicitud de evidencia vacía.
- Registro sin `sourceIds`.
- `sourceId` que no existe en `technicalReview.sources`.

Estas reglas cubren pasos, escenarios guiados, fases de roadmap y opciones de decisión porque todos se normalizan en el mismo ledger.

## Warnings separados

`reviewStatus: pending` y las fuentes `review-needed` siguen siendo warnings para orientar revisión humana; no se convierten automáticamente en aprobación ni se silencian por el ledger.

## Verificación

- `npm run test:evidence-ledger`
- `npm run validate:content`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
