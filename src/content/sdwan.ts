import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const sdwanFailureScenarios: FailureScenario[] = [
  { id: "underlay-loss", sceneId: "limits", label: "Underlay degradado", summary: "Una ruta tiene pérdida, jitter o latencia fuera del objetivo.", detail: "El overlay depende de transportes físicos como MPLS, Internet o 4G/5G. La selección de camino necesita mediciones y políticas de aplicación.", limitation: "La demo no mide circuitos ni calcula un SLA de la sucursal.", affectedNodes: ["underlay", "path-selection"], deadNodeIds: ["underlay"] },
  { id: "overlay-policy", sceneId: "limits", label: "BIO mal definida", summary: "La aplicación toma un camino que no cumple su intención.", detail: "Una Business Intent Overlay puede asociar aplicaciones, prioridad, QoS, path conditioning y topología. Una coincidencia amplia o una prioridad equivocada cambia el resultado.", limitation: "La animación no inspecciona reglas de Orchestrator ni clasifica tráfico real.", affectedNodes: ["bio", "path-selection"], deadNodeIds: ["bio"] },
  { id: "edge-failure", sceneId: "limits", label: "Edge o HA no disponible", summary: "La sucursal pierde el punto que termina los túneles.", detail: "La continuidad puede requerir un segundo appliance, enlaces, HA y rutas de acceso coherentes. Un overlay no elimina el dominio de fallo físico.", limitation: "No se simulan túneles IPSec, BGP/OSPF ni el proceso de convergencia.", affectedNodes: ["edge", "ha"], deadNodeIds: ["edge"] },
  { id: "security-order", sceneId: "limits", label: "Orden de inspección incorrecto", summary: "El flujo llega, pero una política lo bloquea o lo devuelve por otro camino.", detail: "EdgeConnect, firewall, breakout local y servicios cloud deben tener un orden y un retorno explícitos. La visibilidad de la aplicación debe acompañar la decisión de camino.", limitation: "La demo no valida reglas Check Point ni NAT real.", affectedNodes: ["security", "application"], deadNodeIds: ["security"] },
];

