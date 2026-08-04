# Estado del proyecto

> Actualiza este archivo cada vez que termines una tarea significativa. Es
> lo primero que debe leer la siguiente sesión de IA (ver `AI_WORKFLOW.md`).

**Última actualización**: 2026-08-04 — Fase 0 (base del proyecto) completada +
íconos por tipo de nodo agregados.

## Qué está hecho

- **App Next.js 15 + TypeScript (strict) + Tailwind**, App Router, sin
  backend ni base de datos. Build (`npm run build`), typecheck
  (`npm run typecheck`) y lint (`npm run lint`) pasan limpios.
- **Paleta y tipografía de marca** aplicadas de forma consistente en
  Tailwind (`tailwind.config.ts`), CSS global (`app/globals.css`) y canvas
  (`src/components/explainer/engine/palette.ts`) — ver
  `docs/product/brand.md`.
- **Layout de dos columnas** (`ExplainerLayout` + `LeftPanel` +
  `VisualCanvas`) con branding, chip de categoría, título, contenido por
  paso, navegación anterior/siguiente, CTA, y dots de progreso.
- **Motor de canvas genérico** (`SceneEngine`,
  `src/components/explainer/engine/sceneEngine.ts`): dibuja nodos y
  aristas, simula paquetes viajando con tasa de emisión (`rps`), fan-out,
  barras de capacidad/uso (`capacity`/`rx`), y soporta "matar"/"revivir"
  nodos con clic (simulación de fallas) — verificado interactivamente en
  navegador (Playwright), incluyendo el toggle de falla.
- **`animation-spec.json` v1.0**: esquema definido
  (`src/lib/animation-spec/types.ts`), validado en runtime
  (`src/lib/animation-spec/loadSpec.ts`), documentado
  (`docs/ai-context/animation-guidelines.md`).
- **Ejemplo completo funcionando**: VMware Cloud Foundation, ruta
  `/explainer/vcf`. Contenido en `src/content/vcf.ts`, spec visual en
  `docs/examples/vcf/animation-spec.json`, storyboard narrativo en
  `docs/examples/vcf/storyboard.md`. 4 pasos: problema → solución →
  arquitectura (con simulación de falla de host) → resultado.
- **Estructura documental completa** (`AI_WORKFLOW.md` + `docs/product/*` +
  `docs/ai-context/*` + `docs/examples/vcf/*`), incluida la decisión
  arquitectónica clave (D1 en `decisions.md`): la IA generará
  `animation-spec.json`, nunca HTML/JS libre.
- Landing (`/`) simple con link al ejemplo.
- **Íconos por `kind` de nodo** (`src/components/explainer/engine/icons.ts`):
  un glifo vectorial dibujado en canvas por cada `NodeKind` (hub para
  control-plane, rack para compute, platters para storage, mini-topología
  para network, play-frame para workload, flecha-boundary para external).
  No hay íconos por nodo individual ni assets externos — un tema nuevo los
  hereda automáticamente al usar los `kind` existentes.

## Qué falta (fuera de alcance de esta fase, deliberadamente)

- **Generador con IA** (fase 1): no hay API de OpenAI/Claude conectada, no
  hay UI para escribir un tema y generarlo. Ver
  `docs/product/mvp.md` y `docs/ai-context/prompt-contracts.md` (borrador
  sin implementar).
- **Validación de contenido** (`ExplainerStep[]`) equivalente a
  `parseAnimationSpec()` — hoy el contenido de ejemplo se confía porque se
  escribió a mano. Necesaria antes de aceptar contenido generado.
- Solo existe un tema de ejemplo (VCF). No hay galería ni persistencia.
- Logo real de CoreSolutions (hoy es un bloque de texto "COI" provisional,
  ver `src/components/explainer/BrandMark.tsx`).
- El layout de dos columnas oculta el canvas en pantallas angostas
  (`md:` breakpoint) — no hay una versión mobile del diagrama; aceptable
  para esta fase (uso previsto es laptop/proyector en reunión).
- No se ha desplegado a Vercel todavía desde este repo (código listo, sin
  probar el deploy real).

## Cómo continuar (siguiente sesión)

1. Si el pedido es "agregar un tema nuevo" (ej. SD-WAN, Zero Trust): seguir
   la guía en `docs/ai-context/architecture.md` ("Cómo agregar un tema
   nuevo manualmente"). No se necesita generador IA para esto — se puede
   escribir a mano igual que VCF.
2. Si el pedido es "conectar el generador IA": empezar por
   `docs/ai-context/prompt-contracts.md`, definir el proveedor, e
   implementar una función `parseExplainerContent()` análoga a
   `parseAnimationSpec()` antes de aceptar cualquier salida de un LLM.
3. Si el pedido es "desplegar en Vercel": seguir `README.md` → "Desplegar
   en Vercel". No requiere variables de entorno en esta fase.
4. Antes de escribir código nuevo, releer `docs/ai-context/decisions.md` —
   en particular D1 y D2 — para no reintroducir HTML/JS libre por tema ni
   volver a un modelo de "un solo grafo con estados".

## Comandos de verificación

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev   # http://localhost:3000/explainer/vcf
```
