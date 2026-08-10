# Fase 40 — Workflow de revisión de contenido

Fecha de revisión: 2026-08-09  
Versión: 0.94.0

## Objetivo

Dar al equipo una secuencia explícita para pasar de un borrador técnico a contenido publicable, sin confundir una demo local con una aprobación formal.

## Estados

`Borrador → Revisión técnica → Revisión de fuentes → Revisión comercial → Aprobado → Publicado → Revisión vencida`

Cada etapa muestra el rol sugerido: autor, ingeniero revisor, responsable técnico, preventa/gerente, aprobador y dueño de contenido.

## Controles

- no se puede avanzar desde revisión técnica si `meta.reviewStatus` sigue pendiente;
- no se puede avanzar desde fuentes si existe una fuente `review-needed`;
- publicado permite marcar revisión vencida;
- revisión vencida vuelve a revisión técnica.

El estado se guarda en `localStorage` por explainer para preparar el trabajo en la interfaz.

## Límite

No reemplaza un sistema multiusuario ni una aprobación legal/comercial. Para producción se deberá mover el estado a persistencia autenticada con historial y responsables reales.
