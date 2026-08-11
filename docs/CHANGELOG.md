# Changelog

## [0.106.0] - 2026-08-10

- La cola de revisión abre el explainer real y ya no genera enlaces web inexistentes bajo `docs/`.
- El paquete Markdown conserva la ruta documental del repositorio como referencia verificable.

## [0.105.0] - 2026-08-10

- Cada pendiente de la cola técnica puede descargar un paquete Markdown de revisión.
- Incluye alcance, fecha, fuentes, advertencias del gate y checklist para el especialista.
- La descarga es una salida de trabajo; no aprueba, publica ni certifica contenido.

## [0.104.0] - 2026-08-10

- El dashboard incluye una cola de revisión técnica humana para los explainers pendientes.
- Cada entrada muestra fecha, alcance, fuentes, advertencias y enlaces a la explicación/ficha técnica.
- La cola es de solo lectura y no cambia estados editoriales automáticamente.

## [0.103.0] - 2026-08-10

- Se conectaron las seis fuentes que el gate había identificado como no utilizadas.
- Kubernetes ahora explica Ingress, y Power/AIX enlaza la fuente conceptual de Live Partition Mobility.
- Backup/DR trazabiliza fuentes de CORESOLUTIONS, IBM, Veeam y Lenovo en sus objetivos y pasos.
- Las advertencias restantes son únicamente revisiones técnicas pendientes.

## [0.102.0] - 2026-08-10

- El nodo Active Directory de NAS/private cloud queda marcado como `killable` para el escenario de indisponibilidad.
- La topología y el escenario ya no contradicen el contrato de simulación.

## [0.101.0] - 2026-08-10

- Las escenas pueden declarar `allowIsolatedNodes` cuando los nodos desconectados son parte intencional de la explicación.
- VCF usa esta marca para representar la fase inicial de silos antes de mostrar la unificación.
- La excepción no afecta errores de endpoints desconocidos ni referencias inválidas.

## [0.100.0] - 2026-08-10

- El content gate semántico reconoce nodos por su ID técnico o por su nombre visible.
- Se eliminan advertencias falsas de escenarios que usan correctamente `affectedNodes` como IDs.
- Las advertencias que permanecen quedan enfocadas en revisión editorial y coherencia real.

## [0.99.0] - 2026-08-09

- El endpoint de IA reserva un presupuesto de tokens por IP y ventana antes de llamar al proveedor.
- `AI_TOKEN_BUDGET_PER_WINDOW` y `AI_MAX_OUTPUT_TOKENS` permiten ajustar el freno de coste por entorno.
- Cuando se supera el presupuesto, responde `429` con `Retry-After`; el control es de instancia y no sustituye cuotas persistentes por usuario.

## [0.98.0] - 2026-08-09

- El dashboard muestra métricas locales de utilidad.
- Se registran navegación, escenarios, workflows, briefs y borradores.
- Los eventos no salen del navegador y pueden borrarse.

## [0.97.0] - 2026-08-09

- El dashboard incorpora una biblioteca de patrones reutilizables de CORESOLUTIONS.
- Cada patrón conecta problema, marcas, señales, evidencia, riesgos y explainers.
- Los patrones muestran fecha de revisión y no sustituyen un assessment del proyecto.

## [0.96.0] - 2026-08-09

- El copiloto muestra telemetría local de consultas, fallos y tokens.
- No se guardan prompts ni respuestas fuera del navegador.
- Los metadatos de uso se devuelven sin exponer secretos.

## [0.95.0] - 2026-08-09

- El copiloto puede proponer abrir fuentes o activar escenarios.
- Las acciones pasan por una allowlist y requieren interacción explícita.
- No se ejecutan comandos ni cambios sobre plataformas externas.

## [0.94.0] - 2026-08-09

- Se incorpora un workflow local de revisión de contenido.
- Las transiciones requieren revisión técnica y fuentes actuales cuando corresponde.
- Un contenido publicado puede marcarse como revisión vencida.

## [0.93.0] - 2026-08-09

- Los escenarios soportan perfiles de capacidad, latencia, dependencia y observabilidad.
- La lectura what-if explica el impacto adicional sin confundirlo con una prueba real.
- Los escenarios existentes conservan el comportamiento anterior por compatibilidad.

## [0.92.0] - 2026-08-09

- La evidencia de pasos y roadmap tiene registro propio por escenario.
- Cada elemento puede estar pendiente, validado o bloqueado.
- Se conservan las fuentes relacionadas y el estado permanece local.

