import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const veeamProtectionFailureScenarios: FailureScenario[] = [
  { id: "source-job-failure", sceneId: "limits", label: "Falla el job de origen", summary: "La carga no produce un punto de recuperación válido.", detail: "Credenciales, snapshots, agentes, proxies, red o consistencia pueden hacer que un job termine con error. Un repositorio saludable no compensa una fuente que nunca se protegió.", limitation: "La animación no interpreta logs ni calcula el RPO; hay que revisar el job y la carga real.", affectedNodes: ["source", "veeam-server"], deadNodeIds: ["source"] },
  { id: "proxy-bottleneck", sceneId: "limits", label: "Proxy saturado", summary: "El data pipe no mantiene la ventana de backup.", detail: "Los proxies/data movers transportan y transforman bloques entre origen y destino. CPU, red, concurrencia y transporte determinan el throughput observable.", limitation: "No se hace sizing automático ni se afirma que más proxies siempre resuelvan el cuello de botella.", affectedNodes: ["proxy", "repository"], deadNodeIds: ["proxy"] },
  { id: "repository-unavailable", sceneId: "limits", label: "Repositorio no disponible", summary: "La copia no puede escribirse o leerse.", detail: "Un repositorio puede quedar sin capacidad, aislado, sin credenciales o fuera de línea. La redundancia debe cubrir dominios de fallo y administración.", limitation: "No se verifica inmutabilidad ni permisos reales; el escenario solo marca la dependencia.", affectedNodes: ["repository", "veeam-server"], deadNodeIds: ["repository"] },
  { id: "application-restore", sceneId: "limits", label: "Restore sin consistencia", summary: "La VM arranca, pero la aplicación no queda utilizable.", detail: "La restauración debe validar datos, servicios, DNS, identidad y criterios de aceptación. Arrancar una máquina no certifica la recuperación de la aplicación.", limitation: "La animación no ejecuta un restore ni valida una base de datos.", affectedNodes: ["restore", "application"], deadNodeIds: ["restore"] },
];

