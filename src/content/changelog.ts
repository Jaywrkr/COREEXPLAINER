export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

/**
 * Source of the release information rendered in the global version control.
 * Keep this aligned with package.json and docs/CHANGELOG.md.
 */
export const currentVersion = "0.118.0";

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "0.118.0",
    date: "10 ago 2026",
    title: "Plantilla de revisión técnica para PR",
    changes: [
      "Cada PR declara objetivo, alcance, fuentes, coherencia de diagrama, escenarios, seguridad y validaciones ejecutadas.",
      "El bloque de revisión humana registra responsable, explainers revisados, resultado y paquete de evidencia.",
      "La plantilla recuerda explícitamente no activar deployments de Vercel accidentalmente.",
    ],
  },
  {
    version: "0.117.0",
    date: "10 ago 2026",
    title: "Mantenimiento y reporte de seguridad",
    changes: [
      "Dependabot revisa semanalmente dependencias npm y GitHub Actions, agrupando actualizaciones para que cada PR pase el quality gate.",
      "SECURITY.md define cómo reportar vulnerabilidades sin publicar secretos ni datos de clientes.",
      "Las actualizaciones mayores del framework siguen requiriendo una migración revisada, no una automatización ciega.",
    ],
  },
  {
    version: "0.116.0",
    date: "10 ago 2026",
    title: "Quality gate automático de PR",
    changes: [
      "GitHub Actions ejecuta audit, content gate, regresiones de IA, typecheck, lint y build en cada PR y push a main.",
      "El workflow usa npm ci, Node.js 20, permisos mínimos y cancelación de ejecuciones obsoletas.",
      "Las garantías de contenido y seguridad dejan de depender de una ejecución manual local.",
    ],
  },
  {
    version: "0.115.0",
    date: "10 ago 2026",
    title: "Regresiones automatizadas del guard de IA",
    changes: [
      "Se añade `npm run test:ai-guards` para comprobar costes sin tarifas, fallback de Redis y contrato seguro de `/api/health`.",
      "La suite no llama a OpenAI ni a Redis y puede ejecutarse en cada PR.",
      "La restauración de variables de entorno evita contaminar el proceso de desarrollo.",
    ],
  },
  {
    version: "0.114.0",
    date: "10 ago 2026",
    title: "Health check operativo",
    changes: [
      "Se añade `/api/health` para comprobar versión, disponibilidad de IA, modo de cuota e identidad firmada sin exponer secretos.",
      "La respuesta desactiva caché para reflejar el entorno real del despliegue.",
      "El endpoint distingue cuota compartida por Redis de fallback local por proceso.",
    ],
  },
  {
    version: "0.113.0",
    date: "10 ago 2026",
    title: "Overrides de dependencias de build",
    changes: [
      "PostCSS y Sharp transitivos de Next.js quedan fijados a versiones corregidas mediante overrides acotados al paquete Next.",
      "La auditoría de producción queda sin vulnerabilidades reportadas sin forzar una actualización mayor de Next.js.",
      "El build y la validación de contenidos se ejecutaron después del cambio.",
    ],
  },
  {
    version: "0.112.0",
    date: "10 ago 2026",
    title: "Cuotas compartidas entre instancias",
    changes: [
      "El guard puede usar Upstash Redis para compartir la ventana de solicitudes y tokens entre funciones de Vercel.",
      "Sin las variables de Redis, el sistema conserva automáticamente el guard en memoria existente.",
      "Los contadores tienen expiración de diez minutos y siguen usando la identidad HMAC cuando está disponible.",
    ],
  },
  {
    version: "0.111.0",
    date: "10 ago 2026",
    title: "Cuotas preparadas para identidad autenticada",
    changes: [
      "El guard de IA acepta una identidad firmada por un gateway confiable y aplica el límite por usuario, no por IP.",
      "Las solicitudes sin firma válida siguen usando el límite por IP; nunca se confía en un identificador enviado libremente desde el navegador.",
      "La clave usada en memoria es un hash corto y no conserva el identificador personal original.",
    ],
  },
  {
    version: "0.110.0",
    date: "10 ago 2026",
    title: "Coste visible también al crear explainers",
    changes: [
      "El generador asistido incorpora sus tokens y coste estimado a la misma telemetría local que Copilot.",
      "Las respuestas de creación incluyen el uso del proveedor sin exponer credenciales ni prompts fuera del flujo existente.",
      "Los fallos y los fallback locales quedan diferenciados para no presentar una plantilla local como generación de IA.",
    ],
  },
  {
    version: "0.109.0",
    date: "10 ago 2026",
    title: "Telemetría de coste configurable para IA",
    changes: [
      "El endpoint de Copilot puede devolver un coste estimado cuando el despliegue configura explícitamente las tarifas de entrada y salida por millón de tokens.",
      "El panel muestra el coste acumulado junto a las consultas y tokens registrados; si faltan tarifas, no inventa precios.",
      "La estimación es orientativa y local: no sustituye la facturación del proveedor ni las cuotas multiusuario.",
    ],
  },
  {
    version: "0.108.0",
    date: "10 ago 2026",
    title: "Seguimiento incluido en el paquete",
    changes: [
      "La descarga de revisión incorpora el estado, responsable, fecha y notas locales guardadas para el explainer.",
      "El contenido se lee del navegador al descargar y no se envía a ningún servicio.",
    ],
  },
  {
    version: "0.107.0",
    date: "10 ago 2026",
    title: "Seguimiento local de revisión",
    changes: [
      "Cada pendiente permite registrar responsable, fecha objetivo, estado y notas en este navegador.",
      "Los estados locales son sin asignar, en revisión y listo para PR; no equivalen a aprobación editorial.",
      "La información no sale del navegador ni se sincroniza entre usuarios.",
    ],
  },
  {
    version: "0.106.0",
    date: "10 ago 2026",
    title: "Integridad de enlaces de revisión",
    changes: [
      "La cola abre el explainer publicado en lugar de construir una ruta pública inexistente para docs/.",
      "El paquete exportado conserva la ruta de la ficha como referencia de repositorio, sin prometer un enlace web roto.",
    ],
  },
  {
    version: "0.105.0",
    date: "10 ago 2026",
    title: "Paquete exportable de revisión",
    changes: [
      "La cola técnica permite descargar un Markdown con alcance, fuentes, advertencias y checklist.",
      "El paquete incluye campos para responsable, fecha, cambios requeridos y evidencia adjunta.",
      "La exportación no cambia el estado ni afirma certificación del entorno.",
    ],
  },
  {
    version: "0.104.0",
    date: "10 ago 2026",
    title: "Cola de revisión técnica",
    changes: [
      "El dashboard muestra los explainers pendientes de revisión humana, ordenados por fecha.",
      "Cada entrada enlaza la explicación y su ficha técnica con alcance y número de fuentes.",
      "La cola es informativa: no puede aprobar ni publicar contenido automáticamente.",
    ],
  },
  {
    version: "0.103.0",
    date: "10 ago 2026",
    title: "Cobertura completa de fuentes declaradas",
    changes: [
      "Kubernetes explica Ingress y lo enlaza con la fuente oficial correspondiente.",
      "Backup/DR conecta fuentes de CORESOLUTIONS, IBM, Veeam y Lenovo con el objetivo o paso que las usa.",
      "Power/AIX conecta la fuente conceptual de Live Partition Mobility con la escena de plataforma.",
      "El content gate queda con advertencias únicamente de revisión técnica pendiente.",
    ],
  },
  {
    version: "0.102.0",
    date: "10 ago 2026",
    title: "Escenario de identidad coherente",
    changes: [
      "El nodo Active Directory de NAS/private cloud queda marcado como simulable en el escenario de indisponibilidad.",
      "El content gate detecta ahora una configuración coherente entre deadNodeIds y killable.",
    ],
  },
  {
    version: "0.101.0",
    date: "10 ago 2026",
    title: "Topología intencional en el content gate",
    changes: [
      "Las escenas pueden declarar explícitamente que sus nodos aislados son parte del mensaje.",
      "La escena inicial de VCF marca sus silos como intencionales antes de la unificación.",
      "Los endpoints desconocidos y las referencias inválidas siguen siendo errores del gate.",
    ],
  },
  {
    version: "0.100.0",
    date: "10 ago 2026",
    title: "Content gate consciente de IDs",
    changes: [
      "La revisión semántica reconoce referencias a nodos por ID o por nombre visible.",
      "Los escenarios ya no generan falsos positivos cuando affectedNodes usa IDs del diagrama.",
      "Las advertencias restantes representan deuda editorial real y quedan más enfocadas.",
    ],
  },
  {
    version: "0.99.0",
    date: "09 ago 2026",
    title: "Guard de coste para IA",
    changes: [
      "El servidor reserva tokens estimados por IP y ventana antes de invocar al proveedor.",
      "Las variables AI_TOKEN_BUDGET_PER_WINDOW y AI_MAX_OUTPUT_TOKENS permiten ajustar el control por entorno.",
      "El exceso devuelve 429 con Retry-After y no ejecuta una llamada adicional.",
    ],
  },
  {
    version: "0.98.0",
    date: "09 ago 2026",
    title: "Métricas locales de utilidad",
    changes: [
      "El dashboard resume navegación, escenarios abiertos, avances de workflow, briefs y borradores generados.",
      "Los eventos se conservan únicamente en el navegador y se limitan a 500 registros.",
      "El usuario puede borrar las métricas locales en cualquier momento.",
    ],
  },
  {
    version: "0.97.0",
    date: "09 ago 2026",
    title: "Biblioteca de patrones CORESOLUTIONS",
    changes: [
      "El dashboard incluye patrones reutilizables para virtualización, observabilidad, integración, ciberresiliencia y LAN/SAN.",
      "Cada patrón declara problema, resultado, marcas, señales, evidencia, riesgos y explainers relacionados.",
      "La fecha de revisión queda visible y el contenido sigue siendo conceptual hasta validarse por proyecto.",
    ],
  },
  {
    version: "0.96.0",
    date: "09 ago 2026",
    title: "Telemetría local de uso de IA",
    changes: [
      "El copiloto registra localmente consultas, fallos y tokens devueltos por el proveedor.",
      "La interfaz muestra el uso de la sesión sin guardar prompts ni respuestas en un servicio externo.",
      "El endpoint devuelve metadatos de tokens sin exponer la clave ni contenido sensible adicional.",
    ],
  },
  {
    version: "0.95.0",
    date: "09 ago 2026",
    title: "Acciones controladas desde el copiloto",
    changes: [
      "El copiloto puede proponer abrir una fuente o activar un escenario mediante acciones explícitas.",
      "El servidor filtra las acciones a una allowlist y limita a tres acciones por respuesta.",
      "La interfaz valida que la fuente o escenario exista antes de ejecutar cualquier acción local.",
    ],
  },
  {
    version: "0.94.0",
    date: "09 ago 2026",
    title: "Workflow de revisión de contenido",
    changes: [
      "Cada explainer tiene un workflow local de borrador, revisión técnica, fuentes, comercial, aprobación y publicación.",
      "El avance se bloquea si la revisión técnica editorial está pendiente o existen fuentes marcadas para revisión.",
      "El estado publicado puede marcarse como revisión vencida para forzar una nueva comprobación.",
    ],
  },
  {
    version: "0.93.0",
    date: "09 ago 2026",
    title: "Perfiles de fallo avanzados",
    changes: [
      "Los escenarios pueden declarar degradación, capacidad remanente, latencia conceptual, observabilidad o dependencia externa.",
      "VCF incorpora perfiles de capacidad y dependencia para distinguir pérdida de host de pérdida del plano de gestión.",
      "El motor mantiene compatibilidad con escenarios anteriores usando hard-down como fallback.",
    ],
  },
  {
    version: "0.92.0",
    date: "09 ago 2026",
    title: "Registro de evidencia por escenario",
    changes: [
      "Cada paso guiado y fase de roadmap se convierte en un elemento de evidencia rastreable.",
      "La evidencia puede marcarse como pendiente, validada o bloqueada y conserva las fuentes relacionadas.",
      "El estado se guarda localmente por explainer y escenario, sin afirmar ejecución automática de pruebas.",
    ],
  },
  {
    version: "0.91.0",
    date: "09 ago 2026",
    title: "Content gate semántico",
    changes: [
      "La publicación comprueba conexiones entre fuentes, pasos, escenarios, decisiones y roadmap.",
      "El gate detecta nodos aislados, escenarios que no corresponden a la escena y pasos sin nombres visibles del diagrama.",
      "validate:content imprime las advertencias para convertir deuda editorial en una lista de trabajo verificable.",
    ],
  },
  {
    version: "0.90.0",
    date: "09 ago 2026",
    title: "Endurecimiento de endpoints IA",
    changes: [
      "Los endpoints de copiloto y creador tienen límites de tamaño, rate limiting temporal y timeout del proveedor.",
      "La IA puede desactivarse con AI_ENDPOINT_ENABLED=false sin retirar la experiencia local.",
      "Los errores del proveedor se convierten en mensajes seguros y no exponen detalles internos.",
    ],
  },
  {
    version: "0.89.0",
    date: "09 ago 2026",
    title: "Impacto what-if explicado",
    changes: [
      "Cada fallo activo muestra una lectura asistida del resultado del grafo para clientes y técnicos.",
      "La lectura conecta estado, evidencia faltante y decisiones/roadmap relacionados cuando existen.",
      "El texto mantiene el límite explícito: es una simulación conceptual y no una prueba del entorno real.",
    ],
  },
  {
    version: "0.88.0",
    date: "09 ago 2026",
    title: "Creador asistido de explainers",
    changes: [
      "El dashboard permite definir tema, audiencia, marcas y objetivo para generar un borrador estructurado.",
      "Con OPENAI_API_KEY el borrador usa IA con un contrato JSON controlado; sin clave se ofrece una plantilla local editable.",
      "El resultado incluye escenas, riesgos, preguntas de evidencia, gaps de validación y fuentes a confirmar.",
    ],
  },
  {
    version: "0.87.0",
    date: "09 ago 2026",
    title: "Brief de assessment generado desde el contenido",
    changes: [
      "Cada explainer puede generar un brief Markdown con preguntas de descubrimiento, escenas, evidencia, riesgos y decisiones.",
      "El documento incluye fuentes, fechas de revisión y límites para conservar trazabilidad fuera de la aplicación.",
      "La salida es local y editable; no sube información del cliente ni afirma que el assessment esté completado.",
    ],
  },
  {
    version: "0.86.0",
    date: "09 ago 2026",
    title: "Copiloto grounded por explicación",
    changes: [
      "Cada explicación incorpora un copiloto bajo demanda con contexto de CORESOLUTIONS, escena, target y fuentes.",
      "El endpoint limita la pregunta y el contexto, exige una clave de servidor y rechaza respuestas fuera del alcance autorado.",
      "La interfaz mantiene la explicación disponible si el proveedor de IA no está configurado o no responde.",
    ],
  },
  {
    version: "0.85.0",
    date: "09 ago 2026",
    title: "Revisión técnica asistida",
    changes: [
      "Cada explicación puede ejecutar una revisión local basada en reglas, integridad del diagrama, escenarios y roadmap.",
      "Los hallazgos separan severidad, evidencia y acción recomendada sin afirmar que el entorno del cliente esté validado.",
      "La base queda preparada para enriquecer el lenguaje con un modelo grounded sin cambiar los límites técnicos ni la trazabilidad.",
    ],
  },
  {
    version: "0.84.0",
    date: "09 ago 2026",
    title: "Ruta accionable desde decisiones",
    changes: [
      "Las fases de roadmap enlazadas desde una decisión ahora se muestran como controles compactos.",
      "Cada fase puede marcarse como revisada, no aplica o pendiente directamente desde el laboratorio.",
      "La selección mantiene el estado local de la sesión y conserva los escenarios como validaciones complementarias.",
    ],
  },
  {
    version: "0.83.0",
    date: "09 ago 2026",
    title: "Decisiones conectadas al roadmap",
    changes: [
      "Las decisiones de Instana enlazan cobertura, correlacion y operacion con la evidencia que debe comprobarse.",
      "Las decisiones de Turbonomic enlazan modelado, planificacion y gobierno para separar recomendacion de ejecucion.",
      "Las decisiones de webMethods enlazan contratos, runtime y operacion para validar integraciones hibridas de forma progresiva.",
    ],
  },
  {
    version: "0.82.0",
    date: "09 ago 2026",
    title: "Roadmaps de assessment por dominio",
    changes: [
      "Instana incorpora un recorrido de cobertura, correlacion y operacion para ordenar la adopcion de observabilidad.",
      "Turbonomic incorpora fases de modelado, planificacion y gobierno para conectar recomendaciones con ejecucion segura.",
      "webMethods incorpora fases de contratos, runtime e integracion operable para evaluar APIs y flujos de forma progresiva.",
    ],
  },
  {
    version: "0.81.0",
    date: "09 ago 2026",
    title: "Laboratorios de decisiones por dominio",
    changes: [
      "Instana, Turbonomic y webMethods incorporan dos decisiones autoradas propias de su dominio.",
      "Cada decisión enlaza escenarios para validar cobertura, automatización, APIs, runtimes o interoperabilidad.",
      "La misma validación comprueba que las referencias de escenarios existan en el contenido.",
    ],
  },
  {
    version: "0.80.0",
    date: "09 ago 2026",
    title: "Decisiones conectadas con validacion",
    changes: [
      "Cada decision puede enlazar fases de roadmap y escenarios que permiten comprobarla.",
      "Los escenarios enlazados se pueden abrir directamente desde el laboratorio de decisiones.",
      "La validacion bloquea fases o escenarios referenciados que no existan en el explainer.",
    ],
  },
  {
    version: "0.79.0",
    date: "09 ago 2026",
    title: "Laboratorio de decisiones",
    changes: [
      "Los objetivos pueden declarar opciones técnicas con beneficios, trade-offs y evidencia.",
      "VCF incluye tres opciones autoradas: resiliencia, estandarización y evolución por oleadas.",
      "La validación exige al menos dos opciones y comprueba sus campos y fuentes.",
    ],
  },
  {
    version: "0.78.0",
    date: "09 ago 2026",
    title: "Roadmap incluido en resumen y ficha",
    changes: [
      "El resumen muestra cuantas fases del roadmap fueron revisadas.",
      "La ficha HTML exportada incluye estado, evidencia y criterio de salida de cada fase.",
      "La exportacion mantiene los limites conceptuales y no agrega datos remotos.",
    ],
  },
  {
    version: "0.77.0",
    date: "09 ago 2026",
    title: "Avance local del roadmap",
    changes: [
      "Las fases de assessment pueden marcarse como pendientes, revisadas o no aplicables durante una sesión.",
      "El estado se conserva localmente por explicación y escenario, sin backend ni datos de cliente.",
      "El contador del roadmap muestra el avance sin convertirlo en una puntuación de madurez.",
    ],
  },
  {
    version: "0.76.0",
    date: "09 ago 2026",
    title: "Motor de assessment y roadmap",
    changes: [
      "Los objetivos autorados pueden declarar fases de assessment con objetivo, evidencia y criterio de salida.",
      "La UI muestra el roadmap bajo demanda dentro de la comparacion actual/objetivo.",
      "La validacion comprueba fases duplicadas y fuentes inexistentes, y las regresiones cubren esos casos.",
    ],
  },
  {
    version: "0.75.0",
    date: "09 ago 2026",
    title: "Comando de validacion de contenido",
    changes: [
      "Se agrego npm run validate:content para ejecutar el content gate sin iniciar un build de Next.js.",
      "El comando carga el registro completo, ejecuta regresiones y confirma los 22 explainers revisados.",
      "La validacion queda disponible antes de abrir una rama o revisar un PR de contenido.",
    ],
  },
  {
    version: "0.74.0",
    date: "09 ago 2026",
    title: "Regresiones para objetivos autorados",
    changes: [
      "Se agregaron fixtures de build para objetivos completos, fuentes desconocidas y objetivos incompletos.",
      "La validacion del contrato se reutiliza fuera del registro para proteger futuras ediciones de contenido.",
      "El build ejecuta estas regresiones junto con las pruebas de integridad tecnica existentes.",
    ],
  },
  {
    version: "0.73.0",
    date: "09 ago 2026",
    title: "Validacion automatica de objetivos",
    changes: [
      "El build valida etiqueta, resumen, limites y cambios esperados de cada targetArchitecture.",
      "Las fuentes declaradas por un objetivo deben existir en el catalogo tecnico del explainer.",
      "Los errores de objetivos incompletos o referencias rotas bloquean la publicacion del contenido.",
    ],
  },
  {
    version: "0.72.0",
    date: "09 ago 2026",
    title: "Objetivos autorados para continuidad, seguridad, storage y plataforma",
    changes: [
      "Backup/DR, ransomware, SAN y Kubernetes declaran objetivos con cambios esperados y límites.",
      "La comparación actual/objetivo cubre ahora continuidad, ciberresiliencia, almacenamiento y cloud-native.",
      "Cada objetivo reutiliza fuentes técnicas existentes y evita promesas de sizing, compatibilidad o certificación.",
    ],
  },
  {
    version: "0.71.0",
    date: "09 ago 2026",
    title: "Objetivos autorados para observabilidad e integración",
    changes: [
      "Instana, Turbonomic y webMethods declaran objetivos de arquitectura con cambios esperados y límites.",
      "La comparación actual/objetivo mantiene la misma estructura para explicar plataforma, optimización e integración.",
      "Cada objetivo reutiliza fuentes existentes del explainer y no agrega promesas de sizing o compatibilidad.",
    ],
  },
  {
    version: "0.70.0",
    date: "09 ago 2026",
    title: "Objetivos de arquitectura autorados",
    changes: [
      "Los explainers pueden declarar una arquitectura objetivo con resumen, cambios esperados y limites.",
      "La comparacion actual/objetivo muestra el objetivo editorial cuando existe, sin inferir un diseño de cliente.",
      "VCF incorpora el primer objetivo explicito como referencia conceptual y trazable.",
    ],
  },
  {
    version: "0.69.0",
    date: "09 ago 2026",
    title: "Comparacion actual y objetivo",
    changes: [
      "Los escenarios muestran la topologia base documentada frente al estado resultante del fallo.",
      "La brecha resume componentes no disponibles y relaciones que dejan de estar activas.",
      "El objetivo se presenta como referencia del modelo, no como recomendacion automatica de arquitectura.",
    ],
  },
  {
    version: "0.68.0",
    date: "09 ago 2026",
    title: "Ficha de sesion exportable",
    changes: [
      "El resumen de un escenario se puede descargar como HTML autonomo desde el navegador.",
      "La ficha incluye checklist, hallazgos, fuentes y limites de la simulacion.",
      "La exportacion no envia informacion a un servidor y queda lista para imprimir o guardar como PDF.",
    ],
  },
  {
    version: "0.67.0",
    date: "09 ago 2026",
    title: "Resumen de sesion",
    changes: [
      "Cada escenario activo puede mostrar pasos revisados, hallazgos abiertos, criticos y fuentes enlazadas.",
      "El resumen propone el siguiente criterio de cierre sin afirmar que la infraestructura real este validada.",
      "La informacion permanece dentro del escenario y se mantiene compacta hasta que la audiencia la abre.",
    ],
  },
  {
    version: "0.66.0",
    date: "09 ago 2026",
    title: "Checklist de verificacion guiada",
    changes: [
      "Cada escenario con pasos guiados incluye una lista compacta para marcar evidencia revisada.",
      "El estado permite pendiente, revisado y no aplica, y se conserva localmente por explicacion y escenario.",
      "No se envian datos ni se presenta el checklist como ticket o certificacion del entorno.",
    ],
  },
  {
    version: "0.65.0",
    date: "09 ago 2026",
    title: "Fuentes enlazadas a los hallazgos",
    changes: [
      "Los hallazgos derivados del contrato tecnico conservan sus fuentes y componentes relacionados.",
      "Cada fuente se puede abrir bajo demanda desde el bloque Reglas y evidencia.",
      "La interfaz mantiene los enlaces ocultos hasta que la audiencia los solicita.",
    ],
  },
  {
    version: "0.64.0",
    date: "09 ago 2026",
    title: "Reglas por dominio en escenarios",
    changes: [
      "Los escenarios incorporan los diagnosticos del contrato tecnico de la escena y su dominio.",
      "Una relacion o camino requerido que falla se muestra con severidad, justificacion y recomendacion basada en la explicacion.",
      "La evidencia sigue siendo conceptual: no se ejecutan comandos ni se afirma que el entorno real este validado.",
    ],
  },
  {
    version: "0.63.0",
    date: "09 ago 2026",
    title: "Reglas técnicas y evidencia accionable",
    changes: [
      "Los escenarios what-if producen hallazgos críticos, advertencias e información según el impacto calculado.",
      "Cada hallazgo explica qué ocurre, qué evidencia revisar y qué decisión queda pendiente.",
      "La simulación mantiene límites explícitos: no hace sizing, no mide producción ni ejecuta recuperación.",
    ],
  },
  {
    version: "0.62.0",
    date: "09 ago 2026",
    title: "Análisis what-if sobre fallos",
    changes: [
      "Al activar un escenario se calculan relaciones interrumpidas y componentes que siguen siendo alcanzables.",
      "El panel identifica nodos disponibles que quedan sin camino desde una entrada del grafo.",
      "El análisis usa la topología real de la escena y deja claro que es una hipótesis conceptual, no una medición de producción.",
    ],
  },
  {
    version: "0.61.0",
    date: "09 ago 2026",
    title: "Modelo semántico de arquitectura",
    changes: [
      "El modo Técnico puede desplegar una lectura semántica de entradas, salidas, roles y relaciones de cada escena.",
      "La semántica se deriva del mismo animation spec que dibuja el canvas para evitar una segunda fuente de verdad.",
      "Los componentes quedan preparados para reglas de consistencia y análisis what-if en la siguiente fase.",
    ],
  },
  {
    version: "0.60.0",
    date: "06 ago 2026",
    title: "Glosario contextual en términos técnicos",
    changes: [
      "Siglas y términos frecuentes muestran una explicación sencilla al pasar el cursor o recibir foco.",
      "El glosario se aplica al texto principal, escenarios, fichas de nodo y diagnósticos sin duplicar párrafos.",
      "Las definiciones viven en un catálogo común para mantener el lenguaje consistente entre temas.",
    ],
  },
  {
    version: "0.59.0",
    date: "06 ago 2026",
    title: "UI simplificada y canvas con más espacio",
    changes: [
      "El panel izquierdo se puede redimensionar entre 320 y 560 px mediante una manija accesible.",
      "Cliente muestra solo el recorrido esencial; el detalle adicional permanece bajo demanda.",
      "Los escenarios de fallo empiezan minimizados, se ubican en la esquina superior derecha y tienen scroll propio para no tapar la gráfica.",
    ],
  },
  {
    version: "0.58.0",
    date: "06 ago 2026",
    title: "Vigencia temporal de fuentes",
    changes: [
      "Las fechas de revisión y consulta deben ser fechas ISO reales y no pueden estar en el futuro.",
      "Una fuente no puede haber sido consultada después de la fecha declarada de revisión del tema.",
      "Las fuentes marcadas review-needed quedan registradas como advertencias para la siguiente revisión.",
    ],
  },
  {
    version: "0.57.0",
    date: "06 ago 2026",
    title: "Escenarios con ciclo completo de diagnóstico",
    changes: [
      "Cada tema debe declarar al menos un escenario de fallo para poder publicarse.",
      "Los escenarios authored deben cubrir observar, diagnosticar, recuperar y validar; el resto usa el fallback común de cuatro fases.",
      "La Fase 5 documenta la cobertura de escenarios y mantiene explícito que la simulación no ejecuta cambios reales.",
    ],
  },
  {
    version: "0.56.0",
    date: "06 ago 2026",
    title: "Interacción accesible y movimiento respetuoso",
    changes: [
      "El canvas puede recibir foco y admite +, -, 0 para zoom y restablecimiento sin depender del ratón.",
      "Se respeta prefers-reduced-motion: la simulación pausa sus paquetes y se informa al usuario sin desactivar la interacción.",
      "Se añadieron etiquetas semánticas y una auditoría de accesibilidad como Fase 4.",
    ],
  },
  {
    version: "0.55.0",
    date: "06 ago 2026",
    title: "Resultado de aprendizaje por escena",
    changes: [
      "Cliente y Conceptual muestran un bloque compacto con el problema, recorrido y decisión que debe quedar clara.",
      "El bloque reutiliza tagline, caption y businessImpact validados; no crea una segunda fuente de contenido.",
      "La auditoría de experiencia para cliente y especialista queda documentada como Fase 3.",
    ],
  },
  {
    version: "0.54.0",
    date: "06 ago 2026",
    title: "Auditoría tecnológica automatizada",
    changes: [
      "El contrato visual valida nombres, posiciones, capacidades, emisiones y aristas duplicadas antes de publicar una escena.",
      "Los escenarios de fallo solo pueden referenciar nodos existentes; killable queda reservado para la interacción manual del canvas.",
      "Se corrigió una emisión declarada en Workloads sin salida en la escena two-domains; un nodo terminal ya no se presenta como emisor.",
    ],
  },
  {
    version: "0.53.0",
    date: "06 ago 2026",
    title: "Guía de lectura para principiantes",
    changes: [
      "Cliente y Conceptual incluyen una guía compacta para interpretar tarjetas, flechas, animación y escenarios de fallo.",
      "La interfaz aclara que el movimiento es conceptual, no telemetría en vivo, y que los fallos no ejecutan acciones sobre infraestructura real.",
      "La auditoría de comprensión de la Fase 1 queda documentada para repetirla y ampliarla en los siguientes ciclos.",
    ],
  },
  {
    version: "0.52.0",
    date: "06 ago 2026",
    title: "Fichas de nodo adaptadas a la audiencia",
    changes: [
      "Cliente y Conceptual muestran una lectura visual sencilla al seleccionar un componente del diagrama.",
      "Técnico conserva capacidad, emisión y simulación de falla para revisar el comportamiento del modelo.",
      "La misma ficha explica qué representa el nodo y qué papel cumple en la escena sin añadir campos libres al spec.",
    ],
  },
  {
    version: "0.51.0",
    date: "06 ago 2026",
    title: "Profundidad adaptativa de explicación",
    changes: [
      "Cada tema ofrece Cliente, Conceptual y Técnico para ajustar la profundidad a la persona que lo está viendo.",
      "Conceptual explica las relaciones principales sin mostrar toda la auditoría técnica; Técnico conserva evidencia, fuentes y límites.",
      "Los enlaces directos aceptan mode=client, mode=conceptual o mode=technical sin duplicar contenido ni alterar el modelo visual.",
    ],
  },
  {
    version: "0.50.0",
    date: "05 ago 2026",
    title: "Marca CORESOLUTIONS consistente",
    changes: [
      "La marca visible se presenta como CORESOLUTIONS en la portada, dashboard, explicaciones, metadatos y fuentes.",
      "La documentación de producto, contexto de IA y changelog usa la misma grafía para futuras sesiones.",
      "Se conservan nombres técnicos, rutas, URLs y claves internas en minúsculas para evitar romper integraciones.",
    ],
  },
  {
    version: "0.49.0",
    date: "05 ago 2026",
    title: "Favoritos y progreso local",
    changes: [
      "Cada tema permite guardarse como Favorito y marcarse como Revisado.",
      "El estado queda en el navegador por tema, sin cuentas, backend ni consumo adicional de Vercel.",
      "Los controles son accesibles con teclado y mantienen su estado aunque se cambie de escena.",
    ],
  },
  {
    version: "0.48.0",
    date: "05 ago 2026",
    title: "Modo Cliente limpio en el canvas",
    changes: [
      "Cliente muestra el diagrama con zoom, paneo y reproducción como acciones principales.",
      "Leyenda, capas, escenarios de fallo e integridad técnica quedan agrupados en Más herramientas y se revelan solo cuando hacen falta.",
      "Si hay un escenario o una alerta de integridad activa, la herramienta secundaria se abre para no ocultar contexto importante.",
    ],
  },
  {
    version: "0.47.0",
    date: "05 ago 2026",
    title: "Modo cliente y canvas más legibles",
    changes: [
      "El modo Cliente prioriza la idea clave y el valor para el cliente; el detalle técnico queda disponible bajo demanda.",
      "La trazabilidad se expande dentro de la columna y mantiene sus fuentes legibles, sin quedar cortada por un popover fuera del flujo.",
      "Los nodos calculan su tamaño a partir del texto y usan varias líneas cuando hace falta; conexiones, selección y controles respetan la misma geometría.",
    ],
  },
  {
    version: "0.46.0",
    date: "05 ago 2026",
    title: "Catálogo documental con vigencia visible",
    changes: [
      "La trazabilidad muestra publisher, producto, versión o referencia, fecha de consulta y vigencia de cada fuente.",
      "El registro completa metadatos de forma determinista y evita inventar una versión cuando el documento no la declara.",
      "Las fuentes fuera de la ventana de revisión quedan marcadas para volver a contrastarlas antes de presentarlas como evidencia actual.",
    ],
  },
  {
    version: "0.45.0",
    date: "05 ago 2026",
    title: "Plataforma y operación con fuentes por escena",
    changes: [
      "vSphere HA, Kubernetes, Migración e Implementation Lifecycle pasan a contratos source-backed.",
      "Las escenas enlazan capacidad, compatibilidad, scheduling, dependencias, pruebas y aceptación con sus fuentes técnicas.",
      "El catálogo mantiene explícitos los límites: el diagrama orienta el diagnóstico, pero no sustituye la validación del entorno.",
    ],
  },
  {
    version: "0.44.0",
    date: "05 ago 2026",
    title: "Red y seguridad con fuentes por escena",
    changes: [
      "LAN/SAN, SD-WAN, Zero Trust, Ransomware Resilience y Check Point HA pasan a contratos source-backed.",
      "Cada escena enlaza su camino de datos, control o protección con documentación técnica oficial y conserva los límites de la demo.",
      "La validación bloquea fuentes inexistentes para que el estado de trazabilidad sea verificable y no ornamental.",
    ],
  },
  {
    version: "0.43.0",
    date: "05 ago 2026",
    title: "Storage y continuidad con fuentes por escena",
    changes: [
      "vSAN, Backup/DR, SAN Storage, Veeam Protection, Active-Active DC, NAS/Private Cloud e IBM Power/AIX pasan a contratos source-backed.",
      "Cada escena enlaza sus relaciones y caminos críticos con documentación técnica específica del fabricante o estándar correspondiente.",
      "La validación conserva el bloqueo de referencias inexistentes para que la trazabilidad visible no sea decorativa.",
    ],
  },
  {
    version: "0.42.0",
    date: "05 ago 2026",
    title: "Batch fuente-backed de observabilidad e IBM",
    changes: [
      "Observability, Instana, Turbonomic y webMethods pasan de cobertura base a reglas con fuentes específicas por escena.",
      "El panel puede enlazar esas fuentes desde los diagnósticos y conserva la diferencia entre evidencia documental y revisión especialista.",
      "La validación bloquea referencias a fuentes inexistentes para evitar trazabilidad falsa.",
    ],
  },
  {
    version: "0.41.0",
    date: "05 ago 2026",
    title: "Regresiones técnicas protegidas",
    changes: [
      "El build ejecuta fixtures que comprueban un caso válido y mutaciones de nodos, relaciones, caminos, fallos y aristas colgantes.",
      "Si una modificación rompe la capacidad de detectar alguno de esos problemas, la publicación queda bloqueada.",
      "La suite protege el evaluador sin consultar una infraestructura real ni introducir datos de clientes.",
    ],
  },
  {
    version: "0.40.0",
    date: "05 ago 2026",
    title: "Impacto de fallos visible al instante",
    changes: [
      "El panel de integridad se abre automáticamente al activar un escenario o apagar un nodo manualmente.",
      "La persona ve de inmediato los componentes inactivos, los caminos afectados y el siguiente paso sugerido.",
      "El panel vuelve a su estado compacto cuando la escena queda sin una simulación activa ni errores.",
    ],
  },
  {
    version: "0.39.0",
    date: "05 ago 2026",
    title: "Siguiente paso para cada hallazgo",
    changes: [
      "Cada diagnóstico técnico muestra una recomendación conceptual para revisar, reconectar, recuperar o validar la dependencia afectada.",
      "Las recomendaciones se separan de las fuentes y del foco de nodos para mantener la interacción clara.",
      "El sistema no ejecuta cambios: orienta la conversación hacia el runbook o la comprobación que debe realizar el equipo.",
    ],
  },
  {
    version: "0.38.0",
    date: "05 ago 2026",
    title: "Integridad conectada a fallos simulados",
    changes: [
      "El panel identifica los nodos inactivos de un escenario o de una falla manual.",
      "Los caminos técnicos se recalculan excluyendo esos nodos y muestran cuándo la simulación interrumpe la ruta explicada.",
      "La explicación mantiene claro que se trata de un impacto conceptual, no de una comprobación sobre la red real.",
    ],
  },
  {
    version: "0.37.0",
    date: "05 ago 2026",
    title: "Evidencia directa en diagnósticos",
    changes: [
      "Los diagnósticos con fuentes asociadas muestran enlaces directos a la documentación técnica correspondiente.",
      "La evidencia queda separada de la acción de enfocar nodos para conservar una interacción accesible y clara.",
      "La navegación abre la fuente en otra pestaña y mantiene la explicación actual en contexto.",
    ],
  },
  {
    version: "0.36.0",
    date: "05 ago 2026",
    title: "Profundidad de revisión visible",
    changes: [
      "Cada contrato declara si su cobertura es base o de revisión profunda para evitar sobreinterpretar el resultado.",
      "El panel muestra el dominio y la profundidad de la comprobación junto al estado técnico.",
      "El quality gate valida que todos los perfiles declaren explícitamente ese nivel.",
    ],
  },
  {
    version: "0.35.0",
    date: "05 ago 2026",
    title: "Diagnóstico de componentes aislados",
    changes: [
      "El motor detecta nodos sin relaciones y aristas que apuntan a componentes inexistentes dentro de una escena.",
      "Los componentes aislados aparecen como advertencia para no confundir un dibujo incompleto con una arquitectura válida.",
      "Las escenas cuyo objetivo es explicar aislamiento pueden desactivar esta comprobación de forma explícita en su contrato.",
    ],
  },
  {
    version: "0.34.0",
    date: "05 ago 2026",
    title: "Quality gate de integridad técnica",
    changes: [
      "El build exige un contrato técnico para cada escena de cada explainer del catálogo.",
      "Las reglas ahora se comprueban contra los nodos reales del animation spec para detectar referencias obsoletas o mal escritas.",
      "Un tema nuevo no puede registrarse sin un perfil de integridad; la auditoría continúa siendo del modelo representado, no de una plataforma en vivo.",
    ],
  },
  {
    version: "0.33.0",
    date: "05 ago 2026",
    title: "Integridad técnica para todo el catálogo",
    changes: [
      "Los 22 explainers declaran ahora un contrato técnico por escena con componentes, relaciones y caminos mínimos esperados.",
      "El panel adapta su etiqueta al dominio —red, virtualización, storage, seguridad, observabilidad, continuidad, delivery o aplicación— sin presentarse como monitorización en vivo.",
      "El registro adjunta y valida los perfiles de forma centralizada para que cada nuevo tema nazca con una comprobación semántica mínima.",
    ],
  },
  {
    version: "0.32.0",
    date: "05 ago 2026",
    title: "Integridad técnica del modelo de red",
    changes: [
      "VCF y NSX declaran contratos de red para comprobar componentes, relaciones y caminos esperados por escena.",
      "El canvas muestra el estado de integridad técnica y permite resaltar los nodos asociados a un diagnóstico.",
      "La validación distingue el modelo representado de la monitorización de una red real y conserva las fuentes de cada regla.",
    ],
  },
  {
    version: "0.31.0",
    date: "05 ago 2026",
    title: "Canvas más despejado y paneles movibles",
    changes: [
      "La leyenda y los escenarios de fallo se pueden arrastrar dentro del espacio del diagrama.",
      "La explicación izquierda usa una jerarquía más compacta para priorizar escena, narrativa e impacto.",
      "El arrastre está limitado al canvas y conserva los controles de zoom, simulación y diagnóstico.",
    ],
  },
  {
    version: "0.30.0",
    date: "05 ago 2026",
    title: "Interfaz compacta para presentar y explorar",
    changes: [
      "Se compactaron el nivel de explicación, el enlace de escena, las marcas y la trazabilidad en la cabecera del tema.",
      "Cada explicación incluye un acceso directo para volver al dashboard de temas; el modo presentación ocupa menos espacio.",
      "La leyenda del diagrama inicia minimizada y el control global de versión es más discreto.",
    ],
  },
  {
    version: "0.29.0",
    date: "05 ago 2026",
    title: "Diagnóstico guiado con evidencia",
    changes: [
      "VCF incorpora checkpoints para contrastar hipótesis sobre HA, capacidad, storage y separación entre gestión y camino de datos.",
      "Las fases authored muestran fuentes técnicas, feedback de la opción elegida y un foco alternativo del diagrama.",
      "El validador comprueba fuentes por fase, opciones de decisión y una única lectura recomendada por checkpoint.",
    ],
  },
  {
    version: "0.28.0",
    date: "05 ago 2026",
    title: "Motor de escenarios guiados",
    changes: [
      "Se añadieron fases de observación, diagnóstico, recuperación y validación para recorrer fallos con una narrativa didáctica.",
      "El diagrama enfoca nodos y relaciones relevantes para la fase activa; el panel conserva evidencia, resultado esperado y limitaciones.",
      "Los escenarios existentes usan una guía base compatible y los nuevos pueden declarar pasos authored con focusNodeIds.",
    ],
  },
  {
    version: "0.27.0",
    date: "05 ago 2026",
    title: "Explainers IBM para observabilidad, optimización e integración",
    changes: [
      "Se añadieron los explainers de IBM Instana, IBM Turbonomic e IBM webMethods.",
      "Cada tema incluye cinco escenas, cuatro escenarios de fallo, fuentes primarias revisadas el 2026-08-05 y límites de edición, release y cobertura.",
      "El portafolio y el contexto de marcas ahora contemplan estas tres familias de software IBM para futuras sesiones y propuestas.",
    ],
  },
  {
    version: "0.26.0",
    date: "05 ago 2026",
    title: "Batch de continuidad, seguridad y delivery",
    changes: [
      "Se añadieron cinco explainers: migración sin interrupción, Check Point HA, SD-WAN, IBM Power/AIX y ciclo de implementación.",
      "Cada tema incluye cinco escenas, cuatro escenarios de fallo, contexto de marcas y fuentes primarias revisadas el 2026-08-05.",
      "El batch amplía la conversación desde componentes aislados hacia migración, cargas críticas, conectividad multisede y adopción del cliente.",
    ],
  },
  {
    version: "0.25.0",
    date: "05 ago 2026",
    title: "Deploys manuales para proteger la cuota de Vercel",
    changes: [
      "Se desactivaron los deployments automáticos de Git mediante vercel.json.",
      "Se documentó el flujo de validación local y publicación manual por batch.",
      "Los PRs y merges ya no deben consumir deployments de Vercel automáticamente.",
    ],
  },
  {
    version: "0.24.0",
    date: "04 ago 2026",
    title: "Batch de explainers de infraestructura",
    changes: [
      "Se añadieron cuatro temas: protección heterogénea con Veeam, data center activo-activo, integración LAN/SAN y NAS como servicio de archivos.",
      "Cada tema incluye cinco escenas, cuatro escenarios de fallo, storyboard y matriz técnica con fuentes revisadas el 2026-08-04.",
      "El batch amplía el catálogo desde Storage SAN hacia backup, continuidad, redes y servicios de archivos basados en proyectos reales.",
    ],
  },
  {
    version: "0.20.0",
    date: "04 ago 2026",
    title: "Explainer de Storage SAN empresarial",
    changes: [
      "Nuevo tema con cinco escenas sobre capas SAN, provisionamiento, host mapping, multipath, migración y replicación.",
      "Escenarios interactivos para pérdida de fabric, mapping incorrecto, pool al límite y lag de replicación.",
      "Se añadió la categoría Storage y una matriz técnica basada en documentación IBM y Lenovo revisada el 2026-08-04.",
    ],
  },
  {
    version: "0.19.0",
    date: "04 ago 2026",
    title: "Contexto de proyectos reales de CORESOLUTIONS",
    changes: [
      "Se documentaron patrones sanitizados de implementaciones reales: storage, SAN, VMware, Veeam, redes, seguridad, IBM Power, NAS y alta disponibilidad.",
      "Se añadió un backlog priorizado de explainers basado en tareas recurrentes de proyectos.",
      "El resumen evita nombres de clientes, correos y enlaces operativos del CSV original.",
    ],
  },
  {
    version: "0.18.0",
    date: "04 ago 2026",
    title: "Explainer de resiliencia frente a ransomware",
    changes: [
      "Nuevo tema con cinco escenas sobre prevención, detección, contención, recuperación limpia y validación.",
      "Escenarios interactivos para movimiento lateral, detección tardía, backups expuestos y restore sin validar.",
      "Matriz técnica basada en CISA, Check Point, Veeam e IBM FlashSystem, con límites explícitos frente al tema Backup/DR.",
    ],
  },
  {
    version: "0.17.0",
    date: "04 ago 2026",
    title: "Contexto de marcas por explicación",
    changes: [
      "Cada tema declara las marcas CORESOLUTIONS relacionadas, su función y el límite de la afirmación.",
      "La interfaz muestra una ficha Marcas del patrón en todos los explainers.",
      "El quality gate bloquea temas sin contexto de marca completo y se documentó el contrato para futuras sesiones.",
    ],
  },
  {
    version: "0.16.0",
    date: "04 ago 2026",
    title: "Explainer de Backup y Disaster Recovery alineado al portafolio",
    changes: [
      "Nuevo tema con cinco escenas sobre RPO/RTO, protección Veeam sobre VMware/VCF y Lenovo, copias protegidas IBM, recuperación y pruebas.",
      "Escenarios interactivos para job fallido, repositorio no disponible, lag de replicación y restore no probado.",
      "Se documentó el portafolio de marcas CORESOLUTIONS, la fecha de revisión y la matriz de fuentes técnicas del tema.",
    ],
  },
  {
    version: "0.15.0",
    date: "04 ago 2026",
    title: "Modos de audiencia y enlaces directos",
    changes: [
      "Cada explicación puede alternar entre una vista orientada a cliente y una ficha técnica de la escena.",
      "Los enlaces pueden abrir una escena y un escenario de fallo concretos.",
      "El botón de compartir copia el contexto actual, incluido el modo de audiencia.",
    ],
  },
  {
    version: "0.14.0",
    date: "04 ago 2026",
    title: "Explainer independiente de Observabilidad",
    changes: [
      "Nuevo tema con cinco escenas sobre recorridos distribuidos, señales, Collector, correlación y límites operativos.",
      "Escenarios interactivos para latencia, caída del Collector, descarte de telemetría y cardinalidad excesiva.",
      "Storyboard y matriz de validación basados en la documentación oficial actual de OpenTelemetry y Prometheus.",
    ],
  },
  {
    version: "0.13.2",
    date: "04 ago 2026",
    title: "Evidencia técnica por escena",
    changes: [
      "Cada escena declara las fuentes concretas que respaldan su narrativa y diagrama.",
      "La ficha de trazabilidad separa las fuentes de la escena de las fuentes generales del tema.",
      "El quality gate valida IDs únicos y referencias existentes antes de publicar.",
    ],
  },
  {
    version: "0.13.1",
    date: "04 ago 2026",
    title: "Trazabilidad técnica por explicación",
    changes: [
      "Cada explicación muestra la fecha de última revisión y el alcance de versiones o conceptos comprobado.",
      "Las fuentes primarias aparecen con enlaces directos y fecha de consulta.",
      "El quality gate bloquea temas sin metadatos de trazabilidad válidos.",
    ],
  },
  {
    version: "0.13.0",
    date: "04 ago 2026",
    title: "Explainer independiente de Kubernetes",
    changes: [
      "Nuevo tema con cinco escenas sobre estado deseado, scheduling, Services, rollouts y recuperación.",
      "Escenarios interactivos para falla de nodo, readiness, descarga de imágenes y recursos insuficientes.",
      "Storyboard y matriz de validación basados en la documentación oficial de Kubernetes.",
    ],
  },
  {
    version: "0.12.0",
    date: "04 ago 2026",
    title: "Explainer independiente de Zero Trust",
    changes: [
      "Nuevo tema con cinco escenas sobre solicitudes, contexto, decisión, enforcement y límites.",
      "Escenarios interactivos para identidad comprometida, dispositivo no confiable, política amplia y telemetría ausente.",
      "Storyboard y matriz de validación basados en NIST SP 800-207 y CISA Zero Trust Maturity Model.",
    ],
  },
  {
    version: "0.11.1",
    date: "04 ago 2026",
    title: "Controles de interfaz más limpios",
    changes: [
      "El panel de escenarios de fallo ahora puede minimizarse sin perder el escenario activo.",
      "Se retiraron los CTAs comerciales de todos los ejemplos y del contrato de contenido.",
      "Se actualizaron las guías de contenido, marca y contexto para reflejar la navegación técnica.",
    ],
  },
  {
    version: "0.11.0",
    date: "04 ago 2026",
    title: "Explainer independiente de NSX",
    changes: [
      "Nuevo tema con cinco escenas sobre segmentos, overlay, firewall distribuido y gateways.",
      "Escenarios interactivos para underlay/MTU, scope de reglas, gateway y seguridad de segmentos.",
      "Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.",
    ],
  },
  {
    version: "0.10.0",
    date: "04 ago 2026",
    title: "Explainer independiente de vSAN",
    changes: [
      "Nuevo tema con cinco escenas sobre datastore distribuido, objetos y políticas de storage.",
      "Escenarios interactivos para fallas de host/disco, capacidad, fault domains y red vSAN.",
      "Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.",
    ],
  },
  {
    version: "0.9.0",
    date: "04 ago 2026",
    title: "Explainer independiente de vSphere HA",
    changes: [
      "Nuevo tema con cinco escenas: protección, falla, decisión, reinicio y límites.",
      "Escenarios interactivos para capacidad, visibilidad de storage y restricciones de políticas.",
      "Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.",
    ],
  },
  {
    version: "0.8.0",
    date: "04 ago 2026",
    title: "Lenguaje visual de diagramas",
    changes: [
      "Relaciones semánticas para distinguir datos, control, storage, dependencias y fallos.",
      "Leyenda interactiva con filtros de capas y relaciones por escena.",
      "Validación del tipo de cada arista antes de publicar una explicación.",
    ],
  },
  {
    version: "0.7.0",
    date: "04 ago 2026",
    title: "Control de calidad de contenido",
    changes: [
      "Validación de estructura, profundidad narrativa y referencias visuales antes de registrar un tema.",
      "Cada explicación declara storyboard, matriz técnica y estado de revisión.",
      "Los errores de contenido hacen fallar la compilación; las revisiones pendientes quedan explícitas.",
    ],
  },
  {
    version: "0.6.0",
    date: "04 ago 2026",
    title: "Modo presentación guiada",
    changes: [
      "Modo presentación con reproducción automática, pausa y reinicio.",
      "Navegación por teclado para avanzar, retroceder y salir de la presentación.",
      "La reproducción se detiene al cambiar manualmente de paso o llegar al final.",
    ],
  },
  {
    version: "0.5.0",
    date: "04 ago 2026",
    title: "Escenarios interactivos de fallo",
    changes: [
      "Escenarios guiados para fallas de uno o varios hosts y del plano de gestión.",
      "Cada escenario explica su efecto, nodos afectados y límites técnicos.",
      "La simulación se puede restaurar y se reinicia al cambiar de escena.",
    ],
  },
  {
    version: "0.4.0",
    date: "04 ago 2026",
    title: "Relaciones visibles",
    changes: [
      "Hover sobre un nodo para resaltar sus conexiones y componentes relacionados.",
      "Los elementos no relacionados se atenúan para concentrar la atención.",
      "El resaltado funciona con pan, zoom y escenas independientes.",
    ],
  },
  {
    version: "0.3.1",
    date: "04 ago 2026",
    title: "Precisión técnica de VCF",
    changes: [
      "Se revisaron copy, storyboard y topología contra fuentes oficiales.",
      "Se eliminaron afirmaciones absolutas sobre consola única, SLA y failover.",
      "Se separaron el camino de datos, el clúster de cómputo y la gestión de VCF.",
    ],
  },
  {
    version: "0.3.0",
    date: "04 ago 2026",
    title: "Detalle de componentes",
    changes: [
      "Clic en una tarjeta para consultar su función y tipo dentro de la arquitectura.",
      "Ficha contextual con capacidades, emisión y simulación de falla cuando aplica.",
      "La selección se reinicia al cambiar de escena y el clic fuera de un nodo la cierra.",
    ],
  },
  {
    version: "0.2.0",
    date: "04 ago 2026",
    title: "Navegación y trazabilidad",
    changes: [
      "Pan, zoom y restablecimiento de vista en los diagramas.",
      "Indicador global de versión y changelog accesible desde la aplicación.",
      "Documentación de interacción del canvas y de versionado para futuras sesiones.",
    ],
  },
  {
    version: "0.1.0",
    date: "04 ago 2026",
    title: "Prototipo técnico inicial",
    changes: [
      "Explicador interactivo de VMware Cloud Foundation con cuatro pasos.",
      "Simulación de paquetes, capacidad y falla controlada de nodos.",
      "Catálogo de temas, modo claro/oscuro y estructura documental para IA.",
    ],
  },
];
