# Changelog

## [0.195.0] - 2026-08-11

- El badge del canvas señala fuentes `review-needed`.
- Técnico puede ver cuántas referencias deben actualizarse.
- La advertencia no se presenta como estado de la infraestructura real.

## [0.194.0] - 2026-08-11

- Un perfil `reviewed` requiere fuentes actuales en sus reglas enlazadas.
- Fuentes `review-needed` o ausentes degradan el gate antes de presentar confianza.
- Se añade regresión específica de frescura de fuentes.

## [0.193.0] - 2026-08-11

- Las simulaciones enriquecidas requieren fases `observe`, `diagnose`, `recover` y `validate`.
- Se evita declarar fallos avanzados sin una cadena explicable de evidencia y recuperación.
- Los escenarios conceptuales simples no se ven afectados.

## [0.192.0] - 2026-08-11

- `source-backed` y `reviewed` exigen referencias de fuentes en reglas con evidencia.
- Escenas conceptuales sin reglas de evidencia no se marcan artificialmente como incompletas.
- Se añade una regresión para impedir assurance técnico sin respaldo declarado.

## [0.191.0] - 2026-08-11

- El canvas incorpora una señal compacta de cobertura y confianza del modelo.
- Técnico puede consultar comprobaciones, hallazgos y fuentes declaradas.
- Se diferencia explícitamente el modelo autorado de la observación de la red real.

## [0.190.0] - 2026-08-11

- La tarjeta de nodo muestra las conexiones existentes en la escena actual.
- Cliente ve un resumen de relaciones; técnico ve todas y el tipo de vínculo.
- La información describe el modelo autorado y no se presenta como telemetría real.

## [0.189.0] - 2026-08-11

- El modo cliente compacta los controles de zoom en un control de vista bajo demanda.
- El modo técnico conserva la barra completa.
- La navegación del diagrama y los atajos siguen disponibles.

## [0.188.0] - 2026-08-11

- El modo cliente muestra una narrativa compacta con idea, cambio y pregunta de decision.
- Se elimina la repeticion de la explicacion principal en la primera lectura.
- El detalle tecnico permanece bajo demanda y los otros modos no pierden profundidad.

## [0.187.0] - 2026-08-11

- La biblioteca de patrones permite filtrar por texto y marca.
- Se pueden comparar hasta dos patrones lado a lado con evidencia y riesgos.
- La comparacion no certifica compatibilidad ni elige una arquitectura automaticamente.

## [0.186.0] - 2026-08-11

- Las métricas locales muestran un funnel de utilidad más completo.
- Eventos e IDs se normalizan y se conserva un máximo de 500 eventos.
- Se puede exportar un snapshot JSON con alcance local y borrar los datos.

## [0.185.0] - 2026-08-11

- Se añade `AI_MAX_ESTIMATED_COST_USD` como tope opcional por solicitud.
- El rechazo ocurre antes de llamar al proveedor y la UI muestra el umbral configurado.
- Se incorpora regresión específica para el cap de coste.

## [0.184.0] - 2026-08-11

- El endpoint de IA aplica un límite efectivo al cuerpo recibido.
- Se redactan credenciales comunes antes de enviar preguntas o contexto al proveedor.
- Se añade una regresión específica de sanitización y se mantiene la política de solo lectura.

## [0.183.0] - 2026-08-11

- La campaña de revisión se puede descargar como Markdown o JSON.
- Los artefactos incluyen estados, faltantes, vencimientos y evidencia local de cierre.
- Se advierte que el snapshot puede contener notas internas y no representa aprobación.

## [0.182.0] - 2026-08-11

- El dashboard incorpora un resumen de campaña de revisión especialista.
- Muestra asignaciones, bloqueos, vencimientos y readiness real para PR.
- El resumen es local y no equivale a aprobación editorial.

## [0.181.0] - 2026-08-11

