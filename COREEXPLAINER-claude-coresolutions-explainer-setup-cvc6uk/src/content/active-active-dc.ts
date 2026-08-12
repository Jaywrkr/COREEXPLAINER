import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const activeActiveFailureScenarios: FailureScenario[] = [
  { id: "site-loss", sceneId: "limits", label: "Se pierde un rack o sitio", summary: "El servicio debe continuar con capacidad y paths restantes.", detail: "Una arquitectura active-active necesita hosts, storage, red, quorum y procedimientos coherentes en ambos dominios. La etiqueta no garantiza que todas las cargas puedan seguir sin impacto.", limitation: "No se simula quorum ni se calcula capacidad después de la pérdida.", affectedNodes: ["site-a", "site-b", "quorum"], deadNodeIds: ["site-a"] },
  { id: "network-split", sceneId: "limits", label: "Partición de red", summary: "Los sitios dejan de verse de forma consistente.", detail: "Una pérdida de comunicación puede cambiar el comportamiento de replicación o exigir una decisión para preservar integridad. La topología debe contemplar caminos y quorum.", limitation: "La demo no determina cuál lado debe continuar ni reemplaza un runbook.", affectedNodes: ["inter-site", "quorum"], deadNodeIds: ["inter-site"] },
  { id: "capacity-after-failover", sceneId: "limits", label: "Capacidad insuficiente tras failover", summary: "El sitio restante no puede alojar todas las cargas.", detail: "Disponibilidad no equivale a capacidad completa. Admission control, reservas, I/O, red y licencias pueden limitar qué se recupera después de un fallo.", limitation: "No se hace sizing ni se decide prioridad de VMs.", affectedNodes: ["site-b", "workloads"], deadNodeIds: ["site-b"] },
  { id: "replication-unsynced", sceneId: "limits", label: "Copia no sincronizada", summary: "El destino no tiene todos los cambios confirmados.", detail: "Una copia espejo puede quedar desincronizada durante una pérdida o un fast failover. La operación debe conocer el punto de consistencia y el RPO resultante.", limitation: "No se calcula el lag ni se valida la aplicación.", affectedNodes: ["storage-link", "site-b"], deadNodeIds: ["storage-link"] },
];

