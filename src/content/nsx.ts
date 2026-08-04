import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const nsxFailureScenarios: FailureScenario[] = [
  {
    id: "underlay-mtu",
    sceneId: "limits",
    label: "Underlay o MTU incompatible",
    summary: "La red física no transporta correctamente el overlay.",
    detail:
      "Los TEP y túneles GENEVE dependen de direccionamiento, VLAN de transporte y una MTU consistente en todo el camino físico.",
    limitation:
      "La demo no calcula overhead ni valida una ruta física; esos valores deben comprobarse en la red del cliente.",
    affectedNodes: ["Underlay físico"],
    deadNodeIds: ["underlay"],
  },
  {
    id: "policy-scope",
    sceneId: "limits",
    label: "Regla aplicada al alcance equivocado",
    summary: "La política no alcanza las VMs esperadas.",
    detail:
      "El campo Applied To y los grupos utilizados por una regla determinan dónde se instala y evalúa el DFW; una selección incoherente puede producir un allow o deny inesperado.",
    limitation:
      "El alcance real depende de la versión, interfaz de política y objetos soportados por el entorno NSX.",
    affectedNodes: ["Regla DFW"],
    deadNodeIds: ["policy"],
  },
  {
    id: "gateway-failure",
    sceneId: "limits",
    label: "Gateway fuera de servicio",
    summary: "El camino north-south pierde su punto de salida.",
    detail:
      "Un fallo del gateway o de sus transport nodes puede interrumpir el tráfico hacia redes externas aunque el tráfico east-west entre VMs siga teniendo otro camino.",
    limitation:
      "La recuperación depende del modo HA, Edge cluster, routing y servicios habilitados; no se representa como un failover universal.",
    affectedNodes: ["Gateway Tier-1"],
    deadNodeIds: ["gateway"],
  },
  {
    id: "segment-security",
    sceneId: "limits",
    label: "Seguridad del segmento bloquea tráfico",
    summary: "Una política del segmento impide una dependencia básica.",
    detail:
      "La conectividad puede fallar aunque el underlay esté activo si las políticas del segmento o del DFW bloquean DHCP, gateway o el flujo requerido.",
    limitation:
      "La escena no enumera todos los perfiles de seguridad ni sustituye un traceflow o una captura de paquetes.",
    affectedNodes: ["Política del segmento"],
    deadNodeIds: ["segment-policy"],
  },
];

