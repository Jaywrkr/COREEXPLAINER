# Arquitectura

## Stack

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
           │        app/explainer/vcf/page.tsx
           │        importa ambos, valida el spec con
           │        parseAnimationSpec(), y los pasa a
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
- **`src/components/explainer/ExplainerLayout.tsx`** — orquesta el estado
  de "paso actual" y compone `LeftPanel` + `VisualCanvas`. Este es el único
  componente que un nuevo tema (que no sea VCF) reutiliza tal cual.
- **`src/content/vcf.ts`** — ejemplo de contenido. Un tema nuevo agrega un
  archivo hermano (`src/content/<tema>.ts`) con la misma forma
  (`ExplainerMeta` + `ExplainerStep[]`).

## Cómo agregar un tema nuevo manualmente (sin IA todavía)

1. Crear `docs/examples/<tema>/animation-spec.json` con sus escenas.
2. Crear `docs/examples/<tema>/storyboard.md` describiendo cada paso en
   prosa (sirve de puente entre el guion comercial y el JSON).
3. Crear `src/content/<tema>.ts` exportando `metaTema` y `stepsTema`
   (mismos tipos que `vcf.ts`).
4. Crear `app/explainer/<tema>/page.tsx` copiando
   `app/explainer/vcf/page.tsx` y cambiando los imports.
5. No tocar `ExplainerLayout`, `LeftPanel`, `VisualCanvas` ni `SceneEngine`
   — si sientes que necesitas tocarlos para tu tema, probablemente falta
   algo en el esquema (`types.ts`), no en el motor.
