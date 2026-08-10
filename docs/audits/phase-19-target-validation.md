# Fase 19 - Validacion automatica de objetivos

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.73.0

## Objetivo

Evitar que una comparación actual/objetivo publique texto incompleto o fuentes rotas.

## Implementacion

`validateExplainerContent` ahora comprueba:

- etiqueta, resumen y límites no vacíos;
- al menos un cambio esperado;
- IDs de fuente sin duplicados;
- cada fuente del objetivo existe en `technicalReview.sources`.

Los errores entran en el mismo content gate que valida escenas, pasos y contratos técnicos, por lo que el build no puede generar un explainer inconsistente.

## Limites

La validación comprueba consistencia editorial y referencias, no verifica que una fuente siga publicada ni que el objetivo sea correcto para un cliente concreto.

## Siguiente fase

Completar objetivos autorados restantes y añadir una prueba de regresión que cubra objetivos válidos e inválidos.

## Validacion

- `npm run typecheck`
- ESLint sobre el validador
- `npm run build`
