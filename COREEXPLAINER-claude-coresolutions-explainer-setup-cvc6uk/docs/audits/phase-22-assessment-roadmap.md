# Fase 22 - Motor de assessment y roadmap

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.76.0

## Objetivo

Convertir una explicación técnica en un camino de decisión útil para un discovery o una conversación de arquitectura.

## Implementacion

`TargetArchitecture` ahora puede declarar fases de roadmap. Cada fase exige objetivo, evidencia y criterio de salida; puede enlazar fuentes. El panel las muestra bajo demanda dentro de **Comparación actual / objetivo**.

VCF incorpora un primer roadmap de tres fases: descubrir dependencias, evaluar brechas y probar resiliencia.

## Limites

El roadmap es una guía de assessment, no un plan de proyecto con fechas, presupuesto o recursos. Las decisiones de diseño siguen requiriendo workshops y validación del cliente.

## Siguiente fase

Añadir selección y estado local por fase para que una sesión pueda registrar qué parte del assessment ya fue revisada.

## Validacion

- `npm run validate:content`
- `npm run typecheck`
- `npm run build`
