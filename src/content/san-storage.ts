import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const sanStorageFailureScenarios: FailureScenario[] = [
  {
    id: "fabric-path-loss",
    sceneId: "limits",
    label: "Se pierde una fabric FC",
    summary: "Un host pierde un conjunto de caminos hacia el storage.",
    detail:
      "Una arquitectura dual-fabric puede mantener I/O por los caminos restantes si HBA, zoning, cabina y multipath están correctamente configurados. La redundancia no existe solo por tener dos cables.",
    limitation:
      "El diagrama no calcula latencia ni verifica una matriz de compatibilidad; hay que revisar HBA, firmware, zoning y política multipath.",
    affectedNodes: ["fabric-a", "host"],
    deadNodeIds: ["fabric-a"],
  },
  {
    id: "wrong-mapping",
    sceneId: "limits",
    label: "El LUN no está mapeado al host correcto",
    summary: "El volumen existe en la cabina, pero el host no lo puede usar.",
    detail:
      "Zoning permite que los puertos se vean en la fabric; el host mapping/masking de la cabina determina qué volumen se presenta a qué WWPN o host cluster. Son controles distintos.",
    limitation:
      "La demo no muestra WWPN reales ni comandos de una plataforma concreta; el problema requiere revisar ambos lados y el sistema operativo.",
    affectedNodes: ["mapping", "host"],
    deadNodeIds: ["mapping"],
  },
  {
    id: "pool-capacity",
    sceneId: "limits",
    label: "El pool llega al límite",
    summary: "La capacidad o el rendimiento disponible ya no soporta el crecimiento.",
    detail:
      "Un pool puede tener capacidad libre insuficiente, reservas, sobreaprovisionamiento o presión de rendimiento. Crecer discos no equivale automáticamente a ampliar un volumen o resolver la demanda de la aplicación.",
    limitation:
      "La animación no calcula usable, thin provisioning, IOPS ni deduplicación; el sizing debe partir de datos reales.",
    affectedNodes: ["pool", "volume"],
    deadNodeIds: ["pool"],
  },
  {
    id: "replication-lag",
    sceneId: "limits",
    label: "La replicación se atrasa",
    summary: "El destino remoto no representa el último estado confirmado.",
    detail:
      "La distancia, latencia, cambios de datos y política de replicación determinan el RPO observable. Replicar un volumen no prueba que la aplicación completa pueda reiniciar en el destino.",
    limitation:
      "No se simula un lag real ni se promete cero pérdida; hay que medir sesiones, dependencias y criterios de recuperación.",
    affectedNodes: ["replication", "remote-array"],
    deadNodeIds: ["replication"],
  },
];

