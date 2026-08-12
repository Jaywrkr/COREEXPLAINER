# Revisión UI — Densidad y espacio del canvas

**Fecha:** 2026-08-06  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.59.0

## Problemas observados

- El ancho fijo del panel izquierdo no se adaptaba a textos ni a la conversación.
- Cliente mostraba dos bloques de orientación que podían repetir la misma idea.
- El panel de fallos podía crecer hasta cubrir una zona relevante del diagrama.
- Parte de la información técnica aparecía antes de que el usuario la solicitara.

## Acciones aplicadas

- El panel izquierdo tiene un separador accesible y redimensionable entre 320 y 560 px; las flechas izquierda/derecha ajustan el ancho cuando el separador tiene foco.
- Cliente conserva la guía de lectura y el detalle técnico colapsado, pero no muestra adicionalmente el bloque de resultado esperado. Conceptual sí lo mantiene porque sirve como puente de conversación.
- Los escenarios empiezan minimizados, se mueven al borde superior derecho y limitan su altura con scroll interno.
- Cuando hay un escenario seleccionado y el panel está minimizado, se muestra solo su nombre; el análisis completo aparece al expandirlo.
- El canvas conserva la mayor superficie visual posible y las herramientas siguen siendo opcionales.

## Criterio de aceptación

La persona ve primero título, idea principal y diagrama. La información adicional aparece al expandir un control o activar una herramienta. El diagrama sigue siendo navegable aunque se abra un escenario largo.

## Validación

- `npm run typecheck`
- `npm run lint`
- `npm run build`
