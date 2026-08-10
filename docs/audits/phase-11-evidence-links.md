# Fase 11 - Enlaces de evidencia

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.65.0

## Objetivo

Cerrar el recorrido entre un hallazgo del escenario y la documentación que permite revisarlo. Los diagnósticos del contrato técnico ya conocen sus fuentes; ahora esa relación llega hasta la interfaz.

## Implementación

Los hallazgos conservan `sourceIds` y `nodeIds`. El panel **Reglas y evidencia** resuelve esas referencias contra el catálogo técnico del explainer y muestra los enlaces dentro de un bloque secundario por hallazgo.

Los enlaces se abren en otra pestaña y no sustituyen la lectura contextual: la fuente respalda la regla, pero no prueba el entorno del cliente.

## Límites

Los hallazgos genéricos solo enlazan fuentes cuando el contenido las declara. No se inventan URLs ni se presentan fuentes como certificación de diseño.

## Siguiente fase

Añadir una matriz de pruebas guiadas que permita marcar qué evidencia ya fue revisada durante una sesión, sin guardar datos del cliente ni convertir la demo en un sistema de tickets.

## Validación

- `npm run typecheck`
- ESLint sobre los archivos modificados
- `npm run build`
