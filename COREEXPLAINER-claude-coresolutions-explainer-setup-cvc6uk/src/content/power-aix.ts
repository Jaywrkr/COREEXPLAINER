import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const powerAixFailureScenarios: FailureScenario[] = [
  { id: "lpm-prerequisite", sceneId: "limits", label: "Prerequisito de LPM ausente", summary: "La LPAR no puede moverse con el nivel actual.", detail: "HMC, firmware, VIOS, redes virtuales, storage y compatibilidad entre sistemas forman la ruta de Live Partition Mobility.", limitation: "La demo no ejecuta FLRT, HMC ni valida niveles de firmware.", affectedNodes: ["hmc", "viOS"], deadNodeIds: ["hmc"] },
  { id: "san-path", sceneId: "limits", label: "Path SAN no redundante", summary: "La LPAR depende de un único camino de datos.", detail: "La movilidad y continuidad requieren que los dispositivos virtuales y el storage tengan paths coherentes. Un enlace aislado puede interrumpir la operación aunque Power esté activo.", limitation: "No se muestran WWPN, zoning, mapping ni multipath reales.", affectedNodes: ["san", "storage"], deadNodeIds: ["san"] },
  { id: "oracle-dependency", sceneId: "limits", label: "Dependencia de aplicación no validada", summary: "AIX vuelve, pero Oracle o SAP no queda utilizable.", detail: "El movimiento de la LPAR no reemplaza la validación de base de datos, filesystem, red, licencias, interfaces y orden de arranque.", limitation: "La animación no ejecuta health checks de Oracle, SAP o middleware.", affectedNodes: ["application", "acceptance"], deadNodeIds: ["application"] },
  { id: "backup-gap", sceneId: "limits", label: "Protección sin prueba", summary: "Existe un job, pero no hay restore aceptado.", detail: "La movilidad reduce una clase de riesgo; backup y restore cubren otra. Ambas evidencias deben existir para cargas críticas.", limitation: "No se valida agente, plugin, repositorio ni licencia Veeam.", affectedNodes: ["backup", "acceptance"], deadNodeIds: ["backup"] },
];

