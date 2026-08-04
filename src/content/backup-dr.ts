import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";

export const backupDrFailureScenarios: FailureScenario[] = [
  {
    id: "backup-job-failure",
    sceneId: "limits",
    label: "El job de backup falla",
    summary: "La ventana termina sin un punto de recuperación válido.",
    detail:
      "Un job puede fallar por credenciales, snapshots, proxy, red, capacidad o consistencia de la carga. La cadena de protección debe alertar y reintentar según la política, pero no debe asumir que un job fallido produjo una copia utilizable.",
    limitation:
      "El diagrama no diagnostica la causa ni calcula un RPO real; hay que revisar el historial del job, la aplicación y las dependencias.",
    affectedNodes: ["backup-job", "veeam-repository"],
    deadNodeIds: ["backup-job"],
  },
  {
    id: "repository-unavailable",
    sceneId: "limits",
    label: "Repositorio no disponible",
    summary: "La copia existe, pero el destino no puede leerse durante la recuperación.",
    detail:
      "Un repositorio endurecido, object storage o cabina puede estar aislado, lleno o temporalmente fuera de servicio. La redundancia debe considerar dominios de fallo distintos, no solo otra carpeta en el mismo sitio.",
    limitation:
      "La animación no prueba permisos, ransomware ni la configuración de inmutabilidad; esos controles se verifican con evidencias y restauraciones controladas.",
    affectedNodes: ["veeam-repository", "ibm-flashsystem"],
    deadNodeIds: ["veeam-repository"],
  },
  {
    id: "replication-lag",
    sceneId: "limits",
    label: "La réplica está atrasada",
    summary: "El sitio alterno no representa el último estado esperado.",
    detail:
      "La replicación sincrónica o asíncrona tiene condiciones distintas. Ancho de banda, latencia, cambios de datos y ventanas de mantenimiento pueden aumentar la distancia entre origen y destino.",
    limitation:
      "No se simula una métrica de lag ni se promete cero pérdida de datos; el RPO debe medirse y aceptarse para cada workload.",
    affectedNodes: ["replication", "alternate-site"],
    deadNodeIds: ["replication"],
  },
  {
    id: "restore-not-tested",
    sceneId: "limits",
    label: "La restauración nunca se probó",
    summary: "Hay copias, pero no evidencia de que la aplicación vuelva a operar.",
    detail:
      "Una prueba madura valida arranque, consistencia de aplicación, DNS, identidad, red, seguridad, datos y criterios de aceptación. CISA recomienda mantener copias offline o inmutables y probar la restauración regularmente.",
    limitation:
      "El botón solo marca el punto de verificación pendiente; no ejecuta una recuperación ni certifica un RTO.",
    affectedNodes: ["verification", "application"],
    deadNodeIds: ["verification"],
  },
];

