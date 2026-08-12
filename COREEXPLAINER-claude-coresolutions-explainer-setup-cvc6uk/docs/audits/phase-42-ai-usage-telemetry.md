# Fase 42 — Telemetría local de uso de IA

Fecha de revisión: 2026-08-09  
Versión: 0.96.0

## Objetivo

Conocer el uso y el coste aproximado del copiloto sin enviar prompts, respuestas o datos del cliente a un sistema de analítica adicional.

## Resultado aplicado

El endpoint devuelve `inputTokens`, `outputTokens`, `totalTokens` y `model` cuando el proveedor los informa. El navegador agrega consultas, fallos y tokens en `localStorage` y muestra un resumen compacto dentro del copiloto.

## Límite

La telemetría es local por sesión/navegador y no sustituye un sistema de cuotas multiusuario. Para producción se deberá asociar consumo a identidad, proyecto y presupuesto sin guardar contenido sensible.
