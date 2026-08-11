# Fase 30 — Ruta accionable desde decisiones

Fecha de revisión: 2026-08-09  
Versión: 0.84.0

## Objetivo

Evitar que el enlace entre decisión y roadmap sea solo informativo. El cliente debe poder abrir una alternativa y registrar inmediatamente qué fases de evaluación ya revisó.

## Resultado aplicado

Las fases `roadmapPhaseIds` de una opción aparecen como botones compactos dentro del laboratorio de decisiones. Cada botón muestra el título y el estado actual, y permite recorrer `Pendiente → Revisada → No aplica → Pendiente` usando el mismo almacenamiento local del roadmap.

Los escenarios siguen siendo botones independientes: al pulsarlos se cambia al escenario que aporta la validación de la alternativa. Así se conservan dos tipos de evidencia: la fase de assessment y la prueba de fallo o riesgo.

## Límite

Marcar una fase no ejecuta una prueba ni consulta una plataforma. Es una herramienta de preparación y seguimiento para la conversación; el equipo debe adjuntar la evidencia real fuera de la demo.
