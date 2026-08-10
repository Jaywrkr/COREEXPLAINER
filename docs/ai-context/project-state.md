# Estado del proyecto

**Actualizacion v0.71.0 (09-08-2026):** Instana, Turbonomic y webMethods usan `targetArchitecture` con objetivos autorados, cambios esperados, límites y fuentes. La comparación sigue siendo conceptual y bajo demanda.

**Actualizacion v0.70.0 (09-08-2026):** `ExplainerMeta.targetArchitecture` permite declarar objetivos autorados con resumen, cambios esperados, limites y fuentes. VCF es el primer explainer que lo usa; la UI lo muestra solo dentro de la comparacion actual/objetivo.

**Actualizacion v0.69.0 (09-08-2026):** los escenarios tienen una comparacion actual/objetivo bajo demanda. Objetivo es la escena base documentada; actual es el grafo tras retirar los nodos del escenario. No se inventa un target de diseño.

**Actualizacion v0.68.0 (09-08-2026):** el resumen de escenario ofrece `Descargar ficha HTML`, un archivo autonomo generado en el navegador con checklist, hallazgos, fuentes y limites. No hay subida ni persistencia remota.

**Actualizacion v0.67.0 (09-08-2026):** cada escenario activo incluye un resumen de sesion bajo demanda: pasos revisados, hallazgos abiertos, criticos y fuentes enlazadas. Se mantiene local y conceptual.

**Actualizacion v0.66.0 (09-08-2026):** los escenarios guiados incluyen un checklist local de verificacion. Cada paso puede quedar pendiente, revisado o no aplica; el estado se guarda por `slug` y escenario en `localStorage`, sin backend.

**Actualizacion v0.65.0 (09-08-2026):** los hallazgos del contrato tecnico conservan `sourceIds` y `nodeIds`. El panel de escenarios muestra los enlaces de fuente bajo demanda, manteniendo la interfaz compacta.

**Actualizacion v0.64.0 (09-08-2026):** los escenarios combinan las reglas generales de `evaluateTechnicalRules.ts` con los diagnosticos del contrato tecnico por escena (`evaluateTopologyIntegrity`). Las relaciones y caminos requeridos por dominio se muestran como evidencia accionable sin convertir el diagrama en una validacion de produccion.

**Actualización v0.63.0 (09-08-2026):** los impactos what-if generan reglas técnicas accionables en `src/lib/semantic-model/evaluateTechnicalRules.ts`: severidad, detalle, evidencia y recomendación. El panel las muestra bajo demanda y mantiene los límites de simulación conceptual.

**Actualización v0.51.0 (06-08-2026):** el selector de audiencia ofrece Cliente, Conceptual y Técnico. Cliente prioriza impacto, Conceptual explica relaciones principales y Técnico muestra auditoría, evidencia y límites. El mismo nivel viaja en `mode=` dentro de los enlaces directos.

**Actualización v0.50.0 (05-08-2026):** la marca visible se normalizó a `CORESOLUTIONS` en interfaz, metadatos, contenidos y documentación. Se mantienen en minúsculas los identificadores técnicos, rutas, URLs y nombres de paquete para no romper referencias.

**Actualización v0.49.0 (05-08-2026):** cada explicación ofrece `Favorito` y `Revisado`. El estado se conserva localmente por `slug` en el navegador; no hay autenticación, backend ni sincronización entre dispositivos. El contrato está documentado en `docs/ai-context/feedback-and-progress.md`.

**Actualización v0.48.0 (05-08-2026):** en modo Cliente el canvas prioriza zoom, paneo y reproducción. Leyenda, capas, escenarios de fallo e integridad técnica se agrupan en `Más herramientas`; el contexto se revela automáticamente cuando existe un escenario activo o una alerta del modelo.

**Actualización v0.47.0 (05-08-2026):** el modo Cliente muestra primero una idea clave y el valor para el cliente, dejando el detalle adicional bajo demanda. Trazabilidad se abre dentro del flujo de la columna, con scroll y ajuste de texto para no quedar cortada. `SceneEngine` calcula el tamaño de cada nodo a partir de sus líneas de texto y reutiliza esa geometría para aristas, clics y controles de fallo.

**Actualización v0.46.0 (05-08-2026):** el catálogo documental normaliza publisher, producto, versión o referencia, fecha de consulta y vigencia para cada fuente. La UI expone esos datos en Trazabilidad y marca `review-needed` cuando una fuente queda fuera de la ventana de revisión.