## [0.91.0] - 2026-08-09

- El content gate incorpora revisión semántica entre texto, diagrama, fuentes y escenarios.
- Las advertencias de deuda editorial aparecen en `npm run validate:content`.
- Los errores estructurales siguen bloqueando el registro; las advertencias se resuelven progresivamente.

## [0.90.0] - 2026-08-09

- Los endpoints IA incorporan límites de cuerpo, rate limiting temporal y timeout.
- `AI_ENDPOINT_ENABLED=false` permite desactivarlos por entorno.
- La app mantiene fallback local y no expone errores internos del proveedor.

## [0.89.0] - 2026-08-09

- La simulación what-if incluye una lectura asistida del impacto.
- El resultado conecta evidencia faltante y decisiones relacionadas.
- Se mantiene la diferencia entre simulación conceptual y prueba real.

## [0.88.0] - 2026-08-09

- El dashboard incorpora un creador asistido de borradores de explainers.
- El borrador puede generarse con IA o mediante una plantilla local si no hay clave configurada.
- Ningún borrador se publica automáticamente: debe pasar revisión, fuentes y content gate.

## [0.87.0] - 2026-08-09

- Se puede descargar un brief Markdown de assessment desde cada explicación.
- El brief reúne preguntas, escenas, roadmaps, riesgos, decisiones y fuentes.
- La generación es local y conserva los límites de la explicación.

## [0.86.0] - 2026-08-09

- Se añade un copiloto contextual por explicación.
- El copiloto usa únicamente el contenido autorado enviado como contexto y muestra sus límites.
- Si falta la configuración de IA, la explicación continúa funcionando sin interrupciones.

## [0.85.0] - 2026-08-09

- Cada explicación incluye una revisión técnica asistida basada en contenido local.
- Los hallazgos muestran severidad, evidencia y acción recomendada.
- La revisión no consulta entornos reales ni sustituye la validación de un especialista.

## [0.84.0] - 2026-08-09

- Las fases enlazadas desde una decisión aparecen como controles compactos.
- Una fase puede marcarse como revisada, no aplica o pendiente desde el laboratorio.
- El estado sigue siendo local y no se presenta como una validación automática.

## [0.83.0] - 2026-08-09

- Las decisiones de Instana enlazan sus fases de roadmap y escenarios de validación.
- Las decisiones de Turbonomic enlazan modelado, planificación y gobierno.
- Las decisiones de webMethods enlazan contratos, runtime y operación.

## [0.82.0] - 2026-08-09

- Instana incorpora un roadmap de cobertura, correlacion y operacion.
- Turbonomic incorpora un roadmap de modelado, planificacion y gobierno.
- webMethods incorpora un roadmap de contratos, runtime e integracion operable.

## [0.81.0] - 2026-08-09

- Instana, Turbonomic y webMethods incorporan dos decisiones autoradas propias de su dominio.
- Cada decisión enlaza escenarios para validar cobertura, automatización, APIs, runtimes o interoperabilidad.
- La misma validación comprueba que las referencias de escenarios existan en el contenido.

## [0.80.0] - 2026-08-09

- Cada decisión puede enlazar fases de roadmap y escenarios que permiten comprobarla.
- Los escenarios enlazados se pueden abrir directamente desde el laboratorio de decisiones.
- La validación bloquea fases o escenarios referenciados que no existan en el explainer.

## [0.79.0] - 2026-08-09

- Los objetivos pueden declarar opciones técnicas con beneficios, trade-offs y evidencia.
- VCF incluye tres opciones autoradas: resiliencia, estandarización y evolución por oleadas.
- La validación exige al menos dos opciones y comprueba sus campos y fuentes.

## [0.78.0] - 2026-08-09

- El resumen muestra cuántas fases del roadmap fueron revisadas.
- La ficha HTML exportada incluye estado, evidencia y criterio de salida de cada fase.
- La exportación mantiene los límites conceptuales y no agrega datos remotos.

## [0.77.0] - 2026-08-09

- Las fases de assessment pueden marcarse como pendientes, revisadas o no aplicables durante una sesión.
- El estado se conserva localmente por explicación y escenario, sin backend ni datos de cliente.
- El contador del roadmap muestra el avance sin convertirlo en una puntuación de madurez.

## [0.76.0] - 2026-08-09

