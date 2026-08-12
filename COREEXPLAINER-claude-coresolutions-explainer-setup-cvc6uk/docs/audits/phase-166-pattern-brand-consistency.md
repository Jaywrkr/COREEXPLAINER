# Fase 166 — Coherencia de marcas en patrones

Fecha de revisión: 2026-08-11  
Versión: 0.220.0  
Alcance: catálogo de patrones y límite de publicación del registry.

## Decisión

`validateSolutionPatterns` recibe un mapa de marcas declaradas por cada explainer enlazado. Para cada patrón, una marca solo es válida si aparece en al menos uno de esos `brandContext`. Así se evita que un patrón parezca cubrir una marca o producto que sus explicaciones vinculadas nunca contextualizan.

El gate detectó dos casos reales: `Aruba HPE` en el patrón de plataforma no tenía vínculo de red suficiente, y `Turbonomic` no coincidía con el nombre autorado `IBM Turbonomic`. Se añadió `active-active-dc` al primer patrón y se normalizó el segundo nombre.

## Límites

- Coincidir el nombre no demuestra compatibilidad, certificación, licenciamiento ni soporte.
- Los aliases de fabricantes deben normalizarse explícitamente si el portfolio los necesita; no se hacen coincidencias difusas.
- La exportación sigue siendo un borrador conceptual y requiere revisión especialista.

## Comprobaciones

```text
npm run test:pattern-validation
npm run test:pattern-readiness
npm run typecheck
npm run lint
npm run validate:content
npm run build
npm run test:version-consistency
```