- El seguimiento de revisión especialista exige un cierre verificable antes de marcar “listo para PR”.
- Se añaden checklist de narrativa, diagrama, fuentes, escenarios y ledger de evidencia.
- Se incorpora estado bloqueado y una regresión ejecutada en CI.

## [0.180.0] - 2026-08-11

- Se añade un mapa contextual de evidencia dentro de las herramientas opcionales.
- Cada registro conecta afirmación, evidencia a solicitar, tipo y fuentes.
- La UI declara explícitamente que el ledger autorado no valida el entorno real.

## [0.179.0] - 2026-08-11

- La presentación se ejecuta en Focus canvas con HUD compacto dentro del diagrama.
- Los controles se ocultan tras inactividad y reaparecen al interactuar.
- Se restaura el estado Focus anterior al salir y se conservan los atajos de teclado.

## [0.178.0] - 2026-08-11

- Las herramientas avanzadas quedan agrupadas bajo demanda para reducir la carga inicial.
- El modo cliente prioriza la explicación; el modo técnico puede abrir el grupo automáticamente.
- Se conserva navegación accesible con `details/summary`.

## [0.177.0] - 2026-08-11

- El canvas incorpora una timeline narrativa para saltar directamente entre escenas.
- Muestra progreso, paso actual y escenas completadas sin duplicar la explicación.
- Funciona con Focus canvas y en móvil.

## [0.176.0] - 2026-08-11

- Se añade Focus canvas para presentar el diagrama sin la carga del panel lateral.
- El HUD contextual muestra tema, paso, audiencia y progreso; `F` alterna el modo.
- Ancho y modo se guardan localmente con límites normalizados.

## [0.175.0] - 2026-08-11

- El readiness técnico requiere `reviewStatus: reviewed` además de estructura, fuentes y escenarios.
- Los temas pendientes ya no aparecen como listos para uso técnico.
- El informe explicita la diferencia entre estructura editorial y validación especialista.

## [0.174.0] - 2026-08-11

- Se genera un informe de preparación de implementación para los 22 explainers.
- El artefacto incluye readiness, workstreams, impactos, alto riesgo, escenarios enlazados y faltantes.
- CI lo conserva como artefacto JSON/Markdown; no certifica ni opera infraestructura.

## [0.173.0] - 2026-08-11

- La regresión del paquete técnico recorre los 22 explainers del catálogo.
- Se validan marcas, workstreams, impactos, fuentes y evidencia/rollback por cada tema.
- El gate protege también los explainers de Instana, Turbonomic y webMethods.

## [0.172.0] - 2026-08-11

- La telemetría local de IA separa Copilot, Creator y eventos desconocidos.
- El dashboard permite revisar y exportar consultas, tokens, fallos y coste estimado.
- Los datos son locales y orientativos; no son facturación ni cuota compartida.

## [0.171.0] - 2026-08-11

- El dashboard y el informe técnico muestran cobertura de impactos de cambio.
- Se cuentan impactos totales, de alto riesgo y con escenarios enlazados.
- El informe JSON usa `schemaVersion: 1.3`; las cifras son editoriales y no miden producción.

## [0.170.0] - 2026-08-11

- La matriz de impacto permite registrar revisión local por workstream: pendiente, revisado, bloqueado o aceptado.
- Aceptar exige una nota/evidencia mínima y el resumen declara bloqueos y pendientes.
- El estado se conserva en el navegador y se exporta con el paquete; no equivale a autorización operacional.

## [0.169.0] - 2026-08-11

- El paquete técnico incorpora una matriz de impacto por workstream.
- Cada impacto relaciona riesgo, dependencias, escenarios, nodos, rollback conceptual y evidencia antes/después.
- La matriz es derivada y no operacional; no afirma salud, capacidad ni compatibilidad del entorno real.

## [0.168.0] - 2026-08-11

- Cada explainer puede generar un paquete técnico de implementación y mantenimiento.
- El paquete reúne prerrequisitos, workstreams, evidencia de aceptación y controles de mantenimiento.
- Se descarga como Markdown o JSON, declara faltantes y no ejecuta cambios ni certifica el entorno.