- Los objetivos autorados pueden declarar fases de assessment con objetivo, evidencia y criterio de salida.
- La UI muestra el roadmap bajo demanda dentro de la comparación actual/objetivo.
- La validación comprueba fases duplicadas y fuentes inexistentes, y las regresiones cubren esos casos.

## [0.75.0] - 2026-08-09

- Se agregó `npm run validate:content` para ejecutar el content gate sin iniciar un build de Next.js.
- El comando carga el registro completo, ejecuta regresiones y confirma los 22 explainers revisados.
- La validación queda disponible antes de abrir una rama o revisar un PR de contenido.

## [0.74.0] - 2026-08-09

- Se agregaron fixtures de build para objetivos completos, fuentes desconocidas y objetivos incompletos.
- La validación del contrato se reutiliza fuera del registro para proteger futuras ediciones de contenido.
- El build ejecuta estas regresiones junto con las pruebas de integridad técnica existentes.

## [0.73.0] - 2026-08-09

- El build valida etiqueta, resumen, límites y cambios esperados de cada targetArchitecture.
- Las fuentes declaradas por un objetivo deben existir en el catálogo técnico del explainer.
- Los errores de objetivos incompletos o referencias rotas bloquean la publicación del contenido.

## [0.72.0] - 2026-08-09

- Backup/DR, ransomware, SAN y Kubernetes declaran objetivos con cambios esperados y límites.
- La comparación actual/objetivo cubre ahora continuidad, ciberresiliencia, almacenamiento y cloud-native.
- Cada objetivo reutiliza fuentes técnicas existentes y evita promesas de sizing, compatibilidad o certificación.

## [0.71.0] - 2026-08-09

- Instana, Turbonomic y webMethods declaran objetivos de arquitectura con cambios esperados y límites.
- La comparación actual/objetivo mantiene la misma estructura para explicar plataforma, optimización e integración.
- Cada objetivo reutiliza fuentes existentes del explainer y no agrega promesas de sizing o compatibilidad.

## [0.70.0] - 2026-08-09

- Los explainers pueden declarar una arquitectura objetivo con resumen, cambios esperados y limites.
- La comparacion actual/objetivo muestra el objetivo editorial cuando existe, sin inferir un diseño de cliente.
- VCF incorpora el primer objetivo explicito como referencia conceptual y trazable.

## [0.69.0] - 2026-08-09

- Los escenarios muestran la topologia base documentada frente al estado resultante del fallo.
- La brecha resume componentes no disponibles y relaciones que dejan de estar activas.
- El objetivo se presenta como referencia del modelo, no como recomendacion automatica de arquitectura.

## [0.68.0] - 2026-08-09

- El resumen de un escenario se puede descargar como HTML autonomo desde el navegador.
- La ficha incluye checklist, hallazgos, fuentes y limites de la simulacion.
- La exportacion no envia informacion a un servidor y queda lista para imprimir o guardar como PDF.

## [0.67.0] - 2026-08-09

- Cada escenario activo puede mostrar pasos revisados, hallazgos abiertos, criticos y fuentes enlazadas.
- El resumen propone el siguiente criterio de cierre sin afirmar que la infraestructura real este validada.
- La informacion permanece dentro del escenario y se mantiene compacta hasta que la audiencia la abre.

## [0.66.0] - 2026-08-09

- Cada escenario con pasos guiados incluye una lista compacta para marcar evidencia revisada.
- El estado permite pendiente, revisado y no aplica, y se conserva localmente por explicacion y escenario.
- No se envian datos ni se presenta el checklist como ticket o certificacion del entorno.

## [0.65.0] - 2026-08-09

- Los hallazgos derivados del contrato tecnico conservan sus fuentes y componentes relacionados.
- Cada fuente se puede abrir bajo demanda desde el bloque Reglas y evidencia.
- La interfaz mantiene los enlaces ocultos hasta que la audiencia los solicita.

## [0.64.0] - 2026-08-09

- Los escenarios incorporan los diagnosticos del contrato tecnico de la escena y su dominio.
- Una relacion o camino requerido que falla se muestra con severidad, justificacion y recomendacion basada en la explicacion.
- La evidencia sigue siendo conceptual: no se ejecutan comandos ni se afirma que el entorno real este validado.

## [0.63.0] - 2026-08-09

- Los escenarios what-if producen hallazgos críticos, advertencias e información según el impacto calculado.
- Cada hallazgo explica qué ocurre, qué evidencia revisar y qué decisión queda pendiente.
- La simulación mantiene límites explícitos: no hace sizing, no mide producción ni ejecuta recuperación.

