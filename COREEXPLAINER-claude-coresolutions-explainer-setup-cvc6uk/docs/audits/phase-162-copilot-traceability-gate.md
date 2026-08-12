# Fase 162 — Gate de trazabilidad del copiloto

Fecha de revisión: 2026-08-11  
Versión: 0.216.0  
Alcance: contrato de mensaje, endpoint `/api/copilot` y panel de copiloto.

## Decisión

La respuesta del modelo se trata como texto no confiable. `reviewCopilotMessage` la sanea, busca citas `[fuente:id]` permitidas por el explainer, detecta lenguaje de promesa y garantiza una línea visible de `Evidencia a revisar`.

El estado `context-backed` solo aparece cuando existe una cita válida y no se detectan esas señales; aun así, la respuesta no es una aprobación técnica. En cualquier otro caso se muestra `review-needed` con razones concretas.

## Seguridad y límites

- Las citas desconocidas nunca crean enlaces ni amplían el allowlist de acciones.
- La IA permanece en modo solo lectura; las únicas acciones son abrir fuentes autoradas o activar escenarios locales.
- La heurística no demuestra que la fuente respalde semánticamente toda la frase; un especialista debe revisar producto, release, configuración y entorno.

## Comprobaciones

```text
npm run test:copilot-message-contract
npm run test:copilot-actions
npm run typecheck
npm run lint
npm run validate:content
npm run build
npm run test:version-consistency
```
