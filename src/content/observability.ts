import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";

export const observabilityFailureScenarios: FailureScenario[] = [
  {
    id: "service-latency",
    sceneId: "incident",
    label: "Latencia en pagos",
    summary: "El servicio de pagos responde lentamente.",
    detail:
      "La traza conserva el recorrido de la solicitud y permite separar el tiempo del gateway, checkout, pagos y base de datos para localizar dónde se acumula la latencia.",
    limitation:
      "La animación no calcula una latencia real ni identifica automáticamente la causa raíz; muestra el camino que habría que investigar con datos correlacionados.",
    affectedNodes: ["Servicio de pagos", "Backend de trazas"],
    deadNodeIds: ["payment"],
  },
  {
    id: "collector-outage",
    sceneId: "incident",
    label: "Collector no disponible",
    summary: "El Collector deja de recibir o exportar telemetría.",
    detail:
      "Los servicios pueden seguir atendiendo solicitudes aunque el pipeline de observabilidad pierda señales. La instrumentación y el collector deben vigilarse como otra carga operativa.",
    limitation:
      "El resultado depende de buffers, retries, backpressure y configuración de cada SDK y Collector; no implica que toda señal se recupere después.",
    affectedNodes: ["Collector", "Backend de trazas", "Backend de métricas"],
    deadNodeIds: ["collector"],
  },
  {
    id: "telemetry-drop",
    sceneId: "incident",
    label: "Procesamiento descarta señales",
    summary: "Un processor filtra o descarta datos antes de exportarlos.",
    detail:
      "Los processors pueden transformar, enriquecer o filtrar telemetría. Un cambio de configuración puede reducir el volumen y también eliminar evidencia útil para una investigación.",
    limitation:
      "La demo no representa reglas de redaction, sampling ni pipelines separados por señal; cada decisión debe probarse contra privacidad, coste y diagnóstico.",
    affectedNodes: ["Processor", "Backend de trazas", "Backend de logs"],
    deadNodeIds: ["processor"],
  },
  {
    id: "metric-cardinality",
    sceneId: "incident",
    label: "Cardinalidad excesiva",
    summary: "Atributos de alta cardinalidad presionan el backend de métricas.",
    detail:
      "Etiquetas como user ID o rutas sin normalizar pueden crear demasiadas combinaciones. La señal puede seguir llegando, pero el coste y la utilidad operativa se degradan.",
    limitation:
      "La cardinalidad exacta depende del instrumento, atributos, SDK y backend; el diagrama explica el riesgo, no calcula el límite de una plataforma concreta.",
    affectedNodes: ["Backend de métricas", "Processor"],
    deadNodeIds: ["metrics-backend"],
  },
];