## [0.62.0] - 2026-08-09

- Al activar un escenario se calculan relaciones interrumpidas y componentes que siguen siendo alcanzables.
- El panel identifica nodos disponibles que quedan sin camino desde una entrada del grafo.
- El análisis usa la topología real de la escena y deja claro que es una hipótesis conceptual, no una medición de producción.

## [0.61.0] - 2026-08-09

- El modo Técnico puede desplegar una lectura semántica de entradas, salidas, roles y relaciones de cada escena.
- La semántica se deriva del mismo animation spec que dibuja el canvas para evitar una segunda fuente de verdad.
- Los componentes quedan preparados para reglas de consistencia y análisis what-if en la siguiente fase.

## [0.60.0] - 2026-08-06

- Siglas y términos frecuentes muestran una explicación sencilla al pasar el cursor o recibir foco.
- El glosario se aplica al texto principal, escenarios, fichas de nodo y diagnósticos sin duplicar párrafos.
- Las definiciones viven en un catálogo común para mantener el lenguaje consistente entre temas.

## [0.59.0] - 2026-08-06

- El panel izquierdo se puede redimensionar entre 320 y 560 px mediante una manija accesible.
- Cliente muestra solo el recorrido esencial; el detalle adicional permanece bajo demanda.
- Los escenarios de fallo empiezan minimizados, se ubican en la esquina superior derecha y tienen scroll propio para no tapar la gráfica.

## [0.58.0] - 2026-08-06

- Las fechas de revisión y consulta deben ser fechas ISO reales y no pueden estar en el futuro.
- Una fuente no puede haber sido consultada después de la fecha declarada de revisión del tema.
- Las fuentes marcadas `review-needed` quedan registradas como advertencias para la siguiente revisión.

## [0.57.0] - 2026-08-06

- Cada tema debe declarar al menos un escenario de fallo para poder publicarse.
- Los escenarios authored deben cubrir observar, diagnosticar, recuperar y validar; el resto usa el fallback común de cuatro fases.
- La Fase 5 documenta la cobertura de escenarios y mantiene explícito que la simulación no ejecuta cambios reales.

## [0.56.0] - 2026-08-06

- El canvas puede recibir foco y admite `+`, `-`, `0` para zoom y restablecimiento sin depender del ratón.
- Se respeta `prefers-reduced-motion`: la simulación pausa sus paquetes y se informa al usuario sin desactivar la interacción.
- Se añadieron etiquetas semánticas y una auditoría de accesibilidad como Fase 4.

## [0.55.0] - 2026-08-06

- Cliente y Conceptual muestran un bloque compacto con el problema, recorrido y decisión que debe quedar clara.
- El bloque reutiliza `tagline`, `caption` y `businessImpact` validados; no crea una segunda fuente de contenido.
- La auditoría de experiencia para cliente y especialista queda documentada como Fase 3.

## [0.54.0] - 2026-08-06

- El contrato visual valida nombres, posiciones, capacidades, emisiones y aristas duplicadas antes de publicar una escena.
- Los escenarios de fallo solo pueden referenciar nodos existentes; `killable` queda reservado para la interacción manual del canvas.
- Se corrigió una emisión declarada en `Workloads` sin salida en la escena `two-domains`; un nodo terminal ya no se presenta como emisor.

## [0.53.0] - 2026-08-06

- Cliente y Conceptual incluyen una guía compacta para interpretar tarjetas, flechas, animación y escenarios de fallo.
- La interfaz aclara que el movimiento es conceptual, no telemetría en vivo, y que los fallos no ejecutan acciones sobre infraestructura real.
- La auditoría de comprensión de la Fase 1 queda documentada para repetirla y ampliarla en los siguientes ciclos.

## [0.52.0] - 2026-08-06

- Cliente y Conceptual muestran una lectura visual sencilla al seleccionar un componente del diagrama.
- Técnico conserva capacidad, emisión y simulación de falla para revisar el comportamiento del modelo.
- La misma ficha explica qué representa el nodo y qué papel cumple en la escena sin añadir campos libres al spec.

## [0.51.0] - 2026-08-06

- Cada tema ofrece Cliente, Conceptual y Técnico para ajustar la profundidad a la persona que lo está viendo.
- Conceptual explica las relaciones principales sin mostrar toda la auditoría técnica; Técnico conserva evidencia, fuentes y límites.
- Los enlaces directos aceptan `mode=client`, `mode=conceptual` o `mode=technical` sin duplicar contenido ni alterar el modelo visual.

