# Fase 91 — métricas de cobertura técnica

Versión: 0.145.0  
Fecha: 2026-08-11

## Objetivo

Medir la madurez del catálogo para decidir qué contenido necesita revisión o ampliación, sin confundir estas métricas con telemetría de producción ni con capacidad real de un cliente.

## Indicadores

- Explain­ers revisados y pendientes.
- Fuentes totales, vigentes y `review-needed`.
- Explain­ers con escenarios y número total de escenarios.
- Assurance de integridad: `reviewed`, `source-backed` y `baseline`.
- Explain­ers con roadmap y número de fases.
- Warnings del content gate y acciones sugeridas.

El cálculo puro vive en `src/lib/review/coverageMetrics.ts` y el informe JSON lo incluye dentro de `summary.coverage`. El dashboard lo presenta en un bloque cerrado por defecto.

## Límites

Son indicadores del contenido autorado y de sus metadatos. No miden disponibilidad, rendimiento, cumplimiento ni salud de una infraestructura real.

## Verificación

- `npm run test:coverage-metrics` ✅
- `npm run test:technical-review-report` ✅
- `npm run typecheck` ✅
