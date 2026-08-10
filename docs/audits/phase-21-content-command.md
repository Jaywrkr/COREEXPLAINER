# Fase 21 - Comando independiente de contenido

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.75.0

## Objetivo

Permitir revisar contenido y contratos técnicos rápidamente sin esperar la compilación completa de Next.js.

## Implementacion

`npm run validate:content` ejecuta `scripts/validate-content.ts`, que importa el registro de explainers. Al cargarlo se ejecutan el content gate, las regresiones de integridad y las regresiones de `targetArchitecture`.

Resultado actual: `Content validation passed: 22 explainers checked.`

## Limites

El comando no comprueba el bundle visual ni el renderizado del navegador; esas comprobaciones siguen perteneciendo a `npm run build` y la revisión manual.

## Siguiente fase

Añadir este comando a la documentación de contribución y al flujo de revisión de PR para que sea la primera comprobación de cambios de contenido.

## Validacion

- `npm run validate:content`
- `npm run typecheck`
- `npm run build`
