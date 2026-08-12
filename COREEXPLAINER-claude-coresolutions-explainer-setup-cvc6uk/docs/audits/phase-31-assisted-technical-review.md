# Fase 31 — Revisión técnica asistida

Fecha de revisión: 2026-08-09  
Versión: 0.85.0

## Objetivo

Dar una primera capacidad de IA útil sin inventar datos ni depender de un proveedor externo: revisar cada explicación usando únicamente su contenido autorado y las reglas técnicas existentes.

## Resultado aplicado

El panel incluye **Revisión técnica asistida** bajo demanda. El motor inspecciona:

- diagnósticos de integridad del diagrama;
- existencia de arquitectura objetivo, roadmap y alternativas;
- presencia de escenarios de fallo;
- nodos interactivos de fallo en la escena;
- fuentes marcadas para revisión.

Cada hallazgo devuelve severidad, detalle, evidencia y acción recomendada. El resultado declara explícitamente que su alcance es `local-content`, no consulta el entorno del cliente y no certifica la arquitectura.

## Decisión de diseño

Se usa un motor determinista como primera capa. Esto permite comprobar los límites, la trazabilidad y la utilidad antes de incorporar un modelo generativo. Una futura IA podrá mejorar la redacción o priorización, pero no saltará estas fronteras de evidencia.

## Siguiente evolución

Añadir un copiloto grounded que responda preguntas sobre el explainer actual usando estas mismas fuentes, reglas y límites.
