import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";
import { vcfGuidedSteps } from "./vcf-guided";
import { vcfTechnicalIntegrity } from "./technical-integrity";

/**
 * Conceptual VCF explainer, framed for a CORESOLUTIONS consultative sales
 * conversation. Version-specific claims and customer outcomes must be
 * reviewed against the validation matrix before this copy is used externally.
 */

export const vcfFailureScenarios: FailureScenario[] = [
  {
    id: "host-failure",
    sceneId: "cluster",
    label: "Falla de un host",
    summary: "Host ESXi 1 deja de responder.",
    detail:
      "El host deja de participar en el clúster. vSphere HA puede intentar reiniciar VMs protegidas en otro host si existe capacidad, storage visible y políticas compatibles.",
    limitation:
      "La simulación no representa una migración en vivo ni garantiza que todas las VMs se recuperen.",
    affectedNodes: ["Host ESXi 1"],
    deadNodeIds: ["host1"],
    simulation: { mode: "capacity", impact: "Se pierde capacidad de cómputo y el margen de recuperación debe comprobarse.", remainingCapacityPercent: 65 },
    guidedSteps: vcfGuidedSteps["host-failure"],
  },
  {
    id: "multiple-host-failure",
    sceneId: "cluster",
    label: "Falla de dos hosts",
    summary: "Dos hosts quedan fuera del clúster.",
    detail:
      "La capacidad disponible se reduce y el margen para reiniciar VMs protegidas es menor. El resultado depende de la reserva, las políticas y la capacidad restante.",
    limitation:
      "No implica que el sistema pueda mantener todas las cargas ante cualquier combinación de fallos.",
    affectedNodes: ["Host ESXi 1", "Host ESXi 2"],
    deadNodeIds: ["host1", "host2"],
    simulation: { mode: "capacity", impact: "La reserva disponible se reduce de forma crítica; el resultado depende del sizing real.", remainingCapacityPercent: 35 },
    guidedSteps: vcfGuidedSteps["multiple-host-failure"],
  },
  {
    id: "management-plane-loss",
    sceneId: "cluster",
    label: "Pérdida del plano de gestión",
    summary: "vCenter deja de estar disponible.",
    detail:
      "La escena separa la gestión del camino de datos: las VMs que ya están ejecutándose no equivalen automáticamente a una caída, pero las operaciones de administración quedan afectadas.",
    limitation:
      "Es una simplificación conceptual; el impacto real depende de la arquitectura y del estado de cada servicio.",
    affectedNodes: ["vCenter"],
    deadNodeIds: ["vcenter"],
    simulation: { mode: "dependency", impact: "El plano de gestión queda fuera de servicio aunque el camino de datos pueda continuar.", externalDependency: "vCenter" },
    guidedSteps: vcfGuidedSteps["management-plane-loss"],
  },
];

