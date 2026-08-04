import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";

export const vsanFailureScenarios: FailureScenario[] = [
  {
    id: "host-failure",
    sceneId: "failure-resync",
    label: "Simular falla de host",
    summary: "Un host deja de contribuir al datastore vSAN.",
    detail:
      "Los componentes que estaban en el host pueden quedar en disponibilidad reducida mientras vSAN evalúa si existe capacidad y suficientes dominios de fallo para reconstruirlos.",
    limitation:
      "La accesibilidad y la reconstrucción dependen de la política aplicada, los dominios de fallo y los recursos restantes; no es una garantía de recuperación automática.",
    affectedNodes: ["Host ESXi 1", "Objeto de VM"],
    deadNodeIds: ["host1"],
  },
  {
    id: "disk-failure",
    sceneId: "failure-resync",
    label: "Simular falla de disco",
    summary: "Un dispositivo local deja de estar disponible.",
    detail:
      "vSAN puede marcar componentes afectados y comenzar una reparación si la política, la capacidad y la conectividad permiten crear una nueva distribución.",
    limitation:
      "La animación no modela disk groups, controladoras ni estados OSA/ESA; esos detalles deben revisarse para la versión del entorno.",
    affectedNodes: ["Disco local 1", "Objeto de VM"],
    deadNodeIds: ["disk1"],
  },
  {
    id: "capacity-limit",
    sceneId: "limits",
    label: "Capacidad insuficiente",
    summary: "No queda espacio para completar una reconstrucción.",
    detail:
      "Un objeto puede permanecer accesible pero en disponibilidad reducida si vSAN no encuentra espacio suficiente para reconstruir el componente perdido.",
    limitation:
      "No se debe convertir el umbral ilustrado en un porcentaje universal: la capacidad reservada y el rebuild threshold dependen del diseño y la versión.",
    affectedNodes: ["Capacidad de rebuild"],
    deadNodeIds: ["capacity"],
  },
  {
    id: "fault-domain-policy",
    sceneId: "limits",
    label: "Política incompatible",
    summary: "La política exige más dominios de fallo de los disponibles.",
    detail:
      "La política de storage aplicada al objeto determina la tolerancia real. Si no hay suficientes hosts o dominios de fallo, el objeto puede quedar no conforme o sin reconstrucción.",
    limitation:
      "FTT, RAID, dominios de fallo y clústeres stretched tienen requisitos distintos; la demo no sustituye el cálculo de compatibilidad.",
    affectedNodes: ["Dominios de fallo", "Política de storage"],
    deadNodeIds: ["fault-domains"],
  },
  {
    id: "network-partition",
    sceneId: "limits",
    label: "Partición de red vSAN",
    summary: "Los hosts no pueden comunicarse correctamente por la red vSAN.",
    detail:
      "La comunicación entre hosts es una dependencia del servicio distribuido: una partición puede impedir que los componentes se sincronicen o se reparen.",
    limitation:
      "No se modelan MTU, latencia, VLAN, vmkernel adapters ni topologías de red concretas.",
    affectedNodes: ["Red vSAN"],
    deadNodeIds: ["network"],
  },
];

export const vsanMeta: ExplainerMeta = {
  chip: "Storage distribuido · vSAN",
  title: "Cómo protege vSAN los objetos de una VM",
  tagline:
    "Una explicación visual de objetos, políticas de storage, fallos y reconstrucción.",
  storyboardDoc: "docs/examples/vsan/storyboard.md",
  technicalValidationDoc: "docs/ai-context/vsan-technical-validation.md",
  reviewStatus: "pending",
  failureScenarios: vsanFailureScenarios,
};

export const vsanSteps: ExplainerStep[] = [
  {
    id: "local-storage",
    tag: "01 — LA BASE",
    title: "vSAN convierte discos locales en un datastore del clúster",
    paragraphs: [
      "Cada host aporta dispositivos locales y participa en el clúster vSAN. La capacidad no se presenta como un disco aislado por servidor, sino como un datastore consumible por las VMs del clúster.",
      "La red vSAN conecta a los hosts para intercambiar datos y metadatos. Por eso storage, red y diseño del clúster forman una misma dependencia operativa.",
    ],
    businessImpact:
      "La abstracción reduce la dependencia visible de un disco concreto, pero no elimina la necesidad de diseñar hardware, red y capacidad.",
    sceneId: "local-storage",
    caption: "Discos locales → clúster vSAN → datastore consumible",
  },
  {
    id: "object-distribution",
    tag: "02 — EL OBJETO",
    title: "Una VM se almacena como objetos y componentes",
    paragraphs: [
      "Un VMDK y otros elementos de una VM se representan como objetos lógicos. vSAN distribuye sus componentes entre hosts según la configuración y la política de storage aplicada.",
      "La animación separa objeto, componentes y datastore para evitar la idea de que existe una única copia monolítica detrás de cada VM.",
    ],
    businessImpact:
      "La unidad real de protección es el objeto y su configuración; una VM puede tener varios objetos con necesidades diferentes.",
    sceneId: "object-distribution",
    caption: "VM → objetos → componentes distribuidos en el clúster",
  },
  {
    id: "policy-placement",
    tag: "03 — LA POLÍTICA",
    title: "La política decide cuánta protección se intenta colocar",
    paragraphs: [
      "La VM Storage Policy expresa capacidades como tolerancia a fallos y método de protección. vSAN usa esa política para calcular una colocación compatible entre hosts o dominios de fallo.",
      "La política no crea capacidad ni sustituye a los dominios de fallo: si el clúster no tiene suficientes recursos o topología, el objeto puede quedar no conforme.",
    ],
    businessImpact:
      "La resiliencia debe elegirse por carga y riesgo, equilibrando protección, capacidad, rendimiento y requisitos de la topología.",
    sceneId: "policy-placement",
    caption: "Política de storage → colocación → componentes protegidos",
  },
  {
    id: "failure-resync",
    tag: "04 — EL FALLO",
    title: "Tras una falla, vSAN evalúa accesibilidad y reconstrucción",
    paragraphs: [
      "Cuando un host o disco deja de contribuir, los objetos afectados pueden quedar en disponibilidad reducida. Si hay componentes activos suficientes, la VM puede seguir accediendo a sus datos mientras se evalúa la reparación.",
      "La reconstrucción necesita capacidad libre, dominios de fallo compatibles y comunicación entre hosts. Cuando esas condiciones se cumplen, vSAN puede resincronizar componentes en la distribución disponible.",
    ],
    businessImpact:
      "Un objeto accesible no significa que ya esté completamente protegido: la ventana de disponibilidad reducida aumenta la exposición ante otra falla.",
    sceneId: "failure-resync",
    caption: "Falla → disponibilidad reducida → posible resync",
  },
  {
    id: "limits",
    tag: "05 — LOS LÍMITES",
    title: "La protección depende del diseño que rodea al objeto",
    paragraphs: [
      "Sin capacidad suficiente, dominios de fallo compatibles o conectividad vSAN estable, el objeto puede permanecer no conforme, sin reconstrucción o incluso inaccesible cuando se excede la tolerancia de la política.",
      "FTT, RAID, fault domains, clústeres stretched, red y arquitectura OSA/ESA cambian los requisitos. La vista correcta es una matriz de condiciones, no un número aislado de hosts.",
    ],
    businessImpact:
      "La pregunta para el cliente no es solo “¿cuántos hosts hay?”, sino “¿qué fallas debe tolerar cada objeto y existe capacidad para volver a cumplir la política?”.",
    sceneId: "limits",
    caption: "Capacidad · dominios de fallo · red · política",
  },
];
