# AI Workflow — CORESOLUTIONS Technical Explainer

> **Sincronizado:** 29-08-2026 contra `codex/mcp-fundamentals-explainer` (versión de trabajo `0.257.0`). Antes de modificar
> contenido o código, consulta también
> [`docs/DOCUMENTATION_STATUS.md`](./docs/DOCUMENTATION_STATUS.md) para no
> sustituir fechas históricas o revisiones técnicas por una fecha de edición.

Este archivo es el punto de entrada para cualquier IA (Claude, ChatGPT u otra)
que retome el desarrollo de este proyecto. Léelo primero, en este orden:

1. **`docs/ai-context/project-state.md`** — qué está hecho, qué falta, cómo
   continuar. Léelo siempre antes de escribir código.
2. **`docs/ai-context/architecture.md`** — cómo está organizado el código y
   por qué.
3. **`docs/ai-context/decisions.md`** — decisiones de diseño ya tomadas y su
   razonamiento. No las repitas ni las cuestiones sin releer el porqué.
4. **`docs/ai-context/coding-standards.md`** — convenciones de código.
5. **`docs/ai-context/animation-guidelines.md`** — reglas para el motor
   visual y el formato `animation-spec.json`.
6. **`docs/ai-context/architecture-generator.md`** y
   **`docs/product/architecture-generator.md`** — contrato, límites y uso de
   la generación de borradores para Architecture Studio.
7. **`docs/product/vision.md`**, **`docs/product/mvp.md`**,
   **`docs/product/brand.md`** — contexto de producto y marca.
8. **`docs/examples/vcf/`** — ejemplo de referencia completo (contenido +
   storyboard + animation-spec.json) usado por el prototipo en
   `/explainer/vcf`.

## Reglas no negociables

- **La IA solo puede proponer borradores de Architecture Studio a través del
  endpoint servidor ya autorizado.** Nunca expongas, registres ni uses una
  variable `NEXT_PUBLIC_OPENAI_API_KEY`; la clave del servidor se conserva en
  Vercel. No amplíes proveedores, modelos o permisos sin una solicitud
  explícita.
- **La IA nunca genera HTML/JS libre por cada explicación.** El único output
  válido de un futuro generador es un `animation-spec.json` (ver
  `docs/ai-context/decisions.md` y `docs/ai-context/animation-guidelines.md`).
  La app interpreta ese JSON con el motor genérico en
  `src/components/explainer/engine/`.
- **Mantén separados**: contenido (`src/content/`), layout
  (`src/components/explainer/*.tsx`, sin lógica de dibujo), motor visual
  (`src/components/explainer/engine/`), specs (`src/lib/animation-spec/` +
  `docs/examples/*/animation-spec.json`) y documentación (`docs/`). No mezcles
  estas capas en un mismo archivo.
- **Esquinas rectas, sin `border-radius`** salvo en los dots de progreso y
  controles circulares explícitamente documentados como excepción en
  `docs/product/brand.md`.
- **Actualiza `docs/ai-context/project-state.md`** al terminar cualquier
  tarea significativa: qué cambiaste, qué falta, y cuál es el siguiente paso
  sugerido. Es la única forma en que la siguiente sesión de IA no repite
  trabajo ni pierde contexto.
- **Actualiza la documentación viva junto con el cambio.** Mantén el campo
  `Sincronizado` y el índice `docs/DOCUMENTATION_STATUS.md` al día. Las fechas
  de auditorías, changelog, fuentes oficiales y revisiones técnicas describen
  hechos históricos: solo cambian cuando existe una nueva revisión real.

## Cómo correr el proyecto

```bash
npm install
npm run dev       # http://localhost:3000 — landing con link a /explainer/vcf
npm run build     # build de producción
npm run typecheck # tsc --noEmit
npm run lint      # next lint
```

## Despliegue

Los explainers se despliegan sin variables adicionales. Para generar un
borrador en `/architecture`, Vercel requiere `OPENAI_API_KEY` solo del lado
servidor; `OPENAI_ARCHITECTURE_MODEL` es opcional. Ver
`docs/product/architecture-generator.md` y
`docs/ai-context/vercel-deployment-policy.md` antes de publicar.
