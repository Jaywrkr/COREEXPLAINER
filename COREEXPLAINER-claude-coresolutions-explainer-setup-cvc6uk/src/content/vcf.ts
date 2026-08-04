import type { ExplainerMeta, ExplainerStep } from "./types";

/**
 * Example content — VMware Cloud Foundation, framed for a CoreSolutions
 * consultative sales conversation. This is placeholder copy the sales/
 * technical team should replace with their real talk track; it exists to
 * prove the layout and animation engine end to end.
 */

export const vcfMeta: ExplainerMeta = {
  chip: "Presentación técnica · VCF",
  title: "Cómo funciona VMware Cloud Foundation",
  tagline:
    "Una forma visual de explicar la arquitectura sin perder al cliente en la jerga técnica.",
  ctaLabel: "Agendar evaluación →",
};

export const vcfSteps: ExplainerStep[] = [
  {
    id: "problem",
    tag: "01 — EL PROBLEMA",
    title: "Infraestructura en silos",
    paragraphs: [
      "Hoy, cómputo, almacenamiento y red suelen operar como tres sistemas separados, cada uno con su propia consola, su propio proveedor y su propio equipo a cargo.",
      "Cada cambio — agregar un servidor, expandir el storage, ajustar la red — requiere coordinar varios sistemas distintos y esperar una ventana de mantenimiento.",
    ],
    businessImpact: "Impacto para su operación: un cambio que debería tomar horas termina tomando semanas.",
    sceneId: "silos",
    caption: "Tres sistemas, tres consolas, cero coordinación automática",
  },
  {
    id: "solution",
    tag: "02 — LA SOLUCIÓN",
    title: "Una plataforma definida por software",
    paragraphs: [
      "VMware Cloud Foundation (VCF) unifica cómputo, almacenamiento (vSAN) y red (NSX) en una sola plataforma, administrada desde un único panel.",
      "En lugar de tres sistemas que requieren coordinación manual, una capa de software los orquesta de forma conjunta.",
    ],
    businessImpact: "Impacto para su operación: desplegar una nueva carga de trabajo pasa de semanas a minutos.",
    sceneId: "unify",
    caption: "Una capa de software orquesta cómputo, storage y red",
  },
  {
    id: "architecture",
    tag: "03 — LA ARQUITECTURA",
    title: "Un clúster, tres capas",
    paragraphs: [
      "Varios servidores físicos (hosts ESXi) forman un clúster. vSAN integra sus discos en un storage compartido. NSX despliega la red virtual entre ellos.",
      "vCenter es el panel de administración: desde ahí se gestiona el clúster completo como una sola unidad.",
    ],
    businessImpact:
      "Impacto para su operación: ante la falla de un host, las cargas de trabajo se reubican automáticamente, con 99.97% de disponibilidad objetivo.",
    sceneId: "cluster",
    caption: "vCenter administra el clúster completo desde un solo lugar",
  },
  {
    id: "result",
    tag: "04 — EL RESULTADO",
    title: "Las cargas de trabajo, sin fricción",
    paragraphs: [
      "Sus aplicaciones, bases de datos y escritorios virtuales operan sobre esta plataforma sin depender de un servidor físico específico.",
      "Cuando su operación crece, se incorpora un host adicional al clúster y la capacidad total aumenta, sin necesidad de rediseñar la arquitectura.",
    ],
    businessImpact: "Impacto para su operación: la infraestructura escala con su empresa, no al revés.",
    sceneId: "workloads",
    caption: "Las apps corren arriba, sin importar el servidor físico",
  },
];