export const powerAixMeta: ExplainerMeta = {
  chip: "Cargas críticas · IBM Power",
  title: "Cómo se protege una carga IBM Power/AIX con Oracle o SAP",
  tagline: "Una explicación visual de PowerVM, VIOS, SAN, red, movilidad de LPAR y pruebas de aplicación sin reducirlo a instalar un servidor.",
  brandContext: brandContext.powerAix,
  storyboardDoc: "docs/examples/power-aix/storyboard.md",
  technicalValidationDoc: "docs/ai-context/power-aix-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-05",
    scope: "Patrón conceptual revisado con IBM PowerVM Live Partition Mobility y guías de VIOS/HMC; confirmar modelo Power, niveles de firmware, VIOS, storage, SAN, AIX, Oracle/SAP, soporte y plan de recuperación.",
    sources: [
      { id: "ibm-lpm", title: "IBM PowerVM Live Partition Mobility benefits", url: "https://www.ibm.com/docs/en/power10/9028-21B?topic=mobility-benefits-partition", accessedAt: "2026-08-05" },
      { id: "ibm-lpm-howto", title: "PowerVM/VIOS Live Partition Mobility how-to", url: "https://www.ibm.com/support/pages/powervmvios-how-perform-live-partition-mobility", accessedAt: "2026-08-05" },
      { id: "ibm-lpm-concept", title: "IBM Live Partition Mobility concept", url: "https://www.ibm.com/docs/en/power7/9117-MMB?topic=features-live-partition-mobility", accessedAt: "2026-08-05" },
      { id: "ibm-flashsystem", title: "IBM FlashSystem host attachment", url: "https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=concepts-host-attachment", accessedAt: "2026-08-05" },
      { id: "veeam-overview", title: "Veeam Backup & Replication overview", url: "https://helpcenter.veeam.com/docs/vbr/userguide/overview.html", accessedAt: "2026-08-05" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: powerAixFailureScenarios,
};

export const powerAixSteps: ExplainerStep[] = [
  { id: "workload", tag: "01 — LA CARGA", title: "Oracle o SAP hacen que la plataforma sea una cadena", paragraphs: ["Una carga AIX puede depender de PowerVM, VIOS, storage, SAN, red, DNS, usuarios y otros sistemas. La base de datos y el middleware tienen criterios de consistencia que no se deducen del estado de la LPAR.", "El primer paso es separar qué parte se mueve con la partición y qué parte debe validarse o coordinarse en la aplicación."], businessImpact: "El cliente ve el servicio completo y no solo el servidor que lo aloja.", sceneId: "workload", caption: "Oracle / SAP → AIX → PowerVM → storage y red", sourceIds: ["ibm-lpm", "ibm-flashsystem"] },
  { id: "platform", tag: "02 — PLATAFORMA", title: "PowerVM y VIOS abstraen recursos, pero conservan requisitos", paragraphs: ["Live Partition Mobility puede mover una LPAR activa entre sistemas Power cuando se cumplen los requisitos de hardware, HMC, VIOS, red y storage. El movimiento transfiere estado, memoria y dispositivos virtuales.", "La compatibilidad no es una propiedad genérica de ‘IBM Power’: depende de modelos, niveles, firmware y configuración de los sistemas origen y destino. El concepto de Live Partition Mobility ayuda a separar la capacidad de mover una partición de las condiciones concretas del entorno."], businessImpact: "La movilidad se convierte en una capacidad planificada para mantenimiento, no en una promesa universal.", sceneId: "platform", caption: "HMC → VIOS → LPAR → sistema Power destino", sourceIds: ["ibm-lpm", "ibm-lpm-howto", "ibm-lpm-concept"] },
  { id: "data-paths", tag: "03 — DATOS Y RED", title: "La LPAR necesita ver storage y red de forma consistente", paragraphs: ["SAN, mapping, multipath, redes virtuales y rutas de aplicación deben existir en ambos lados del movimiento. La conectividad de management no sustituye a la de datos.", "IBM FlashSystem puede representar la capa de almacenamiento, pero el zoning, host attachment y políticas deben diseñarse según la familia y el código instalados."], businessImpact: "El equipo puede comprobar cada camino antes de mover una carga crítica.", sceneId: "data-paths", caption: "LPAR → VIOS → SAN / LAN → storage y usuarios", sourceIds: ["ibm-lpm-howto", "ibm-flashsystem"] },
  { id: "acceptance", tag: "04 — ACEPTACIÓN", title: "La prueba final es funcional y operativa", paragraphs: ["Después de una movilidad o cambio se validan filesystem, base de datos, interfaces, tiempos de respuesta, jobs, monitoreo, backup y usuarios. Oracle o SAP debe pasar sus propios checks.", "Veeam puede formar parte de la protección, pero su cobertura y restore deben estar documentados para la carga específica y separados del objetivo de movilidad."], businessImpact: "La aceptación demuestra que el negocio funciona y que existe recuperación, no solo que la LPAR está encendida.", sceneId: "acceptance", caption: "Plataforma → aplicación → backup → aceptación del servicio", sourceIds: ["ibm-lpm", "veeam-overview"] },
  { id: "limits", tag: "05 — LÍMITES", title: "La continuidad de una carga crítica se prueba por capas", paragraphs: ["Activa fallos de HMC/VIOS, SAN, aplicación o backup. Cada uno representa una condición diferente: movilidad, acceso a datos, consistencia funcional y recuperación.", "La animación no valida niveles, comandos, firmware, licencias ni una instancia Oracle/SAP. Es un mapa para preparar la matriz de compatibilidad, el runbook y las pruebas de aceptación."], businessImpact: "El cliente obtiene una agenda concreta de pruebas para una plataforma crítica.", sceneId: "limits", caption: "Activa fallos para separar movilidad, datos, aplicación y recuperación", sourceIds: ["ibm-lpm-howto", "ibm-flashsystem", "veeam-overview"] },
];
