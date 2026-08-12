# Fase 92 — política visible del Copiloto

Versión: 0.146.0  
Fecha: 2026-08-11

## Objetivo

Que una persona entienda qué puede hacer la IA, qué límites tiene y cuánto puede costar antes de interpretar su respuesta o pulsar una acción sugerida.

## Contrato

`CopilotPolicy` declara:

- `mode: read-only`.
- `actionTypes`: únicamente `open-source` y `activate-scenario`.
- tokens de entrada estimados y máximo de salida.
- coste estimado solo si existen tarifas explícitas del entorno.

La ruta valida las acciones devueltas contra el contrato existente y la UI muestra la política junto al Copiloto. Activar un escenario solo cambia la visualización local; abrir una fuente navega a la referencia declarada.

## Seguridad y costes

La política es informativa y complementa las cuotas del endpoint; no reemplaza `endpointGuard`, `persistentQuota` ni el control de secretos server-side. No se exponen tarifas unitarias ni credenciales al cliente.

## Verificación

- `npm run test:copilot-policy` ✅
- `npm run test:ai-guards` ✅
- `npm run typecheck` ✅