export const sanStorageMeta: ExplainerMeta = {
  chip: "Storage · SAN empresarial",
  title: "Cómo llega un volumen SAN hasta una aplicación",
  tagline:
    "Una explicación visual de hosts, fabrics, pools, LUNs, multipath y replicación sin mezclar las capas de la arquitectura.",
  brandContext: brandContext.san,
  storyboardDoc: "docs/examples/san-storage/storyboard.md",
  technicalValidationDoc: "docs/ai-context/san-storage-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope:
      "Patrón conceptual revisado con IBM FlashSystem 9.1.1, host attachment y host mapping, replicación IBM Copy Services, Lenovo ThinkSystem y consumo VMware vSphere/VCF; confirmar modelo, protocolo, HBA, fabric, HCL, firmware y política multipath del cliente.",
    sources: [
      { id: "ibm-host-attachment", title: "IBM FlashSystem 9.1.1: host attachment", url: "https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=concepts-host-attachment", accessedAt: "2026-08-04" },
      { id: "ibm-host-mapping", title: "IBM FlashSystem: mapping volumes to a host", url: "https://www.ibm.com/docs/en/flashsystem-5x00/9.1.0?topic=hosts-host-mapping", accessedAt: "2026-08-04" },
      { id: "ibm-volume", title: "IBM FlashSystem 9.1.1: volume objects", url: "https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=commands-mkvdisk", accessedAt: "2026-08-04" },
      { id: "ibm-replication", title: "IBM: replication session types", url: "https://www.ibm.com/docs/en/csm/6.3.15?topic=replication-session-types", accessedAt: "2026-08-04" },
      { id: "ibm-migration", title: "IBM FlashSystem: data migration", url: "https://www.ibm.com/docs/en/flashsystem-9x00/9.1.1?topic=concepts-data-migration", accessedAt: "2026-08-04" },
      { id: "lenovo-san", title: "Lenovo ThinkSystem DE: SAN deployment and multipath considerations", url: "https://download.lenovo.com/storage/thinksystem_de_series_software_deployment_and_configuration_guide_v1.1.pdf", accessedAt: "2026-08-04" },
      { id: "lenovo-vmware", title: "Lenovo ThinkSystem and VMware solution guide", url: "https://lenovopress.lenovo.com/lp1265.pdf", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: sanStorageFailureScenarios,
};

export const sanStorageSteps: ExplainerStep[] = [
  {
    id: "foundation",
    tag: "01 — LAS CAPAS",
    title: "Una SAN separa host, fabric y cabina",
    paragraphs: [
      "La aplicación corre en un host Lenovo, IBM Power o clúster VMware. Sus HBA exponen WWPN hacia una o más fabrics Fibre Channel; la cabina IBM FlashSystem presenta volúmenes a través de sus puertos y controladoras.",
      "La LAN de gestión y la SAN de datos pueden tener diseños distintos. No basta con dibujar dos cables: hay que comprobar puertos, zoning, cabina, paths y políticas del sistema operativo o hipervisor.",
    ],
    businessImpact: "Separar las capas permite localizar si el problema está en el servidor, la fabric, el mapeo del volumen o la cabina.",
    sceneId: "foundation",
    caption: "Aplicación → host/HBA → fabrics FC → IBM FlashSystem",
    sourceIds: ["ibm-host-attachment", "lenovo-san", "lenovo-vmware"],
  },
  {
    id: "provisioning",
    tag: "02 — PROVISIONAMIENTO",
    title: "Del disco físico a un volumen presentado",
    paragraphs: [
      "En la cabina, discos y grupos de capacidad sostienen pools; sobre ellos se crean volúmenes que el host verá como dispositivos SCSI o namespaces según el protocolo. RAID/DRAID, capacidad usable, rendimiento y protección son decisiones diferentes.",
      "Crear el volumen no lo hace visible al servidor. El host object se identifica por WWPN o protocolo, y el host mapping/masking controla qué volumen puede usar cada host o clúster.",
    ],
    businessImpact: "El cliente entiende por qué “tener espacio” no significa que VMware, AIX o un servidor pueda consumirlo sin una cadena de configuración.",
    sceneId: "provisioning",
    caption: "Discos → pool → volumen/LUN → mapping → host",
    sourceIds: ["ibm-volume", "ibm-host-mapping"],
  },
  {
    id: "multipath",
    tag: "03 — CAMINOS",
    title: "Multipath usa rutas alternativas, no copias adicionales",
    paragraphs: [
      "Un host puede tener HBA y conexiones hacia fabrics separadas, que llegan a controladoras o nodos de la cabina. El software multipath agrupa los caminos para mantener acceso y aplicar una política de selección/failover compatible con el array.",
      "Zoning controla qué puertos se ven en la fabric; mapping controla qué volúmenes se presentan. Ambos deben coincidir con HBA, firmware, drivers y la política del host para evitar paths ausentes o acceso incorrecto.",
    ],
    businessImpact: "La redundancia se puede comprobar camino por camino y no se confunde con replicación ni con una segunda copia de datos.",
    sceneId: "multipath",
    caption: "HBA A/B → fabric A/B → controladoras → mismo volumen",
    sourceIds: ["ibm-host-attachment", "ibm-host-mapping", "lenovo-san"],
  },
  {
    id: "migration",
    tag: "04 — DATOS Y CONTINUIDAD",
    title: "Migrar y replicar son decisiones distintas",
    paragraphs: [
      "Una migración mueve datos hacia una nueva cabina o pool; una replicación mantiene una relación entre origen y destino para continuidad. IBM documenta sesiones con semánticas síncronas o asíncronas y herramientas de migración que deben evaluarse según la carga.",
      "La aplicación, el host y el storage deben coordinarse: mover un volumen no completa por sí solo una migración de VM, AIX, Oracle o SAP ni demuestra que el sitio alterno esté listo.",
    ],
    businessImpact: "El cliente puede decidir qué operación necesita: crecer, migrar, proteger o recuperar, sin usar una palabra genérica para todo.",
    sceneId: "migration",
    caption: "Origen → migración o replicación → destino → aplicación validada",
    sourceIds: ["ibm-migration", "ibm-replication"],
  },
  {
    id: "limits",
    tag: "05 — PRUEBA Y LÍMITES",
    title: "La SAN se valida con fallos controlados",
    paragraphs: [
      "Una prueba madura retira una fabric, revisa paths, valida mapping, observa capacidad del pool y mide el estado de la replicación. Después se comprueba la aplicación y se documenta el resultado.",
      "Activa un escenario para ver qué supuesto se rompe. La animación no calcula IOPS, usable, latencia o HCL, y no certifica que una topología concreta sea soportada.",
    ],
    businessImpact: "La conversación pasa de “tenemos redundancia” a “podemos demostrar qué ocurre cuando falla cada dependencia”.",
    sceneId: "limits",
    caption: "Activa fallos para verificar paths, mapping, capacidad y replicación",
    sourceIds: ["ibm-host-attachment", "ibm-host-mapping", "ibm-replication", "lenovo-san"],
  },
];
