# Auditoría fase 131 — Tope de coste por solicitud IA

**Fecha:** 2026-08-11
**Versión:** 0.185.0
**Rama:** `codex/ai-cost-cap`

## Objetivo

Evitar que una solicitud individual exceda un presupuesto monetario explícito, sin fingir precisión cuando el despliegue no ha configurado tarifas.

## Cambios aplicados

- `AI_MAX_ESTIMATED_COST_USD` define un cap opcional entre 0 y 100000 USD.
- `exceedsAiCostCap` se evalúa después de estimar tokens/coste y antes de reservar o llamar al proveedor.
- `CopilotPolicy` comunica el cap configurado al cliente.
- Tokens, cuota persistente y coste son controles independientes; el coste solo se estima si ambas tarifas por millón existen.

## Verificación y límites

El cap no es una factura ni una garantía de coste exacto del proveedor. `test:ai-cost-cap`, guards IA, sanitización, typecheck, lint y build deben pasar antes de publicar.
