# Fase 176 — Lectura acotada del cuerpo de solicitudes IA

Fecha: 2026-08-11  
Versión: 0.230.0

## Objetivo

Evitar que una solicitud sin `content-length` obligue al servidor a leer el cuerpo completo antes de comprobar su límite. Es una protección de memoria para las entradas de copilot y creator.

## Cambios aplicados

- `readJsonBody` usa `ReadableStreamDefaultReader` y acumula solo chunks dentro del máximo.
- Al superar `maxBytes`, cancela el reader y devuelve `null` sin parsear ni conservar el resto.
- El JSON se decodifica una sola vez después de completar una lectura válida.
- La regresión verifica un JSON válido y un cuerpo de 2.000 bytes rechazado con un límite de 100.

## Límites técnicos

El límite de lectura protege el proceso, pero no sustituye límites del proxy/CDN ni validación de campos. Los endpoints mantienen sus límites específicos, sanitización de entrada, cuota y tope de coste.

## Verificación

```text
npm run test:ai-guards
npm run test:ai-cost-cap
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
