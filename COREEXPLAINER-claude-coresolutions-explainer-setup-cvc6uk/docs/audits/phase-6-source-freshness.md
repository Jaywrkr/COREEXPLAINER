# Fase 6 — Vigencia y coherencia temporal de fuentes

**Fecha:** 2026-08-06  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.58.0

## Objetivo

Evitar que una explicación parezca actual por tener un enlace, cuando sus fechas de revisión y consulta son imposibles o no están alineadas.

## Controles aplicados

- `lastReviewedAt` y `accessedAt` deben ser fechas ISO reales (`YYYY-MM-DD`).
- Ninguna fecha puede estar en el futuro durante el build.
- Una fuente no puede tener `accessedAt` posterior a la revisión declarada del tema.
- `validity: "review-needed"` no rompe el build, pero queda como advertencia explícita para priorizar la siguiente revisión.
- Se conserva el enlace HTTPS, publisher, producto, versión y referencia estable exigidos por el gate de contenido.

## Resultado

Los 22 temas pasan el control temporal actual. La fecha visible de revisión continúa siendo responsabilidad editorial: si un fabricante cambia una versión o retira una página, el tema debe actualizarse y volver a marcarse como revisado.

## Límite

El gate valida metadatos, no descarga ni certifica el contenido de cada URL. La comprobación de cambios en documentación externa requiere una revisión periódica con fuentes primarias.

## Validación ejecutada

- `npm run typecheck`
- `npm run lint`
- `npm run build`
