# Fase 173 — Confirmación de acciones del copiloto

Fecha: 2026-08-11  
Versión: 0.227.0

## Objetivo

Mantener la IA como asistente de navegación y explicación, no como un ejecutor implícito. Incluso una acción allowlisted que solo cambia la escena local debe ser entendible y confirmada por la persona.

## Cambios aplicados

- `activate-scenario` deja de activar directamente el escenario al pulsar la sugerencia.
- La UI muestra una confirmación explícita que aclara que el cambio es local y no toca infraestructura.
- Confirmar registra el evento `copilot-action` y activa el escenario; cancelar limpia la intención sin registrar activación.
- Las acciones de fuente siguen siendo enlaces allowlisted y no aceptan URLs provenientes del modelo.

## Límites técnicos

La confirmación no convierte la respuesta de IA en una aprobación técnica. El modelo sigue sujeto a citas, revisión humana, allowlists y límites de coste; el escenario continúa siendo una simulación conceptual local.

## Verificación

```text
npm run test:copilot-actions
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
