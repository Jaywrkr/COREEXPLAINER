# Fase 94 · Brief de triage para soporte técnico

Fecha: 2026-08-11
Versión: 0.148.0
Estado: implementado en rama `codex/support-triage`

## Objetivo

Dar al equipo de soporte una salida útil para iniciar una conversación técnica sin convertir el explainer en una herramienta operacional. El sistema ayuda a aislar el problema y pedir la evidencia correcta antes de cambiar algo.

## Contrato

`buildSupportTriageBrief` deriva una ruta por escenario autorado. Cada ruta contiene:

- síntoma observable;
- capa probable y nodos afectados;
- evidencia que se debe solicitar;
- siguiente comprobación segura, expresada como verificación conceptual;
- criterio explícito para escalar;
- IDs de fuentes y nivel de confianza.

Si el tema no declara escenarios, se crean hasta tres rutas derivadas desde sus escenas y se etiquetan como `derived`. Una ruta con pasos guiados autorados se etiqueta como `authored`.

## Límites de seguridad

- No hay llamadas a plataformas, SSH, APIs de fabricantes ni cambios remotos.
- “Comprobar” significa pedir o contrastar evidencia con el runbook aprobado; no ejecutar una prueba.
- La salida no certifica causa raíz, compatibilidad ni estado de producción.
- Las fuentes deben confirmarse según versión y fecha de revisión del tema.

## Verificación

- `npm run test:support-triage`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Siguiente revisión humana

Un especialista debe revisar que la capa probable, la evidencia y el criterio de escalamiento sean apropiados para cada marca y release antes de usar el brief en un ticket real.
