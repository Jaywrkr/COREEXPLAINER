# Visión de producto

## Qué es

**CORESOLUTIONS Technical Explainer** es una aplicación web que convierte un
tema técnico complejo (ej. "Explícame SD-WAN", "Explícame VMware Cloud
Foundation", "Explícame Zero Trust") en una explicación visual e interactiva,
pensada para usarse en conversaciones de venta consultiva con clientes de
CORESOLUTIONS.

El formato es una "lección interactiva" de dos columnas: contenido paso a
paso a la izquierda, diagrama técnico animado a la derecha, sincronizados
entre sí. El objetivo es que un vendedor o ingeniero preventa pueda explicar
arquitectura sin que el cliente se pierda en la jerga, y sin depender de
diapositivas estáticas.

## Por qué existe

Los conceptos de infraestructura (virtualización, redes definidas por
software, seguridad Zero Trust, etc.) son difíciles de explicar con texto o
diapositivas. Un diagrama animado que muestra el problema, la solución, la
arquitectura y el resultado — en ese orden, con tráfico de datos simulado
correctamente — comunica en segundos lo que un documento tarda párrafos en
explicar, y es más memorable en una reunión comercial.

## A quién sirve

- **Uso primario**: equipo comercial y preventa de CORESOLUTIONS, en
  reuniones con clientes (venta consultiva).
- **Uso secundario**: material de referencia interno para que el equipo
  técnico explique arquitecturas a otros equipos no técnicos.

## Cómo se construye

Esta app está diseñada desde el día uno para desarrollarse y mantenerse con
ayuda de IA (Claude, ChatGPT u otras). Por eso la prioridad de esta primera
fase no es conectar un generador de contenido por IA, sino dejar una base:

- con arquitectura clara y documentada,
- con contenido, layout, motor visual y specs separados,
- con un contrato de datos (`animation-spec.json`) que un futuro generador IA
  pueda producir de forma confiable, sin que la IA tenga que escribir
  HTML/JS libre por cada tema nuevo.

## Qué NO es (en esta fase)

- No es un generador de contenido con IA conectado (ver
  `docs/product/mvp.md` y `docs/ai-context/decisions.md`).
- No es una plataforma multi-tenant ni tiene autenticación.
- No es un editor visual — el contenido y las escenas se definen como datos
  (TypeScript / JSON), no se editan desde la UI todavía.