## [0.50.0] - 2026-08-05

- La marca visible se presenta como CORESOLUTIONS en la portada, dashboard, explicaciones, metadatos y fuentes.
- La documentación de producto, contexto de IA y changelog usa la misma grafía para futuras sesiones.
- Se conservan nombres técnicos, rutas, URLs y claves internas en minúsculas para evitar romper integraciones.

## [0.49.0] - 2026-08-05

- Cada tema permite guardarse como Favorito y marcarse como Revisado.
- El estado queda en el navegador por tema, sin cuentas, backend ni consumo adicional de Vercel.
- Los controles son accesibles con teclado y mantienen su estado aunque se cambie de escena.

## [0.48.0] - 2026-08-05

- Cliente muestra el diagrama con zoom, paneo y reproducción como acciones principales.
- Leyenda, capas, escenarios de fallo e integridad técnica quedan agrupados en Más herramientas y se revelan solo cuando hacen falta.
- Si hay un escenario o una alerta de integridad activa, la herramienta secundaria se abre para no ocultar contexto importante.

## [0.47.0] - 2026-08-05

- El modo Cliente prioriza la idea clave y el valor para el cliente; el detalle técnico queda disponible bajo demanda.
- La trazabilidad se expande dentro de la columna y mantiene sus fuentes legibles, sin quedar cortada por un popover fuera del flujo.
- Los nodos calculan su tamaño a partir del texto y usan varias líneas cuando hace falta; conexiones, selección y controles respetan la misma geometría.

## [0.46.0] - 2026-08-05

- La trazabilidad muestra publisher, producto, versión o referencia, fecha de consulta y vigencia de cada fuente.
- El registro completa metadatos de forma determinista y evita inventar una versión cuando el documento no la declara.
- Las fuentes fuera de la ventana de revisión quedan marcadas para volver a contrastarlas antes de presentarlas como evidencia actual.

## [0.45.0] - 2026-08-05

- vSphere HA, Kubernetes, Migración e Implementation Lifecycle pasan a contratos `source-backed`.
- Las escenas enlazan capacidad, compatibilidad, scheduling, dependencias, pruebas y aceptación con sus fuentes técnicas.
- El catálogo mantiene explícitos los límites: el diagrama orienta el diagnóstico, pero no sustituye la validación del entorno.

## [0.44.0] - 2026-08-05

- LAN/SAN, SD-WAN, Zero Trust, Ransomware Resilience y Check Point HA pasan a contratos `source-backed`.
- Cada escena enlaza su camino de datos, control o protección con documentación técnica oficial y conserva los límites de la demo.
- La validación bloquea fuentes inexistentes para que el estado de trazabilidad sea verificable y no ornamental.

## [0.43.0] - 2026-08-05

- vSAN, Backup/DR, SAN Storage, Veeam Protection, Active-Active DC, NAS/Private Cloud e IBM Power/AIX pasan a contratos `source-backed`.
- Cada escena enlaza sus relaciones y caminos críticos con documentación técnica específica del fabricante o estándar correspondiente.
- La validación conserva el bloqueo de referencias inexistentes para que la trazabilidad visible no sea decorativa.

## [0.42.0] - 2026-08-05

- Observability, Instana, Turbonomic y webMethods pasan de cobertura base a reglas con fuentes específicas por escena.
- El panel puede enlazar esas fuentes desde los diagnósticos y conserva la diferencia entre evidencia documental y revisión especialista.
- La validación bloquea referencias a fuentes inexistentes para evitar trazabilidad falsa.

## [0.41.0] - 2026-08-05

- El build ejecuta fixtures que comprueban un caso válido y mutaciones de nodos, relaciones, caminos, fallos y aristas colgantes.
- Si una modificación rompe la capacidad de detectar alguno de esos problemas, la publicación queda bloqueada.
- La suite protege el evaluador sin consultar una infraestructura real ni introducir datos de clientes.

## [0.40.0] - 2026-08-05

- El panel de integridad se abre automáticamente al activar un escenario o apagar un nodo manualmente.
- La persona ve de inmediato los componentes inactivos, los caminos afectados y el siguiente paso sugerido.
- El panel vuelve a su estado compacto cuando la escena queda sin una simulación activa ni errores.

## [0.39.0] - 2026-08-05

