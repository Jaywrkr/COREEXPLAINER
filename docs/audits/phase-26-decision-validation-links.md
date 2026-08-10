# Fase 26 - Decisiones conectadas con validación

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.80.0

## Objetivo

Evitar que una opción de arquitectura quede como opinión aislada. Cada opción debe indicar qué fase del assessment y qué escenario ayudan a validarla.

## Implementacion

`ArchitectureDecisionOption` admite `roadmapPhaseIds` y `scenarioIds`. La interfaz muestra las fases relacionadas y ofrece botones para abrir escenarios disponibles. El content gate comprueba que las referencias existan.

VCF conecta sus tres opciones con fases de descubrimiento/evaluación/prueba y con escenarios de host, gestión y evolución por oleadas.

## Limites

Un enlace a un escenario no demuestra la opción; solo indica dónde obtener evidencia. La decisión sigue dependiendo de requisitos, restricciones y aceptación del proyecto.

## Siguiente fase

Extender el laboratorio a Instana, Turbonomic y webMethods con decisiones propias de observabilidad, automatización e integración.

## Validacion

- `npm run validate:content`
- `npm run typecheck`
- `npm run build`
