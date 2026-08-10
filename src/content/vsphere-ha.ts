import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const vsphereHaFailureScenarios: FailureScenario[] = [
  {
    id: "host-failure",
    sceneId: "host-failure",
    label: "Simular falla de host",
    summary: "Host ESXi 1 deja de responder.",
    detail:
      "La escena muestra la condición que puede activar un reinicio de VMs protegidas en un host alterno cuando HA puede verificar la falla y existe un destino compatible.",
    limitation:
      "HA reinicia la VM; no conserva su estado de memoria ni equivale a una migración en vivo.",
    affectedNodes: ["Host ESXi 1"],
    deadNodeIds: ["host1"],
  },
  {
    id: "storage-not-visible",
    sceneId: "decision",
    label: "Storage no visible",
    summary: "El host candidato no ve el datastore de la VM.",
    detail:
      "Aunque exista un host alterno, la VM no puede colocarse correctamente si el destino no tiene visibilidad uniforme del datastore requerido.",
    limitation:
      "La escena representa visibilidad de storage de forma conceptual; no sustituye una revisión de paths, protocolos o políticas de storage.",
    affectedNodes: ["Datastore compartido"],
    deadNodeIds: ["datastore"],
  },
  {
    id: "insufficient-capacity",
    sceneId: "decision",
    label: "Capacidad insuficiente",
    summary: "No queda capacidad compatible para reiniciar la VM.",
    detail:
      "Admission Control, reservas, capacidad restante y compatibilidad influyen en la decisión. Sin margen suficiente, HA puede no encontrar un host válido.",
    limitation:
      "No se puede inferir un porcentaje de disponibilidad a partir de esta animación conceptual.",
    affectedNodes: ["Capacidad disponible"],
    deadNodeIds: ["capacity"],
  },
  {
    id: "policy-constraint",
    sceneId: "limits",
    label: "Regla incompatible",
    summary: "Una política impide el placement del reinicio.",
    detail:
      "Reglas de afinidad, anti-afinidad u otras restricciones pueden dejar al host alterno fuera de la lista de destinos compatibles.",
    limitation:
      "La política real y su comportamiento ante fallos deben revisarse en el diseño del clúster.",
    affectedNodes: ["Políticas de placement"],
    deadNodeIds: ["policy"],
  },
];