**Actualización v0.45.0 (05-08-2026):** vSphere HA, Kubernetes, Migración e Implementation Lifecycle pasan a `source-backed`, con fuentes técnicas específicas por escena. El sistema cubre ahora observabilidad, storage, continuidad, red, seguridad, plataforma y ciclo de entrega con el mismo contrato de trazabilidad.

**Actualización v0.44.0 (05-08-2026):** LAN/SAN, SD-WAN, Zero Trust, Ransomware Resilience y Check Point HA pasan a `source-backed`, con fuentes técnicas específicas por escena. La cobertura documental no se presenta como certificación del entorno real.

El batch v0.43.0 también cubre Backup/DR con fuentes técnicas específicas por escena.

**Actualización v0.43.0 (05-08-2026):** vSAN, SAN Storage, Veeam Protection, Active-Active DC, NAS/Private Cloud e IBM Power/AIX pasan a `source-backed`, con fuentes técnicas específicas por escena. El panel sigue diferenciando evidencia documental de una revisión especialista.

**Actualización v0.42.0 (05-08-2026):** Observability, Instana, Turbonomic y webMethods pasan a `source-backed`, con reglas por escena vinculadas a fuentes técnicas existentes. `baseline` sigue reservado para temas que aún necesitan una revisión documental específica.

**Actualización v0.41.0 (05-08-2026):** el registro ejecuta fixtures de regresión del evaluador técnico durante el build. Se cubren caso válido, relación incorrecta, nodo faltante, camino roto por falla, nodo aislado y arista colgante.

**Actualización v0.40.0 (05-08-2026):** el panel de integridad se revela automáticamente al activar fallos simulados, mostrando nodos inactivos, caminos afectados y siguiente paso. Se compacta al limpiar el impacto.

**Actualización v0.39.0 (05-08-2026):** cada diagnóstico técnico muestra un siguiente paso conceptual. Las recomendaciones no ejecutan cambios y orientan hacia la validación o el runbook correspondiente.

**Actualización v0.38.0 (05-08-2026):** la integridad técnica recibe los nodos inactivos de escenarios y fallas manuales, recalcula caminos y muestra el impacto simulado en el panel. No se presenta como monitorización real.

**Actualización v0.37.0 (05-08-2026):** los diagnósticos técnicos con `sourceIds` muestran enlaces directos a su evidencia. Los enlaces se abren en otra pestaña y no interfieren con el foco de nodos del canvas.

**Actualización v0.36.0 (05-08-2026):** cada perfil de integridad declara su profundidad (`baseline` o `reviewed`) y el panel la muestra junto al dominio y el estado. Esto evita presentar la línea base de los temas nuevos como una auditoría especialista.

**Actualización v0.35.0 (05-08-2026):** el evaluador del canvas detecta componentes aislados y relaciones colgantes. Los aislados son advertencias y solo se exceptúan cuando la escena declara que está explicando aislamiento; las aristas inválidas son errores.

**Actualización v0.34.0 (05-08-2026):** el quality gate de integridad técnica ahora exige cobertura por escena, valida que nodos y reglas existan en el animation spec y bloquea explainers sin perfil. El catálogo completo pasa typecheck, lint y build.

**Actualización v0.33.0 (05-08-2026):** el motor de integridad técnica se extendió a los 22 explainers del catálogo. Cada escena tiene una línea base de componentes, relaciones y caminos esperados; VCF y NSX mantienen contratos más profundos de red. El panel etiqueta el dominio técnico correspondiente y la documentación está en `docs/ai-context/technical-integrity.md`.

**Actualización v0.32.0 (05-08-2026):** se incorporó un motor de integridad
técnica del modelo de red. VCF y NSX declaran contratos por escena con nodos,
relaciones y caminos esperados; el canvas muestra el resultado y puede enfocar
los nodos de un diagnóstico. Esta capa valida el diagrama representado, no una
red real ni telemetría en vivo.

**Actualización v0.31.0 (05-08-2026):** los overlays de leyenda/capas y
escenarios de fallo se pueden arrastrar dentro del espacio del diagrama, con
lÃ­mites al canvas y un asa de arrastre separada de sus botones. La columna
izquierda se compactÃ³ visualmente para priorizar escena, narrativa e impacto
sin eliminar la evidencia ni los controles existentes.