export const nsxMeta: ExplainerMeta = {
  brandContext: brandContext.networkSecurity,
  chip: "Red y seguridad · NSX",
  title: "Cómo viaja y se protege el tráfico con NSX",
  tagline:
    "Una explicación visual de segmentos, overlay, firewall distribuido y gateways.",
  storyboardDoc: "docs/examples/nsx/storyboard.md",
  technicalValidationDoc: "docs/ai-context/nsx-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "NSX conceptual; validar release, transport nodes, TEP/underlay, DFW y gateways del entorno.",
    sources: [
      { id: "nsx-firewall-well-architected", title: "Gateway Firewalls y Distributed Firewall", url: "https://www.vmware.com/docs/well-architected-design-gateway-firewalls-use-cases-and-scope", accessedAt: "2026-08-04" },
      { id: "nsx-transport-nodes", title: "NSX transport node profiles y overlay en VCF", url: "https://knowledge.broadcom.com/external/article/316037/cloud-foundation-cluster-nsx-transport-n.html", accessedAt: "2026-08-04" },
      { id: "nsx-geneve-underlay", title: "GENEVE/TEP y underlay incorrecto", url: "https://knowledge.broadcom.com/external/article/436129/traffic-from-virtual-machines-fails-to-r.html", accessedAt: "2026-08-04" },
      { id: "nsx-dfw-scope", title: "Distributed Firewall: reglas, scope y Applied To", url: "https://knowledge.broadcom.com/external/article/395504", accessedAt: "2026-08-04" },
      { id: "nsx-dfw-connectivity", title: "DFW bloqueando tráfico en el punto de enforcement", url: "https://knowledge.broadcom.com/external/article/425834/network-connectivity-issues-on-vms-with.html", accessedAt: "2026-08-04" },
      { id: "nsx-segment-dhcp", title: "Política de seguridad de segmento y DHCP", url: "https://knowledge.broadcom.com/external/article/433269/virtual-machine-network-connectivity-los.html", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: nsxFailureScenarios,
};

export const nsxSteps: ExplainerStep[] = [
  {
    id: "segments",
    tag: "01 — EL SEGMENTO",
    title: "Las cargas se conectan a redes lógicas",
    paragraphs: [
      "Una aplicación puede distribuirse en varios segmentos lógicos para separar funciones como web, aplicación y base de datos. NSX define esas redes y sus relaciones en software.",
      "El segmento es una abstracción de conectividad, no una promesa de que la red física desaparece. Debe existir un transporte preparado para que los hosts y gateways intercambien tráfico.",
    ],
    businessImpact:
      "Separar la aplicación por función hace visibles sus dependencias y permite aplicar controles más precisos que una única red plana.",
    sceneId: "segments",
    caption: "Web · aplicación · base de datos · segmentos lógicos",
    sourceIds: ["nsx-transport-nodes", "nsx-firewall-well-architected"],
  },
  {
    id: "overlay",
    tag: "02 — EL TRANSPORTE",
    title: "El overlay conecta workloads sobre el underlay",
    paragraphs: [
      "Los transport nodes y sus Tunnel Endpoints (TEP) permiten llevar segmentos lógicos sobre la red IP física. En NSX, el tráfico overlay se encapsula con GENEVE entre los puntos de transporte.",
      "La red física sigue siendo necesaria: direccionamiento TEP, VLAN de transporte, MTU y routing deben permitir que los túneles se establezcan y permanezcan activos.",
    ],
    businessImpact:
      "La virtualización de red acelera cambios de topología, pero no elimina la responsabilidad sobre el underlay que sostiene los túneles.",
    sceneId: "overlay",
    caption: "Segmento lógico → TEP/GENEVE → underlay IP",
    sourceIds: ["nsx-transport-nodes", "nsx-geneve-underlay"],
  },
  {
    id: "east-west",
    tag: "03 — EAST-WEST",
    title: "El firewall distribuido controla el movimiento lateral",
    paragraphs: [
      "El Distributed Firewall (DFW) aplica reglas cerca del workload, en el punto distribuido de enforcement asociado a sus vNICs. Así, el control east-west no depende de enviar todo el tráfico a un appliance central.",
      "Las reglas usan grupos, servicios, dirección y alcance de aplicación. El flujo de la animación es conceptual: muestra una inspección entre capas, no la secuencia interna de cada paquete.",
    ],
    businessImpact:
      "La microsegmentación puede limitar el movimiento lateral, pero su resultado depende de grupos correctos, reglas publicadas y una política que refleje las dependencias reales.",
    sceneId: "east-west",
    caption: "Web → DFW → aplicación → base de datos",
    sourceIds: ["nsx-dfw-scope", "nsx-dfw-connectivity", "nsx-firewall-well-architected"],
  },
  {
    id: "north-south",
    tag: "04 — NORTH-SOUTH",
    title: "Los gateways conectan segmentos con redes externas",
    paragraphs: [
      "El tráfico que entra o sale del entorno utiliza gateways y routing. Un Tier-1 conecta segmentos de workloads hacia un Tier-0, que representa la frontera con la red física o externa.",
      "Gateway Firewall y Distributed Firewall cumplen papeles distintos: el primero protege límites y servicios de gateway; el segundo aplica control distribuido entre workloads.",
    ],
    businessImpact:
      "Separar east-west de north-south ayuda a ubicar controles, dependencias y puntos de fallo sin confundir un gateway con el firewall de cada VM.",
    sceneId: "north-south",
    caption: "Cliente externo → Tier-0 → Tier-1 → segmento → aplicación",
    sourceIds: ["nsx-firewall-well-architected", "nsx-transport-nodes"],
  },
  {
    id: "limits",
    tag: "05 — LOS LÍMITES",
    title: "La política necesita transporte y alcance correctos",
    paragraphs: [
      "Un overlay puede fallar por TEP, VLAN, MTU o underlay; una regla puede no alcanzar las VMs esperadas; y un gateway puede interrumpir el camino north-south. El síntoma visible no identifica por sí solo la causa.",
      "La operación debe comprobar el scope de las reglas, el estado de los túneles, la conectividad de segmentos y el modo HA de gateways. NSX aporta el modelo, pero el diseño y la verificación siguen siendo necesarios.",
    ],
    businessImpact:
      "La conversación madura pasa de “NSX bloquea o permite” a “¿en qué punto se aplica la política y qué dependencia de transporte o routing puede impedirla?”.",
    sceneId: "limits",
    caption: "Política · overlay · underlay · gateway · dependencias",
    sourceIds: ["nsx-geneve-underlay", "nsx-dfw-scope", "nsx-dfw-connectivity", "nsx-segment-dhcp"],
  },
];
