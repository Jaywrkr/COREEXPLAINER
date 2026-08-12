# Auditoría fase 115 — Matriz de impacto de cambios

**Fecha:** 2026-08-11
**Versión:** 0.169.0
**Rama:** `codex/change-impact-matrix`

## Objetivo

Hacer que el paquete técnico sea más útil para diseño, implementación y mantenimiento: antes de actuar, el equipo debe poder ver qué parte del flujo cambia, qué dependencias están involucradas, qué fallos podrían aparecer y cómo demostrar el resultado.

## Cambios aplicados

- `ImplementationWorkPackage` pasa a `schemaVersion: 1.1` y añade `changeImpacts` por workstream.
- Cada impacto contiene riesgo (`low|medium|high`), justificación, nodos afectados, escenarios enlazados, dependencias de las marcas, rollback conceptual, evidencia antes/después y fuentes.
- La UI mantiene el panel compacto y suma el contador de impactos; Markdown/JSON contienen el detalle completo.
- La regresión existente del paquete protege la cardinalidad, riesgo, evidencia, rollback y sección Markdown.

## Cálculo y límites

El riesgo es un indicador editorial determinista: alto si existe caída total o múltiples escenarios enlazados, medio si hay un escenario, bajo si no hay escenario enlazado. No representa probabilidad, criticidad ni riesgo financiero real. Los nodos y dependencias se toman del contenido autorado; los especialistas deben confirmar topología, permisos, HCL, ventana y rollback.

## Verificación

Se ejecutan regresiones del paquete, consistencia de versión, informe y paquete técnico, validación de contenido, typecheck, lint y build. No se consultan plataformas del cliente ni se ejecutan cambios.
