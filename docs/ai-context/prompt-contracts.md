# Contratos de prompt (borrador — sin implementar)

Este documento es un esbozo para cuando se inicie la Fase 1 (generador con
IA, ver `docs/product/mvp.md`). **No hay ningún proveedor de LLM conectado
todavía** — no implementes esto sin que el usuario lo pida explícitamente.

## Objetivo del generador (futuro)

Entrada: un tema en lenguaje natural (ej. "Explícame Zero Trust") y,
opcionalmente, una audiencia ("cliente financiero", "equipo interno").

Salida: dos artefactos, validados antes de renderizarse:

1. **Contenido** — equivalente a `ExplainerMeta` + `ExplainerStep[]`
   (`src/content/types.ts`): 3–5 pasos con `tag`, `title`, `paragraphs`,
   `businessImpact`, `caption`, y un `sceneId`.
2. **Spec visual** — un `AnimationSpec` (`src/lib/animation-spec/types.ts`)
   con una escena por cada `sceneId` referenciado en el contenido.

## Por qué dos salidas separadas, no una sola

Mantiene la separación de capas del resto del proyecto (ver
`docs/ai-context/architecture.md`): el modelo que "sabe redactar para
ventas" no necesita razonar sobre coordenadas de canvas, y viceversa. En la
práctica probablemente sea una sola llamada a un LLM con salida
estructurada (ej. JSON Schema / structured output) que produce un objeto
con ambas partes, pero conceptualmente son dos contratos independientes.

## Validación obligatoria antes de render

- El spec visual pasa por `parseAnimationSpec()`
  (`src/lib/animation-spec/loadSpec.ts`) sin excepciones.
- El contenido debe validarse de forma equivalente (función por escribir en
  la Fase 1, ej. `parseExplainerContent()`): todo `sceneId` referenciado
  por un paso debe existir en el spec generado; todos los campos
  requeridos de `ExplainerStep` deben estar presentes y no vacíos.
- Un fallo de validación debe ofrecer reintento o mensaje de error claro al
  usuario — nunca renderizar contenido parcial o un canvas roto en
  silencio.

## Lineamientos de tono para el generador (futuro)

Heredan directamente de `docs/product/brand.md`:

- Español formal, "usted".
- Cifras concretas, no vaguedades.
- Cada paso cierra con `businessImpact` explícito.
- 3–5 pasos: problema → solución → arquitectura → resultado es la
  estructura narrativa que ya funcionó en el ejemplo de VCF — el generador
  debería usarla como plantilla por defecto, no como regla rígida.

## Límites de dominio (a definir en Fase 1)

Qué hacer si el tema pedido no es un tema técnico de infraestructura/TI
(fuera del dominio de CoreSolutions), o si es demasiado amplio para 3–5
pasos — sin resolver todavía. Documentar la decisión aquí cuando se tome.
