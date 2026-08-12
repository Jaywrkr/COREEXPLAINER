# Fase 133 — Comparación de patrones reutilizables

Fecha de revisión: 2026-08-11
Versión: 0.187.0

## Objetivo

Hacer que la biblioteca de patrones de CORESOLUTIONS sirva para workshops y propuestas sin convertir una similitud editorial en una recomendación técnica automática.

## Implementado

- Búsqueda por título, problema, resultado, señales y marcas.
- Filtro por marca.
- Selección explícita de hasta dos patrones.
- Tabla lado a lado para problema, resultado, señales, evidencia, riesgos y marcas.
- Enlaces directos a los explainers asociados.
- Helper puro y regresiones para filtrar y limitar la selección a patrones conocidos.

## Límites técnicos

La comparación no comprueba compatibilidad de versiones, HCL, licenciamiento, topología, sizing ni dependencias de un cliente. El texto sigue siendo un punto de partida autorado; la decisión requiere fuentes actuales, alcance, validación especialista y evidencia del entorno.

## Verificación

`npm run test:pattern-comparison` y las validaciones generales de tipo, lint, build, contenido y consistencia de versión.
