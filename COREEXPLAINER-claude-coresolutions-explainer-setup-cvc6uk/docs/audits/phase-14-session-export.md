# Fase 14 - Ficha de sesion exportable

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.68.0

## Objetivo

Permitir que una conversación pueda continuar fuera de la aplicación sin crear una cuenta, enviar datos del cliente o incorporar un servicio de documentos.

## Implementacion

El resumen de un escenario incluye **Descargar ficha HTML**. El navegador genera un archivo autónomo con escenario, métricas del resumen, checklist, hallazgos, fuentes enlazadas y límites. La ficha puede abrirse, imprimirse o guardarse como PDF desde el navegador.

## Limites

La exportación refleja el estado local de esa sesión y no es un acta ni certificación. Los enlaces de fuentes requieren conexión para abrirse; el contenido de la ficha no consulta un backend.

## Siguiente fase

Diseñar la comparación entre arquitectura actual y arquitectura objetivo, reutilizando las mismas escenas y reglas para que el cliente vea qué cambia y por qué.

## Validacion

- `npm run typecheck`
- ESLint sobre los archivos modificados
- `npm run build`