export const activeActiveMeta: ExplainerMeta = {
  chip: "Continuidad · Active-active",
  title: "Cómo se sostiene un data center en dos dominios",
  tagline: "Una explicación visual de hosts, storage, red, quorum y decisiones de failover sin confundir HA con DR.",
  brandContext: brandContext.activeActive,
  storyboardDoc: "docs/examples/active-active-dc/storyboard.md",
  technicalValidationDoc: "docs/ai-context/active-active-dc-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "Patrón conceptual de dos racks/sitios revisado con IBM FlashSystem 9.1.1 policy-based HA, mirrored volumes, Lenovo ThinkSystem, VMware vSphere/VCF y redes redundantes; confirmar arquitectura, quorum, licencia, RPO/RTO y capacidad.",
    sources: [
      { id: "ibm-ha", title: "IBM FlashSystem: policy-based high availability", url: "https://www.ibm.com/docs/en/flashsystem-9x00/9.1.1?topic=replication-high-availability", accessedAt: "2026-08-04" },
      { id: "ibm-mirrors", title: "IBM FlashSystem: mirrored volumes", url: "https://www.ibm.com/docs/en/flashsystem-9x00/9.1.1?topic=volumes-mirrored", accessedAt: "2026-08-04" },
      { id: "ibm-io", title: "IBM FlashSystem: planning I/O connections", url: "https://www.ibm.com/docs/en/flashsystem-9x00/9.1.1?topic=ph-planning-io-connections", accessedAt: "2026-08-04" },
      { id: "aruba-vsx", title: "Aruba data center deploy guide", url: "https://www.arubanetworks.com/techdocs/VSG/docs/050-dc-deploy/Media/PDF/Aruba_VSG_Data-Center-Deploy.pdf", accessedAt: "2026-08-04" },
      { id: "veeam-dr", title: "Veeam replication infrastructure", url: "https://helpcenter.veeam.com/docs/vbr/userguide/replication_components.html", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: activeActiveFailureScenarios,
};

export const activeActiveSteps: ExplainerStep[] = [
  { id: "two-domains", tag: "01 — DOS DOMINIOS", title: "Active-active necesita dos dominios que puedan operar", paragraphs: ["Un diseño de dos racks o sitios separa hosts, storage, red y energía para reducir un dominio común de fallo. Las cargas pueden distribuirse, pero cada una tiene sus propias dependencias y políticas.", "IBM documenta policy-based high availability con dos sistemas independientes y objetos configurados a través de una política; eso no significa que cualquier combinación de hosts y aplicaciones sea automáticamente compatible."], businessImpact: "El cliente visualiza el sistema completo, no solo dos cabinas dibujadas como si fueran una garantía de continuidad.", sceneId: "two-domains", caption: "Rack/sitio A ↔ interconexión ↔ rack/sitio B", sourceIds: ["ibm-ha", "ibm-io"] },
  { id: "storage-ha", tag: "02 — STORAGE", title: "El storage debe mantener estado y caminos", paragraphs: ["Una política de HA o un volumen espejo puede mantener copias y paths entre sistemas. IBM indica que las copias pueden quedar desincronizadas durante eventos de I/O o failover y necesitan resync.", "Quorum, ubicación, latencia y consistencia determinan si la plataforma puede continuar de forma segura. Replicación no es lo mismo que backup histórico."], businessImpact: "Se explica por qué la cabina y su estado de replicación son parte del servicio, no un componente aislado.", sceneId: "storage-ha", caption: "Volumen → copias → quorum → paths hacia ambos sitios", sourceIds: ["ibm-ha", "ibm-mirrors"] },
  { id: "network-ha", tag: "03 — RED", title: "Los paths redundantes deben cruzar dominios distintos", paragraphs: ["Los hosts necesitan rutas de datos y gestión que no compartan el mismo fallo. La red puede usar pares, LAG/VSX u otros mecanismos según modelo, pero la configuración real debe validarse.", "Un enlace entre sitios transporta estado, tráfico de aplicación o replicación. Una partición de red no equivale a la pérdida de un equipo y puede exigir una decisión para proteger integridad."], businessImpact: "La conversación pasa de “tenemos dos switches” a “qué ocurre si cada enlace o sitio pierde visibilidad”.", sceneId: "network-ha", caption: "Hosts + storage + red redundante + enlace inter-site", sourceIds: ["aruba-vsx", "ibm-io"] },
  { id: "failover", tag: "04 — CAMBIO", title: "Failover es una decisión operativa, no solo un botón", paragraphs: ["Un cambio puede ser planificado o provocado por una falla. Antes de mover cargas hay que saber qué datos están sincronizados, qué capacidad existe, cómo se mantienen identidades y qué reglas de red/firewall aplican.", "Veeam puede replicar workloads dentro de su propia infraestructura, mientras el storage puede mantener otra relación; no deben mezclarse como si fueran el mismo mecanismo."], businessImpact: "El cliente entiende qué debe contener un runbook: disparador, responsables, orden, validación y rollback.", sceneId: "failover", caption: "Señal → decisión → cambio de sitio → validación de aplicación", sourceIds: ["ibm-mirrors", "veeam-dr"] },
  { id: "limits", tag: "05 — LÍMITES", title: "La prueba revela capacidad, quorum y consistencia", paragraphs: ["Activa un escenario para retirar un sitio, romper el enlace, perder capacidad o desincronizar una copia. El resultado debe compararse con los objetivos RPO/RTO y con la capacidad de las cargas prioritarias.", "La animación no certifica active-active, no calcula quorum ni sustituye una prueba de failover con datos y aplicaciones reales."], businessImpact: "La madurez se demuestra haciendo ejercicios controlados y documentando qué continuó, qué se degradó y qué no debía moverse.", sceneId: "limits", caption: "Activa fallos para poner a prueba el diseño de dos dominios", sourceIds: ["ibm-ha", "ibm-mirrors", "aruba-vsx"] },
];
