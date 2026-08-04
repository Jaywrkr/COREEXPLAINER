# Estado del proyecto

**Estado v0.19.0 (04-08-2026)**: cada explicación puede alternar entre modo
Cliente y Técnico y compartir enlaces directos a escenas y escenarios. Se mantiene
el séptimo tema independiente
`/explainer/observability` sobre recorrido de peticiones, señales,
OpenTelemetry Collector y diagnóstico. Cada explicación muestra trazabilidad técnica
con fecha de revisión, alcance y fuentes consultadas. Se mantiene el tema independiente
`/explainer/kubernetes` con cinco escenas, cuatro escenarios de límites y
documentación técnica en `docs/ai-context/kubernetes-technical-validation.md`.

El octavo tema `/explainer/backup-dr` explica continuidad, backup y
recuperación con VMware/Broadcom, Lenovo, Veeam e IBM, y documenta Aruba HPE y
Check Point como dependencias de red/seguridad. El portafolio canónico está en
`docs/product/portfolio.md`; toda nueva sesión debe leerlo antes de crear un
tema.

Todos los explainers declaran ahora `brandContext` y muestran la ficha “Marcas
del patrón”. El contrato está en `docs/ai-context/brand-context.md` y el
registro comercial en `docs/product/portfolio.md`.

El noveno tema `/explainer/ransomware-resilience` explica prevención, detección,
contención, recuperación limpia y validación frente a ransomware. Se mantiene
separado de Backup/DR para no presentar una copia como prevención o detección.

Se incorporó el resumen sanitizado de proyectos reales en
`docs/product/coresolutions-project-patterns.md`, con capacidades observadas y
backlog de explainers derivados del CSV de planificación.

> Actualiza este archivo cada vez que termines una tarea significativa. Es
> lo primero que debe leer la siguiente sesión de IA (ver `AI_WORKFLOW.md`).

**Última actualización**: 2026-08-04 — v0.15.0: modos de audiencia Cliente/Técnico y enlaces directos a escenas y escenarios + explainer independiente de Observabilidad basado en OpenTelemetry y Prometheus + evidencia técnica por escena mediante referencias a fuentes concretas + trazabilidad técnica visible por explicación, con fecha de revisión, alcance y fuentes enlazadas + explainers independientes de Zero Trust y Kubernetes + panel de escenarios minimizable y navegación sin CTAs comerciales + explainers independientes de vSphere HA, vSAN y NSX + lenguaje visual de diagramas + control de calidad de contenido + modo presentación + escenarios interactivos de fallo + hover de relaciones + precisión técnica de VCF +
changelog visible y versionado documentado.
Actualización adicional 2026-08-04 — v0.17.0: contexto de marcas declarado y visible por explicación.
Actualización adicional 2026-08-04 — v0.18.0: nuevo explainer de resiliencia frente a ransomware.
Actualización adicional 2026-08-04 — v0.19.0: patrones reales de proyectos y backlog comercial-técnico.
**Actualización adicional 2026-08-04 — v0.16.0:** se añadió el explainer de Backup/DR y el registro canónico del portafolio de marcas CoreSolutions.

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
  paso, navegación anterior/siguiente y dots de progreso.
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
- **Versión y changelog (v0.13.1)**: control flotante global abajo a la
  izquierda. Abre un panel con historial, se cierra con Escape y toma sus
  datos de `src/content/changelog.ts`. La versión técnica del paquete, la UI
  y el registro Markdown se actualizan de forma coordinada; ver
  `docs/ai-context/release-versioning.md`.
- **Trazabilidad técnica (v0.15.0)**: cada tema declara `lastReviewedAt`, un
  alcance explícito y una lista de fuentes HTTPS con su fecha de consulta. La
  ficha desplegable “Trazabilidad técnica” lo muestra junto al guion y el gate
  de contenido valida que no falte ni tenga fechas o enlaces inválidos.
- **Evidencia por escena (v0.15.0)**: cada paso declara `sourceIds` y la ficha
  muestra primero las fuentes que respaldan la escena activa.
