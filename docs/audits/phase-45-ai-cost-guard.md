# Fase 45 — Guard de coste y presupuesto de IA

Fecha de revisión: 2026-08-09  
Versión: 0.99.0

## Problema

El rate limit anterior limitaba solicitudes, pero no el volumen de tokens. Una pregunta con contexto grande podía consumir más presupuesto que varias preguntas pequeñas.

## Resultado aplicado

- `reserveAiTokens` estima tokens de entrada con una aproximación conservadora de caracteres/4 y suma el máximo de salida configurado.
- El mismo guard se aplica al copiloto (`/api/copilot`) y al generador de borradores (`/api/creator`).
- La reserva ocurre antes de llamar al proveedor; al superar el presupuesto de ventana responde `429` y `Retry-After`.
- `AI_TOKEN_BUDGET_PER_WINDOW` configura el presupuesto por IP y ventana de diez minutos (por defecto 12.000).
- `AI_MAX_OUTPUT_TOKENS` configura la salida y queda limitada a 1.200 para evitar respuestas desproporcionadas (por defecto 700).
- El límite se combina con el máximo de 20 solicitudes por ventana y el límite de tamaño del request.

## Límites y siguiente evolución

El mapa vive en la memoria de la instancia serverless: sirve como freno de seguridad y no como cuota multiusuario exacta. Para presupuestos de producción por cliente se deberá añadir identidad, almacenamiento persistente/Redis y un registro de consumo idempotente; no se debe inferir identidad únicamente desde una cabecera controlada por el cliente.

## Verificación

- `npm run typecheck`
- `npm run validate:content`
- `npm run build`
- Revisión de que la ruta no expone la clave ni contenido de prompts en headers o logs.
