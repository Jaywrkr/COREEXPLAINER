# Fase 25 - Laboratorio de decisiones

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.79.0

## Objetivo

Ayudar a una conversación de arquitectura a comparar opciones reales sin convertir la interfaz en una calculadora de madurez o una recomendación automática.

## Implementacion

`TargetArchitecture` puede declarar `decisionOptions`. Cada opción exige título, resumen, beneficios, trade-offs, evidencia y fuentes opcionales. El panel muestra las opciones bajo demanda y permite seleccionar una para leer sus consecuencias.

VCF incluye tres decisiones: priorizar resiliencia, priorizar estandarización o evolucionar por oleadas.

## Limites

La selección no puntúa, no elige por el cliente y no ejecuta cambios. La decisión final requiere objetivos, restricciones, evidencia y aprobación del proyecto.

## Siguiente fase

Enlazar cada opción con las fases del roadmap y escenarios de fallo que permiten validarla.

## Validacion

- `npm run validate:content`
- `npm run typecheck`
- `npm run build`