- Cada diagnóstico técnico muestra una recomendación conceptual para revisar, reconectar, recuperar o validar la dependencia afectada.
- Las recomendaciones se separan de las fuentes y del foco de nodos para mantener la interacción clara.
- El sistema no ejecuta cambios: orienta la conversación hacia el runbook o la comprobación que debe realizar el equipo.

## [0.38.0] - 2026-08-05

- El panel identifica los nodos inactivos de un escenario o de una falla manual.
- Los caminos técnicos se recalculan excluyendo esos nodos y muestran cuándo la simulación interrumpe la ruta explicada.
- La explicación mantiene claro que se trata de un impacto conceptual, no de una comprobación sobre la red real.

## [0.37.0] - 2026-08-05

- Los diagnósticos con fuentes asociadas muestran enlaces directos a la documentación técnica correspondiente.
- La evidencia queda separada de la acción de enfocar nodos para conservar una interacción accesible y clara.
- La navegación abre la fuente en otra pestaña y mantiene la explicación actual en contexto.

## [0.36.0] - 2026-08-05

- Cada contrato declara si su cobertura es base o de revisión profunda para evitar sobreinterpretar el resultado.
- El panel muestra el dominio y la profundidad de la comprobación junto al estado técnico.
- El quality gate valida que todos los perfiles declaren explícitamente ese nivel.

## [0.35.0] - 2026-08-05

- El motor detecta nodos sin relaciones y aristas que apuntan a componentes inexistentes dentro de una escena.
- Los componentes aislados aparecen como advertencia para no confundir un dibujo incompleto con una arquitectura válida.
- Las escenas cuyo objetivo es explicar aislamiento pueden desactivar esta comprobación explícitamente en su contrato.

## [0.34.0] - 2026-08-05

- El build exige un contrato técnico para cada escena de cada explainer del catálogo.
- Las reglas se comprueban contra los nodos reales del animation spec para detectar referencias obsoletas o mal escritas.
- Un tema nuevo no puede registrarse sin un perfil de integridad; la auditoría sigue siendo del modelo representado, no de una plataforma en vivo.

## [0.33.0] - 2026-08-05

- Los 22 explainers declaran un contrato técnico por escena con componentes, relaciones y caminos mínimos esperados.
- El panel adapta su dominio a red, virtualización, storage, seguridad, observabilidad, continuidad, delivery o aplicación.
- El registro adjunta y valida los perfiles de forma centralizada; la comprobación sigue siendo del modelo representado, no de una red o plataforma en vivo.

## [0.32.0] - 2026-08-05

- VCF y NSX declaran contratos de red para comprobar componentes, relaciones y caminos esperados por escena.
- El canvas muestra el estado de integridad técnica y permite resaltar los nodos asociados a un diagnóstico.
- La validación distingue el modelo representado de la monitorización de una red real y conserva las fuentes de cada regla.

## [0.31.0] - 2026-08-05

- La leyenda y los escenarios de fallo se pueden arrastrar dentro del espacio del diagrama.
- La explicación izquierda usa una jerarquía más compacta para priorizar escena, narrativa e impacto.
- El arrastre está limitado al canvas y conserva los controles de zoom, simulación y diagnóstico.

## [0.30.0] - 2026-08-05

- Se compactaron el nivel de explicación, el enlace de escena, las marcas y la trazabilidad en la cabecera del tema.
- Cada explicación incorpora un acceso directo para volver al dashboard de temas y el modo presentación ocupa menos espacio.
- La leyenda del diagrama inicia minimizada y el control global de versión es más discreto.

## [0.29.0] - 2026-08-05

- VCF incorpora checkpoints de diagnóstico para contrastar hipótesis sobre HA,
  capacidad, storage y separación entre gestión y camino de datos.
- Cada fase authored puede mostrar fuentes técnicas, fecha de consulta,
  feedback de la opción elegida y un nuevo foco del diagrama.
- El validador comprueba fuentes por fase, opciones de decisión y exactamente
  una lectura recomendada por checkpoint.

## [0.28.0] - 2026-08-05

- Se añadieron fases de observación, diagnóstico, recuperación y validación para recorrer fallos con una narrativa didáctica.
- El diagrama enfoca nodos y relaciones relevantes para la fase activa; el panel conserva evidencia, resultado esperado y limitaciones.
- Los escenarios existentes reciben una guía base compatible; los nuevos escenarios pueden declarar pasos authored y `focusNodeIds`.

