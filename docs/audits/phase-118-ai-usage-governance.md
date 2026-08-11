# Auditoría fase 118 — Gobierno local de uso y coste de IA

**Fecha:** 2026-08-11
**Versión:** 0.172.0
**Rama:** `codex/ai-usage-governance`

## Objetivo

Hacer visible el consumo de Copilot y Creator para controlar demos, sesiones de creación y presupuesto sin introducir envío de datos ni una falsa fuente de facturación.

## Cambios aplicados

- `AiUsageTelemetry` conserva totales y buckets por `copilot`, `creator` y `unknown`.
- `normalizeAiUsage` tolera almacenamiento corrupto o antiguo; `recordAiUsage` normaliza superficie y evita tokens/costes negativos.
- Copilot y Creator registran su superficie explícitamente.
- `AiUsageGovernancePanel` muestra consultas, tokens, fallos y coste estimado, separa superficies, permite exportar JSON y borrar el ledger local.
- CI ejecuta `test:ai-usage-telemetry` junto a las guardas existentes.

## Límites y seguridad

El ledger vive en `localStorage` y puede ser borrado por la persona. No contiene prompts ni respuestas, no se envía a CORESOLUTIONS ni a terceros y no es una factura. La cuota compartida/fail-closed del servidor continúa siendo la protección real contra consumo distribuido.

## Verificación

La regresión cubre normalización, compatibilidad de datos antiguos y separación por superficie. Deben pasar además typecheck, lint, contenido y build antes del merge.
