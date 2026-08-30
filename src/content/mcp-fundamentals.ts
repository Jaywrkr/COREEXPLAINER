import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";

export const mcpFundamentalsFailureScenarios: FailureScenario[] = [
  {
    id: "permission-denied",
    sceneId: "safe-access",
    label: "El sistema no autoriza la consulta",
    summary: "La IA sabe qué herramienta necesita, pero la conexión no tiene permiso para usarla.",
    detail: "El servidor MCP comprueba la autorización antes de consultar el sistema conectado. Si el permiso falta, devuelve un error; no intenta saltarse el control.",
    limitation: "La escena es educativa: no usa credenciales ni consulta un sistema real.",
    affectedNodes: ["Permiso", "Servidor MCP", "Sistema conectado", "Respuesta"],
    deadNodeIds: ["permission"],
    simulation: { mode: "dependency", impact: "La solicitud se detiene y la persona recibe una explicación del rechazo.", externalDependency: "Permisos definidos por el sistema conectado" },
    guidedSteps: [
      { id: "observe", kind: "observe", title: "Ver dónde se detuvo", instruction: "Sigue la solicitud hasta el control de permiso.", evidence: "La herramienta fue elegida, pero no llegó al sistema conectado.", expected: "El rechazo aparece antes de cualquier consulta real.", focusNodeIds: ["assistant", "permission", "mcp-server"], sourceIds: ["mcp-tools", "mcp-authorization"] },
      { id: "diagnose", kind: "diagnose", title: "Distinguir conexión y acceso", instruction: "Comprueba que estar conectado no significa estar autorizado.", evidence: "Identidad, alcance solicitado y política del sistema.", expected: "Se identifica el permiso concreto que falta.", focusNodeIds: ["permission", "mcp-server", "connected-system"], sourceIds: ["mcp-architecture", "mcp-authorization"] },
      { id: "recover", kind: "recover", title: "Autorizar solo lo necesario", instruction: "Concede únicamente lectura si esa es la capacidad requerida.", evidence: "Permiso mínimo aprobado y credencial protegida.", expected: "La herramienta puede consultar sin obtener acceso adicional.", focusNodeIds: ["permission", "connected-system"], sourceIds: ["mcp-authorization"] },
      { id: "validate", kind: "validate", title: "Confirmar el resultado", instruction: "Repite la solicitud y comprueba que la respuesta conserve su origen.", evidence: "Resultado estructurado y registro de la llamada.", expected: "La persona distingue éxito, denegación y error técnico.", focusNodeIds: ["mcp-server", "connected-system", "answer"], sourceIds: ["mcp-tools", "mcp-authorization"] },
    ],
  },
];

