# Fase 50 — Cola operable de revisión técnica

Fecha de revisión: 2026-08-10  
Versión: 0.104.0

## Problema

El content gate identificaba que la revisión humana estaba pendiente, pero el dashboard no ofrecía una vista de trabajo para un especialista o gerente que quisiera priorizarla.

## Resultado aplicado

`TechnicalReviewQueue` lista los explainers que no están revisados, ordenados por su fecha declarada. Para cada uno muestra alcance, número de fuentes, advertencias del gate, enlace al explainer y enlace a la ficha técnica Markdown.

## Seguridad editorial

La cola es de solo lectura. No tiene un botón para aprobar, publicar o cambiar `reviewStatus`: un estado revisado solo puede llegar mediante una modificación de contenido revisada en Git/PR.

## Límites

No sustituye asignación de responsables, autenticación ni comentarios de revisión. La siguiente evolución puede añadir identidad y persistencia cuando exista un sistema autorizado para ello.

## Verificación

- `npm run validate:content`
- `npm run typecheck`
- `npm run build`