## [0.167.0] - 2026-08-11

- CI ejecuta los contratos de acciones del copiloto, patrones, simulaciones de fallo, frescura de fuentes y consistencia de versión.
- La plantilla de PR y `CONTRIBUTING.md` documentan la misma checklist de regresiones técnicas.
- La fase valida artefactos y contenido sin convertir el sistema en una herramienta operacional.

## [0.166.0] - 2026-08-11

- La versión visible de la aplicación, `package.json`, el changelog y los informes quedan alineados.
- Se añade una regresión que falla si `currentVersion` o la primera entrada del changelog divergen del paquete.
- La pantalla de versión vuelve a reflejar el release real que se está revisando.

## [0.165.0] - 2026-08-11

- El handoff de soporte se puede descargar también como JSON versionado (`schemaVersion: 1.0`).
- La salida estructurada conserva draft normalizado, readiness, triage seleccionado, rutas disponibles y ledger de evidencia.
- El JSON es un artefacto local para futuras integraciones; no se envía a ITSM ni ejecuta acciones.
- CI protege el contrato JSON junto con el exportador Markdown.

## [0.164.0] - 2026-08-11

- El handoff muestra una preparación determinista con porcentaje y campos faltantes.
- La checklist cubre contexto, ruta de triage, evidencia recibida, resultado y decisión de escalamiento.
- Descargar un paquete incompleto sigue permitido, pero el documento declara su estado para evitar presentarlo como listo.
- CI protege el cálculo de readiness y la salida Markdown.

## [0.163.0] - 2026-08-11

- El handoff local de soporte separa evidencia recibida, resultado de comprobación y decisión de escalamiento.
- La decisión queda limitada a `pending`, `continue` o `escalate` y se normaliza antes de exportar Markdown.
- La información sigue solo en el navegador; no ejecuta comprobaciones, cambia infraestructura ni envía datos a un ticket.
- CI protege la compatibilidad del borrador y el contenido exportado.

## [0.162.0] - 2026-08-11

- Se añade `AI_PERSISTENT_QUOTA_REQUIRED=true` para entornos donde la cuota compartida debe fallar cerrado si Redis no está disponible.
- El modo por defecto conserva el fallback local para disponibilidad y prototipos; el health endpoint distingue `shared-redis-required`.
- La creación de cliente Redis maneja configuración inválida sin lanzar una excepción no controlada.
- CI protege la política de cuota sin contactar servicios externos.

## [0.161.0] - 2026-08-11

- La vigencia de fuentes se deriva contra una ventana de 180 días, incluso cuando una fuente antigua quedó etiquetada manualmente como `current`.
- Las fuentes fuera de ventana pasan a `review-needed` y aparecen en el backlog de revisión técnica.
- La normalización no descarga URLs ni certifica que el documento externo siga vigente.
- CI protege la política con una regresión de fechas inyectables.

## [0.160.0] - 2026-08-11

- La cobertura técnica agrega porcentaje promedio de madurez de escenarios.
- Se distinguen escenarios listos, parciales y sin cobertura para priorizar soporte y revisión editorial.
- Dashboard e informe reutilizan el mismo cálculo determinista; no son métricas de producción.
- CI protege las nuevas métricas con una regresión offline.
- El informe técnico incrementa su `schemaVersion` a `1.2` para identificar formalmente los nuevos campos de cobertura.

## [0.159.0] - 2026-08-11

- Los perfiles de escenarios de fallo validan ahora la semántica de cada modo (`capacity`, `latency`, `dependency`, `degraded`, `observability` y `hard-down`).
- Cada modo exige sus parámetros necesarios y rechaza combinaciones ambiguas, como latencia sin milisegundos o caída total con capacidad residual.
- El content gate bloquea el build ante un perfil contradictorio, manteniendo la simulación como modelo conceptual y no como health check.
- CI protege las reglas con fixtures offline.

## [0.158.0] - 2026-08-11