## [0.27.0] - 2026-08-05

- Se añadieron los explainers de IBM Instana, IBM Turbonomic e IBM webMethods.
- Cada tema incluye cinco escenas, cuatro escenarios de fallo, fuentes
  primarias revisadas el 2026-08-05 y límites de edición, release y cobertura.
- El portafolio y el contexto de marcas ahora contemplan estas tres familias de
  software IBM para futuras sesiones y propuestas.

## [0.26.0] - 2026-08-05

- Se añadieron cinco explainers: migración sin interrupción, Check Point HA,
  SD-WAN, IBM Power/AIX y ciclo de implementación.
- Cada tema incluye cinco escenas, cuatro escenarios de fallo, contexto de
  marcas y fuentes primarias revisadas el 2026-08-05.
- El batch amplía la conversación hacia migración, cargas críticas,
  conectividad multisede y adopción del cliente.

## [0.25.0] - 2026-08-05

- Se desactivaron los deployments automáticos de Git mediante `vercel.json`.
- Se documentó el flujo de validación local y publicación manual por batch.
- Los PRs y merges ya no deben consumir deployments de Vercel automáticamente.

## [0.24.0] - 2026-08-04

- Batch de cuatro nuevos explainers: protección heterogénea con Veeam, data center activo-activo, integración LAN/SAN y NAS como servicio de archivos.
- Cada tema incluye cinco escenas, cuatro escenarios de fallo, storyboard y matriz técnica con fuentes revisadas el 2026-08-04.
- El batch amplía el catálogo desde Storage SAN hacia backup, continuidad, redes y servicios de archivos basados en proyectos reales.

## [0.20.0] - 2026-08-04

- Nuevo tema independiente de Storage SAN empresarial con cinco escenas sobre capas SAN, provisionamiento, host mapping, multipath, migración y replicación.
- Escenarios interactivos para pérdida de fabric, mapping incorrecto, pool al límite y lag de replicación.
- Nueva categoría Storage y matriz técnica basada en documentación IBM y Lenovo revisada el 2026-08-04.

## [0.19.0] - 2026-08-04

- Se documentaron patrones sanitizados de proyectos reales de CORESOLUTIONS: storage, SAN, VMware, Veeam, redes, seguridad, IBM Power, NAS y alta disponibilidad.
- Se añadió un backlog priorizado de explainers basado en tareas recurrentes de implementación.
- El resumen evita nombres de clientes, correos y enlaces operativos del CSV original.

## [0.18.0] - 2026-08-04

- Nuevo tema de resiliencia frente a ransomware con cinco escenas: prevención, detección, contención, recuperación limpia y validación.
- Escenarios interactivos para movimiento lateral, detección tardía, backups expuestos y restore sin validar.
- Matriz técnica con fuentes CISA, Check Point, Veeam e IBM FlashSystem y límites frente a Backup/DR.

## [0.17.0] - 2026-08-04

- Cada explicación declara las marcas CORESOLUTIONS relacionadas, su función y el límite técnico del patrón.
- La interfaz muestra la ficha “Marcas del patrón” y el quality gate valida el contexto de marca.
- Se documentó el contrato para que futuras sesiones mantengan el contexto comercial.

## [0.16.0] - 2026-08-04

- Nuevo tema independiente de Backup y Disaster Recovery con cinco escenas sobre RPO/RTO, protección Veeam sobre VMware/VCF y Lenovo, copias protegidas IBM, recuperación y pruebas.
- Escenarios interactivos para job fallido, repositorio no disponible, lag de replicación y restauración no probada.
- Registro permanente del portafolio CORESOLUTIONS, fecha de revisión, fuentes y límites técnicos.

## [0.15.0] - 2026-08-04

- Cada explicación puede alternar entre una vista orientada a cliente y una ficha técnica de la escena.
- Los enlaces pueden abrir una escena y un escenario de fallo concretos.
- El botón de compartir copia el contexto actual, incluido el modo de audiencia.

## [0.14.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre recorridos distribuidos, señales, Collector, correlación y límites operativos.
- Escenarios interactivos para latencia, caída del Collector, descarte de telemetría y cardinalidad excesiva.
- Storyboard y matriz de validación basados en la documentación oficial actual de OpenTelemetry y Prometheus.

## [0.13.2] - 2026-08-04

- Cada escena declara las fuentes concretas que respaldan su narrativa y diagrama.
- La ficha de trazabilidad separa las fuentes de la escena de las fuentes generales del tema.
- El quality gate valida IDs únicos y referencias existentes antes de publicar.

