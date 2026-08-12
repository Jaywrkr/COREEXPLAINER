# Fase 109 — Evidencia y decisión en handoff de soporte

Estado: implementado en rama `codex/support-evidence-decision`.

## Objetivo

Dar continuidad al análisis técnico sin confundir un brief conceptual con una herramienta operacional. El paquete de soporte ahora separa lo observado de lo que aún debe comprobarse y deja explícita la siguiente decisión.

## Contrato

`SupportCaseDraft` añade:

- `evidenceReceived`: material recibido y sanitizado;
- `checkResult`: resultado de contrastar la evidencia con el brief/runbook;
- `escalationDecision`: `pending`, `continue` o `escalate`.

Todos los campos se normalizan y tienen límites de longitud. El exportador conserva los tres valores junto al ledger de evidencia y la ruta de triage.

## Límites

- No se ejecuta ninguna comprobación ni se consulta una plataforma.
- El usuario debe retirar secretos, credenciales, tokens y datos personales antes de guardar o descargar.
- La decisión es una nota de handoff, no una aprobación de cambio ni una causa raíz.

## Verificación

- `npm run test:support-case-pack`
- `npm run test:support-triage`
- `npm run test:technical-review-report`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
