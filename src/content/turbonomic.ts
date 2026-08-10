import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const turbonomicFailureScenarios: FailureScenario[] = [
  { id: "target-discovery", sceneId: "limits", label: "Target no validado", summary: "La supply chain está incompleta o desactualizada.", detail: "Credenciales, permisos, probe, versión o conectividad pueden impedir descubrir VMs, hosts, datastores o aplicaciones.", limitation: "La animación no valida un target ni ejecuta rediscovery.", affectedNodes: ["target", "supply-chain"], deadNodeIds: ["target"] },
  { id: "bad-demand", sceneId: "limits", label: "Demanda mal representada", summary: "El análisis optimiza datos que no reflejan el comportamiento real.", detail: "Métricas, ventanas de observación, relaciones y límites de la carga influyen en la decisión. Un dato incompleto cambia el resultado.", limitation: "La demo no ingiere métricas ni calcula SLO, percentiles o headroom.", affectedNodes: ["demand", "market"], deadNodeIds: ["demand"] },
  { id: "constraint", sceneId: "limits", label: "Restricción incompatible", summary: "La acción ideal no puede ejecutarse en el entorno actual.", detail: "Afinidad, licenciamiento, capacidad, red, storage, políticas de DRS o ventanas pueden limitar una migración o resize recomendado.", limitation: "La animación no evalúa constraints reales ni permisos de ejecución.", affectedNodes: ["constraints", "action"], deadNodeIds: ["constraints"] },
  { id: "automation-risk", sceneId: "limits", label: "Automatización sin guardrail", summary: "Una acción pasa de recomendación a ejecución sin aprobación adecuada.", detail: "Manual, automática y aprobada externamente son modos distintos. El ámbito, la ventana, el workflow y el rollback deben ser explícitos.", limitation: "La demo no ejecuta acciones ni verifica ServiceNow, APIs o runbooks.", affectedNodes: ["policy", "action"], deadNodeIds: ["policy"] },
];

