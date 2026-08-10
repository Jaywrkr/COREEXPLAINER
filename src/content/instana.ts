import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const instanaFailureScenarios: FailureScenario[] = [
  { id: "instrumentation-gap", sceneId: "limits", label: "Servicio sin cobertura", summary: "Una parte del recorrido no aporta contexto suficiente.", detail: "Un servicio sin agente, sensor u OpenTelemetry puede dejar un hueco en el mapa y obligar al equipo a inferir la causa desde los extremos.", limitation: "La animación no comprueba agentes, permisos, versiones ni cobertura real del cliente.", affectedNodes: ["agent", "service"], deadNodeIds: ["agent"] },
  { id: "telemetry-pipeline", sceneId: "limits", label: "Pipeline de telemetría degradado", summary: "Las aplicaciones siguen atendiendo, pero se pierde evidencia.", detail: "La pérdida de conectividad, colas, límites o configuración en el pipeline puede dejar métricas, trazas o logs incompletos durante un incidente.", limitation: "No se mide ingestión, backpressure, retención ni cuota de datos.", affectedNodes: ["agent", "collector"], deadNodeIds: ["collector"] },
  { id: "topology-drift", sceneId: "limits", label: "Mapa desactualizado", summary: "La topología ya no representa el despliegue actual.", detail: "Despliegues, cambios de red, servicios efímeros y tags inconsistentes pueden alterar la relación entre síntomas, dependencias y propietarios.", limitation: "La demo no descubre entidades ni valida tags o cambios de configuración.", affectedNodes: ["topology", "change"], deadNodeIds: ["topology"] },
  { id: "false-cause", sceneId: "limits", label: "Hipótesis sin evidencia suficiente", summary: "La investigación apunta a una causa que todavía debe comprobarse.", detail: "Una correlación o una recomendación de IA ayuda a priorizar la investigación, pero el equipo debe revisar señales, cambios, impacto y criterio de remediación.", limitation: "La animación no ejecuta una investigación real ni garantiza una causa raíz.", affectedNodes: ["investigation", "service"], deadNodeIds: ["investigation"] },
];

