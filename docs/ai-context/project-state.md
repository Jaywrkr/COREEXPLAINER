# Estado del proyecto

> Actualiza este archivo cada vez que termines una tarea significativa. Es
> lo primero que debe leer la siguiente sesión de IA (ver `AI_WORKFLOW.md`).

**Última actualización**: 2026-08-04 — v0.5.0: escenarios interactivos de fallo + hover de relaciones + precisión técnica de VCF +
changelog visible y versionado documentado.

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
- **Catálogo de temas con categorías**: `src/content/registry.ts` centraliza
  todos los temas (`ExplainerDefinition[]`: slug, category, meta, steps,
  spec ya validado). `/explainer` es un dashboard que agrupa por categoría
  (`ExplainerCategory` en `src/content/types.ts`) y enlaza a
  `/explainer/[slug]` (ruta dinámica única, con `generateStaticParams` —
  reemplazó la carpeta `app/explainer/vcf/`). Agregar un tema nuevo ya no
  requiere crear una ruta: solo una entrada en el registro (ver
  `docs/ai-context/architecture.md`).
- **Modo claro/oscuro**: toggle global (esquina superior derecha, en todas
  las páginas), sin flash del tema incorrecto al cargar, persistido en
  `localStorage`. Paleta como variables CSS por tema
  (`app/globals.css`) + `src/components/explainer/engine/palette.ts` para
  el canvas (que no puede leer CSS). Navy/accent/éxito/advertencia/error
  son iguales en ambos temas — solo fondo/panel/texto se invierten. Ver
  `docs/product/brand.md` ("Modo claro/oscuro") antes de tocar cualquier
  color.
- **Versión y changelog (v0.5.0)**: control flotante global abajo a la
  izquierda. Abre un panel con historial, se cierra con Escape y toma sus
  datos de `src/content/changelog.ts`. La versión técnica del paquete, la UI
  y el registro Markdown se actualizan de forma coordinada; ver
  `docs/ai-context/release-versioning.md`.
- **Auditoría técnica de VCF**: el ejemplo ahora se presenta explícitamente
  como modelo conceptual. Se corrigieron afirmaciones absolutas sobre consola
  única, failover, SLA y camino de datos; se separó el clúster de cómputo del
  plano de gestión y se documentó la matriz de fuentes en
  `docs/ai-context/vcf-technical-validation.md`.
- **Hover de relaciones**: al mover el cursor sobre un nodo, sus aristas y
  vecinos directos se resaltan y los elementos no relacionados se atenúan.
  Funciona con pan/zoom y se limpia al salir o cambiar de escena. Ver
  `docs/ai-context/hover-highlighting.md`.
- **Escenarios interactivos de fallo**: el contenido puede declarar escenarios
  guiados por escena, con nodos afectados, explicación y limitaciones. VCF
  incluye fallas de uno o varios hosts y pérdida del plano de gestión. Ver
  `docs/ai-context/failure-scenarios.md`.
- **Detalle de nodos**: al hacer clic en una tarjeta del canvas aparece una
  ficha contextual con su `kind`, función genérica, `subtitle`, capacidad,
  tasa de emisión y posibilidad de simular falla. Clic fuera cierra la ficha;
  cambiar de escena reinicia la selección. Ver
  `docs/ai-context/node-details.md` antes de modificar esta interacción.

## Navegación de canvas recién incorporada

- **Pan/zoom del diagrama**: el ejemplo VCF ya permite arrastrar para mover,
  usar rueda/trackpad o controles `−`/`+` para zoom (65%–250%) y restablecer
  el encuadre. Cambiar de escena reinicia el viewport. Un clic sin arrastre
  conserva la simulación de matar/revivir nodos. Ver
  `docs/ai-context/canvas-navigation.md` antes de tocar esta capa.

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
- **Pulido pendiente del ejemplo VCF** (a pedido explícito del usuario,
  antes de agregar más temas): cerrar la selección de versión objetivo de VCF
  y revisar la matriz con un especialista del entorno del cliente. Después
  siguen las interacciones de modo presentación, autoplay y navegación por
  teclado. El modo claro/oscuro, pan/zoom y detalle de nodos ya están
  resueltos, incluido el hover de relaciones. El siguiente pulido es el modo
  presentación/autoplay y la navegación por teclado. Sigue lo demás, una cosa
  a la vez.

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
