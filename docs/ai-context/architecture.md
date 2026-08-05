# Arquitectura

## Stack

El modo presentación está documentado en `docs/ai-context/presentation-mode.md`.
El gate de contenido está documentado en `docs/ai-context/content-quality-gate.md`.
El lenguaje visual de relaciones y capas está documentado en `docs/ai-context/visual-language.md`.

La interacción de hover está documentada en `docs/ai-context/hover-highlighting.md`.
Los escenarios de fallo están documentados en `docs/ai-context/failure-scenarios.md`.
La alineación comercial de marcas está documentada en `docs/product/portfolio.md`.
El contrato de marcas por tema está documentado en `docs/ai-context/brand-context.md`.
Los patrones reales de implementación se resumen en `docs/product/coresolutions-project-patterns.md`.
La política de publicación manual de Vercel está en `docs/ai-context/vercel-deployment-policy.md`.

- **Next.js 15** (App Router), **TypeScript** estricto, **Tailwind CSS**.
- Sin backend propio, sin base de datos, sin llamadas a red en runtime en
  esta fase. Todo el contenido es estático y vive en el repositorio.
- Despliegue objetivo: **Vercel**, sin configuración adicional.

## Las cuatro capas (no mezclar)

```
src/content/                      → CONTENIDO (texto, copy, qué dice cada paso)
src/components/explainer/*.tsx    → LAYOUT (estructura visual, sin lógica de dibujo)
src/components/explainer/engine/  → MOTOR VISUAL (interpreta escenas, dibuja canvas)
src/lib/animation-spec/           → CONTRATO DE DATOS (tipos + validación del spec)
docs/                             → DOCUMENTACIÓN (para humanos e IA)
```

Regla práctica: si estás por escribir texto visible para el cliente, va en
`src/content/`. Si estás por escribir JSX de layout, va en
`src/components/explainer/*.tsx` (no en `engine/`). Si estás por dibujar
algo en el `<canvas>`, va en `engine/`. Si estás por definir qué forma puede
tener un dato, va en `src/lib/animation-spec/types.ts`.

## Flujo de datos de una explicación

```
┌─────────────────────┐   ┌──────────────────────────────┐
│ src/content/vcf.ts   │   │ docs/examples/vcf/            │
│ (ExplainerMeta +     │   │ animation-spec.json           │
│  ExplainerStep[])    │   │ (Record<string, Scene>)       │
└──────────┬───────────┘   └───────────────┬───────────────┘
           │                                │
           │     src/content/registry.ts registra ambos
           │     (spec ya validado con parseAnimationSpec)
           │     app/explainer/[slug]/page.tsx los lee de ahí
           v                                v
        ┌───────────────────────────────────────────┐
        │        ExplainerLayout.tsx (client)        │
        │  estado: currentStepIndex                  │
        │  step = steps[currentStepIndex]             │
        │  scene = spec.scenes[step.sceneId]          │
        └───────────┬─────────────────────┬───────────┘
                     v                     v
            ┌─────────────────┐   ┌──────────────────┐
            │  LeftPanel.tsx   │   │  VisualCanvas.tsx │
            │  (texto + nav)   │   │  (canvas + rAF)    │
            └─────────────────┘   └────────┬───────────┘
                                            v
                                   ┌──────────────────┐
                                   │  SceneEngine       │
                                   │  (engine/          │
                                   │   sceneEngine.ts)  │
                                   │  update(dt)/draw() │
                                   └────────────────────┘
```

Cada `ExplainerStep` apunta a una `sceneId`. Cambiar de paso reemplaza por
completo la topología del canvas (nodos/conexiones), no solo resalta
elementos — así es como el prototipo de referencia (VCF) explica "silos →
plataforma unificada → arquitectura del clúster → cargas de trabajo" con
cuatro diagramas distintos, no cuatro estados del mismo diagrama.

## Módulos clave

- **`src/lib/animation-spec/types.ts`** — el esquema (`AnimationSpec`,
  `Scene`, `SceneNode`, `SceneEdge`). Única fuente de verdad de qué campos
  puede tener un `animation-spec.json`.
- **`src/lib/animation-spec/loadSpec.ts`** — `parseAnimationSpec(raw)`.
  Valida estructura y referencias cruzadas (que toda arista apunte a nodos
  existentes, etc.) y lanza `AnimationSpecError` con un mensaje específico
  si algo no calza. Se llama una vez, en la página, no en cada render.
- **`src/components/explainer/engine/sceneEngine.ts`** — la clase
  `SceneEngine`: simulación (emisión de paquetes por `rps`, viaje,
  fan-out, decaimiento de capacidad, toggle de nodo muerto/vivo) y dibujo.
  No importa nada de `src/content` ni sabe qué es VCF.
- **`src/components/explainer/VisualCanvas.tsx`** — componente cliente que
  monta el `<canvas>`, corre el loop de `requestAnimationFrame`, maneja
  resize (con `ResizeObserver` y `devicePixelRatio`) y clics. Delega toda
  la lógica a `SceneEngine`.
- **`docs/ai-context/canvas-navigation.md`** — contrato de interacción del
  viewport (pan, zoom, reset y conversión de clics). Leer antes de modificar
  la navegación del canvas.
- **`docs/ai-context/node-details.md`** — contrato de selección e información
  contextual de las tarjetas del canvas.
