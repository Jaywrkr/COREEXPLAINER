import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const ransomwareFailureScenarios: FailureScenario[] = [
  {
    id: "lateral-movement",
    sceneId: "containment",
    label: "Movimiento lateral no contenido",
    summary: "La cuenta o endpoint comprometido puede alcanzar más segmentos.",
    detail:
      "La segmentación y el mínimo privilegio reducen el radio de explosión, pero solo si las rutas, identidades y reglas están correctamente definidas. La contención debe preservar evidencia y coordinarse con el plan de respuesta.",
    limitation:
      "El diagrama no ejecuta una cuarentena ni evalúa una regla de firewall; representa el riesgo de una política amplia o una dependencia no inventariada.",
    affectedNodes: ["segmentation", "workloads"],
    deadNodeIds: ["segmentation"],
  },
  {
    id: "detection-gap",
    sceneId: "detection",
    label: "La detección llega tarde",
    summary: "El cambio anómalo no genera una señal accionable a tiempo.",
    detail:
      "La detección puede apoyarse en endpoint, red, identidad y storage. Un volumen de señales sin dueño, retención o procedimiento de escalamiento no equivale a una respuesta efectiva.",
    limitation:
      "La animación no mide dwell time, falsos positivos ni cobertura de sensores; esos indicadores deben salir de la operación real.",
    affectedNodes: ["detection", "security-ops"],
    deadNodeIds: ["detection"],
  },
  {
    id: "backup-exposed",
    sceneId: "recovery",
    label: "La cuenta comprometida alcanza los backups",
    summary: "Las copias accesibles pueden ser borradas o cifradas.",
    detail:
      "CISA recomienda copias offline o inmutables y pruebas periódicas. Separar credenciales, repositorios y dominios de administración es parte del diseño, no un detalle posterior al incidente.",
    limitation:
      "El escenario no comprueba permisos, inmutabilidad ni ransomware; solo marca que la ruta hacia la copia no está suficientemente aislada.",
    affectedNodes: ["veeam", "immutable-copy"],
    deadNodeIds: ["immutable-copy"],
  },
  {
    id: "restore-contaminated",
    sceneId: "learning",
    label: "Se restaura sin validar limpieza",
    summary: "El punto elegido o la imagen recuperada conserva compromiso.",
    detail:
      "La recuperación debe seleccionar un punto confiable, reconstruir dependencias y validar la aplicación antes de devolverla a producción. Restaurar rápido sin criterios puede reintroducir el incidente.",
    limitation:
      "La demo no escanea una imagen ni certifica que un punto de restauración esté limpio; eso requiere controles y procedimientos del cliente.",
    affectedNodes: ["clean-room", "verification"],
    deadNodeIds: ["verification"],
  },
];