export const vcfMeta: ExplainerMeta = {
  targetArchitecture: {
    label: "Plataforma integrada con dependencias explícitas",
    summary: "El objetivo es explicar cómputo, storage, red, gestión y cargas como un conjunto conectado, no como silos independientes.",
    expectedChanges: [
      "Dependencias de cómputo, storage y networking visibles en la misma escena.",
      "Caminos de gestión y datos diferenciados para analizar fallos.",
      "Capacidad, políticas y evidencia de recuperación revisadas antes de afirmar continuidad.",
    ],
    limitations: "La ficha no define una lista de componentes ni sizing para un cliente concreto; la release y compatibilidad deben validarse por proyecto.",
    sourceIds: ["vcf-platform", "vcf-91-faq", "vcf-networking"],
    roadmap: [
      { id: "discover", title: "Descubrir dependencias", objective: "Alinear cargas, hosts, storage, red, gestión y objetivos de continuidad.", evidence: "Inventario, matriz de dependencias, capacidad actual y objetivos RPO/RTO.", exitCriteria: "Cada carga prioritaria tiene dueño, dependencias y criterio de éxito identificados.", sourceIds: ["vcf-platform"] },
      { id: "assess", title: "Evaluar brechas", objective: "Contrastar el estado actual con las relaciones y políticas que la plataforma necesita.", evidence: "Caminos de gestión y datos, capacidad, compatibilidad, red y estado de protección.", exitCriteria: "Las brechas tienen impacto, evidencia pendiente y prioridad acordada.", sourceIds: ["vcf-networking", "vsan-datastore"] },
      { id: "prove", title: "Probar resiliencia", objective: "Demostrar que un fallo controlado conserva el servicio esperado o revela una limitación aceptada.", evidence: "Prueba de failover, validación funcional, observación y plan de rollback.", exitCriteria: "La prueba queda documentada con resultado, responsable y acciones pendientes.", sourceIds: ["vsphere-ha-restart", "vsphere-ha-capacity"] },
    ],
    decisionOptions: [
      { id: "resilience-first", title: "Priorizar resiliencia", summary: "Diseñar con mayor redundancia y pruebas de fallo desde el inicio.", benefits: "Hace visibles los dominios de fallo y reduce sorpresas durante una recuperación.", tradeoffs: "Puede aumentar complejidad operativa, capacidad requerida y esfuerzo de pruebas.", evidence: "Objetivos RPO/RTO, capacidad posterior al fallo, paths redundantes y pruebas de failover.", sourceIds: ["vcf-platform", "vsphere-ha-capacity"], roadmapPhaseIds: ["assess", "prove"], scenarioIds: ["host-failure", "multiple-host-failure"] },
      { id: "standardize-first", title: "Priorizar estandarización", summary: "Reducir variaciones para operar y soportar la plataforma de forma consistente.", benefits: "Facilita automatización, troubleshooting, gobierno y transferencia de conocimiento.", tradeoffs: "Puede limitar excepciones o requerir adaptar cargas a patrones comunes.", evidence: "Matriz de versiones, políticas, configuración de red, storage y procedimientos repetibles.", sourceIds: ["vcf-platform", "vcf-91-faq"], roadmapPhaseIds: ["discover", "assess"], scenarioIds: ["management-plane-loss"] },
      { id: "waves-first", title: "Evolucionar por oleadas", summary: "Validar un patrón con cargas representativas antes de ampliar el alcance.", benefits: "Reduce el radio de impacto y permite ajustar el diseño con evidencia real.", tradeoffs: "La transformación toma más tiempo y requiere criterios claros para avanzar entre oleadas.", evidence: "Piloto, aceptación funcional, métricas, dependencias y decisión de ampliar.", sourceIds: ["vcf-platform", "vsphere-ha-restart"], roadmapPhaseIds: ["discover", "prove"], scenarioIds: ["host-failure"] },
    ],
  },
  technicalIntegrity: vcfTechnicalIntegrity,
  brandContext: brandContext.virtualization,
  storyboardDoc: "docs/examples/vcf/storyboard.md",
  technicalValidationDoc: "docs/ai-context/vcf-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "Modelo conceptual de VCF; validar la release objetivo del cliente (incluye referencia VCF 9.1).",
    sources: [
      { id: "vcf-platform", title: "VMware Cloud Foundation — plataforma y componentes", url: "https://www.vmware.com/products/cloud-infrastructure/vmware-cloud-foundation", accessedAt: "2026-08-04" },
      { id: "vcf-91-faq", title: "VCF 9.1 — preguntas frecuentes", url: "https://www.vmware.com/docs/vmware-cloud-foundation-9-1-general-faqs", accessedAt: "2026-08-04" },
      { id: "vcf-networking", title: "VCF Networking (NSX)", url: "https://www.vmware.com/products/cloud-infrastructure/vcf-networking", accessedAt: "2026-08-04" },
      { id: "vsan-datastore", title: "vSAN — datastore compartido del clúster", url: "https://vdc-download.vmware.com/vmwb-repository/dcr-public/222b124e-7adf-430c-bd3d-fdf3eef99099/976ba686-c3a3-4896-b883-0b01f8acd86b/GUID-21C4005E-CDCF-4FE8-B632-E3D0F5A34483.html", accessedAt: "2026-08-04" },
      { id: "vsphere-ha-restart", title: "vSphere HA — condiciones de reinicio tras una falla", url: "https://knowledge.broadcom.com/external/article/316525/determining-why-and-which-virtual-machin.html", accessedAt: "2026-08-04" },
      { id: "vsphere-ha-capacity", title: "vSphere HA — capacidad y visibilidad de storage", url: "https://knowledge.broadcom.com/external/article/441641/vsphere-ha-failover-fails-with-insuffici.html", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: vcfFailureScenarios,
  chip: "Presentación técnica · VCF",
  title: "Cómo funciona VMware Cloud Foundation",
  tagline:
    "Una explicación conceptual de la plataforma, sus dependencias y sus condiciones de resiliencia.",
};

export const vcfSteps: ExplainerStep[] = [
  {
    id: "problem",
    tag: "01 — EL PROBLEMA",
    title: "Infraestructura en silos",
    paragraphs: [
      "En un entorno tradicional, cómputo, almacenamiento y red pueden administrarse en dominios y consolas separadas, con equipos y procesos distintos.",
      "Un cambio que cruza esos dominios — agregar capacidad, ampliar storage o ajustar la red — exige coordinar dependencias, validaciones y ventanas operativas.",
    ],
    businessImpact: "Escenario ilustrativo: cada dependencia adicional puede aumentar el tiempo y el riesgo operativo del cambio.",
    sceneId: "silos",
    caption: "Dominios separados, dependencias que requieren coordinación",
    sourceIds: ["vcf-platform"],
  },
  {
    id: "solution",
    tag: "02 — LA SOLUCIÓN",
    title: "Una plataforma integrada por software",
    paragraphs: [
      "VMware Cloud Foundation integra vSphere/ESXi para cómputo, vSAN para almacenamiento y NSX para networking, junto con servicios de gestión y operación.",
      "Aquí reducimos la plataforma a esas capacidades para explicarla; no es un inventario completo ni significa que todo se administre desde una única consola.",
    ],
    businessImpact: "Con automatización y servicios preparados, algunos flujos de aprovisionamiento pueden acelerarse; el resultado depende del diseño y la operación.",
    sceneId: "unify",
    caption: "Servicios integrados conectan cómputo, storage y networking",
    sourceIds: ["vcf-platform", "vcf-91-faq", "vcf-networking"],
  },
  {
    id: "architecture",
    tag: "03 — LA ARQUITECTURA",
    title: "Un clúster y servicios integrados",
    paragraphs: [
      "Varios servidores físicos (hosts ESXi) forman un clúster de vSphere. Cuando vSAN está habilitado, agrega almacenamiento local de los hosts en un datastore compartido.",
      "NSX aporta networking y seguridad definidos por software. vCenter administra el inventario y las operaciones de vSphere; la operación de VCF también involucra sus componentes de gestión y ciclo de vida.",
    ],
    businessImpact:
      "Condición importante: vSphere HA puede reiniciar VMs protegidas en hosts alternos cuando hay capacidad, visibilidad de storage y políticas compatibles; no es una garantía universal ni una migración en vivo.",
    sceneId: "cluster",
    caption: "vCenter gestiona el inventario y las operaciones de vSphere",
    sourceIds: ["vsan-datastore", "vcf-networking", "vsphere-ha-restart", "vsphere-ha-capacity"],
  },
  {
    id: "result",
    tag: "04 — EL RESULTADO",
    title: "Las cargas de trabajo, sin fricción",
    paragraphs: [
      "Sus aplicaciones y VMs consumen recursos del clúster; vSphere, el storage compartido y la red abstraen parte de la dependencia de un host concreto.",
      "Cuando la operación crece, agregar un host puede aumentar la capacidad si se cumplen compatibilidad, configuración de red y storage, capacidad de HA, licenciamiento y políticas del diseño.",
    ],
    businessImpact: "Resultado esperado del diseño: crecer de forma planificada sin rediseñar toda la plataforma por cada incremento.",
    sceneId: "workloads",
    caption: "Las apps consumen recursos del clúster con placement gestionado",
    sourceIds: ["vcf-platform", "vcf-91-faq", "vsphere-ha-capacity"],
  },
];
