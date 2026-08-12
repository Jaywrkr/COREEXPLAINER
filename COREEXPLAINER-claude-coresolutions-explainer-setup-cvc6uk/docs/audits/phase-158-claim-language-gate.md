# Fase 158 — Puerta de lenguaje de promesas técnicas

Fecha de revisión: 2026-08-11  
Versión: 0.212.0  
Alcance: contenido editorial de los pasos de cada explainer.

## Decisión

Las palabras absolutas pueden convertir una explicación conceptual en una promesa que el diseño real no puede sostener. `claimLanguageGate` busca expresiones como `garantiza`, `siempre`, `nunca`, `sin downtime`, `automático` y `cero impacto`.

La regla genera una advertencia cuando el campo no tiene `sourceIds` y tampoco incluye una limitación o condición explícita (`depende`, `requiere`, `debe probarse`, `no garantiza`, entre otras). No bloquea la publicación ni modifica el contenido.

## Qué sí demuestra

- Que el texto contiene una señal editorial de riesgo.
- Que una frase respaldada por fuente o cualificada no recibe una advertencia.
- Que la regresión está automatizada en `scripts/test-claim-language-gate.ts`.

## Qué no demuestra

- No certifica que la fuente respalde exactamente la afirmación.
- No sustituye la revisión de producto, release, licenciamiento, sizing, pruebas ni aceptación del cliente.
- No interpreta contexto lingüístico completo; una revisión humana puede cerrar la advertencia.

## Comprobaciones

```text
npm run test:claim-language-gate
npm run validate:content
npm run typecheck
npm run lint
npm run build
npm run test:version-consistency
```