- La biblioteca de patrones CORESOLUTIONS pasa por un content gate propio antes de entrar al registro.
- Se validan IDs únicos, campos y listas de evidencia/riesgos, fechas de revisión no futuras y enlaces a explainers existentes.
- Un patrón inválido bloquea el build para evitar propuestas o workshops con referencias huérfanas.
- CI protege el catálogo con fixtures offline; los patrones siguen siendo conceptuales y no prometen compatibilidad automática.

## [0.157.0] - 2026-08-11

- El copiloto recibe una allowlist explícita de IDs de fuentes y escenarios del explainer activo.
- El servidor descarta acciones con IDs desconocidos, etiquetas vacías o saltos de línea y mantiene el límite de tres acciones.
- Las acciones siguen siendo exclusivamente `open-source` y `activate-scenario`; no aceptan URLs, comandos ni cambios de infraestructura.
- CI protege el contrato de sanitización con fixtures offline y la UI envía los IDs autorados.

## [0.156.0] - 2026-08-11

- El cierre local de una acción de revisión conserva estado, nota/evidencia y fecha de actualización.
- Marcar una acción como resuelta exige una nota de al menos 12 caracteres; editarla después sin evidencia suficiente la devuelve a análisis.
- La exportación del backlog incluye la nota y fecha para facilitar handoff de soporte, implementación y mantenimiento.
- El registro sigue siendo local, no aprueba contenido, no sincroniza tickets y no ejecuta cambios.
- CI protege normalización, compatibilidad con estados anteriores y exportación de decisiones.

## [0.155.0] - 2026-08-11

- El backlog de revisión técnica incorpora acciones `scenario-readiness` derivadas de los faltantes de madurez.
- Cada acción conserva prioridad, motivo, evidencia y fuentes, y se exporta junto con las demás acciones del explainer.
- La cola de revisión y la cola de madurez quedan conectadas sin aprobar ni ejecutar cambios.
- CI protege la derivación con regresiones del review workflow.

## [0.154.0] - 2026-08-11

- La cola de madurez puede descargarse como backlog Markdown para adjuntarlo a un PR o ticket.
- Cada tarea conserva explainer, escenario, porcentaje, faltantes y enlace directo.
- El exportador declara límites y no sincroniza estados con sistemas externos.
- CI protege el contrato de exportación con la regresión de scenario readiness.

## [0.153.0] - 2026-08-11

- El dashboard incorpora una cola de madurez por escenario con porcentaje y faltantes concretos.
- Cada pendiente enlaza directamente a su explainer para completar simulación, fases, evidencia o fuentes.
- La cola es editorial y no aprueba contenido ni representa salud de producción.
- CI protege el cálculo determinista con una regresión offline.

## [0.152.0] - 2026-08-11

- La cobertura técnica mide la madurez de cada escenario de fallo, no solo su existencia.
- Se distinguen simulación tipada, flujo guiado completo, evidencia declarada, fuentes vigentes y escenarios listos para soporte.
- Dashboard e informe técnico comparten el mismo cálculo determinista.
- CI protege las nuevas métricas con fixtures offline.

## [0.151.0] - 2026-08-11

- El content gate valida ahora el ledger tipado antes de registrar un explainer en el catálogo.
- Evidencia con ID duplicado, texto vacío o fuente desconocida bloquea la publicación/build.
- Se mantienen como warnings independientes las revisiones humanas pendientes.
- CI cubre casos válidos e inválidos del contrato.

## [0.150.0] - 2026-08-11

- La evidencia autorada se normaliza en un ledger tipado: documental, observada, hipótesis o aceptación.
- El handoff de soporte incluye el ledger junto con la ruta de triage, fuentes y límites.
- El contrato detecta IDs duplicados, afirmaciones vacías y fuentes desconocidas antes de exportar.
- CI protege el ledger con regresiones offline.

## [0.149.0] - 2026-08-11

