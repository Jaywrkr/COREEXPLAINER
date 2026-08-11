# Fase 98 · Madurez de escenarios de fallo

Fecha: 2026-08-11
Versión: 0.152.0
Estado: implementado en rama `codex/scenario-readiness`

## Objetivo

Evitar que el catálogo confunda “tener un botón de fallo” con una guía técnica madura. La cobertura ahora expresa qué partes de un escenario están realmente autoradas para una conversación de soporte o validación.

## Perfil

Cada escenario se proyecta a un perfil determinista:

- `hasSimulation`: declara un modo e impacto de simulación.
- `hasGuidedFlow`: contiene las cuatro fases `observe`, `diagnose`, `recover` y `validate`.
- `hasEvidence`: cada paso guiado declara evidencia no vacía.
- `hasCurrentSources`: cada paso tiene fuentes y todas están marcadas `current`.

`scenariosReadyForSupport` solo cuenta perfiles con las cuatro condiciones. Un escenario incompleto sigue siendo visible, pero no se presenta como listo para soporte.

## Uso

El dashboard y `technical-review-report.ts` reutilizan `calculateTechnicalCoverage`; no hay dos cálculos divergentes. El informe JSON expone los perfiles por explainer y el resumen agrega escenarios listos.

## Límites

La métrica describe la calidad del contenido autorado. No mide disponibilidad, latencia, capacidad ni éxito de un failover real.

## Verificación

- `npm run test:coverage-metrics`
- `npm run validate:content`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
