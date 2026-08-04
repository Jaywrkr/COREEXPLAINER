# Convenciones de código

## TypeScript

- `strict: true` está activo (`tsconfig.json`), no lo desactives ni agregues
  `any` para evitar un error — resuelve el tipo correctamente.
- Evita `as` salvo en los dos lugares donde ya se usa deliberadamente
  (`loadSpec.ts`, para castear `unknown` validado a mano — es el único
  punto de entrada de datos no confiables al sistema de tipos).
- Los tipos de dominio (`AnimationSpec`, `Scene`, `ExplainerStep`, etc.)
  viven junto a lo que describen (`src/lib/animation-spec/types.ts`,
  `src/content/types.ts`), no en un `types.ts` global.

## React / Next.js

- App Router. Server Components por defecto; solo se marca `"use client"`
  donde hay estado, efectos o acceso al DOM/canvas
  (`ExplainerLayout`, `VisualCanvas`).
- No pongas lógica de negocio (validación de spec, simulación) dentro de
  componentes React — vive en `src/lib/` o `engine/`, los componentes solo
  la invocan.
- Props tipadas con `interface Xxx Props`, no `type` inline salvo casos
  triviales de una línea.

## Estilos

- Tailwind con los tokens de `theme.extend.colors.core` (ej. `bg-core-bg`,
  `text-core-text-secondary`). No hardcodees valores hex en JSX/CSS — si
  necesitas un color que no está en la paleta, primero agrégalo a
  `docs/product/brand.md` y a `tailwind.config.ts`.
- No uses `rounded-*` salvo las excepciones documentadas en
  `docs/product/brand.md` (forma).
- El canvas no hereda Tailwind/CSS — sus colores vienen de
  `src/components/explainer/engine/palette.ts`, que debe mantenerse en
  sync manualmente con `tailwind.config.ts`.

## Nombres de archivo

- Componentes React: `PascalCase.tsx`.
- Módulos no-componente (lógica, tipos): `camelCase.ts`.
- Contenido por tema: `src/content/<tema-en-minusculas>.ts`.
- Specs de ejemplo: `docs/examples/<tema-en-minusculas>/animation-spec.json`.

## Comentarios

- Sin comentarios que describan QUÉ hace el código (los nombres ya lo
  dicen). Solo comenta el PORQUÉ cuando no es obvio: una decisión de
  diseño no evidente, una restricción externa, un valor "mágico" que
  vino de calibrar contra el prototipo original.
- Decisiones de diseño con razonamiento largo van en
  `docs/ai-context/decisions.md`, no como bloques de comentario en el
  código.

## Validación antes de confiar en datos externos

- Cualquier dato que no fue escrito a mano en este repo (en el futuro:
  salida de un LLM, un archivo subido, un parámetro de URL) pasa por
  `parseAnimationSpec()` o una función de validación equivalente antes de
  llegar a un componente. Nunca renderices JSON sin validar solo porque
  "vino de la IA".

## Antes de dar por terminada una tarea

- `npm run typecheck` y `npm run build` deben pasar limpio.
- Si tocaste algo visual, verifica en el navegador (no solo que compile) —
  ver `docs/ai-context/project-state.md` para cómo correr el proyecto
  localmente.
- Actualiza `docs/ai-context/project-state.md`.