- Se añade un handoff local de soporte para registrar ID, síntoma, impacto, inicio, responsable y notas sin enviar datos fuera del navegador.
- El paquete enlaza una ruta de triage, fuentes, confianza y límites, y se descarga como Markdown para revisión humana.
- El contrato normaliza longitudes y caracteres del caso y advierte que no se deben pegar secretos.
- CI protege la exportación con una regresión offline.

## [0.148.0] - 2026-08-11

- Cada explicación incorpora un brief de triage para soporte: síntoma, capa probable, evidencia a solicitar, comprobación segura y criterio de escalamiento.
- El brief reutiliza escenarios y pasos autorados; cuando faltan, genera rutas derivadas marcadas como tales.
- Se puede descargar como Markdown conceptual; no ejecuta comandos ni consulta plataformas.
- CI protege el contrato de triage con una regresión offline.

## [0.147.0] - 2026-08-11

- El generador de borradores IA expone una política `draft-only` con límites y coste estimado.
- La UI indica que el resultado es educativo, no publicado y no ejecutable.
- CI protege el contrato de Creator sin llamar al proveedor externo.

## [0.146.0] - 2026-08-11

- El Copiloto devuelve y muestra una política explícita de solo lectura.
- La política declara las únicas acciones permitidas (`open-source`, `activate-scenario`), límites de tokens y coste estimado cuando hay tarifas configuradas.
- CI protege el contrato de política sin llamar al proveedor de IA.

## [0.145.0] - 2026-08-11

- El dashboard incorpora cobertura técnica del catálogo: revisión, fuentes, escenarios, roadmap, integridad y acciones.
- El cálculo es determinista y compartido con el informe técnico.
- CI protege el contrato de métricas con fixtures offline.

## [0.144.0] - 2026-08-11

- La cola permite exportar el backlog técnico con estados locales para adjuntarlo a un ticket o PR.
- El exportador incluye prioridad, motivo, evidencia, fuentes y límites explícitos.
- Las URLs se filtran a `http`/`https`; referencias inseguras permanecen como ID sin convertirse en enlaces.
- CI valida el contrato Markdown sin usar APIs del navegador.

## [0.143.0] - 2026-08-11

- Cada acción del backlog puede marcarse localmente como pendiente, en análisis o resuelta.
- El estado se guarda por explainer y acción en el navegador; no modifica el contenido ni se sincroniza con servidor.
- CI valida la normalización segura de estados desconocidos.

## [0.142.0] - 2026-08-11

- El dashboard de revisión muestra el backlog técnico colapsado por explainer.
- UI y CLI comparten `buildReviewActions`, evitando reglas divergentes.
- CI valida que cada acción tenga evidencia y solo use `sourceIds` existentes.

## [0.141.0] - 2026-08-11

- El informe técnico añade un backlog estructurado de acciones sugeridas por explainer.
- Las acciones se derivan solo de señales existentes: revisión pendiente, fuentes `review-needed`, warnings del gate y assurance de integridad no `reviewed`.
- Cada acción conserva motivo, evidencia y IDs de fuentes; no ejecuta cambios operativos.

## [0.140.0] - 2026-08-10

- El informe técnico incorpora la matriz completa de fuentes por explainer.
- Cada fuente conserva ID, título, URL segura, fecha consultada, producto, versión, referencia y vigencia.
- El Markdown del paquete incluye una sección de evidencia concreta para revisión especialista.

## [0.139.0] - 2026-08-10

- Se añade `report:technical-review:package` para generar un paquete de auditoría reproducible.
- El paquete contiene Markdown, JSON y un manifiesto con versión, resumen y hashes SHA-256.
- CI publica el paquete completo y valida su contrato offline.

## [0.138.0] - 2026-08-10

- El informe JSON de revision tecnica incluye `schemaVersion` y `appVersion`.
- La regresion valida ambos metadatos para evitar romper consumidores automatizados.

## [0.137.0] - 2026-08-10

- Se añade `npm run test:technical-review-report`.
- CI valida parseo JSON, resumen, 22 filas, regla de prioridad y orden.

