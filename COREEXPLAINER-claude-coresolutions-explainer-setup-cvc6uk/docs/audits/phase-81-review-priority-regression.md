# Fase 81 · Regresión del score de revisión

Fecha: 2026-08-10  
Versión: 0.135.0

## Qué cambia

- `scripts/test-review-priority.ts` cubre combinaciones de estado, fuentes vencidas y advertencias.
- El workflow ejecuta la regresión junto al informe.
- `CONTRIBUTING.md` documenta el comando local.

## Casos cubiertos

- Pendiente sin advertencias: 100.
- Pendiente con 2 fuentes y 3 advertencias: 135.
- Revisado con 1 fuente y 2 advertencias: 20.
- Revisado sin señales: 0.

## Límites

El test protege aritmética y contrato, no la calidad de la revisión especialista ni la exactitud tecnológica del contenido.