export const mcpFundamentalsMeta: ExplainerMeta = {
  chip: "IA conectada · MCP",
  title: "Cómo una IA usa MCP para conectarse con otros sistemas",
  tagline: "MCP es un conector común: permite que una aplicación de IA descubra qué puede consultar o solicitar en sistemas externos, con límites claros.",
  brandContext: [
    { name: "Model Context Protocol", role: "Lenguaje común de conexión", scope: "Define cómo una aplicación de IA descubre y solicita capacidades; no concede acceso automáticamente." },
    { name: "OpenAI / Codex", role: "Ejemplo de aplicación con IA", scope: "Puede usar conexiones MCP configuradas; cada servidor conserva sus permisos y límites." },
  ],
  storyboardDoc: "docs/examples/mcp-fundamentals/storyboard.md",
  technicalValidationDoc: "docs/ai-context/mcp-fundamentals-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-30",
    scope: "Explicación progresiva de MCP: problema de una IA aislada, conector común, recorrido de una consulta, tipos de capacidad y autorización. La capa técnica conserva los roles host–cliente–servidor, ciclo de vida, tools, resources, prompts y JSON-RPC.",
    sources: [
      { id: "mcp-architecture", title: "Architecture — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/architecture", accessedAt: "2026-08-30", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Arquitectura", validity: "current" },
      { id: "mcp-lifecycle", title: "Lifecycle — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle", accessedAt: "2026-08-30", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Ciclo de vida", validity: "current" },
      { id: "mcp-tools", title: "Tools — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools", accessedAt: "2026-08-30", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-11-25", reference: "Herramientas", validity: "current" },
      { id: "mcp-resources", title: "Resources — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/server/resources", accessedAt: "2026-08-30", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Recursos", validity: "current" },
      { id: "mcp-prompts", title: "Prompts — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/server/prompts", accessedAt: "2026-08-30", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Prompts", validity: "current" },
      { id: "mcp-authorization", title: "Authorization — Model Context Protocol", url: "https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization", accessedAt: "2026-08-30", publisher: "Model Context Protocol", product: "Model Context Protocol", version: "2025-06-18", reference: "Autorización", validity: "current" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: mcpFundamentalsFailureScenarios,
};

export const mcpFundamentalsSteps: ExplainerStep[] = [
  {
    id: "isolated-ai", tag: "01 — LA LIMITACIÓN", title: "La IA puede conversar, pero no puede entrar sola a tus sistemas",
    paragraphs: ["Imagina que le pides a una IA: “busca este documento y dime qué necesito”. La IA entiende la petición, pero el documento está en otro sistema y no existe una conexión autorizada para leerlo.", "El modelo no debería inventar el contenido ni recibir acceso total. Necesita una forma controlada de preguntar qué está disponible y solicitar únicamente la información necesaria."],
    businessImpact: "MCP empieza donde termina el conocimiento propio de la IA: conecta la conversación con información o funciones externas.", sceneId: "isolated-ai", caption: "La persona pregunta · la IA entiende · el documento sigue fuera de alcance", sourceIds: ["mcp-architecture"],
  },
  {
    id: "common-connector", tag: "02 — EL CONECTOR", title: "MCP crea un camino común entre la IA y el sistema",
    paragraphs: ["La aplicación de IA se conecta a un servidor MCP. Ese servidor describe, en un formato común, qué información puede entregar y qué funciones puede recibir.", "El servidor MCP actúa como adaptador: por un lado habla MCP con la aplicación de IA y por el otro usa la API o mecanismo real del sistema conectado. MCP no reemplaza ese sistema; evita crear un idioma nuevo para cada asistente."],
    businessImpact: "Una aplicación de IA puede aprender a usar nuevas capacidades sin integrar cada sistema de una forma completamente distinta.", sceneId: "common-connector", caption: "Aplicación de IA → conexión MCP → servidor MCP → sistema", sourceIds: ["mcp-architecture", "mcp-lifecycle"],
  },
  {
    id: "complete-journey", tag: "03 — EL EJEMPLO", title: "La solicitud viaja, el sistema responde y la IA explica",
    paragraphs: ["La persona pide: “busca el manual del equipo y resume los requisitos”. La IA identifica la herramienta adecuada y envía al servidor MCP una solicitud con parámetros definidos.", "El servidor valida la petición, consulta la biblioteca autorizada y devuelve el contenido encontrado. La IA recibe ese resultado y lo convierte en una respuesta comprensible, conservando la diferencia entre lo consultado y lo que ella redactó."],
    businessImpact: "La persona hace una pregunta natural mientras cada componente conserva una responsabilidad visible y comprobable.", sceneId: "complete-journey", caption: "Pregunta → herramienta → servidor MCP → documento → resultado → respuesta", sourceIds: ["mcp-tools", "mcp-architecture"],
  },
  {
    id: "capabilities", tag: "04 — QUÉ PUEDE OFRECER", title: "Un servidor puede ofrecer información, guías o acciones",
    paragraphs: ["MCP agrupa las capacidades en conceptos distintos. Un recurso ofrece información para leer; un prompt ofrece una plantilla preparada; una herramienta permite solicitar una función con parámetros definidos.", "En términos técnicos se llaman resources, prompts y tools. La aplicación descubre lo que cada servidor declara; no debería asumir que una capacidad existe ni inventar parámetros fuera de su esquema."],
    businessImpact: "La interfaz puede explicar claramente cuándo la IA está leyendo información, siguiendo una guía o solicitando una acción.", sceneId: "capabilities", caption: "Leer información · usar una guía · solicitar una función", sourceIds: ["mcp-resources", "mcp-prompts", "mcp-tools"],
  },
  {
    id: "safe-access", tag: "05 — QUIÉN MANDA", title: "MCP muestra la puerta; los permisos deciden si se abre",
    paragraphs: ["Descubrir una herramienta no autoriza su uso. El servidor y el sistema conectado siguen validando identidad, permisos, parámetros y, cuando corresponde, confirmación humana.", "Por debajo, cliente y servidor negocian capacidades y usan mensajes JSON-RPC. Esa mecánica hace estructurada la comunicación, pero no sustituye la seguridad, el registro ni la responsabilidad de quien permite la acción."],
    businessImpact: "La IA obtiene capacidades delimitadas, no acceso ilimitado al sistema.", sceneId: "safe-access", caption: "Solicitud + permiso válido + validación = acceso controlado", sourceIds: ["mcp-authorization", "mcp-lifecycle", "mcp-tools"],
  },
];