## [0.136.0] - 2026-08-10

- `report:technical-review:json` genera una versión machine-readable del informe.
- CI publica Markdown y JSON en el artefacto de revisión.

## [0.135.0] - 2026-08-10

- Se añade `npm run test:review-priority`.
- CI protege la regla compartida entre cola visual e informe CLI.

## [0.134.0] - 2026-08-10

- La cola de revisión técnica comparte el score de prioridad del informe CLI.
- Cada explainer muestra prioridad y fuentes por confirmar.
- El orden sigue siendo informativo y no cambia estados editoriales.

## [0.133.0] - 2026-08-10

- CI guarda el informe de revisión técnica como artefacto descargable.
- El artefacto tiene una retención de 14 días y se identifica con el `run_id`.
- El flujo local conserva el mismo comando de generación.

## [0.132.0] - 2026-08-10

- Nuevo `npm run report:technical-review` para priorizar la revisión de explainers.
- El informe combina estado, fuentes pendientes, advertencias, escenarios, integridad y roadmap.
- GitHub Actions lo genera en cada PR sin aprobar contenido automáticamente.

## [0.131.0] - 2026-08-10

- Cada exportación del Workbench registra la versión de la aplicación.
- El paquete incluye fecha ISO de generación para facilitar tickets y handoffs.

## [0.130.0] - 2026-08-10

- La UI y el exportador solo enlazan URLs `http` o `https` del catálogo.
- Protocolos inseguros o URLs malformadas no se convierten en enlaces.
- La regresión offline cubre el rechazo de `javascript:`.

## [0.129.0] - 2026-08-10

- Las exportaciones Markdown incluyen URLs registradas para cada fuente asociada.
- Las fuentes sin coincidencia permanecen como pendientes sin inventar URL.

## [0.128.0] - 2026-08-10

- Los IDs de fuente del Workbench enlazan directamente a la URL registrada cuando existe.
- Los IDs sin coincidencia permanecen como texto, sin inventar referencias.

## [0.127.0] - 2026-08-10

- Cada tarea del Workbench muestra sus IDs de fuente o indica que deben confirmarse.
- El encabezado distingue tareas con fuentes por confirmar de fuentes únicas.

## [0.126.0] - 2026-08-10

- El quality gate de GitHub ejecuta `npm run test:workbench-export` en cada PR y push a `main`.
- `CONTRIBUTING.md` incluye la misma regresión para validación local.

## [0.125.0] - 2026-08-10

- La generación Markdown del Workbench usa un contrato reutilizable y testeable sin navegador.
- Las exportaciones focalizada y completa comparten estados, fuentes y límites.
- Se añade `npm run test:workbench-export` como regresión offline.

## [0.124.0] - 2026-08-10

- El Workbench permite descargar la vista activa como Markdown independiente.
- El paquete completo sigue disponible para el contexto integral.
- Ambas salidas mantienen estados, fuentes y límites conceptuales.

## [0.123.0] - 2026-08-10

- El Technical Workbench añade la vista `Validar`.
- La vista convierte revisión humana, vigencia de fuentes y contratos de integridad de escenas en tareas verificables.
- El paquete completo exportado incluye esta vista sin ejecutar pruebas ni afirmar aprobación automática.

## [0.122.0] - 2026-08-10

- El Technical Workbench resume el progreso local de Implementar, Soportar y Mantener.
- La descarga genera un paquete completo con tareas revisadas/pendientes y fuentes por confirmar.
- Las tareas sin fuente o con `review-needed` quedan explícitas para revisión humana.

## [0.121.0] - 2026-08-10

- El Technical Workbench muestra marcas y roles del portafolio en alcance.
- Soporte desglosa pasos de observar, diagnosticar, recuperar y validar cuando el contenido los declara.
- La exportación Markdown incluye el contexto de marcas.

## [0.120.0] - 2026-08-10

