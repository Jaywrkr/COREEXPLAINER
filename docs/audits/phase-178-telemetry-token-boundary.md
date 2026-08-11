# Fase 178 — Telemetría local limitada a identificadores

Fecha: 2026-08-11  
Versión: 0.232.0

## Objetivo

Medir qué partes de la experiencia se usan sin almacenar accidentalmente preguntas, títulos, URLs, notas o datos del cliente en el ledger local.

## Cambios aplicados

- `productTelemetry.clean` acepta únicamente tokens alfanuméricos con `:_./-` y una longitud máxima de 160 caracteres.
- Se rechazan valores con espacios, URLs/esquemas, saltos de línea o texto libre.
- La normalización aplica la regla tanto al cargar eventos existentes como al registrar nuevos.
- La regresión cubre un identificador válido y un payload que intenta guardar una pregunta y una URL.

## Límites técnicos

La regla reduce el riesgo, pero no sustituye el consentimiento ni la revisión de privacidad de un despliegue. El almacenamiento permanece en `localStorage`, limitado a 500 eventos; la exportación solo ocurre cuando el usuario la solicita. No se envían eventos a un servidor en esta fase.

## Verificación

```text
npm run test:product-telemetry
npm run test:ai-usage-telemetry
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
