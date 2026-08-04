# Decisiones de diseño

Registro de decisiones ya tomadas. Si vas a proponer un cambio que
contradiga una de estas, primero entiende por qué se tomó — el razonamiento
está aquí, no lo repitas desde cero.

---

## D1 — La IA genera `animation-spec.json`, nunca HTML/JS libre

**Decisión**: cuando en el futuro se conecte un generador con IA (fase 1,
ver `docs/product/mvp.md`), su único output válido será un
`animation-spec.json` (y el contenido textual de los pasos, en una forma
igualmente estructurada). La IA **nunca** genera HTML, CSS o JavaScript
directamente para renderizar una explicación.

**Por qué**:

- **Consistencia visual.** Si cada explicación fuera un archivo HTML/JS
  generado desde cero (como fue el primer prototipo hecho a mano, en
  `docs/examples/vcf/`), cada tema podría terminar con espaciados,
  tipografías, comportamientos de canvas y calidad de código distintos,
  dependiendo de qué generó el modelo ese día. Con un intérprete fijo
  (`SceneEngine`), la calidad visual y el cumplimiento de marca son
  responsabilidad del código versionado, no de cada generación.
- **Seguridad.** Ejecutar JS arbitrario generado por un LLM en el navegador
  del cliente (o peor, en un `dangerouslySetInnerHTML`/`eval`) es una
  superficie de XSS/inyección innecesaria. Un JSON validado contra un
  esquema estricto (`parseAnimationSpec`) no puede ejecutar código.
- **Confiabilidad de la generación.** Es mucho más fácil para un LLM (y más
  fácil de validar automáticamente) producir un JSON con un esquema
  reducido — nodos, aristas, algunos números — que producir cientos de
  líneas de canvas/JS correctas, sin bugs, cada vez.
- **Costo de mantenimiento.** Un motor de render compartido se mejora una
  vez (ej. "agregar soporte para nodos con ícono personalizado") y todas
  las explicaciones pasadas y futuras se benefician. Con HTML/JS por
  explicación, cada mejora requeriría regenerar o parchear archivos
  individuales.

**Cómo se aplica hoy**: el motor (`SceneEngine`,
`src/components/explainer/engine/sceneEngine.ts`) ya existe y funciona con
contenido escrito a mano (`docs/examples/vcf/animation-spec.json`). Cuando
se conecte un generador IA, este debe producir un JSON con la misma forma
(ver `docs/ai-context/animation-guidelines.md` para el formato exacto) y
pasar por `parseAnimationSpec()` antes de renderizarse. Un spec inválido
debe fallar con un error visible, no renderizar un canvas roto en silencio.

---

## D2 — El spec es "escena completa por paso", no "un grafo con estados"

**Decisión**: `animation-spec.json` define un diccionario de **escenas**
(`Record<string, Scene>`), cada una con su propio conjunto de nodos y
aristas. Cada paso del contenido (`ExplainerStep.sceneId`) referencia una
escena completa, no un subconjunto activo de un grafo único y fijo.

**Por qué**: se evaluó la alternativa (un solo grafo de nodos/conexiones
para todo el tema, donde cada paso solo cambia qué está "activo" o
resaltado) y se descartó porque no es como se explican estos temas en la
práctica. El storyboard de VCF (`docs/examples/vcf/storyboard.md`) pasa de
"tres sistemas aislados" a "una plataforma unificada" a "un clúster con
hosts, vSAN, NSX y vCenter" a "apps corriendo sobre el clúster" — son
**topologías distintas**, no el mismo diagrama con partes iluminadas. El
primer prototipo (HTML hecho a mano) ya validó este patrón con su función
`buildScene(kind)`; el spec solo lo formaliza como datos.

**Costo aceptado**: nodos que "son los mismos" conceptualmente entre pasos
(ej. `vcf`/`vcenter`) se redefinen en cada escena donde aparecen, en lugar
de definirse una sola vez. Se aceptó ese costo porque simplifica muchísimo
la validación y el razonamiento de cada escena de forma aislada.

---

## D3 — Simulación real de paquetes, no animación decorativa

**Decisión**: el tráfico animado en el canvas (los "paquetes" que viajan
entre nodos) es una simulación de eventos discretos con estado real —
tasa de emisión (`rps`), tiempo de viaje, propagación por fan-out,
acumulación/decaimiento de capacidad — no un `@keyframes` o easing
puramente estético.

**Por qué**: el requisito de producto es explícito — "animaciones con
lógica técnica real, no decorativas". Un nodo con `rps: 3` realmente emite
~3 paquetes por segundo; un nodo con `capacity` acumula uso real a medida
que le llegan paquetes y lo libera con el tiempo; un nodo `killable`
dejado de responder cuando se lo "mata" (clic) deja de recibir/emitir y
esa ausencia se propaga visualmente. Esto también es lo que hace que la
función de "simular una falla" (clic en el botón rojo de un host) sea
honesta: el diagrama refleja el estado real de la simulación, no una
animación de falla pre-grabada.

---

## D4 — Next.js App Router + Tailwind, sin librería de componentes

**Decisión**: no se usa una librería de UI (shadcn, MUI, Chakra, etc.).
Los pocos componentes necesarios (`StepNav`, `ProgressDots`, `BrandMark`)
se escriben a mano.

**Por qué**: el look and feel (esquinas rectas, paleta muy específica,
densidad de información técnica) diverge bastante de lo que ofrecen las
librerías de componentes por defecto — instrucción explícita del producto
es evitar "estilo SaaS genérico redondeado". Con tan pocos componentes,
una librería añade más fricción (temizar, sobreescribir) que la que
ahorra.

---

## D5 — El canvas no usa una librería de gráficos (ni Matter.js, ni PixiJS, etc.)

**Decisión**: `SceneEngine` dibuja directamente sobre
`CanvasRenderingContext2D`, sin motor de físicas ni librería de render.

**Por qué**: el volumen de elementos por escena es bajo (decenas de nodos,
no miles), y la lógica (posición de paquete = interpolación lineal entre
dos puntos según `progress`) es simple de mantener sin dependencias. El
primer prototipo probó exactamente este enfoque con buen resultado. Si en
el futuro una escena necesita física real (colisiones, fuerzas), reevaluar
esta decisión — no añadir una librería "por si acaso" ahora.
