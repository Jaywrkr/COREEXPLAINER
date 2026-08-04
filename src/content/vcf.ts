import type { ExplainerMeta, ExplainerStep } from "./types";

/**
 * Conceptual VCF explainer, framed for a CoreSolutions consultative sales
 * conversation. Version-specific claims and customer outcomes must be
 * reviewed against the validation matrix before this copy is used externally.
 */

export const vcfMeta: ExplainerMeta = {
  chip: "Presentación técnica · VCF",
  title: "Cómo funciona VMware Cloud Foundation",
  tagline:
    "Una explicación conceptual de la plataforma, sus dependencias y sus condiciones de resiliencia.",
  ctaLabel: "Agendar evaluación →",
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
  },
];
