import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";

export const mcpFundamentalsFailureScenarios: FailureScenario[] = [
  {
    id: "tool-permission-denied",
    sceneId: "boundaries",
    label: "La herramienta existe, pero no está autorizada",
    summary: "El host puede descubrir una herramienta, pero el servidor rechaza la llamada si faltan permisos o credenciales válidas.",
    detail: "MCP describe cómo se intercambian capacidades y mensajes; no reemplaza la autorización del sistema conectado. El servidor debe validar identidad, parámetros y alcance antes de invocar una integración.",
    limitation: "Esta simulación no llama un MCP real ni prueba credenciales, políticas ni un sistema externo.",
    affectedNodes: ["Herramienta", "Autorización", "Servidor MCP", "Sistema externo"],
    deadNodeIds: ["authorization"],
    simulation: { mode: "dependency", impact: "La llamada no llega al sistema externo y el host recibe un error controlado.", externalDependency: "Autorización configurada por el servidor y el sistema integrado" },
    guidedSteps: [
      { id: "observe", kind: "observe", title: "Leer el resultado", instruction: "Observa que la herramienta fue descubierta, pero la ejecución devuelve un rechazo controlado.", evidence: "Error de autorización y nombre de la herramienta solicitada.", expected: "El host diferencia un rechazo de permisos de una respuesta de negocio.", focusNodeIds: ["host", "tool", "authorization"], sourceIds: ["mcp-tools", "mcp-authorization"] },
      { id: "diagnose", kind: "diagnose", title: "Separar contrato de permiso", instruction: "Comprueba qué exige el esquema de la herramienta y qué identidad o permisos valida el servidor.", evidence: "Esquema de entrada, identidad autenticada y política del sistema externo.", expected: "Se identifica si el límite pertenece al cliente, al servidor o al sistema integrado.", focusNodeIds: ["tool", "server", "authorization"], sourceIds: ["mcp-architecture", "mcp-authorization"] },
      { id: "recover", kind: "recover", title: "Aplicar mínimo privilegio", instruction: "Solicita solo el permiso necesario para la operación concreta; no amplíes el acceso para resolver un error genérico.", evidence: "Alcance reducido, credencial protegida y aprobación según la política aplicable.", expected: "La llamada se habilita únicamente si la política lo permite.", focusNodeIds: ["authorization", "server", "external-system"], sourceIds: ["mcp-authorization"] },
      { id: "validate", kind: "validate", title: "Confirmar el límite", instruction: "Verifica que el resultado y la auditoría distingan éxito, denegación y error de integración.", evidence: "Respuesta estructurada y registro de auditoría del sistema que corresponda.", expected: "No se confunde una demostración visual con una comprobación de producción.", focusNodeIds: ["host", "server", "external-system"], sourceIds: ["mcp-tools", "mcp-authorization"] },
    ],
  },
];