export const ransomwareResilienceMeta: ExplainerMeta = {
  chip: "Ciberresiliencia · Ransomware",
  title: "Cómo reducir el radio de explosión y recuperar con confianza",
  tagline:
    "Una explicación visual del ciclo prevención → detección → contención → recuperación limpia, alineada al portafolio de CoreSolutions.",
  brandContext: brandContext.ransomware,
  storyboardDoc: "docs/examples/ransomware-resilience/storyboard.md",
  technicalValidationDoc: "docs/ai-context/ransomware-resilience-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope:
      "Patrón conceptual revisado con CISA StopRansomware Guide (actualización 2023 y advisories 2025), Check Point Anti-Ransomware, Veeam Backup & Replication 13 e IBM FlashSystem 9.1.1; confirmar productos, cobertura, releases y procedimientos del cliente.",
    sources: [
      { id: "cisa-guide", title: "CISA StopRansomware Guide", url: "https://www.cisa.gov/stopransomware/ransomware-guide", accessedAt: "2026-08-04" },
      { id: "cisa-advisory", title: "CISA advisory: offline, encrypted and immutable backups", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-352a", accessedAt: "2026-08-04" },
      { id: "cisa-2025", title: "CISA StopRansomware advisory 2025", url: "https://www.cisa.gov/sites/default/files/2025-07/aa25-203a-stopransomware-interlock-072225.pdf", accessedAt: "2026-08-04" },
      { id: "checkpoint-ransomware", title: "Check Point: Anti-Ransomware", url: "https://www.checkpoint.com/solutions/ransomware-protection/anti-ransomware/", accessedAt: "2026-08-04" },
      { id: "veeam-immutability", title: "Veeam: immutability for backup files", url: "https://helpcenter.veeam.com/docs/vbr/userguide/immutability_hv.html?ver=13", accessedAt: "2026-08-04" },
      { id: "veeam-repository", title: "Veeam: backup repositories", url: "https://helpcenter.veeam.com/docs/vbr/userguide/backup_repository.html", accessedAt: "2026-08-04" },
      { id: "ibm-ransomware", title: "IBM FlashSystem 9.1.1: ransomware threat detection", url: "https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=guide-whats-new-in-911", accessedAt: "2026-08-04" },
      { id: "ibm-security", title: "IBM FlashSystem: Safeguarded Copy and security overview", url: "https://www.ibm.com/docs/en/flashsystem-9x00/9.1.2?topic=security-overview", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: ransomwareFailureScenarios,
};

export const ransomwareResilienceSteps: ExplainerStep[] = [
  {
    id: "prevention",
    tag: "01 — PREVENCIÓN",
    title: "La primera capa reduce las oportunidades de entrada",
    paragraphs: [
      "La prevención combina visibilidad de exposición, protección de endpoint y correo, identidad fuerte, parches, mínimos privilegios y segmentación. Check Point describe este enfoque como varias capas, no como un único control.",
      "En una plataforma VMware/Broadcom sobre Lenovo, el inventario de workloads, las rutas de red Aruba HPE y las políticas de seguridad deben mantenerse coherentes para que una cuenta comprometida no tenga alcance ilimitado.",
    ],
    businessImpact: "La pregunta pasa de “¿qué antivirus tenemos?” a “¿qué caminos puede usar un atacante y qué control corta cada uno?”",
    sceneId: "prevention",
    caption: "Exposición → identidad → endpoint → red → workload",
    sourceIds: ["checkpoint-ransomware", "cisa-guide"],
  },
  {
    id: "detection",
    tag: "02 — DETECCIÓN",
    title: "Una señal útil conecta actividad, datos y responsable",
    paragraphs: [
      "El cifrado masivo, cambios anómalos en volúmenes, accesos fuera de patrón y señales de endpoint pueden aparecer en capas distintas. La operación necesita correlación, retención y un dueño que sepa cuándo escalar.",
      "IBM documenta capacidades de detección de amenazas de ransomware en FlashSystem 9.1.1; esa señal ayuda a investigar el volumen afectado, pero no reemplaza los controles de endpoint, red o identidad.",
    ],
    businessImpact: "Detectar antes reduce la cantidad de datos expuestos y acorta el tiempo entre el primer indicio y la contención.",
    sceneId: "detection",
    caption: "Endpoint + red + identidad + storage → señal investigable",
    sourceIds: ["ibm-ransomware", "checkpoint-ransomware", "cisa-guide"],
  },
  {
    id: "containment",
    tag: "03 — CONTENCIÓN",
    title: "Aislar rápido sin perder el control del incidente",
    paragraphs: [
      "La contención puede aislar un endpoint, bloquear una cuenta, restringir rutas entre segmentos y separar la administración de backups. Debe coordinarse con el equipo de respuesta para conservar evidencia y evitar daños colaterales.",
      "Una regla demasiado amplia o una dependencia no documentada puede permitir movimiento lateral. La animación hace visible la frontera de contención; no ejecuta cuarentenas ni modifica firewalls.",
    ],
    businessImpact: "La resiliencia se mide también por el radio de explosión: cuántos workloads y repositorios quedan fuera del alcance del incidente.",
    sceneId: "containment",
    caption: "Señal → decisión → aislamiento de identidad, red y workloads",
    sourceIds: ["checkpoint-ransomware", "cisa-guide", "cisa-2025"],
  },
  {
    id: "recovery",
    tag: "04 — RECUPERACIÓN",
    title: "Las copias deben sobrevivir al mismo incidente",
    paragraphs: [
      "CISA recomienda mantener backups offline o inmutables y probar regularmente su disponibilidad e integridad. Veeam documenta repositorios donde los archivos pueden quedar temporalmente inmutables, sujetos a configuración y licencia.",
      "IBM FlashSystem puede aportar copias protegidas y políticas de snapshot; el diseño debe separar credenciales, administración y dominios de fallo. Una copia existente no demuestra que la aplicación pueda volver a operar.",
    ],
    businessImpact: "La recuperación no depende solo de tener más copias, sino de que el atacante no pueda modificar las copias y de que sepamos restaurarlas.",
    sceneId: "recovery",
    caption: "Incidente → copia confiable → sala limpia → servicio recuperado",
    sourceIds: ["cisa-advisory", "cisa-2025", "veeam-immutability", "veeam-repository", "ibm-security"],
  },
  {
    id: "learning",
    tag: "05 — VALIDACIÓN",
    title: "La prueba convierte controles en ciberresiliencia",
    paragraphs: [
      "Después de contener, el equipo debe determinar qué ocurrió, elegir un punto confiable, reconstruir en un entorno limpio, validar dependencias y documentar criterios de retorno. El plan de respuesta incluye comunicación y decisiones, no solo tecnología.",
      "Activa un fallo para descubrir huecos: detección tardía, backups alcanzables, contención incompleta o restore sin validación. El ejercicio debe repetirse y producir acciones concretas.",
    ],
    businessImpact: "La madurez se demuestra con ejercicios repetibles, métricas y decisiones aprendidas; no con una lista de productos instalada.",
    sceneId: "learning",
    caption: "Ejercicio → evidencia → ajuste de controles → próxima prueba",
    sourceIds: ["cisa-guide", "cisa-advisory", "checkpoint-ransomware", "ibm-security"],
  },
];