export const backupDrMeta: ExplainerMeta = {
  chip: "Continuidad · Backup y DR",
  title: "De una copia a una recuperación comprobable",
  tagline:
    "Una explicación visual de RPO/RTO, backup, copias protegidas, replicación y pruebas de recuperación con el portafolio CoreSolutions como contexto.",
  storyboardDoc: "docs/examples/backup-dr/storyboard.md",
  technicalValidationDoc: "docs/ai-context/backup-dr-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope:
      "Patrón conceptual revisado con Veeam Backup & Replication 13.0.2.29, soporte de VMware vSphere 9.0/8.x/7.x y VCF, IBM FlashSystem 9.1.1, Lenovo ThinkSystem y prácticas NIST/CISA; confirmar release, HCL, licenciamiento y sizing del cliente.",
    sources: [
      { id: "coresolutions-profile", title: "CoreSolutions: perfil público y marcas", url: "https://ec.linkedin.com/company/coresolutionssa", accessedAt: "2026-08-04" },
      { id: "ibm-partner", title: "IBM Partner Plus: CoreSolutions", url: "https://www.ibm.com/partnerplus/directory/company/4548", accessedAt: "2026-08-04" },
      { id: "nist-contingency", title: "NIST SP 800-34 Rev. 1: contingency planning", url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final", accessedAt: "2026-08-04" },
      { id: "nist-rto", title: "NIST glossary: recovery time objective", url: "https://csrc.nist.gov/glossary/term/recovery_time_objective", accessedAt: "2026-08-04" },
      { id: "cisa-ransomware", title: "CISA StopRansomware guide", url: "https://www.cisa.gov/stopransomware/ransomware-guide", accessedAt: "2026-08-04" },
      { id: "veeam-about", title: "Veeam: backup overview", url: "https://helpcenter.veeam.com/docs/vbr/userguide/about_backup.html", accessedAt: "2026-08-04" },
      { id: "veeam-architecture", title: "Veeam: backup architecture", url: "https://helpcenter.veeam.com/docs/vbr/userguide/backup_architecture.html", accessedAt: "2026-08-04" },
      { id: "veeam-repository", title: "Veeam: backup repositories", url: "https://helpcenter.veeam.com/docs/vbr/userguide/backup_repository.html", accessedAt: "2026-08-04" },
      { id: "veeam-immutability", title: "Veeam: immutable backup files", url: "https://helpcenter.veeam.com/docs/vbr/userguide/immutability.html", accessedAt: "2026-08-04" },
      { id: "veeam-storage", title: "Veeam: supported storage features", url: "https://helpcenter.veeam.com/docs/vbr/userguide/supported_features.html", accessedAt: "2026-08-04" },
      { id: "veeam-vsphere", title: "Veeam: VMware platform support", url: "https://helpcenter.veeam.com/docs/vbr/userguide/platform_support_vm.html", accessedAt: "2026-08-04" },
      { id: "ibm-safeguarded", title: "IBM FlashSystem: Safeguarded Copy", url: "https://www.ibm.com/docs/en/flashsystem-7x00/9.1.1?topic=flashcopy-configuring-safeguarded-copy-function", accessedAt: "2026-08-04" },
      { id: "ibm-snapshots", title: "IBM FlashSystem: volume snapshots", url: "https://www.ibm.com/docs/en/flashsystem-7x00/9.1.1?topic=volumes-snapshots", accessedAt: "2026-08-04" },
      { id: "ibm-replication", title: "IBM: replication session types", url: "https://www.ibm.com/docs/en/csm/6.3.15?topic=replication-session-types", accessedAt: "2026-08-04" },
      { id: "lenovo-solutions", title: "Lenovo: data center solutions", url: "https://www.lenovo.com/us/en/servers-storage/solutions/", accessedAt: "2026-08-04" },
      { id: "lenovo-veeam", title: "Lenovo and Veeam: data protection", url: "https://www.lenovo.com/us/en/servers-storage/solutions/smb/", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: backupDrFailureScenarios,
};

export const backupDrSteps: ExplainerStep[] = [
  {
    id: "objectives",
    tag: "01 — OBJETIVOS",
    title: "La continuidad empieza por RPO y RTO",
    paragraphs: [
      "Antes de elegir una herramienta, el negocio define qué datos puede perder (RPO) y cuánto tiempo puede estar detenido (RTO). NIST vincula estos objetivos con el análisis de impacto y el plan de contingencia.",
      "No todas las aplicaciones necesitan la misma protección: una base de datos transaccional, un servicio web y una VM de gestión pueden tener dependencias, ventanas y criterios de recuperación diferentes.",
    ],
    businessImpact: "La conversación deja de ser “¿tenemos backup?” y pasa a ser “¿qué servicio recuperamos, en cuánto tiempo y con qué pérdida aceptada?” .",
    sceneId: "objectives",
    caption: "Objetivo de negocio → política de protección → evidencia de recuperación",
    sourceIds: ["nist-contingency", "nist-rto"],
  },
  {
    id: "protection",
    tag: "02 — PROTECCIÓN",
    title: "Veeam protege las cargas virtualizadas",
    paragraphs: [
      "En este patrón, VMware vSphere o VCF ejecuta las VMs sobre servidores Lenovo ThinkSystem. Veeam Backup & Replication coordina la lectura consistente de la carga mediante el mecanismo soportado por la plataforma y mueve los datos a un repositorio.",
      "El repositorio puede ser un servidor endurecido, object storage o almacenamiento integrado según diseño. La copia de backup no es lo mismo que un snapshot de producción: debe existir una política de retención y un destino con un dominio de fallo razonable.",
    ],
    businessImpact: "La arquitectura conecta la plataforma que ejecuta la aplicación con una copia operable y gobernada, sin confundir disponibilidad local con backup.",
    sceneId: "protection",
    caption: "VMware/VCF + Lenovo → Veeam → repositorio de backup",
    sourceIds: ["veeam-about", "veeam-architecture", "veeam-vsphere", "lenovo-solutions"],
  },
  {
    id: "copies",
    tag: "03 — COPIAS PROTEGIDAS",
    title: "La resiliencia necesita otra copia y otro dominio de fallo",
    paragraphs: [
      "Una copia inmutable o una Safeguarded Copy de IBM FlashSystem puede ayudar a proteger puntos de recuperación frente a borrado o ransomware, pero su utilidad depende de la política, el aislamiento, la retención y el acceso administrativo.",
      "Veeam documenta repositorios endurecidos e inmutabilidad; IBM documenta copias protegidas y snapshots con políticas. Son controles complementarios, no una garantía automática de recuperación de una aplicación.",
    ],
    businessImpact: "La defensa se diseña en capas: copia primaria, copia protegida, separación de credenciales y capacidad de restaurar en un entorno limpio.",
    sceneId: "copies",
    caption: "Backup → repositorio protegido → copia en almacenamiento IBM",
    sourceIds: ["cisa-ransomware", "veeam-repository", "veeam-immutability", "ibm-safeguarded", "ibm-snapshots"],
  },
  {
    id: "recovery",
    tag: "04 — RECUPERACIÓN",
    title: "Recuperar es reactivar servicio, datos y dependencias",
    paragraphs: [
      "Ante una caída, la recuperación selecciona un punto de restauración, levanta la carga en el sitio alterno o en la misma plataforma disponible y restablece red, identidad, DNS, almacenamiento y controles de seguridad.",
      "La replicación de almacenamiento de IBM puede ser síncrona o asíncrona según la sesión y la distancia; una réplica no reemplaza el backup histórico ni elimina la necesidad de probar la aplicación.",
    ],
    businessImpact: "El cliente ve que el RTO incluye mucho más que copiar bits: coordina plataforma, datos, red y operación hasta que el servicio sea usable.",
    sceneId: "recovery",
    caption: "Incidente → decisión → restauración/replicación → aplicación utilizable",
    sourceIds: ["ibm-replication", "veeam-architecture", "nist-contingency"],
  },
  {
    id: "limits",
    tag: "05 — PRUEBA Y LÍMITES",
    title: "La recuperación solo está madura cuando se prueba",
    paragraphs: [
      "Un dashboard verde no demuestra que una aplicación pueda recuperarse. Hay que ensayar restauración, credenciales, dependencias, capacidad del destino, red Aruba HPE, políticas Check Point, consistencia de datos y criterios de aceptación.",
      "Activa un escenario para ver dónde se rompe la cadena. La animación muestra dependencias y decisiones; no calcula un SLA, no valida licencias y no sustituye un ejercicio de DR con el cliente.",
    ],
    businessImpact: "La evidencia de continuidad es una prueba repetible con resultados, no una suposición basada en que existen archivos de backup.",
    sceneId: "limits",
    caption: "Activa fallos para descubrir qué parte del plan todavía no está demostrada",
    sourceIds: ["cisa-ransomware", "nist-contingency", "veeam-repository", "ibm-safeguarded"],
  },
];
