import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const lanSanFailureScenarios: FailureScenario[] = [
  { id: "vlan-mismatch", sceneId: "limits", label: "VLAN o trunk incorrecto", summary: "El host está conectado, pero no llega al segmento esperado.", detail: "Un puerto access/trunk, VLAN permitida o gateway incorrecto puede romper gestión, vMotion, VM o servicios sin que el enlace físico esté caído.", limitation: "No se inspeccionan configuraciones reales ni tablas MAC/ARP.", affectedNodes: ["switching", "vlan"], deadNodeIds: ["vlan"] },
  { id: "san-zoning", sceneId: "limits", label: "Zoning o WWPN incorrecto", summary: "El host no ve los puertos SAN previstos.", detail: "La visibilidad de una fabric FC y el mapping de volúmenes son capas distintas. Un zoning demasiado amplio o incompleto cambia el resultado y el riesgo.", limitation: "No se muestran WWPN ni zoning de un fabricante concreto.", affectedNodes: ["fabric", "hba"], deadNodeIds: ["fabric"] },
  { id: "mtu-path", sceneId: "limits", label: "MTU inconsistente", summary: "Un camino de overlay o storage pierde paquetes o rendimiento.", detail: "Las redes de datos, gestión, vMotion y overlays pueden tener requisitos diferentes. El MTU debe ser coherente extremo a extremo para el tráfico que lo necesita.", limitation: "La demo no calcula PMTUD ni captura paquetes.", affectedNodes: ["underlay", "overlay"], deadNodeIds: ["underlay"] },
  { id: "asymmetric-route", sceneId: "limits", label: "Ruta asimétrica o inspección incorrecta", summary: "El retorno sigue un camino distinto y una política interrumpe la sesión.", detail: "Routing, firewall, NAT y estado de sesión pueden interactuar. Un diagrama lógico no demuestra que el camino de retorno sea válido.", limitation: "No se simula una tabla de rutas ni una política Check Point.", affectedNodes: ["routing", "firewall"], deadNodeIds: ["routing"] },
];

