# Fase 160 — Paths de claims en el ledger de evidencia

Fecha de revisión: 2026-08-11  
Versión: 0.214.0  
Alcance: ledger, mapa de evidencia y paquete de handoff de soporte.

## Decisión

Cada `EvidenceRecord` conserva una lista `claimPaths` que identifica los campos que representa: narrativas de pasos, instrucciones y expectativas de escenarios, objetivos/criterios de roadmap o tradeoffs de decisiones. El registro sigue siendo una declaración autorada; no afirma que el entorno del cliente haya producido esa evidencia.

## Beneficio técnico

- Un revisor puede volver desde una fuente o un claim al campo concreto que debe contrastar.
- Los exports Markdown y JSON conservan la misma trazabilidad que la UI.
- El ledger rechaza paths vacíos o repetidos antes de entrar al catálogo.

## Límites

- Un path demuestra localización, no que la fuente respalde semánticamente toda la frase.
- No se ejecutan pruebas, comandos ni conexiones contra clientes.
- La evidencia observada/aceptada sigue requiriendo registro externo y revisión humana.

## Comprobaciones

```text
npm run test:evidence-ledger
npm run test:support-case-pack
npm run typecheck
npm run lint
npm run validate:content
npm run build
npm run test:version-consistency
```