export const observabilityMeta: ExplainerMeta = {
  chip: "Cloud native · Observabilidad",
  title: "Cómo se entiende una aplicación distribuida",
  tagline:
    "Una explicación visual de señales, contexto, Collector y diagnóstico sin confundir observabilidad con un backend concreto.",
  storyboardDoc: "docs/examples/observability/storyboard.md",
  technicalValidationDoc: "docs/ai-context/observability-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "OpenTelemetry conceptual con referencia a Collector v0.157.0, especificación OTel 1.59.0 y alerting de Prometheus; validar versiones y backend del cliente.",
    sources: [
      { id: "otel-what", title: "What is OpenTelemetry?", url: "https://opentelemetry.io/docs/what-is-opentelemetry/", accessedAt: "2026-08-04" },
      { id: "otel-primer", title: "OpenTelemetry observability primer", url: "https://opentelemetry.io/docs/concepts/observability-primer/", accessedAt: "2026-08-04" },
      { id: "otel-context", title: "Context propagation", url: "https://opentelemetry.io/docs/concepts/context-propagation/", accessedAt: "2026-08-04" },
      { id: "otel-traces", title: "OpenTelemetry traces", url: "https://opentelemetry.io/docs/concepts/signals/traces/", accessedAt: "2026-08-04" },
      { id: "otel-metrics", title: "OpenTelemetry metrics", url: "https://opentelemetry.io/docs/concepts/signals/metrics/", accessedAt: "2026-08-04" },
      { id: "otel-logs", title: "OpenTelemetry logs", url: "https://opentelemetry.io/docs/concepts/signals/logs/", accessedAt: "2026-08-04" },
      { id: "otel-collector", title: "OpenTelemetry Collector", url: "https://opentelemetry.io/docs/collector/", accessedAt: "2026-08-04" },
      { id: "otel-collector-arch", title: "Collector architecture and pipelines", url: "https://opentelemetry.io/docs/collector/architecture/", accessedAt: "2026-08-04" },
      { id: "otel-sampling", title: "OpenTelemetry sampling", url: "https://opentelemetry.io/docs/concepts/sampling/", accessedAt: "2026-08-04" },
      { id: "prom-alerting", title: "Prometheus alerting overview", url: "https://prometheus.io/docs/alerting/latest/overview/", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: observabilityFailureScenarios,
};

export const observabilitySteps: ExplainerStep[] = [
  {
    id: "request-path",
    tag: "01 — EL RECORRIDO",
    title: "Una petición atraviesa varios servicios",
    paragraphs: [
      "Una solicitud de usuario puede pasar por un gateway, un servicio de checkout, pagos y una base de datos antes de devolver una respuesta.",
      "Cuando cada servicio se observa de forma aislada, el síntoma aparece en un lugar y la causa puede estar en otro. El recorrido completo necesita contexto que viaje con la solicitud.",
    ],
    businessImpact:
      "La conversación pasa de “un servicio está lento” a “en qué tramo de esta solicitud se consume el tiempo y qué dependencia lo explica?”.",
    sceneId: "request-path",
    caption: "Una solicitud cruza gateway, servicios y base de datos",
    sourceIds: ["otel-primer", "otel-traces", "otel-context"],
  },
  {
    id: "signals",
    tag: "02 — LAS SEÑALES",
    title: "Métricas, logs y trazas responden preguntas distintas",
    paragraphs: [
      "Las métricas resumen comportamiento agregado; los logs registran eventos y contexto; una traza conecta spans para representar el camino de una solicitud distribuida.",
      "OpenTelemetry instrumenta y exporta señales, pero no es el backend de almacenamiento ni la interfaz final. La arquitectura debe decidir qué señal responde a cada pregunta operativa.",
    ],
    businessImpact:
      "Usar la señal adecuada reduce el tiempo de diagnóstico: métricas detectan tendencia, trazas localizan el recorrido y logs aportan detalle del evento.",
    sceneId: "signals",
    caption: "Una misma operación produce métricas, logs y trazas",
    sourceIds: ["otel-what", "otel-primer", "otel-metrics", "otel-logs", "otel-traces"],
  },
  {
    id: "collection",
    tag: "03 — LA COLECCIÓN",
    title: "El Collector recibe, procesa y exporta telemetría",
    paragraphs: [
      "Los SDKs y agentes envían señales al Collector, que las recibe, procesa y exporta a uno o varios backends mediante pipelines por tipo de señal.",
      "Un processor puede enriquecer, transformar, filtrar o descartar datos. Por eso el pipeline es una parte de la arquitectura y no una caja transparente que siempre conserva todo.",
    ],
    businessImpact:
      "Centralizar procesamiento permite aplicar seguridad, batching, retries y routing sin acoplar cada servicio a un backend específico.",
    sceneId: "collection",
    caption: "Receivers → processors → exporters → backends",
    sourceIds: ["otel-collector", "otel-collector-arch"],
  },
  {
    id: "correlation",
    tag: "04 — LA CORRELACIÓN",
    title: "El contexto conecta señales con una investigación",
    paragraphs: [
      "El contexto propagado conserva la relación de una solicitud entre servicios. En un backend, un trace ID y atributos consistentes ayudan a saltar desde una métrica o alerta hacia los spans y logs relacionados.",
      "Sampling y cardinalidad son decisiones técnicas: reducen volumen o combinaciones, pero pueden quitar detalle si se configuran sin considerar las preguntas que la operación debe responder.",
    ],
    businessImpact:
      "La observabilidad útil no es acumular datos: es poder pasar de un síntoma agregado a evidencia contextual sin perder el límite de coste y privacidad.",
    sceneId: "correlation",
    caption: "Alerta → métrica → trace ID → spans y logs relacionados",
    sourceIds: ["otel-context", "otel-sampling", "otel-metrics", "otel-logs", "prom-alerting"],
  },
  {
    id: "incident",
    tag: "05 — LOS LÍMITES",
    title: "Diagnosticar depende de señales y capacidad disponibles",
    paragraphs: [
      "Una regresión de latencia, un Collector caído, un processor que descarta datos o una cardinalidad excesiva pueden dejar a la operación con una imagen incompleta del sistema.",
      "El backend puede mostrar una alerta, pero la causa debe comprobarse con el recorrido, el contexto y la calidad de las señales. Observabilidad no equivale a conocer automáticamente la causa raíz.",
    ],
    businessImpact:
      "La madurez se demuestra midiendo cobertura, coste, pérdida de señales y tiempo de diagnóstico; no solo instalando un dashboard.",
    sceneId: "incident",
    caption: "Activa un fallo para ver qué evidencia se conserva o se pierde",
    sourceIds: ["otel-collector", "otel-collector-arch", "otel-sampling", "otel-metrics", "prom-alerting"],
  },
];