## [0.13.1] - 2026-08-04

- Cada explicación muestra la fecha de última revisión y el alcance de versiones o conceptos comprobado.
- Las fuentes primarias aparecen con enlaces directos y fecha de consulta.
- El quality gate bloquea temas sin metadatos de trazabilidad válidos.

## [0.13.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre estado deseado, scheduling, Services, rollouts y recuperación.
- Escenarios interactivos para falla de nodo, readiness, descarga de imágenes y recursos insuficientes.
- Storyboard y matriz de validación basados en la documentación oficial de Kubernetes.

## [0.12.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre solicitudes, contexto, decisión, enforcement y límites.
- Escenarios interactivos para identidad comprometida, dispositivo no confiable, política amplia y telemetría ausente.
- Storyboard y matriz de validación basados en NIST SP 800-207 y CISA Zero Trust Maturity Model.

## [0.11.1] - 2026-08-04

- El panel de escenarios de fallo ahora puede minimizarse sin perder el escenario activo.
- Se retiraron los CTAs comerciales de todos los ejemplos y del contrato de contenido.
- Se actualizaron las guías de contenido, marca y contexto para reflejar la navegación técnica.

## [0.11.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre segmentos, overlay, firewall distribuido y gateways.
- Escenarios interactivos para underlay/MTU, scope de reglas, gateway y seguridad de segmentos.
- Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.

## [0.10.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre datastore distribuido, objetos y políticas de storage.
- Escenarios interactivos para fallas de host/disco, capacidad, fault domains y red vSAN.
- Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.

## [0.9.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre vSphere HA y recuperación ante fallos.
- Escenarios interactivos para capacidad, visibilidad de storage y restricciones de políticas.
- Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.

## [0.8.0] - 2026-08-04

- Relaciones semánticas para distinguir datos, control, storage, dependencias y fallos.
- Leyenda interactiva con filtros de capas y relaciones por escena.
- Validación del tipo de cada arista antes de publicar una explicación.

## [0.7.0] - 2026-08-04

- Validación de estructura, profundidad narrativa y referencias visuales antes de registrar un tema.
- Cada explicación declara storyboard, matriz técnica y estado de revisión.
- Los errores de contenido hacen fallar la compilación; las revisiones pendientes quedan explícitas.

## [0.6.0] - 2026-08-04

- Modo presentación con reproducción automática, pausa y reinicio.
- Navegación por teclado para avanzar, retroceder y salir de la presentación.
- La reproducción se detiene al cambiar manualmente de paso o llegar al final.

## [0.5.0] - 2026-08-04

- Escenarios guiados para fallas de uno o varios hosts y del plano de gestión.
- Cada escenario explica su efecto, nodos afectados y límites técnicos.
- La simulación se puede restaurar y se reinicia al cambiar de escena.

## [0.4.0] - 2026-08-04

- Hover sobre un nodo para resaltar sus conexiones y componentes relacionados.
- Los elementos no relacionados se atenúan para concentrar la atención.
- El resaltado funciona con pan, zoom y escenas independientes.

Cambios relevantes del producto, en orden descendente. La misma información
visible dentro de la aplicación vive en `src/content/changelog.ts`.

## [0.3.1] — 2026-08-04

- Se revisaron copy, storyboard y topología contra fuentes oficiales.
- Se eliminaron afirmaciones absolutas sobre consola única, SLA y failover.
- Se separaron el camino de datos, el clúster de cómputo y la gestión de VCF.

## [0.3.0] — 2026-08-04

- Clic en una tarjeta para consultar su función y tipo dentro de la
  arquitectura.
- Ficha contextual con capacidades, emisión y simulación de falla cuando
  aplica.
- La selección se reinicia al cambiar de escena y el clic fuera de un nodo
  la cierra.

## [0.2.0] — 2026-08-04

- Navegación del canvas: pan con arrastre, zoom con rueda/trackpad y
  controles, y restablecimiento de encuadre.
- Indicador flotante de versión en la esquina inferior izquierda y panel de
  changelog accesible con teclado.
- Documentación de navegación del canvas y proceso de versionado.

## [0.1.0] — 2026-08-04

- Base del explicador técnico, ejemplo VCF y motor visual basado en specs.
- Simulación de paquetes, capacidad y fallas de nodos.
- Catálogo de temas, modo claro/oscuro y documentación de arquitectura.
