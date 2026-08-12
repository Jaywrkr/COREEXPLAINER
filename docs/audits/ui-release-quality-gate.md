# Fase 12 — Puerta de calidad UX/UI

Esta puerta acompaña cada PR que modifica una explicación, el dashboard, el
canvas o los componentes compartidos.

## Antes de abrir el PR

- Definir qué usuario y tarea mejora el cambio.
- Confirmar que la pantalla tiene una acción primaria.
- Comprobar que la información avanzada está bajo divulgación progresiva.
- Revisar modo cliente y modo técnico por separado.
- Verificar que los overlays no cubren el elemento que explican.
- Probar teclado, focus visible, targets y movimiento reducido.
- Confirmar fallback textual del canvas.
- Validar claims, fuentes, versión, fecha y límites técnicos.

## Evidencia mínima

- Captura o vídeo corto antes/después cuando cambia la UI.
- Resultado de typecheck, lint y build.
- Tema/escena revisado.
- Perfil de usuario utilizado para la prueba.
- Riesgos y decisiones pendientes.

## Criterio de bloqueo

No fusionar si el cambio oculta una advertencia técnica, rompe una tarea de
teclado, añade movimiento no controlable o mezcla herramientas de revisión con
el camino cliente sin una razón documentada.

**Rama:** `codex/ui-release-quality`