export const veeamProtectionMeta: ExplainerMeta = {
  chip: "Protección · Veeam heterogéneo",
  title: "Cómo una política protege VMware, AIX, NAS y cinta",
  tagline: "Una explicación visual del data pipe de Veeam y de por qué cada workload necesita una política y una prueba distintas.",
  brandContext: brandContext.veeamProtection,
  storyboardDoc: "docs/examples/veeam-protection/storyboard.md",
  technicalValidationDoc: "docs/ai-context/veeam-protection-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "Patrón conceptual revisado con Veeam Backup & Replication 13.0.2.29 para workloads virtuales, físicos, NAS, IBM AIX y tape; validar licencia, agente, plugin, repositorio, HCL y aplicación.",
    sources: [
      { id: "veeam-overview", title: "Veeam Backup & Replication 13 overview", url: "https://helpcenter.veeam.com/docs/vbr/userguide/overview.html", accessedAt: "2026-08-04" },
      { id: "veeam-architecture", title: "Veeam backup infrastructure and data movers", url: "https://helpcenter.veeam.com/docs/vbr/userguide/backup_architecture.html", accessedAt: "2026-08-04" },
      { id: "veeam-repository", title: "Veeam repositories", url: "https://helpcenter.veeam.com/docs/vbr/userguide/backup_repository.html?ver=13", accessedAt: "2026-08-04" },
      { id: "veeam-tape", title: "Veeam backup to tape", url: "https://helpcenter.veeam.com/docs/vbr/userguide/backup_to_tape_jobs.html?ver=13", accessedAt: "2026-08-04" },
      { id: "veeam-tape-support", title: "Veeam tape device support", url: "https://helpcenter.veeam.com/docs/vbr/userguide/system_requirements_tape.html?ver=13", accessedAt: "2026-08-04" },
      { id: "veeam-immutable", title: "Veeam immutable backup files", url: "https://helpcenter.veeam.com/docs/vbr/userguide/immutability_hv.html?ver=13", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: veeamProtectionFailureScenarios,
};

export const veeamProtectionSteps: ExplainerStep[] = [
  { id: "workloads", tag: "01 — LAS CARGAS", title: "Cada workload llega con una forma distinta de protegerse", paragraphs: ["VMware/VCF, servidores físicos Lenovo, IBM AIX, shares NAS y aplicaciones Oracle o SAP no tienen exactamente el mismo método de captura, consistencia ni restauración.", "Veeam centraliza la política, pero la integración concreta depende de la plataforma, agente o plugin, credenciales y criterios de aplicación."], businessImpact: "El cliente deja de tratar todos los respaldos como una casilla idéntica y puede priorizar RPO, consistencia y recuperación por servicio.", sceneId: "workloads", caption: "VMware · físico · AIX · NAS · aplicación → política", sourceIds: ["veeam-overview"] },
  { id: "data-pipe", tag: "02 — EL DATA PIPE", title: "Origen, proxy y repositorio forman una cadena", paragraphs: ["En un backup de VM, Veeam usa hosts origen, proxies/data movers y un repositorio. Los componentes forman un data pipe que mueve y transforma bloques hasta el destino.", "El cuello de botella puede estar en la lectura del datastore, el proxy, la red o la escritura del repositorio; agregar capacidad sin identificar el tramo no garantiza una ventana menor."], businessImpact: "La arquitectura permite discutir throughput y concurrencia con evidencias, no solo el tamaño total de la cabina.", sceneId: "data-pipe", caption: "Host origen → proxy/data mover → repositorio", sourceIds: ["veeam-architecture", "veeam-repository"] },
  { id: "retention", tag: "03 — RETENCIÓN", title: "Retener, aislar e ir a cinta son decisiones diferentes", paragraphs: ["Un repositorio guarda archivos y metadatos; la inmutabilidad depende del tipo de repositorio y su configuración. Una librería de cinta mantiene otra copia y otro medio operativo.", "Veeam documenta jobs dedicados para copiar backups existentes a tape. La cinta no es simplemente otro repositorio online y requiere inventario, medios, ventanas y procedimiento de restore."], businessImpact: "El cliente puede separar recuperación rápida, retención larga y copia fuera de línea sin confundir sus objetivos.", sceneId: "retention", caption: "Repositorio → copia protegida → job de cinta → medio offline", sourceIds: ["veeam-repository", "veeam-immutable", "veeam-tape", "veeam-tape-support"] },
  { id: "restore", tag: "04 — RECUPERACIÓN", title: "El éxito se mide en servicio utilizable", paragraphs: ["Una recuperación selecciona un punto, lee la copia, restaura datos y vuelve a conectar dependencias. Para una aplicación, hay que validar consistencia, identidad, red, DNS, storage y criterios de aceptación.", "El mismo backup puede tener tiempos y pasos diferentes según sea una VM, un share, un servidor físico o una base de datos con plugin de aplicación."], businessImpact: "La conversación pasa de “el archivo existe” a “el servicio volvió y tenemos evidencia del tiempo y del resultado”.", sceneId: "restore", caption: "Punto de recuperación → restore → dependencias → aplicación validada", sourceIds: ["veeam-overview", "veeam-architecture"] },
  { id: "limits", tag: "05 — LÍMITES", title: "Una política madura se prueba y se observa", paragraphs: ["Activa un fallo para ver si la cadena conserva protección cuando falla la fuente, el proxy, el repositorio o la restauración. Los jobs deben alertar, tener responsables y revisarse contra el RPO.", "La demo no calcula sizing, no valida una licencia y no certifica que un restore de AIX, NAS, Oracle o SAP sea aplicable al entorno del cliente."], businessImpact: "La madurez se demuestra con jobs exitosos, copias aisladas y restores repetibles, no solo con una consola instalada.", sceneId: "limits", caption: "Activa fallos para descubrir el tramo que todavía no está demostrado", sourceIds: ["veeam-overview", "veeam-repository", "veeam-immutable"] },
];