**Actualización v0.30.0 (05-08-2026):** la cabecera de cada explainer agrupa en
una sola línea el enlace de escena, las marcas y la trazabilidad; el selector
Cliente/Técnico y el modo presentación son más compactos. Cada tema ofrece un
botón para volver al dashboard `/explainer`, la leyenda del canvas inicia
minimizada y el control global de versión ocupa menos espacio.

**Actualización v0.29.0 (05-08-2026):** VCF es el primer explainer con fases
authored de diagnóstico. Sus escenarios de fallo incluyen checkpoints de
hipótesis, feedback, foco alternativo del diagrama y fuentes técnicas por fase.
El contrato de decisiones y sus reglas está en
`docs/ai-context/guided-scenarios.md`.

**Actualización v0.28.0 (05-08-2026):** el motor de escenarios guiados añade
fases de observación, diagnóstico, recuperación y validación. El panel muestra
evidencia, resultado esperado y limitaciones, mientras el canvas enfoca los
nodos relevantes. Los escenarios existentes usan un fallback de cuatro pasos;
los nuevos pueden declarar `guidedSteps` específicos. El contrato está en
`docs/ai-context/guided-scenarios.md`.

**Actualización v0.27.0 (05-08-2026):** se añadieron los explainers
`/explainer/instana`, `/explainer/turbonomic` y `/explainer/webmethods`.
Cada uno documenta cinco escenas, cuatro fallos interactivos, fuentes IBM
revisadas el 2026-08-05 y límites de edición, release, cobertura y ejecución.

**Actualización v0.26.0 (05-08-2026):** batch de cinco explainers orientados a
cliente: migración sin interrupción, Check Point HA, SD-WAN, IBM Power/AIX y
ciclo de implementación. Cada uno mantiene cinco escenas, cuatro fallos
interactivos, contexto de marcas y trazabilidad técnica revisada el 2026-08-05.

**Estado v0.25.0 (05-08-2026)**: cada explicación puede alternar entre modo
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

El décimo tema `/explainer/san-storage` explica las capas de una SAN, el
provisionamiento de volúmenes, mapping, multipath, migración y replicación con
IBM, Lenovo y VMware/Broadcom como contexto de marca.

Se añadió un batch de cuatro explainers: `/explainer/veeam-protection`,
`/explainer/active-active-dc`, `/explainer/lan-san` y
`/explainer/nas-private-cloud`.

Los deployments automáticos de Vercel quedaron desactivados mediante
`vercel.json`; la publicación se hará manualmente por batch. El flujo está en
`docs/ai-context/vercel-deployment-policy.md`.

> Actualiza este archivo cada vez que termines una tarea significativa. Es
> lo primero que debe leer la siguiente sesión de IA (ver `AI_WORKFLOW.md`).

**Última actualización**: 2026-08-04 — v0.15.0: modos de audiencia Cliente/Técnico y enlaces directos a escenas y escenarios + explainer independiente de Observabilidad basado en OpenTelemetry y Prometheus + evidencia técnica por escena mediante referencias a fuentes concretas + trazabilidad técnica visible por explicación, con fecha de revisión, alcance y fuentes enlazadas + explainers independientes de Zero Trust y Kubernetes + panel de escenarios minimizable y navegación sin CTAs comerciales + explainers independientes de vSphere HA, vSAN y NSX + lenguaje visual de diagramas + control de calidad de contenido + modo presentación + escenarios interactivos de fallo + hover de relaciones + precisión técnica de VCF +
changelog visible y versionado documentado.
Actualización adicional 2026-08-04 — v0.17.0: contexto de marcas declarado y visible por explicación.
Actualización adicional 2026-08-04 — v0.18.0: nuevo explainer de resiliencia frente a ransomware.
Actualización adicional 2026-08-04 — v0.19.0: patrones reales de proyectos y backlog comercial-técnico.
Actualización adicional 2026-08-04 — v0.20.0: nuevo explainer de Storage SAN empresarial.
Actualización adicional 2026-08-04 — v0.24.0: batch de cuatro explainers de infraestructura.
Actualización adicional 2026-08-05 — v0.25.0: política de deploy manual para proteger la cuota de Vercel.
**Actualización adicional 2026-08-04 — v0.16.0:** se añadió el explainer de Backup/DR y el registro canónico del portafolio de marcas CORESOLUTIONS.

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
- Logo real de CORESOLUTIONS (hoy es un bloque de texto "COI" provisional,
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
