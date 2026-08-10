# Fase 44 — Métricas locales de utilidad

Fecha de revisión: 2026-08-09  
Versión: 0.98.0

## Objetivo

Medir si el sistema ayuda a entender y preparar trabajo real, sin convertir una demo de clientes en un sistema de rastreo.

## Eventos

Se registran localmente `explainer-view`, `scene-view`, `scenario-open`, `workflow-advance`, `brief-download` y `draft-generate`. El registro se limita a 500 eventos y no contiene prompts, respuestas ni datos de cliente.

## Dashboard

`UsageMetricsPanel` muestra eventos totales, avances de workflow, briefs, borradores y el explainer más utilizado en ese navegador. Incluye una acción para borrar métricas.

## Evolución pendiente

Si CORESOLUTIONS necesita métricas multiusuario, se deberá diseñar consentimiento, anonimización, identidad, retención y un backend separado antes de enviar eventos fuera del navegador.
