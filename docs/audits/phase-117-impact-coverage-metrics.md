# Auditoría fase 117 — Métricas de cobertura de impactos

**Fecha:** 2026-08-11
**Versión:** 0.171.0
**Rama:** `codex/impact-coverage-metrics`

## Objetivo

Medir si la biblioteca está preparada para conversaciones de implementación y mantenimiento, no solo si contiene explainers o escenarios de fallo.

## Cambios aplicados

- `TechnicalCoverage` añade `impactCount`, `highRiskImpactCount` e `impactsWithScenarios`.
- Dashboard e informe técnico construyen el mismo `ImplementationWorkPackage` que la UI y agregan sus impactos.
- El informe JSON pasa a `schemaVersion: 1.3` y cada fila expone las tres métricas.
- La regresión de cobertura protege agregación y la regresión del informe comprueba que existan impactos válidos.

## Límites

Las cifras son cobertura editorial derivada del contenido autorado. “Alto riesgo” es una clasificación conceptual basada en escenarios, no una probabilidad ni un riesgo operacional. Ninguna métrica consulta producción o certifica capacidad, disponibilidad o seguridad.

## Verificación

Se validan métricas, informe, paquete, ledger de revisión, contenido, typecheck y lint. El build final debe ejecutarse antes del commit.
