# Fase 95 · Handoff local de soporte

Fecha: 2026-08-11
Versión: 0.149.0
Estado: implementado en rama `codex/support-case-pack`

## Objetivo

Cerrar la distancia entre una explicación técnica y el inicio de un ticket sin convertir CORESOLUTIONS en una herramienta de operación. El usuario puede registrar el contexto mínimo y adjuntar una salida reproducible para que otro especialista continúe el análisis.

## Contrato

`SupportCaseDraft` contiene únicamente contexto introducido por el usuario: ID interno, resumen, impacto, inicio declarado, responsable, ruta de triage seleccionada y notas. `normalizeSupportCaseDraft` limita longitudes, elimina saltos de línea y normaliza el ID para impedir que el exportador genere contenido inesperado.

`buildSupportCaseMarkdown` combina ese contexto con la ruta de triage autorada o derivada, sus fuentes, confianza y límites. Si no se selecciona ruta, lo declara explícitamente.

## Seguridad y privacidad

- El estado se guarda solo en `localStorage` por explainer.
- No hay API, telemetría ni conexión con plataformas de cliente.
- La UI indica que no se deben pegar secretos, credenciales o dumps sin sanitizar.
- El documento no prueba causa raíz ni autoriza cambios; requiere revisión antes de adjuntarlo a un ticket.

## Verificación

- `npm run test:support-case-pack`
- `npm run test:support-triage`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
