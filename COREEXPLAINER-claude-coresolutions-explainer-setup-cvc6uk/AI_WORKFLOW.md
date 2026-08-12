# AI Workflow — CORESOLUTIONS Technical Explainer

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
6. **`docs/ai-context/prompt-contracts.md`** — cómo debe ser el prompt/salida
   cuando se conecte un generador IA (todavía no implementado).
7. **`docs/product/vision.md`**, **`docs/product/mvp.md`**,
   **`docs/product/brand.md`** — contexto de producto y marca.
8. **`docs/examples/vcf/`** — ejemplo de referencia completo (contenido +
   storyboard + animation-spec.json) usado por el prototipo en
   `/explainer/vcf`.

## Reglas no negociables

- **No conectar APIs de OpenAI/Claude todavía.** Esa es una fase posterior,
  fuera del alcance actual. No agregues `.env`, SDKs, ni llamadas a LLMs sin
  que el usuario lo pida explícitamente.
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

## Cómo correr el proyecto

```bash
npm install
npm run dev       # http://localhost:3000 — landing con link a /explainer/vcf
npm run build     # build de producción
npm run typecheck # tsc --noEmit
npm run lint      # next lint
```

## Despliegue

El proyecto está listo para desplegarse en Vercel sin configuración adicional
(Next.js App Router estándar, sin variables de entorno requeridas en esta
fase). Ver `docs/ai-context/project-state.md` para el estado exacto del
despliegue.
