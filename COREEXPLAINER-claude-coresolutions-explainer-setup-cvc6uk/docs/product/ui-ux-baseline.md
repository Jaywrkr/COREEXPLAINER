# Fase 0 — Línea base UX/UI de CORESOLUTIONS Technical Explainer

**Estado:** diagnóstico inicial, sin cambios funcionales

**Rama:** `codex/ui-ux-baseline`

**Fecha de revisión:** 2026-08-11

## Propósito

Esta línea base define cómo evaluaremos y mejoraremos la experiencia antes de
modificar la interfaz. El producto debe ayudar a CORESOLUTIONS a explicar
tecnología compleja de forma comprensible, demostrable y técnicamente rigurosa.

La prioridad no es añadir más controles. Es que cada control tenga un propósito
claro, aparezca en el momento adecuado y no compita con la explicación.

## Hallazgos de la auditoría del producto actual

### Fortalezas que debemos conservar

- El canvas permite pan, zoom, selección de nodos y navegación por escenas.
- El contenido está separado del componente visual y existe trazabilidad técnica.
- Hay modos cliente, conceptual y técnico.
- Los escenarios de fallo, leyendas y capas pueden minimizarse y moverse.
- El sistema ya contempla marcas, fuentes, fechas de revisión y validaciones.
- La presentación puede enlazarse a escenas concretas.

### Fricciones principales

1. **Demasiadas funciones en el mismo recorrido.** La vista del explicador
   mezcla presentar, revisar, diagnosticar, preparar soporte y crear contenido.
2. **Jerarquía competida.** El panel izquierdo, el canvas y varios paneles
   flotantes solicitan atención al mismo tiempo.
3. **Propósito poco explícito.** Nombres como “Trazabilidad”, “Capas” o
   “Workbench” necesitan explicar qué decisión ayudan a tomar.
4. **Modos con límites difusos.** El modo cliente todavía puede exponer
   información pensada para revisión técnica.
5. **Riesgo de repetición.** Título, etiquetas, contexto, estado y acciones se
   repiten entre cabecera, panel izquierdo y canvas.
6. **La animación puede convertirse en ruido.** El movimiento sólo debe indicar
   causalidad, flujo, dependencia o cambio de estado.
7. **El canvas no puede quedar tapado.** Los overlays deben ocupar un espacio
   acotado, recordar su posición y ofrecer siempre una vista limpia.

## Usuarios prioritarios y necesidades

| Usuario | Contexto | Necesita conseguir | No debería tener que hacer |
| --- | --- | --- | --- |
| Cliente principiante | Reunión comercial | Entender problema, solución y resultado | Aprender siglas o abrir paneles técnicos |
| Gerente de cuenta / vendedor | Demo de 5–10 minutos | Contar una historia y responder preguntas | Buscar qué botón inicia la explicación |
| Preventa técnica | Preparación y conversación técnica | Profundizar, mostrar dependencias y límites | Cerrar overlays que tapan el diagrama |
| Arquitecto especialista | Revisión de exactitud | Detectar supuestos y contradicciones | Inferir de dónde sale una afirmación |
| Revisor de contenido | Publicación | Verificar fuentes, fecha y cobertura | Mezclar revisión editorial con la demo |

## Jobs To Be Done

- **Explorar:** “Cuando necesito preparar una conversación, quiero encontrar el
  tema correcto y saber rápidamente para quién sirve.”
- **Presentar:** “Cuando estoy con un cliente, quiero explicar una idea paso a
  paso sin que la interfaz me distraiga.”
- **Profundizar:** “Cuando alguien hace una pregunta técnica, quiero abrir el
  detalle relacionado sin perder mi lugar en la historia.”
- **Verificar:** “Cuando reviso contenido, quiero comprobar evidencia, vigencia,
  supuestos y límites de forma auditable.”
- **Crear:** “Cuando identifico un nuevo patrón de proyecto, quiero convertirlo
  en una explicación reutilizable con el mismo estándar.”

## Modelo mental recomendado

El producto debe tener tres superficies reconocibles:

1. **Explorar temas** — seleccionar una explicación.
2. **Presentar explicación** — recorrido limpio para cliente o equipo.
3. **Revisar y crear** — herramientas técnicas, fuentes, escenarios y autoría.

La vista de presentación no debe parecer un panel de administración. Las
capacidades avanzadas se conservan, pero se revelan desde acciones con nombres
orientados a la intención: “Ver fuentes y límites”, “Explorar fallos” o
“Inspeccionar arquitectura”.

## Reglas de decisión para las siguientes fases