export const turbonomicMeta: ExplainerMeta = {
  targetArchitecture: {
    label: "Optimización gobernada por demanda",
    summary: "El objetivo es relacionar aplicaciones, recursos, restricciones y acciones para optimizar con guardrails operativos.",
    expectedChanges: [
      "Targets y supply chain representan las dependencias que se quieren optimizar.",
      "Las recomendaciones se revisan contra demanda, capacidad, políticas y restricciones.",
      "La automatización empieza con aprobación y evidencia antes de ampliar su alcance.",
    ],
    limitations: "No se garantiza una acción segura sin validar métricas, permisos, ventanas, licencias, soporte y rollback.",
    sourceIds: ["turb-targets", "turb-actions", "turb-workflow", "turb-plans"],
  },
  chip: "Optimización · IBM Turbonomic",
  title: "Cómo IBM Turbonomic decide qué recurso necesita cada aplicación",
  tagline: "Una explicación visual de targets, supply chain, mercado, acciones, políticas de automatización y planes what-if.",
  brandContext: brandContext.turbonomic,
  storyboardDoc: "docs/examples/turbonomic/storyboard.md",
  technicalValidationDoc: "docs/ai-context/turbonomic-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-05",
    scope: "Patrón conceptual revisado con IBM Turbonomic 8.17.x: targets, hypervisor supply chain, tipos de acción, workflows de automatización y plan scenarios; confirmar target, release, permisos, políticas, constraints, ventanas y soporte.",
    sources: [
      { id: "turb-targets", title: "Turbonomic configuring targets", url: "https://www.ibm.com/docs/en/tarm/8.17.x?topic=configuration-configuring-targets", accessedAt: "2026-08-05" },
      { id: "turb-hypervisor", title: "Turbonomic hypervisor targets", url: "https://www.ibm.com/docs/en/tarm/8.17.x?topic=configuration-hypervisor-targets", accessedAt: "2026-08-05" },
      { id: "turb-actions", title: "Turbonomic action types", url: "https://www.ibm.com/docs/en/tarm/8.17.x?topic=actions-action-types", accessedAt: "2026-08-05" },
      { id: "turb-workflow", title: "Turbonomic automation workflow", url: "https://www.ibm.com/docs/en/tarm/8.17.x?topic=policies-automation-workflow", accessedAt: "2026-08-05" },
      { id: "turb-plans", title: "Turbonomic plans and future scenarios", url: "https://www.ibm.com/docs/en/tarm/8.x?topic=reference-plans-looking-future", accessedAt: "2026-08-05" },
      { id: "turb-pressure", title: "Turbonomic alleviate pressure plan", url: "https://www.ibm.com/docs/en/tarm/8.17.x?topic=types-alleviate-pressure-plan", accessedAt: "2026-08-05" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: turbonomicFailureScenarios,
};

export const turbonomicSteps: ExplainerStep[] = [
  { id: "demand", tag: "01 — LA DEMANDA", title: "La aplicación compra recursos para mantenerse saludable", paragraphs: ["Turbonomic modela workloads como compradores de recursos: CPU, memoria, storage, red y otros servicios. La pregunta no es solo cuánto consume una VM, sino qué necesita la aplicación para cumplir su objetivo.", "La calidad del análisis depende de que existan relaciones, métricas, targets y límites suficientes para representar la demanda real."], businessImpact: "El cliente puede discutir rendimiento, capacidad y coste desde el servicio que quiere proteger, no solo desde la utilización de un host.", sceneId: "demand", caption: "Aplicación → workload → demanda de recursos", sourceIds: ["turb-hypervisor", "turb-targets"] },
  { id: "supply-chain", tag: "02 — SUPPLY CHAIN", title: "Targets descubren quién provee cada recurso", paragraphs: ["Al conectar vCenter, Kubernetes, storage, cloud o APM, Turbonomic descubre entidades y relaciones que forman una supply chain: aplicaciones, VMs, hosts, datastores, controladores y capacidad.", "El descubrimiento no es una importación decorativa: determina qué entidades existen en el modelo, qué métricas se observan y qué acciones puede considerar el análisis."], businessImpact: "El cliente entiende por qué permisos, conectores y rediscovery son parte del resultado y no solo una tarea inicial.", sceneId: "supply-chain", caption: "Targets → entidades → relaciones → supply chain", sourceIds: ["turb-targets", "turb-hypervisor"] },
  { id: "market", tag: "03 — EL MERCADO", title: "El motor equilibra demanda, oferta y restricciones", paragraphs: ["Los compradores buscan recursos y los proveedores asignan capacidad con señales de utilización, precio, riesgo y disponibilidad. El motor analiza acciones como mover, redimensionar, provisionar, reconfigurar o suspender.", "Una recomendación no significa que cualquier acción sea segura: la plataforma debe conocer constraints, políticas, permisos, ventanas y el efecto sobre la aplicación."], businessImpact: "Las recomendaciones se pueden revisar como decisiones con impacto y supuestos, no como órdenes automáticas sin contexto.", sceneId: "market", caption: "Demanda + supply + constraints → acción candidata", sourceIds: ["turb-actions", "turb-hypervisor"] },
  { id: "automation", tag: "04 — AUTOMATIZACIÓN", title: "Automático no significa sin gobierno", paragraphs: ["Turbonomic distingue no generar, recomendar, ejecutar manualmente, automatizar o automatizar después de una aprobación externa. Cada modo cambia quién autoriza y cuándo se ejecuta.", "Los workflows pueden notificar, pedir aprobación, invocar un webhook o reemplazar la ejecución nativa. La política debe incluir alcance, ventana, criticidad y camino de reversión."], businessImpact: "El cliente puede empezar en recomendación/manual, medir resultados y automatizar solo las acciones que tienen guardrails suficientes.", sceneId: "automation", caption: "Recomendación → aprobación / workflow → ejecución", sourceIds: ["turb-workflow", "turb-actions"] },
  { id: "limits", tag: "05 — PLANES Y LÍMITES", title: "Un plan what-if es una simulación, no una garantía del futuro", paragraphs: ["Los planes crean una copia del mercado y permiten probar crecimiento, refresh de hardware, presión de cluster, migraciones o cambios de capacidad. El resultado compara el estado actual con un estado deseado bajo los supuestos del escenario.", "Activa fallos de target, demanda, constraints o política. La demo no calcula una acción real, no garantiza que el proveedor ejecute el cambio ni sustituye una revisión de impacto y rollback."], businessImpact: "La conversación termina con preguntas de datos, restricciones y aprobación antes de encender la automatización.", sceneId: "limits", caption: "Activa fallos para descubrir qué supuesto impide una decisión segura", sourceIds: ["turb-plans", "turb-pressure", "turb-workflow"] },
];
