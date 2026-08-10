# Fase 48 — Coherencia entre escenarios y nodos simulables

Fecha de revisión: 2026-08-10  
Versión: 0.102.0

## Hallazgo

El escenario `directory-unavailable` declaraba `directory` en `deadNodeIds`, pero el nodo Active Directory de la escena `identity` no tenía `killable: true`. El contrato permitía describir un fallo que la UI no podía activar de forma coherente.

## Cambio

Se marcó el nodo Active Directory como simulable. El escenario conserva sus límites: la demo retira el nodo conceptual, pero no diagnostica un dominio real ni valida autenticación, DNS o grupos.

## Verificación

- `npm run validate:content` ya no reporta la advertencia de `directory-unavailable`.
- `npm run typecheck`
- `npm run build`