export const instanaMeta: ExplainerMeta = {
  targetArchitecture: {
    label: "Observabilidad de recorrido completo",
    summary: "El objetivo es conectar experiencia, servicios, infraestructura y señales para investigar incidentes con contexto común.",
    expectedChanges: [
      "Cobertura de los servicios y dependencias prioritarias.",
      "Trazas, métricas, logs y cambios correlacionados con una pregunta operativa.",
      "Investigación asistida por evidencia y remediación sujeta a validación humana.",
    ],
    limitations: "La cobertura, retención, sensores, permisos y edición deben validarse en el entorno real.",
    sourceIds: ["instana-capabilities", "instana-investigation", "instana-deployment"],
  },
  chip: "Observabilidad · IBM Instana",
  title: "Cómo IBM Instana conecta una señal con el impacto de una aplicación",
  tagline: "Una explicación visual de descubrimiento, mapas dinámicos, trazas, métricas, logs e investigación de incidentes con límites explícitos.",
  brandContext: brandContext.instana,
  storyboardDoc: "docs/examples/instana/storyboard.md",
  technicalValidationDoc: "docs/ai-context/instana-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-05",
    scope: "Patrón conceptual revisado con IBM Instana Observability: capacidades core, APM, mapas y trazas, despliegue SaaS/self-hosted e Intelligent Incident Investigation; confirmar edición, sensores, agentes, retención, región y entitlement.",
    sources: [
      { id: "instana-capabilities", title: "IBM Instana core capabilities", url: "https://www.ibm.com/docs/en/instana-observability?topic=core-capabilities", accessedAt: "2026-08-05" },
      { id: "instana-apm", title: "IBM Instana application performance monitoring", url: "https://www.ibm.com/products/instana/application-performance-monitoring", accessedAt: "2026-08-05" },
      { id: "instana-fullstack", title: "IBM Instana full-stack observability", url: "https://www.ibm.com/products/instana/full-stack-observability", accessedAt: "2026-08-05" },
      { id: "instana-deployment", title: "IBM Instana deployment options", url: "https://www.ibm.com/products/instana/deployment-options", accessedAt: "2026-08-05" },
      { id: "instana-investigation", title: "Intelligent incident investigation", url: "https://www.ibm.com/docs/en/instana-observability?topic=capabilities-intelligent-incident-investigation", accessedAt: "2026-08-05" },
      { id: "instana-cloud", title: "IBM Instana cloud monitoring", url: "https://www.ibm.com/products/instana/cloud-monitoring", accessedAt: "2026-08-05" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: instanaFailureScenarios,
};

export const instanaSteps: ExplainerStep[] = [
  { id: "journey", tag: "01 — EL RECORRIDO", title: "El usuario ve una respuesta; Instana sigue la cadena que la produce", paragraphs: ["Una operación puede cruzar gateway, servicios, base de datos, infraestructura y una dependencia externa. El objetivo es relacionar experiencia, servicio y componente sin perder el contexto de la solicitud.", "El mapa no es un dibujo estático: cambia con el descubrimiento del entorno y ayuda a ubicar dependencias upstream y downstream."], businessImpact: "El cliente puede pasar de ‘la aplicación está lenta’ a ‘qué servicio y dependencia explican el impacto para este flujo’. ", sceneId: "journey", caption: "Usuario → gateway → servicios → base de datos → resultado", sourceIds: ["instana-apm", "instana-fullstack"] },
  { id: "signals", tag: "02 — LAS SEÑALES", title: "Trazas, métricas, logs y perfiles responden preguntas diferentes", paragraphs: ["Las métricas muestran tendencias y salud agregada; las trazas siguen una solicitud; los logs explican eventos; y la instrumentación aporta contexto de ejecución y dependencia.", "Instana automatiza el descubrimiento y ofrece visibilidad contextual, pero la señal debe tener cobertura, calidad, retención y permisos suficientes para responder la pregunta operativa."], businessImpact: "La conversación deja de pedir ‘más dashboards’ y define qué evidencia necesita cada equipo para detectar, diagnosticar y demostrar una mejora.", sceneId: "signals", caption: "Instrumentación → métricas + traces + logs → pregunta operativa", sourceIds: ["instana-capabilities", "instana-apm", "instana-fullstack"] },
  { id: "discovery", tag: "03 — DESCUBRIMIENTO", title: "El mapa dinámico conecta servicios con infraestructura", paragraphs: ["La plataforma descubre componentes y sus relaciones para mostrar un contexto común: servicio, proceso, host, contenedor, Kubernetes, base de datos y dependencias de red.", "Ese contexto permite correlacionar cambios y síntomas, pero depende de que los agentes, sensores, permisos, tags y conexiones cubran el entorno que se quiere explicar."], businessImpact: "El cliente entiende que observabilidad es una capa de contexto operativo, no solamente una colección de métricas.", sceneId: "discovery", caption: "Servicio → proceso → host / contenedor → dependencia", sourceIds: ["instana-capabilities", "instana-fullstack", "instana-cloud"] },
  { id: "investigation", tag: "04 — INVESTIGACIÓN", title: "Una investigación acelera la hipótesis, pero la operación conserva el control", paragraphs: ["Intelligent Incident Investigation combina topología, trazas, métricas, logs y cambios para construir una hipótesis de causa probable y una cadena de propagación del impacto.", "La remediación debe validarse antes de ejecutarse: una recomendación puede producir un runbook o una acción, pero el equipo decide el alcance, las aprobaciones y el criterio de éxito."], businessImpact: "El cliente ve cómo se reduce el tiempo de diagnóstico sin convertir la IA en una autoridad incuestionable.", sceneId: "investigation", caption: "Incidente → hipótesis → evidencia → remediación validada", sourceIds: ["instana-investigation", "instana-capabilities"] },
  { id: "limits", tag: "05 — LÍMITES", title: "La observabilidad no puede explicar lo que nunca recibió", paragraphs: ["Activa fallos de cobertura, pipeline, topología o investigación. Cada escenario muestra una razón por la que la imagen puede quedar incompleta o una hipótesis debe ser comprobada.", "La demo no mide MVS, retención, cuotas, sensores, agentes, precisión de IA ni disponibilidad regional. SaaS y self-hosted tienen decisiones distintas de control, actualización y gobierno."], businessImpact: "La conversación termina con una lista concreta de cobertura, gobierno de datos y pruebas de incidentes, no con una promesa de visibilidad total.", sceneId: "limits", caption: "Activa fallos para descubrir qué evidencia todavía falta", sourceIds: ["instana-deployment", "instana-investigation", "instana-capabilities"] },
];
