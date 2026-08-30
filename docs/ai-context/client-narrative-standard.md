# Estándar de narrativa para cliente

**Sincronizado:** 30-08-2026 con la versión `0.259.0`.

## Objetivo

Cada escena debe poder entenderse sin conocer previamente el producto, la
marca, sus siglas o su arquitectura. La primera lectura no sustituye la
explicación técnica: prepara a la persona para comprenderla cuando decida
profundizar.

## Contrato

`src/content/client-narratives.ts` contiene una entrada por `slug` y por ID de
paso. `attachClientNarratives` une esa copia con el contenido al construir el
registro. El gate exige un `lead` no vacío para todas las escenas.

La tarjeta de Cliente muestra, en este orden:

1. Un título que describe el cambio o la situación, cuando hace falta
   simplificar el título técnico.
2. Una sola idea concreta que pueda imaginarse o seguirse en el diagrama.
3. Una consecuencia breve; si no existe una alternativa simple, se conserva
   el impacto técnico autorado.

## Criterios editoriales

- Empezar desde una necesidad, un evento o un recorrido reconocible.
- Explicar una sola relación principal por escena.
- Preferir verbos: pide, conecta, decide, cambia, protege, recupera.
- No definir un producto mediante otra lista de productos.
- No prometer disponibilidad, recuperación, seguridad o compatibilidad.
- Reservar versiones, protocolos, excepciones y validaciones para Detalle
  técnico y sus fuentes.
- Mantener las siglas necesarias; `GlossaryText` ofrece la definición breve al
  pasar el cursor o enfocar el término.

## Separación técnica

El archivo narrativo no modifica `sceneId`, nodos, conexiones, reglas de
integridad, fuentes, escenarios ni autoridad técnica. Una explicación sencilla
no autoriza simplificar la topología hasta volverla incorrecta. Cualquier
cambio del diagrama sigue sujeto a los contratos técnicos de cada tema.