export const lanSanMeta: ExplainerMeta = {
  chip: "Redes · LAN y SAN",
  title: "Cómo conviven tráfico de usuarios, VMs y almacenamiento",
  tagline: "Una explicación visual de underlay, VLAN, routing, fabric FC, zoning y paths sin mezclar LAN con SAN.",
  brandContext: brandContext.lanSan,
  storyboardDoc: "docs/examples/lan-san/storyboard.md",
  technicalValidationDoc: "docs/ai-context/lan-san-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "Patrón conceptual revisado con guías Aruba data center, IBM FlashSystem 9.1.1 host attachment, Lenovo SAN deployment y VMware vSphere/VCF; confirmar modelo de switching, fabric, VLAN, MTU, HBA, firmware y HCL.",
    sources: [
      { id: "aruba-design", title: "Aruba validated data center design", url: "https://www.arubanetworks.com/techdocs/VSG/docs/040-dc-design/Media/PDF/Aruba_VSG_Data-Center-Design.pdf", accessedAt: "2026-08-04" },
      { id: "aruba-deploy", title: "Aruba validated data center deployment", url: "https://www.arubanetworks.com/techdocs/VSG/docs/050-dc-deploy/Media/PDF/Aruba_VSG_Data-Center-Deploy.pdf", accessedAt: "2026-08-04" },
      { id: "ibm-host", title: "IBM FlashSystem host attachment", url: "https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=concepts-host-attachment", accessedAt: "2026-08-04" },
      { id: "ibm-mapping", title: "IBM FlashSystem host mapping", url: "https://www.ibm.com/docs/en/flashsystem-5x00/9.1.0?topic=hosts-host-mapping", accessedAt: "2026-08-04" },
      { id: "lenovo-san", title: "Lenovo ThinkSystem SAN deployment guide", url: "https://download.lenovo.com/storage/thinksystem_de_series_software_deployment_and_configuration_guide_v1.1.pdf", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: lanSanFailureScenarios,
};

export const lanSanSteps: ExplainerStep[] = [
  { id: "planes", tag: "01 — LOS PLANOS", title: "Una plataforma tiene varios tipos de tráfico", paragraphs: ["Gestión, usuarios, VMs, vMotion, storage y replicación pueden tener requisitos distintos. Dibujarlos como una sola nube de red oculta dependencias y dominios de fallo.", "La SAN FC puede ser una fabric separada de la LAN Ethernet. El host puede tener NICs y HBAs, mientras el storage expone puertos según el protocolo soportado."], businessImpact: "El cliente entiende qué debe aislarse, qué puede compartir infraestructura y qué debe probarse extremo a extremo.", sceneId: "planes", caption: "Gestión · usuarios · VMs · vMotion · SAN · replicación", sourceIds: ["aruba-design", "ibm-host", "lenovo-san"] },
  { id: "lan", tag: "02 — LAN", title: "VLAN, trunks y routing construyen el camino Ethernet", paragraphs: ["Los switches conectan hosts, appliances y servicios mediante VLANs, trunks, routing y enlaces redundantes. El diseño de Aruba documenta roles y límites que dependen de la familia de switches.", "Un LAG o par de switches puede aumentar resiliencia, pero las dos interfaces, el peer, la VLAN y la política de routing deben tener una configuración coherente."], businessImpact: "Los problemas dejan de parecer “la red está caída” y se pueden localizar en puerto, VLAN, routing, MTU o firewall.", sceneId: "lan", caption: "Host → switching → VLAN/VRF → gateway → servicio", sourceIds: ["aruba-design", "aruba-deploy"] },
  { id: "san", tag: "03 — SAN", title: "La fabric FC usa visibilidad y presentación por separado", paragraphs: ["En Fibre Channel, HBA y WWPN conectan hosts con una fabric directa o conmutada. IBM distingue el attachment del host y el mapping de volúmenes.", "Zoning determina qué puertos pueden verse; host mapping/masking determina qué volumen se presenta a cada host. Ambos deben alinearse con multipath y el sistema operativo."], businessImpact: "El equipo puede revisar una LUN de extremo a extremo sin confundir switch, cabina y host.", sceneId: "san", caption: "HBA/WWPN → fabric FC → puertos del array → mapping → host", sourceIds: ["ibm-host", "ibm-mapping", "lenovo-san"] },
  { id: "integration", tag: "04 — INTEGRACIÓN", title: "El servicio cruza LAN, SAN y seguridad", paragraphs: ["Una VM puede usar LAN para usuarios, storage SAN para su datastore y un firewall para tráfico norte-sur o este-oeste. Cada camino tiene su propia política, MTU, routing y observabilidad.", "Check Point puede inspeccionar sesiones, pero no reemplaza el zoning de SAN ni corrige una VLAN o un multipath mal definido. Las capas deben probarse juntas y por separado."], businessImpact: "La arquitectura ayuda a asignar responsables y pruebas, evitando que una sola consola sea el supuesto punto de verdad.", sceneId: "integration", caption: "Aplicación → LAN + SAN + firewall → dependencias", sourceIds: ["aruba-deploy", "ibm-host", "ibm-mapping"] },
  { id: "limits", tag: "05 — LÍMITES", title: "Las pruebas deben recorrer cada plano", paragraphs: ["Activa un fallo para comprobar VLAN, MTU, zoning o rutas. La prueba debe registrar impacto, caminos restantes, reglas, logs y criterio de retorno.", "La animación no calcula una tabla de rutas, no valida HCL y no captura paquetes. Es un mapa para preparar el diagnóstico y el plan de pruebas."], businessImpact: "La madurez aparece cuando una incidencia se puede aislar por plano y no se resuelve cambiando configuraciones al azar.", sceneId: "limits", caption: "Activa fallos para recorrer LAN, SAN, routing y seguridad", sourceIds: ["aruba-design", "aruba-deploy", "ibm-host", "ibm-mapping"] },
];
