import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";

export const coreGlideMcpFailureScenarios: FailureScenario[] = [
  {
    id: "unconfirmed-client-alias",
    sceneId: "confidence",
    label: "Alias de cliente sin coincidencia confirmada",
    summary: "La consulta encuentra nombres parecidos, pero no puede demostrar que representen al mismo cliente.",
    detail: "El mapa relations.json puede normalizar aliases conocidos. Si el alias no está documentado, la respuesta debe conservar la ambigüedad y pedir validación humana en vez de unir registros por suposiciones.",
    limitation: "Es una simulación didáctica; no cambia Glide, relations.json, permisos ni el servicio MCP real.",
    affectedNodes: ["Alias", "Mapa de relaciones", "Resultado de IA", "Validación humana"],
    deadNodeIds: ["relation-map"],
    simulation: { mode: "dependency", impact: "La relación queda como coincidencia no confirmada hasta que una persona valide el dato.", externalDependency: "Calidad y mantenimiento de relaciones operativas" },
    guidedSteps: [
      { id: "observe", kind: "observe", title: "Detectar la ambigüedad", instruction: "Observa que el nombre de cliente de un ticket no coincide de forma exacta con el de proyectos.", evidence: "Comparar los valores fuente y el alias documentado, sin normalizar por intuición.", expected: "El resultado se presenta como pendiente de confirmación.", focusNodeIds: ["ticket", "alias", "relation-map"], sourceIds: ["core-glide-mcp"] },
      { id: "diagnose", kind: "diagnose", title: "Revisar la relación", instruction: "Comprueba si relations.json declara ese alias y cuál es la tabla fuente de verdad.", evidence: "Mapa de relaciones versionado y definición de tablas autorizadas.", expected: "Se identifica una relación documentada o una brecha de datos.", focusNodeIds: ["relation-map", "project", "ticket"], sourceIds: ["core-glide-mcp"] },
      { id: "recover", kind: "recover", title: "Evitar una unión inventada", instruction: "Mantén separados los registros mientras no exista una equivalencia confirmada.", evidence: "Resultado marcado como no confirmado y responsable de datos identificado.", expected: "La IA no convierte una coincidencia textual en un hecho operativo.", focusNodeIds: ["result", "human-review"], sourceIds: ["mcp-tools", "core-glide-mcp"] },
      { id: "validate", kind: "validate", title: "Validar con una persona responsable", instruction: "Confirma el cliente, documenta el alias si procede y vuelve a ejecutar la consulta.", evidence: "Aprobación humana y actualización trazable del mapa de relaciones.", expected: "La siguiente respuesta usa una relación explícita y verificable.", focusNodeIds: ["human-review", "relation-map", "result"], sourceIds: ["core-glide-mcp"] },
    ],
  },
];

