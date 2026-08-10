# Fase 35 — Impacto what-if explicado

Fecha de revisión: 2026-08-09  
Versión: 0.89.0

## Objetivo

Hacer que la simulación de fallos sea útil para una conversación técnica y de negocio, no solo un contador de nodos o relaciones.

## Resultado aplicado

Cuando existe un escenario activo, el panel muestra **Lectura asistida del impacto**. La capa traduce el estado del grafo (`contained`, `degraded` o `blocked`) a lenguaje claro, lista evidencia necesaria y encuentra decisiones del target architecture que enlazan el escenario. También muestra las fases de roadmap de esas decisiones.

## Límite

La lectura se calcula sobre el grafo conceptual y los metadatos autorados. No genera métricas, no prueba tráfico, no consulta Instana, Turbonomic, webMethods ni la infraestructura del cliente.
