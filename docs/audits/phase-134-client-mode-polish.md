# Fase 134 — Modo cliente con narrativa progresiva

Fecha de revisión: 2026-08-11
Versión: 0.188.0

## Objetivo

Hacer que una persona no técnica entienda primero el valor y la decisión que se está explicando, sin ocultar la profundidad para perfiles conceptual y técnico.

## Implementado

- `ClientStoryCard` concentra la escena actual en idea, cambio esperado y pregunta de decisión.
- La tarjeta usa `GlossaryText`, por lo que las siglas y términos mantienen ayuda contextual.
- El detalle de conexión se abre con `details` solo cuando se solicita.
- El bloque redundante de título/idea/valor se omite en modo cliente; no se duplica el contenido.
- Los modos conceptual y técnico conservan la navegación y explicación detallada existentes.

## Límites

La tarjeta no inventa resultados del entorno ni afirma que una solución sea adecuada. La pregunta de decisión dirige a evidencia y validación del cliente.

## Verificación

Typecheck, lint, build y validación de contenido/versionado.