export const coreGlideMcpMeta: ExplainerMeta = {
  chip: "Datos operativos · Core Glide MCP",
  title: "Cómo Core Glide MCP convierte datos operativos en respuestas controladas",
  tagline: "Una lectura visual de cómo Codex consulta Glide mediante herramientas MCP de solo lectura, relaciones documentadas y validación humana.",
  brandContext: [
    { name: "Glide", role: "Fuente de datos operativos", scope: "Las tablas y la API entregan datos autorizados; la calidad, el alcance del token y las relaciones deben validarse." },
    { name: "OpenAI / Codex", role: "Host de IA y cliente MCP", scope: "Interpreta preguntas y solicita herramientas declaradas; no reemplaza controles de acceso ni validación humana." },
    { name: "Model Context Protocol", role: "Estándar de integración", scope: "Define la separación entre host, cliente y servidor; no concede acceso ni corrige datos." },
    { name: "Render", role: "Alojamiento del servidor remoto", scope: "Es una dependencia de disponibilidad del servicio MCP remoto; no es la fuente operativa." },
  ],
  storyboardDoc: "docs/examples/core-glide-mcp/storyboard.md",
  technicalValidationDoc: "docs/ai-context/core-glide-mcp-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-28",
    scope: "Patrón conceptual de Core Glide MCP auditado contra el catálogo activo: servidor MCP remoto glide-core-mcp en Node.js, herramientas de consulta y análisis de solo lectura, API de Glide, relations.json y alojamiento activo en Render. Confirmar periódicamente el token, tablas autorizadas, catálogo de herramientas, aliases y despliegue.",
    sources: [
      { id: "mcp-architecture", title: "Architecture — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/architecture", accessedAt: "2026-08-28", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Arquitectura MCP", validity: "current" },
      { id: "mcp-tools", title: "Tools — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools", accessedAt: "2026-08-28", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-11-25", reference: "Herramientas MCP", validity: "current" },
      { id: "glide-tables-api", title: "Glide Tables API: A Non-Developer Guide", url: "https://help.glideapps.com/en/articles/9297111-glide-tables-api-a-non-developer-guide", accessedAt: "2026-08-28", publisher: "Glide", product: "Glide Tables API", version: "Referencia conceptual", reference: "API de tablas Glide", validity: "current" },
      { id: "glide-tables-client", title: "Glide Tables JavaScript Client", url: "https://github.com/glideapps/tables", accessedAt: "2026-08-28", publisher: "Glide", product: "Glide Tables JavaScript Client", version: "Referencia conceptual", reference: "Cliente JavaScript Glide", validity: "current" },
      { id: "openai-mcp", title: "Create a model response — OpenAI API Reference", url: "https://developers.openai.com/api/reference/cli/resources/responses/methods/create", accessedAt: "2026-08-28", publisher: "OpenAI", product: "Responses API", version: "Referencia conceptual", reference: "MCP en Responses API", validity: "current" },
      { id: "core-glide-mcp", title: "CoreSearch / glide-core-mcp", url: "https://github.com/Jaywrkr/CORESEARCH/tree/claude/glide-core-mcp-server-4q6zof/glide-core-mcp", accessedAt: "2026-08-28", publisher: "CORESOLUTIONS", product: "Core Glide MCP", version: "Catálogo activo auditado", reference: "Implementación y relaciones CoreSolutions", validity: "current" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: coreGlideMcpFailureScenarios,
};

export const coreGlideMcpSteps: ExplainerStep[] = [
  {
    id: "distributed-data",
    tag: "01 — DATOS DISPERSOS",
    title: "Una pregunta puede cruzar varias tablas",
    paragraphs: [
      "Proyectos, actividades, tickets, clientes, personal y certificaciones pueden vivir en tablas distintas. Una pregunta operacional útil suele exigir relacionar esos datos antes de poder responderla.",
      "Core Glide MCP no convierte automáticamente esas tablas en una única verdad. relations.json conserva relaciones y aliases que CoreSolutions mantiene; si no existe una relación explícita, el resultado debe conservar esa incertidumbre.",
    ],
    businessImpact: "La conversación cambia de buscar manualmente en varias pantallas a identificar qué evidencia relaciona cada dato.",
    sceneId: "distributed-data",
    caption: "Proyectos · actividades · tickets · clientes · personal · certificaciones",
    sourceIds: ["core-glide-mcp", "glide-tables-api"],
  },
  {
    id: "controlled-query",
    tag: "02 — CONSULTA CONTROLADA",
    title: "Codex pide una herramienta; no navega Glide libremente",
    paragraphs: [
      "El usuario formula una pregunta y Codex descubre una herramienta MCP con nombre, descripción y esquema de entrada. El servidor glide-core-mcp autentica la llamada, valida parámetros y consulta la API de Glide por HTTPS.",
      "El servidor devuelve resultados estructurados para que Codex redacte la respuesta. En el alcance auditado las herramientas son de consulta y análisis: no crean, actualizan ni borran registros operativos.",
    ],
    businessImpact: "La IA queda detrás de una capa de herramientas controladas en vez de recibir acceso libre a todas las tablas.",
    sceneId: "controlled-query",
    caption: "Pregunta → Codex → MCP → Glide → resultado estructurado → respuesta",
    sourceIds: ["mcp-architecture", "mcp-tools", "glide-tables-api", "glide-tables-client", "openai-mcp", "core-glide-mcp"],
  },
  {
    id: "confidence",
    tag: "03 — CONFIANZA Y LÍMITES",
    title: "Una respuesta útil todavía requiere datos y permisos correctos",
    paragraphs: [
      "Una coincidencia de nombre, un alias no documentado, un token demasiado amplio o una tabla desactualizada pueden cambiar el significado de una respuesta. El MCP entrega evidencia consultable; no certifica por sí solo que los datos sean completos o correctos.",
      "La persona responsable debe confirmar tablas fuente de verdad, información sensible, alcance del token, frecuencia de actualización y resultados que requieren aprobación. Las acciones de escritura no deben añadirse sin roles, confirmación explícita, auditoría y reversión.",
    ],
    businessImpact: "El cliente obtiene velocidad para investigar, sin confundir una respuesta de IA con una aprobación operacional.",
    sceneId: "confidence",
    caption: "Resultado de IA + relaciones documentadas + validación humana",
    sourceIds: ["core-glide-mcp", "mcp-tools", "glide-tables-api"],
  },
  {
    id: "guardrails",
    tag: "04 — GOBIERNO",
    title: "Solo lectura no elimina la responsabilidad de gobernar datos",
    paragraphs: [
      "Un token autoriza acceso técnico, pero no define por sí mismo qué información es apropiado consultar, mostrar o enviar al contexto de IA. El diseño debe aplicar mínimo privilegio y separar datos sensibles de preguntas que no los necesitan.",
      "Antes de incorporar cualquier acción de escritura se requieren roles, confirmación explícita, trazabilidad de cada cambio y un plan de reversión. El catálogo auditado no anuncia esas capacidades: este explainer mantiene ese límite de forma intencional.",
    ],
    businessImpact: "La automatización de consultas puede empezar con un alcance seguro, mientras el cliente define gobierno antes de ampliar capacidades.",
    sceneId: "guardrails",
    caption: "Permiso mínimo · datos sensibles · confirmación humana · sin escritura",
    sourceIds: ["glide-tables-api", "mcp-tools", "core-glide-mcp"],
  },
];