export const vsphereHaMeta: ExplainerMeta = {
  brandContext: brandContext.virtualization,
  chip: "Disponibilidad · vSphere HA",
  title: "Cómo responde vSphere HA ante una falla",
  tagline:
    "Una explicación visual del reinicio de VMs protegidas, sus condiciones y sus límites.",
  storyboardDoc: "docs/examples/vsphere-ha/storyboard.md",
  technicalValidationDoc: "docs/ai-context/vsphere-ha-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "vSphere HA conceptual; validar release, configuración de clúster, storage y políticas del cliente.",
    sources: [
      { id: "vsphere-ha-restart", title: "Determining why and which virtual machines vSphere HA restarts", url: "https://knowledge.broadcom.com/external/article/316525/determining-why-and-which-virtual-machin.html", accessedAt: "2026-08-04" },
      { id: "vsphere-ha-capacity", title: "vSphere HA failover: recursos o storage inaccesible", url: "https://knowledge.broadcom.com/external/article/441641/vsphere-ha-failover-fails-with-insuffici.html", accessedAt: "2026-08-04" },
      { id: "vsphere-ha-rules", title: "vSphere HA y reglas de clúster", url: "https://knowledge.broadcom.com/external/article/439262/vsphere-ha-fails-to-restart-vms-in-a-clu.html", accessedAt: "2026-08-04" },
      { id: "vsphere-ha-retries", title: "vSphere HA y máximo de reintentos de reinicio", url: "https://knowledge.broadcom.com/external/article/432033/vsphere-ha-virtual-machine-failover-fail.html", accessedAt: "2026-08-04" },
      { id: "vsphere-ha-multi-host", title: "Falla de múltiples hosts y capacidad de admission control", url: "https://knowledge.broadcom.com/external/article/429590/virtual-machines-fail-to-failover-and-re.html", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: vsphereHaFailureScenarios,
};

export const vsphereHaSteps: ExplainerStep[] = [
  {
    id: "normal",
    tag: "01 — OPERACIÓN NORMAL",
    title: "Una VM protegida dentro del clúster",
    paragraphs: [
      "La VM está ejecutándose en un host ESXi y sus archivos permanecen en un datastore que los hosts candidatos pueden ver.",
      "vSphere HA forma parte de la disponibilidad del clúster: observa el estado de los hosts y mantiene la información necesaria para reaccionar ante determinadas fallas.",
    ],
    businessImpact:
      "La protección depende de haber diseñado el clúster, el storage y las políticas para que exista un destino compatible.",
    sceneId: "normal",
    caption: "VM protegida · host activo · storage accesible",
    sourceIds: ["vsphere-ha-restart", "vsphere-ha-capacity"],
  },
  {
    id: "failure",
    tag: "02 — LA FALLA",
    title: "El host deja de responder",
    paragraphs: [
      "Cuando HA pierde contacto con un host y no puede confirmar su estado por los mecanismos configurados, debe distinguir una falla real de una condición de aislamiento o partición.",
      "En esta escena el host ESXi 1 queda fuera del clúster. La VM no se mueve conservando su memoria: el flujo que se explica es un posible reinicio en otro host.",
    ],
    businessImpact:
      "La detección de una falla no significa por sí sola que todas las VMs serán recuperadas; comienza una decisión condicionada.",
    sceneId: "host-failure",
    caption: "Falla del host · HA evalúa si puede actuar",
    sourceIds: ["vsphere-ha-restart", "vsphere-ha-retries"],
  },
  {
    id: "decision",
    tag: "03 — LA DECISIÓN",
    title: "HA busca un destino compatible",
    paragraphs: [
      "Para reiniciar una VM protegida, HA necesita un host disponible con recursos suficientes, acceso al datastore requerido y compatibilidad con las reglas y políticas del clúster.",
      "La animación separa esas condiciones para que se entienda que la recuperación no es un botón aislado: depende de varias capas que deben estar preparadas.",
    ],
    businessImpact:
      "La capacidad de failover debe reservarse y comprobarse como parte del diseño, no suponerse después de la falla.",
    sceneId: "decision",
    caption: "Capacidad · storage visible · políticas compatibles",
    sourceIds: ["vsphere-ha-capacity", "vsphere-ha-rules", "vsphere-ha-multi-host"],
  },
  {
    id: "restart",
    tag: "04 — EL REINICIO",
    title: "La VM vuelve a arrancar en otro host",
    paragraphs: [
      "Si existe un destino compatible, HA puede registrar y encender la VM en un host alterno utilizando sus archivos accesibles en storage.",
      "Durante un reinicio la aplicación puede experimentar una interrupción y debe volver a iniciar su propio estado. La animación muestra el camino de datos después del arranque, no una continuidad de memoria.",
    ],
    businessImpact:
      "El resultado esperado es recuperar la ejecución bajo las condiciones configuradas, no prometer cero interrupción.",
    sceneId: "restart",
    caption: "Host ESXi 2 → VM reiniciándose → Servicio disponible",
    sourceIds: ["vsphere-ha-restart", "vsphere-ha-retries"],
  },
  {
    id: "limits",
    tag: "05 — LOS LÍMITES",
    title: "Cuando no existe un destino válido",
    paragraphs: [
      "El reinicio puede no completarse si no hay recursos suficientes, el datastore no es accesible o una regla impide colocar la VM en los hosts restantes.",
      "Estos casos no contradicen el funcionamiento de HA: muestran por qué la protección depende de Admission Control, storage, red, políticas, reservas y configuración del servicio.",
    ],
    businessImpact:
      "Una arquitectura resiliente se demuestra revisando los escenarios de fallo y sus dependencias, no solo dibujando hosts redundantes.",
    sceneId: "limits",
    caption: "Sin capacidad o compatibilidad, el reinicio puede quedar pendiente",
    sourceIds: ["vsphere-ha-capacity", "vsphere-ha-rules", "vsphere-ha-multi-host"],
  },
];
