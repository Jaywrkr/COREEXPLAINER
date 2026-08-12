# Fase 32 — Copiloto grounded por explicación

Fecha de revisión: 2026-08-09  
Versión: 0.86.0

## Objetivo

Permitir preguntas naturales sin convertir el sistema en un chatbot genérico. El copiloto debe responder sobre la explicación actual, su escena, arquitectura objetivo y fuentes disponibles.

## Resultado aplicado

`CopilotPanel` aparece bajo demanda en el panel izquierdo. La pregunta se limita a 600 caracteres y el contexto a 14.000; se envían el tema, escena, modo de audiencia, target y fuentes. El endpoint `/api/copilot` mantiene la clave de IA exclusivamente en servidor y usa un modelo configurable mediante `OPENAI_MODEL`.

El prompt exige español claro, diferencia hechos e inferencias, pide evidencia faltante y prohíbe inventar configuraciones, métricas, versiones o capacidades. Si no existe `OPENAI_API_KEY`, la UI conserva toda la explicación y comunica que el copiloto no está configurado.

## Configuración de despliegue

En Vercel debe añadirse `OPENAI_API_KEY` como variable de entorno. Opcionalmente puede definirse `OPENAI_MODEL`. Nunca se debe exponer la clave en variables `NEXT_PUBLIC_*` ni en el navegador.

## Límites

Esta fase no consulta APIs de Instana, Turbonomic, webMethods ni otros productos del cliente. Tampoco ejecuta cambios. La respuesta debe contrastarse con las fuentes y la revisión de un especialista.