export const sdwanMeta: ExplainerMeta = {
  chip: "Redes · SD-WAN",
  title: "Cómo SD-WAN elige el mejor camino para cada aplicación",
  tagline: "Una explicación visual de underlay, overlay, Business Intent Overlays, path conditioning, seguridad y operación multisede.",
  brandContext: brandContext.sdwan,
  storyboardDoc: "docs/examples/sdwan/storyboard.md",
  technicalValidationDoc: "docs/ai-context/sdwan-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-05",
    scope: "Patrón conceptual revisado con HPE Aruba Networking EdgeConnect SD-WAN Orchestrator 9.5.1 y guías de diseño SD-Branch; confirmar modelo, release, transportes, BIO, routing, licencias, seguridad y topología del cliente.",
    sources: [
      { id: "aruba-orchestrator", title: "HPE Aruba EdgeConnect SD-WAN Orchestrator 9.5.1 User Guide", url: "https://arubanetworking.hpe.com/techdocs/sdwan-PDFs/user/Orch_UserGuide_R951.pdf", accessedAt: "2026-08-05" },
      { id: "aruba-sdbranch", title: "Aruba validated SD-Branch design", url: "https://arubanetworking.hpe.com/techdocs/VSG/docs/070-sd-branch-design/Media/PDF/Aruba_VSG_SD-Branch-Design.pdf", accessedAt: "2026-08-05" },
      { id: "aruba-intro", title: "About EdgeConnect SD-WAN", url: "https://developer.arubanetworks.com/edgeconnect/docs/intro", accessedAt: "2026-08-05" },
      { id: "aruba-path-conditioning", title: "EdgeConnect path conditioning", url: "https://support.hpe.com/hpesc/public/docDisplay?docId=sf000105657en_us&page=index.html", accessedAt: "2026-08-05" },
      { id: "checkpoint-clusterxl", title: "Check Point R82 ClusterXL Administration Guide", url: "https://sc1.checkpoint.com/documents/R82/WebAdminGuides/EN/CP_R82_ClusterXL_AdminGuide/CP_R82_ClusterXL_AdminGuide.pdf", accessedAt: "2026-08-05" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: sdwanFailureScenarios,
};

export const sdwanSteps: ExplainerStep[] = [
  { id: "underlay", tag: "01 — UNDERLAY", title: "SD-WAN no elimina los enlaces: los mide y los combina", paragraphs: ["MPLS, Internet y 4G/5G son transportes con capacidades, costes y fallos distintos. EdgeConnect forma túneles sobre esos caminos y observa pérdida, latencia y jitter.", "El underlay sigue siendo responsabilidad del diseño de acceso: direccionamiento, routing, MTU, disponibilidad y proveedor deben estar documentados."], businessImpact: "El cliente entiende que SD-WAN agrega opciones sobre la red existente y que un circuito degradado sigue siendo un riesgo que debe medirse.", sceneId: "underlay", caption: "MPLS + Internet + 4G/5G → túneles medidos", sourceIds: ["aruba-orchestrator", "aruba-sdbranch"] },
  { id: "overlay", tag: "02 — OVERLAY", title: "El overlay expresa una intención de negocio", paragraphs: ["Una Business Intent Overlay agrupa aplicaciones y define prioridad, calidad, path conditioning y topología. No es simplemente otra VLAN: es una política lógica sobre los transportes.", "La misma sucursal puede llevar voz, ERP, navegación y backup por caminos diferentes según sus objetivos. La clasificación, prioridad y retorno deben validarse con tráfico real."], businessImpact: "La conversación pasa de ‘qué enlace está activo’ a ‘qué experiencia necesita cada aplicación’. ", sceneId: "overlay", caption: "Aplicación → BIO → política de camino y calidad", sourceIds: ["aruba-sdbranch", "aruba-orchestrator"] },
  { id: "selection", tag: "03 — SELECCIÓN", title: "La decisión de camino necesita medición y una política", paragraphs: ["El edge compara la salud de los underlays y aplica la intención configurada. Puede cambiar de camino cuando el transporte deja de cumplir el objetivo, pero el umbral y el tiempo de reacción son decisiones de diseño.", "Path conditioning puede usar técnicas como FEC y corrección de orden; eso añade overhead y no convierte cualquier enlace en una línea dedicada."], businessImpact: "El cliente puede discutir QoE, coste y resiliencia con métricas, en vez de asumir que ‘automático’ significa óptimo en todos los casos.", sceneId: "selection", caption: "Métricas → política → camino preferido → camino alterno", sourceIds: ["aruba-orchestrator", "aruba-path-conditioning"] },
  { id: "security", tag: "04 — SEGURIDAD", title: "Conectividad y seguridad deben diseñarse juntas", paragraphs: ["El edge puede hacer segmentación, breakout y routing, mientras un firewall Check Point puede inspeccionar flujos según el punto de enforcement. La arquitectura debe dejar claro qué tráfico cruza cada control.", "El camino de retorno, NAT, identidad y logging son parte de la aceptación. Un túnel arriba no garantiza que una aplicación tenga acceso permitido."], businessImpact: "El cliente ve dónde se decide el camino y dónde se aplica la política, evitando una caja negra de red.", sceneId: "security", caption: "Overlay → segmentación → firewall → aplicación / cloud", sourceIds: ["aruba-intro", "checkpoint-clusterxl"] },
  { id: "limits", tag: "05 — LÍMITES", title: "La automatización solo es tan buena como sus señales y políticas", paragraphs: ["Activa fallos de underlay, BIO, edge o seguridad para ver qué parte de la cadena deja de cumplir. El escenario distingue un brownout medible de una caída total.", "La animación no mide circuitos, no clasifica aplicaciones, no calcula SLA ni valida reglas. El diseño final necesita pruebas de pérdida, jitter, failover, routing, seguridad y experiencia."], businessImpact: "La conversación se convierte en un plan de observabilidad y pruebas, no en una promesa de ‘internet igual a MPLS’. ", sceneId: "limits", caption: "Activa fallos para descubrir qué señal o política falta", sourceIds: ["aruba-orchestrator", "aruba-path-conditioning", "checkpoint-clusterxl"] },
];
