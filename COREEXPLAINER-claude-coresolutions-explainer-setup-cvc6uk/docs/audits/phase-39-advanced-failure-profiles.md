# Fase 39 — Perfiles de fallo avanzados

Fecha de revisión: 2026-08-09  
Versión: 0.93.0

## Objetivo

Representar riesgos operativos más realistas que la caída completa de un nodo.

## Resultado aplicado

`FailureScenario.simulation` puede declarar:

- `hard-down`: componente no disponible;
- `degraded`: servicio parcial;
- `latency`: latencia adicional conceptual;
- `capacity`: porcentaje de capacidad remanente;
- `dependency`: dependencia externa no disponible;
- `observability`: servicio activo con evidencia incompleta.

El motor what-if mantiene el análisis de caminos y expone el perfil en la lectura asistida. VCF ya usa perfiles de capacidad para fallos de hosts y dependencia para pérdida de vCenter.

## Límite

Los valores son autorados y conceptuales. No sustituyen medición de latencia, sizing, pruebas de dependencia ni verificación de una plataforma real.
