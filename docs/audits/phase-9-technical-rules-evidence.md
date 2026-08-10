# Fase 9 — Motor de reglas técnicas y evidencia

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.63.0

## Objetivo

Convertir el impacto de un escenario en una lista técnica útil para una conversación, un diagnóstico o la preparación de una prueba.

## Reglas actuales

- **Sin entrada disponible:** crítico; no queda un punto desde el que el flujo pueda continuar.
- **Componentes sin camino:** crítico; hay nodos disponibles que ya no son alcanzables desde una entrada.
- **Relaciones interrumpidas:** advertencia; una relación toca un nodo no disponible y requiere revisar sus dos extremos.
- **Capacidad no demostrada:** advertencia; el modelo declara límites, pero la simulación no hace sizing ni calcula reserva.
- **Evidencia de aceptación:** informativo; todavía hay que validar la aplicación y sus dependencias, aunque exista conectividad lógica.

## Resultado visible

Dentro de un escenario expandido aparece **Reglas y evidencia**. Cada hallazgo incluye:

- severidad;
- explicación del problema;
- evidencia que debería buscarse;
- recomendación de la siguiente decisión.

El bloque está colapsado por defecto para no saturar Cliente ni Conceptual.

## Límites

Las reglas son vendor-neutral y trabajan sobre la topología declarada. No sustituyen métricas de producción, sizing, comandos de fabricante, pruebas funcionales ni aprobación de un runbook.

## Próximo paso

Agregar fuentes y reglas específicas por dominio —por ejemplo, VCF, Instana, Turbonomic, webMethods, IBM Power o IBM Z— sin contaminar las reglas genéricas.

## Validación ejecutada

- `npm run typecheck`
- ESLint sobre los archivos modificados
- `npm run build`