- Nuevo `TechnicalWorkbenchPanel` con vistas Implementar, Soportar y Mantener para cada explainer.
- Permite checklist local y descarga Markdown de tareas, evidencia, fuentes y límites.
- No ejecuta cambios ni sustituye un runbook o una validación del entorno real.

## [0.119.0] - 2026-08-10

- `CONTRIBUTING.md` documenta el flujo de ramas, PR, validaciones, contenido técnico, IA, secretos y Vercel.
- El runbook deja explícito que una validación automática no equivale a aprobación especialista.

## [0.118.0] - 2026-08-10

- Nueva plantilla `.github/pull_request_template.md` para exigir rigor técnico, seguridad y validaciones en cada PR.
- Incluye campos explícitos para responsable, explainers, resultado y evidencia de revisión humana.

## [0.117.0] - 2026-08-10

- `.github/dependabot.yml` programa revisiones semanales de npm y GitHub Actions.
- `SECURITY.md` documenta el reporte privado de vulnerabilidades y el manejo de información sensible.

## [0.116.0] - 2026-08-10

- Nuevo workflow `.github/workflows/quality.yml` para PR y push a `main`.
- Ejecuta `npm ci`, auditoría de producción, content gate, regresiones de IA, typecheck, lint y build.
- Usa permisos mínimos, Node.js 20 y cancela ejecuciones obsoletas por rama.

## [0.115.0] - 2026-08-10

- Nuevo comando `npm run test:ai-guards` para probar el cálculo de costes, el fallback de cuotas y `/api/health`.
- Las pruebas son offline: no consumen proveedor de IA ni Redis.

## [0.114.0] - 2026-08-10

- `/api/health` muestra versión, estado de IA, modo de cuota e identidad firmada sin revelar valores sensibles.
- La respuesta usa `Cache-Control: no-store` para no ocultar cambios de configuración del despliegue.

## [0.113.0] - 2026-08-10

- Overrides de seguridad fijan PostCSS `8.5.26` y Sharp `0.35.3` para las dependencias transitivas de Next.js.
- `npm audit --omit=dev --audit-level=high` queda sin vulnerabilidades reportadas.
- No se ejecutó una actualización mayor de Next.js; queda como migración independiente.

## [0.112.0] - 2026-08-10

- El guard de IA puede compartir solicitudes y tokens entre instancias mediante Upstash Redis.
- La integración es opcional: sin `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` se mantiene el guard local.
- Las claves expiran a los diez minutos y respetan la identidad HMAC cuando el gateway la proporciona.

## [0.111.0] - 2026-08-10

- El guard de IA soporta identidad autenticada mediante `x-coresolutions-user`, su firma HMAC y `AI_IDENTITY_SIGNING_SECRET`.
- Con una firma válida, el límite temporal se aplica por usuario; sin ella se mantiene el fallback por IP.
- La clave interna usa un hash y no guarda el identificador original.

## [0.110.0] - 2026-08-10

- El generador asistido registra tokens, fallos y coste estimado en la misma telemetría local de Copilot.
- `/api/creator` devuelve el uso del proveedor sin exponer credenciales.
- Los fallback locales siguen identificándose como plantillas editables, no como generación de IA.

## [0.109.0] - 2026-08-10

- Copilot estima el coste cuando el despliegue define `AI_INPUT_COST_PER_MILLION_USD` y `AI_OUTPUT_COST_PER_MILLION_USD`.
- La interfaz muestra el coste acumulado junto a consultas y tokens; sin ambas variables no se muestra ningún precio.
- Es telemetría orientativa del navegador y no reemplaza la factura del proveedor ni una cuota multiusuario.

## [0.108.0] - 2026-08-10

- El paquete Markdown incorpora el seguimiento local guardado para el explainer.
- El estado, responsable, fecha y notas se leen solo al descargar y no salen del navegador por red.

## [0.107.0] - 2026-08-10

- La cola permite registrar localmente responsable, fecha objetivo, estado y notas por explainer.
- El seguimiento se mantiene en el navegador y no equivale a una aprobación o publicación.

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