export const mcpFundamentalsMeta: ExplainerMeta = {
  chip: "Estándar de integración · MCP",
  title: "Cómo funciona Model Context Protocol (MCP)",
  tagline: "Una explicación visual del contrato que permite a una aplicación de IA descubrir herramientas, recursos y prompts ofrecidos por servidores externos.",
  brandContext: [
    { name: "Model Context Protocol", role: "Estándar abierto de integración", scope: "Define la comunicación entre host, cliente y servidor; no entrega datos, permisos ni acceso por sí mismo." },
    { name: "OpenAI / Codex", role: "Ejemplo de host de IA", scope: "Puede actuar como aplicación que usa servidores MCP; el comportamiento disponible depende de la integración y configuración concretas." },
  ],
  storyboardDoc: "docs/examples/mcp-fundamentals/storyboard.md",
  technicalValidationDoc: "docs/ai-context/mcp-fundamentals-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-29",
    scope: "Explicación conceptual del protocolo MCP: arquitectura host–cliente–servidor, ciclo de vida, herramientas, recursos, prompts, mensajes JSON-RPC y autorización. No describe un servidor, proveedor, token, transporte ni despliegue particular.",
    sources: [
      { id: "mcp-architecture", title: "Architecture — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/architecture", accessedAt: "2026-08-29", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Arquitectura", validity: "current" },
      { id: "mcp-lifecycle", title: "Lifecycle — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle", accessedAt: "2026-08-29", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Ciclo de vida", validity: "current" },
      { id: "mcp-tools", title: "Tools — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools", accessedAt: "2026-08-29", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-11-25", reference: "Herramientas", validity: "current" },
      { id: "mcp-resources", title: "Resources — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/server/resources", accessedAt: "2026-08-29", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Recursos", validity: "current" },
      { id: "mcp-prompts", title: "Prompts — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/server/prompts", accessedAt: "2026-08-29", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Prompts", validity: "current" },
      { id: "mcp-authorization", title: "Authorization — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization", accessedAt: "2026-08-29", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Autorización", validity: "current" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: mcpFundamentalsFailureScenarios,
};

export const mcpFundamentalsSteps: ExplainerStep[] = [
  { id: "why-mcp", tag: "01 — EL PROBLEMA", title: "Antes, cada integración hablaba un idioma distinto", paragraphs: ["Una aplicación de IA puede necesitar consultar datos, leer documentación o pedir a un servicio que ejecute una acción. Sin un contrato común, cada conexión exige una API, autenticación, formato y lógica de integración diferentes.", "MCP propone una interfaz común entre una aplicación de IA y los sistemas que exponen contexto o capacidades. No sustituye las APIs existentes: organiza cómo un cliente de IA las descubre y utiliza mediante un servidor MCP."], businessImpact: "Un mismo patrón de integración reduce la lógica específica que el host debe aprender para cada sistema.", sceneId: "why-mcp", caption: "Muchos sistemas y contratos distintos → una interfaz MCP común", sourceIds: ["mcp-architecture"] },
  { id: "architecture", tag: "02 — LA ARQUITECTURA", title: "El host coordina; el servidor expone capacidades", paragraphs: ["En MCP, el host es la aplicación que contiene la experiencia de IA. El host crea uno o más clientes MCP, y cada cliente mantiene una conexión con un servidor MCP concreto.", "El servidor MCP publica capacidades: herramientas para ejecutar funciones, recursos para leer contexto y prompts para ofrecer plantillas. El host decide qué servidores conectar y cómo presentar los resultados a la persona."], businessImpact: "Separa la experiencia de IA de la integración: el host no necesita reimplementar cada sistema externo.", sceneId: "architecture", caption: "Persona → host de IA → cliente MCP → servidor MCP → sistema externo", sourceIds: ["mcp-architecture", "mcp-lifecycle"] },
  { id: "capabilities", tag: "03 — CAPACIDADES", title: "Herramientas, recursos y prompts no son lo mismo", paragraphs: ["Una herramienta es una función que el servidor puede ofrecer, con nombre, descripción y esquema de entrada. Por ejemplo, consultar un estado o iniciar una operación, siempre dentro de lo que el servidor autoriza.", "Un recurso entrega información que puede leerse como contexto; un prompt es una plantilla reutilizable para guiar una interacción. El modelo puede ayudar a elegir una herramienta, pero el contrato, los parámetros y la validación siguen definidos por el servidor."], businessImpact: "La persona puede entender qué está leyendo la IA, qué está pidiendo ejecutar y qué sólo es una guía de conversación.", sceneId: "capabilities", caption: "Recursos para leer · prompts para guiar · herramientas para solicitar una función", sourceIds: ["mcp-tools", "mcp-resources", "mcp-prompts"] },
  { id: "message-flow", tag: "04 — EL INTERCAMBIO", title: "La conversación se convierte en mensajes estructurados", paragraphs: ["Al conectarse, cliente y servidor inicializan la sesión y negocian las capacidades que entienden. Después el cliente puede listar capacidades, leer un recurso o invocar una herramienta usando mensajes estructurados de JSON-RPC.", "El servidor valida la solicitud, interactúa con el sistema que integra cuando corresponde y devuelve un resultado o error estructurado. El host usa ese resultado para continuar la conversación; no significa que el modelo haya obtenido acceso directo al sistema."], businessImpact: "El flujo queda auditable y separa una petición de IA de la acción que el servidor autoriza realmente.", sceneId: "message-flow", caption: "Inicializar → descubrir → solicitar → validar → resultado o error", sourceIds: ["mcp-lifecycle", "mcp-tools"] },
  { id: "boundaries", tag: "05 — LÍMITES Y SEGURIDAD", title: "MCP conecta capacidades; no elimina permisos ni riesgos", paragraphs: ["MCP no convierte un servidor en seguro por defecto, ni valida la calidad de la información que devuelve. Identidad, autorización, gestión de secretos, aprobación humana, registro y límites de datos pertenecen al diseño de cada integración.", "Un servidor debe exponer sólo las capacidades necesarias y validar entradas antes de tocar un sistema externo. Una herramienta visible no equivale a una acción aprobada, y un diagrama no comprueba credenciales ni efectos sobre producción."], businessImpact: "La conversación de seguridad pasa de “la IA puede hacerlo” a “qué capacidad está permitida, para quién y con qué evidencia”.", sceneId: "boundaries", caption: "Capacidad declarada + permiso válido + validación del servidor = llamada permitida", sourceIds: ["mcp-authorization", "mcp-tools", "mcp-architecture"] },
];
