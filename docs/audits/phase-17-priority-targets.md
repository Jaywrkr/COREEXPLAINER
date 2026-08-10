# Fase 17 - Objetivos para explainers prioritarios

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.71.0

## Objetivo

Extender el contrato de arquitectura objetivo a tres explainers de alto valor comercial: IBM Instana, IBM Turbonomic e IBM webMethods.

## Implementacion

- **Instana:** observabilidad de recorrido completo, con cobertura, señales correlacionadas e investigación asistida bajo control humano.
- **Turbonomic:** optimización gobernada por demanda, restricciones, políticas y aprobación antes de automatizar.
- **webMethods:** integración híbrida gobernada, con contratos, runtimes, gateway, seguridad y ownership explícitos.

Cada objetivo reutiliza fuentes que ya pertenecen al explainer y declara sus límites.

## Limites

Los objetivos son marcos de conversación, no diseños de producto ni matrices de compatibilidad. La release, edición, permisos y arquitectura del cliente deben validarse aparte.

## Siguiente fase

Completar objetivos autorados para continuidad, seguridad, storage y plataforma, priorizando los temas que se usen en propuestas reales de CORESOLUTIONS.

## Validacion

- `npm run typecheck`
- ESLint sobre los archivos modificados
- `npm run build`
