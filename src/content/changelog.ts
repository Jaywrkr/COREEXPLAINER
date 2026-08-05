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
export const currentVersion = "0.38.0";

export const changelogEntries: ChangelogEntry[] = [
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
    title: "Contexto de proyectos reales de CoreSolutions",
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
      "Cada tema declara las marcas CoreSolutions relacionadas, su función y el límite de la afirmación.",
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
      "Se documentó el portafolio de marcas CoreSolutions, la fecha de revisión y la matriz de fuentes técnicas del tema.",
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
