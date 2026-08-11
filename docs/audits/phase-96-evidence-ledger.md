# Fase 96 · Ledger tipado de evidencia

Fecha: 2026-08-11
Versión: 0.150.0
Estado: implementado en rama `codex/evidence-ledger`

## Objetivo

Evitar que “evidencia” sea un texto ambiguo que se mezcle con una hipótesis, una fuente documental o un criterio de aceptación. El ledger ofrece un contrato común para las salidas de soporte y futuras revisiones.

## Tipos

- `documentary`: afirmación respaldada por documentación o fuente autorada.
- `observed`: señal que el equipo debe pedir u observar en un escenario.
- `hypothesis`: alternativa o explicación que aún debe contrastarse.
- `acceptance`: resultado o salida que debe comprobarse para cerrar una fase.

Cada registro conserva un ID estable, la afirmación, la evidencia solicitada, `sourceIds` y procedencia (`authored` o `derived`). Actualmente todos los registros se generan desde contenido autorado; no se afirma que exista evidencia en el entorno del cliente.

## Reglas

`validateEvidenceLedger` bloquea IDs duplicados, afirmaciones o solicitudes vacías y referencias a fuentes que no existen. El registro se incorpora al handoff Markdown sin ejecutar acciones ni enviar datos.

## Verificación

- `npm run test:evidence-ledger`
- `npm run test:support-case-pack`
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Límite

La clasificación tipada mejora trazabilidad, pero no sustituye la revisión de un especialista ni convierte una fuente documental en evidencia observada de producción.