- **Audiencias y enlaces profundos (v0.15.0)**: el selector Cliente/Técnico
  cambia el nivel de detalle y la URL conserva `scene`, `scenario` y `mode`.
  Ver `docs/ai-context/audience-modes-and-deep-links.md`.
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
  `docs/ai-context/failure-scenarios.md`. El panel puede minimizarse sin
  restaurar el escenario activo.
- **Navegación sin CTA comercial**: los ejemplos solo muestran navegación por
  pasos y presentación; no renderizan botones de agenda o evaluación.
- **Modo presentación guiada**: permite activar autoplay, pausar, reiniciar y
  recorrer los pasos con teclado (`←/→`, `Home`, `End`, `Space`, `Escape`). La
  reproducción se detiene al cambiar manualmente de paso o llegar al final.
  Ver `docs/ai-context/presentation-mode.md`.
- **Control de calidad de contenido**: el registro valida profundidad mínima,
  referencias a escenas, IDs, escenarios de fallo y documentación técnica.
  Los errores bloquean el build; `reviewStatus` distingue estructura completa
  de revisión especialista pendiente. Ver
  `docs/ai-context/content-quality-gate.md`. Cada tema también declara la
  fecha de revisión, alcance y fuentes consultadas, visibles en su ficha.
- **Lenguaje visual de diagramas**: cada relación declara si representa datos,
  control, storage, dependencia o fallo. La leyenda permite filtrar capas y
  relaciones sin cambiar la simulación interna. Ver
  `docs/ai-context/visual-language.md`.
- **Segundo tema**: vSphere HA y recuperación ante fallos está disponible en
  `/explainer/vsphere-ha`, con storyboard y matriz técnica propios.
- **Tercer tema**: vSAN y protección de objetos está disponible en `/explainer/vsan`,
  con cinco escenas, escenarios de fallo y matriz técnica propios.
- **Cuarto tema**: NSX y tráfico/microsegmentación está disponible en `/explainer/nsx`,
  con cinco escenas, escenarios de fallo y matriz técnica propios.
- **Quinto tema**: Zero Trust y decisiones de acceso está disponible en
  `/explainer/zero-trust`, con cinco escenas, escenarios de fallo y matriz
  técnica basados en NIST/CISA.
- **Sexto tema**: Kubernetes y el viaje de una aplicación está disponible en
  `/explainer/kubernetes`, con cinco escenas, escenarios de fallo y matriz
  técnica basada en documentación oficial de Kubernetes.
- **Séptimo tema**: Observabilidad y el camino de la petición a la evidencia
  está disponible en `/explainer/observability`, con cinco escenas,
  escenarios de fallo y matriz técnica basada en OpenTelemetry y Prometheus.
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
- Hay siete temas conceptuales (VCF, vSphere HA, vSAN, NSX, Zero Trust,
  Kubernetes y Observabilidad). No hay galería ni persistencia.
- Logo real de CoreSolutions (hoy es un bloque de texto "COI" provisional,
  ver `src/components/explainer/BrandMark.tsx`).
- El layout de dos columnas oculta el canvas en pantallas angostas
  (`md:` breakpoint) — no hay una versión mobile del diagrama; aceptable
  para esta fase (uso previsto es laptop/proyector en reunión).
- No se ha desplegado a Vercel todavía desde este repo (código listo, sin
  probar el deploy real).
- **Pulido pendiente de los ejemplos**: cerrar la selección de versión objetivo
  de VCF y revisar ambas matrices técnicas con especialistas del entorno del
  cliente. Después conviene elegir el siguiente satélite (vSAN, NSX o ciclo de
  vida) sin mezclarlo dentro del diagrama principal de VCF.

## Cómo continuar (siguiente sesión)

La base ya contiene siete temas conceptuales (VCF, vSphere HA, vSAN, NSX, Zero Trust, Kubernetes y Observabilidad). El siguiente
tema debe reutilizar el registro, el quality gate y la gramática visual; no
debe mezclar detalles especializados dentro del grafo principal de VCF.

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