1. Una pantalla debe tener una acción primaria.
2. Una escena debe enseñar una idea principal.
3. El modo cliente muestra primero significado; el modo técnico muestra primero
   estructura y evidencia.
4. La información secundaria se oculta, pero siempre debe ser encontrable.
5. Una advertencia técnica importante nunca se oculta por simplificar.
6. Un panel flotante no debe tapar el nodo que explica.
7. Si dos elementos dicen lo mismo, se conserva el que esté más cerca de la
   decisión del usuario.
8. La animación debe explicar una relación; si no lo hace, se elimina o se
   convierte en una transición discreta.
9. Todo término técnico debe tener una explicación sencilla accesible por hover,
   focus o teclado.
10. Todo ejemplo debe conservar marca, versión, fecha de revisión, fuente y
    límites aplicables.

## Contenido que debe estar visible por defecto

### Modo cliente

- Qué problema se está explicando.
- Qué ocurre en esta escena.
- Qué cambia en el diagrama.
- Por qué importa para el negocio o la operación.
- Navegación anterior/siguiente y play/pausa.

### Modo técnico

- Objetivo de la escena.
- Componentes y relaciones relevantes.
- Estado seleccionado del nodo.
- Advertencias o inconsistencias críticas.
- Acceso explícito a fuentes, fallos y decisiones.

## Contenido que debe ser progresivo

- Fuentes detalladas y citas.
- Supuestos de sizing, licenciamiento o integración.
- Escenarios alternativos y excepciones.
- Evidencia operacional y paquetes de soporte.
- Copilot, workbench y herramientas de creación.
- Métricas, exportaciones y acciones administrativas.

## Métricas de éxito

Estas métricas se usarán primero en pruebas manuales y después, si procede, en
telemetría agregada y respetuosa de la privacidad:

| Métrica | Señal de éxito inicial |
| --- | --- |
| Comprensión en 5 segundos | La persona identifica tema, audiencia y acción principal |
| Primer clic | La persona inicia o continúa la explicación sin ayuda |
| Claridad de escena | Puede explicar qué cambió en una frase |
| Sobrecarga visual | No confunde el panel técnico con el contenido principal |
| Profundización | Encuentra una fuente o fallo cuando se le pide |
| Recuperación | Puede volver al recorrido después de inspeccionar un nodo |
| Accesibilidad | Completa tareas equivalentes con teclado y movimiento reducido |
| Confianza | Identifica fecha, fuente y límites de la afirmación |

## Plan de investigación y validación

### Empatizar

- Entrevistas breves con al menos una persona de cada perfil.
- Observación de una demo real, no sólo de navegación libre.
- Recolección de preguntas que hacen los clientes y puntos donde se pierde la
  explicación.

### Definir

- Card sorting de temas, modos y herramientas.
- Mapa de tareas: explorar, presentar, profundizar, verificar y crear.
- Matriz frecuencia/importancia para decidir qué queda visible.

### Idear y prototipar

- Bocetos de baja fidelidad para dashboard, modo cliente e inspector técnico.
- Dos variantes máximo por flujo; no pulir visualmente antes de elegir la
  estructura.
- Prototipos navegables de una escena VCF y una escena de Instana para validar
  que el patrón funciona entre marcas y dominios.

### Probar

- Pruebas basadas en tareas, no en opiniones estéticas.
- Cliente: entender problema y resultado.
- Vendedor: presentar una escena en cinco minutos.
- Técnico: localizar una dependencia y un escenario de fallo.
- Revisor: comprobar fuente, fecha y límite.

## Fuentes de criterio

- Nielsen Norman Group, *Progressive Disclosure*, consultado 2026-08-11:
  <https://www.nngroup.com/articles/progressive-disclosure/>
- W3C WAI, WCAG 2.2, *Animation from Interactions*, consultado 2026-08-11:
  <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html>
- W3C WAI, WCAG 2.2, *Target Size (Minimum)*, consultado 2026-08-11:
  <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>

## Entregables de las próximas fases

1. Arquitectura de información y dashboard.
2. Shell del explicador y jerarquía visual.
3. Modo cliente limpio.
4. Inspector técnico unificado.
5. Canvas y navegación accesibles.
6. Narrativa y movimiento con intención.
7. Evidencia, confianza y escenarios guiados.
8. Sistema de diseño, responsive, rendimiento y validación.

Cada fase debe crear una rama desde el `main` ya fusionado, incluir su propio
commit, actualizar la documentación afectada y pasar una revisión manual antes
de abrir el PR siguiente.