- **`docs/ai-context/vcf-technical-validation.md`** — matriz de afirmaciones,
  fuentes y límites técnicos del ejemplo VCF. Leer antes de cambiar copy o
  topología de este tema.
- **`src/components/explainer/NodeDetailCard.tsx`** — ficha genérica de un
  nodo seleccionado; usa solo campos ya definidos en el spec.
- **`src/components/explainer/VersionChangelog.tsx`** — control global
  cliente que abre/cierra el historial de versiones. Su contenido estático
  viene de `src/content/changelog.ts`; ver también
  `docs/ai-context/release-versioning.md`.
- **`src/components/explainer/ExplainerLayout.tsx`** — orquesta el estado
  de "paso actual" y compone `LeftPanel` + `VisualCanvas`. Este es el único
  componente que un nuevo tema (que no sea VCF) reutiliza tal cual.
- **`src/content/vcf.ts`** — ejemplo de contenido. Un tema nuevo agrega un
  archivo hermano (`src/content/<tema>.ts`) con la misma forma
  (`ExplainerMeta` + `ExplainerStep[]`).
- **`src/content/vsphere-ha.ts`** — segundo ejemplo de referencia: cinco
  escenas sobre protección y reinicio condicional de VMs con vSphere HA.
- **`src/content/vsan.ts`** — tercer ejemplo de referencia: cinco escenas
  sobre objetos, políticas de storage y reconstrucción condicional.
- **`src/content/nsx.ts`** — cuarto ejemplo de referencia: cinco escenas sobre
  segmentos, overlay, firewall distribuido y gateways.
- **`src/content/zero-trust.ts`** — quinto ejemplo de referencia: cinco escenas
  sobre decisiones de acceso, contexto y enforcement.
- **`src/content/kubernetes.ts`** — sexto ejemplo de referencia: cinco escenas
  sobre estado deseado, scheduling, Services y rollouts.
- **`src/content/observability.ts`** — séptimo ejemplo de referencia: cinco
  escenas sobre recorridos distribuidos, señales, Collector y diagnóstico.
- **`src/content/backup-dr.ts`** — octavo ejemplo de referencia: cinco escenas
  sobre objetivos RPO/RTO, protección Veeam, copias IBM, recuperación y pruebas,
  alineado al portafolio CoreSolutions.
- **`src/content/ransomware-resilience.ts`** — noveno ejemplo de referencia:
  cinco escenas sobre prevención, detección, contención, recuperación limpia y
  validación, separado conceptualmente de Backup/DR.
- **`src/content/san-storage.ts`** — décimo ejemplo de referencia: cinco escenas
  sobre capas SAN, pools, LUNs, host mapping, multipath, migración y replicación.
- **`src/content/veeam-protection.ts`**, **`active-active-dc.ts`**,
  **`lan-san.ts`** y **`nas-private-cloud.ts`** — batch de cuatro temas basados
  en patrones reales: protección heterogénea, continuidad en dos dominios,
  integración de planos de red y NAS como servicio de archivos.
- **`src/content/registry.ts`** — el catálogo: un `ExplainerDefinition[]`
  con `{ slug, category, meta, steps, spec }`. `meta.technicalReview` mantiene
  fecha, alcance y fuentes consultadas visibles por tema. Cada paso enlaza sus
  `sourceIds` con ese catálogo para mostrar evidencia por escena. Es lo único que conoce la
  lista completa de temas. `app/explainer/page.tsx` (dashboard) y
  `app/explainer/[slug]/page.tsx` (ruta dinámica) leen de aquí — no hay una
  carpeta de ruta por tema. La ruta dinámica acepta `scene`, `scenario` y
  `mode` para compartir el contexto de una demo; ver
   `docs/ai-context/audience-modes-and-deep-links.md`.
- **`src/content/brand-context.ts`** — presets reutilizables de marca para que
  cada `ExplainerMeta` declare función y límite sin repetir el catálogo.
- **`src/components/explainer/BrandContextPanel.tsx`** — ficha visible de las
  marcas asociadas al patrón; no sustituye la trazabilidad técnica.

## Cómo agregar un tema nuevo manualmente (sin IA todavía)

1. Crear `docs/examples/<tema>/animation-spec.json` con sus escenas.
2. Crear `docs/examples/<tema>/storyboard.md` describiendo cada paso en
   prosa (sirve de puente entre el guion comercial y el JSON).
3. Crear `src/content/<tema>.ts` exportando `metaTema` y `stepsTema`
   (mismos tipos que `vcf.ts`).
4. Agregar una entrada en `src/content/registry.ts`
   (`explainerRegistry`): `slug`, `category` (una de
   `ExplainerCategory` en `src/content/types.ts` — agrega una categoría
   nueva ahí si de verdad hace falta, no una por tema), y los imports de
   `meta`/`steps`/spec parseado. No se crea ninguna ruta nueva — el tema
   aparece automáticamente en `/explainer` (dashboard) y en
   `/explainer/<slug>`.
5. No tocar `ExplainerLayout`, `LeftPanel`, `VisualCanvas`, `SceneEngine`
   ni las rutas — si sientes que necesitas tocarlos para tu tema,
   probablemente falta algo en el esquema (`types.ts`), no en el motor ni
   en el catálogo.
