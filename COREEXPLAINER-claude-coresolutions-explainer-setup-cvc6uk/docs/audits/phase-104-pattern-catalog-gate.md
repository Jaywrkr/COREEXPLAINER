# Fase 104 — Gate de la biblioteca de patrones

Estado: implementado en rama `codex/pattern-catalog-gate`.

## Objetivo

Evitar que la biblioteca reutilizable de CORESOLUTIONS se convierta en un conjunto de enlaces o promesas sin respaldo. Un patrón debe poder llevar a una conversación técnica, pero no debe parecer un diseño certificado.

## Controles

- ID único y campos narrativos obligatorios.
- Marcas, señales, evidencia, riesgos y explainers no vacíos.
- Fecha `lastReviewedAt` en formato ISO y no futura.
- Cada `explainerSlug` debe existir en el registro.

El gate se ejecuta durante la construcción del registro. Un error bloquea el build, igual que un error estructural del content gate de explainers.

## Límites

La validación no afirma compatibilidad entre marcas, no calcula sizing ni convierte el patrón en una arquitectura de referencia. El patrón debe confirmarse con versiones, licencias, HCL, alcance y evidencia del cliente.

## Verificación

- `npm run test:pattern-validation`
- `npm run validate:content`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
