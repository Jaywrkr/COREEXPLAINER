import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const webMethodsFailureScenarios: FailureScenario[] = [
  { id: "runtime-unavailable", sceneId: "limits", label: "Runtime de integración no disponible", summary: "La solicitud llega al control plane, pero no hay runtime que ejecute el flujo.", detail: "Un runtime local, cloud o remoto puede quedar aislado por red, capacidad, credenciales, versión o mantenimiento.", limitation: "La demo no comprueba agentes, VPE, conectividad ni estado de un runtime real.", affectedNodes: ["runtime", "integration"], deadNodeIds: ["runtime"] },
  { id: "api-policy", sceneId: "limits", label: "Política de API bloquea el flujo", summary: "El gateway rechaza la solicitud antes de llegar al servicio.", detail: "Tokens, API keys, scopes, rate limits, validación de contrato y políticas de seguridad forman parte del camino de una API.", limitation: "La animación no ejecuta OAuth, JWT, reglas ni una prueba de contrato.", affectedNodes: ["gateway", "policy"], deadNodeIds: ["gateway"] },
  { id: "mapping-error", sceneId: "limits", label: "Mapping o transformación incorrecta", summary: "El mensaje llega, pero el sistema destino no puede procesarlo.", detail: "Esquemas, campos obligatorios, encoding, errores, idempotencia y transacciones deben validarse entre sistemas, especialmente en integraciones B2B y legacy.", limitation: "La demo no transforma mensajes ni valida un contrato de negocio.", affectedNodes: ["mapping", "backend"], deadNodeIds: ["mapping"] },
  { id: "version-mismatch", sceneId: "limits", label: "Interoperabilidad no soportada", summary: "Los componentes existen, pero sus releases no forman una combinación soportada.", detail: "API Gateway, Integration Server, Developer Portal, runtimes y conectores deben revisarse contra la matriz de interoperabilidad y el release contratado.", limitation: "La demo no consulta el installer ni el soporte vigente del cliente.", affectedNodes: ["compatibility", "runtime"], deadNodeIds: ["compatibility"] },
];

export const webMethodsMeta: ExplainerMeta = {
  targetArchitecture: {
    label: "Integración híbrida gobernada",
    summary: "El objetivo es conectar APIs, aplicaciones, eventos y B2B con control separado de la ejecución, políticas y trazabilidad.",
    expectedChanges: [
      "Contratos de API, mapping y errores explícitos en cada flujo.",
      "Runtimes ubicados según conectividad, soberanía y cercanía a los datos.",
      "Gateway, portal, seguridad, observabilidad y ownership tratados como parte del servicio.",
    ],
    limitations: "La topología final depende de edición, interoperabilidad, conectividad, datos, seguridad y operación del cliente.",
    sourceIds: ["wm-overview", "wm-architecture", "wm-interoperability", "wm-gateway"],
    decisionOptions: [
      { id: "api-first", title: "Priorizar APIs y gobierno", summary: "Establecer contratos, seguridad, cuotas y ownership antes de ampliar integraciones.", benefits: "Reduce interfaces opacas y hace operable el consumo de servicios.", tradeoffs: "Puede exigir trabajo de versionado, mapping y adaptación de consumidores existentes.", evidence: "Contratos, políticas, identidad, rate limits, errores y portal de publicación.", sourceIds: ["wm-gateway", "wm-gateway-components"], scenarioIds: ["api-policy", "mapping-error"] },
      { id: "hybrid-first", title: "Priorizar patrón híbrido", summary: "Definir dónde se ejecuta cada runtime según datos, conectividad y operación.", benefits: "Permite modernizar sin mover todo al mismo lugar y respeta dependencias de sistemas existentes.", tradeoffs: "Aumenta la importancia de conectividad, credenciales, interoperabilidad y observabilidad entre dominios.", evidence: "Matriz de ubicación, rutas, VPE/VPN, versiones y ownership operativo.", sourceIds: ["wm-architecture", "wm-interoperability"], scenarioIds: ["runtime-unavailable", "version-mismatch"] },
    ],
  },
  chip: "Integración · IBM webMethods",
  title: "Cómo IBM webMethods conecta APIs, aplicaciones, eventos y B2B",
  tagline: "Una explicación visual de control plane, runtimes, Integration Server, API Gateway, gobierno, seguridad y operación híbrida.",
  brandContext: brandContext.webmethods,
  storyboardDoc: "docs/examples/webmethods/storyboard.md",
  technicalValidationDoc: "docs/ai-context/webmethods-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-05",
    scope: "Patrón conceptual revisado con IBM webMethods Hybrid Integration y productos 11.1: Integration Server, API Gateway, Developer Portal, hybrid control plane y runtimes remotos; confirmar edición, región, conectores, interoperabilidad, seguridad y patrón de despliegue.",
    sources: [
      { id: "wm-overview", title: "IBM webMethods Hybrid Integration overview", url: "https://www.ibm.com/docs/en/hybrid-integration-lib/hybrid-integration/saas?topic=overview", accessedAt: "2026-08-05" },
      { id: "wm-architecture", title: "IBM webMethods Hybrid Integration architecture", url: "https://www.ibm.com/docs/en/hybrid-integration-lib/hybrid-integration/saas?topic=overview-solution-architecture", accessedAt: "2026-08-05" },
      { id: "wm-interoperability", title: "Supported version interoperability", url: "https://www.ibm.com/docs/en/webmethods-integration/webmethods-installer/11.1.0?topic=supported-version-interoperability-webmethods-products", accessedAt: "2026-08-05" },
      { id: "wm-gateway", title: "webMethods API Gateway overview", url: "https://www.ibm.com/docs/en/wm-api-gateway-saas/11.1.0?topic=api-gateway-overview", accessedAt: "2026-08-05" },
      { id: "wm-gateway-components", title: "webMethods API Gateway components", url: "https://www.ibm.com/docs/en/wam/wm-api-gateway/11.1.0?topic=concepts-api-gateway-components", accessedAt: "2026-08-05" },
      { id: "wm-services", title: "webMethods Integration Server services", url: "https://www.ibm.com/docs/en/webmethods-integration/wm-integration-server/11.1.0?topic=operations-about-services", accessedAt: "2026-08-05" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: webMethodsFailureScenarios,
};

export const webMethodsSteps: ExplainerStep[] = [
  { id: "landscape", tag: "01 — EL PAISAJE", title: "Integrar es conectar capacidades, no solo endpoints", paragraphs: ["Una organización puede tener APIs, aplicaciones legacy, eventos Kafka, archivos, B2B/EDI y datos en nubes o data centers. El valor aparece cuando esos dominios comparten gobierno y trazabilidad.", "webMethods Hybrid Integration agrupa capacidades de integración, API management, B2B, eventos y transferencia de archivos; el diseño debe definir qué se ejecuta en cloud y qué permanece cerca de los datos."], businessImpact: "El cliente obtiene un mapa común de sus silos de integración y puede decidir qué debe reutilizar, gobernar o modernizar.", sceneId: "landscape", caption: "APIs + aplicaciones + eventos + B2B + archivos", sourceIds: ["wm-overview", "wm-architecture"] },
  { id: "flow", tag: "02 — EL FLUJO", title: "El runtime transforma y entrega el mensaje", paragraphs: ["Integration Server ejecuta servicios y flujos que reciben una solicitud, transforman datos, llaman sistemas y devuelven un resultado. El flujo puede conectar aplicaciones internas, SaaS, bases de datos, archivos o servicios externos.", "Un contrato de API no sustituye el mapping, manejo de errores, idempotencia, transacciones y observabilidad del proceso de negocio."], businessImpact: "La conversación se centra en qué ocurre con cada mensaje y dónde debe validarse, no solo en qué sistemas están conectados.", sceneId: "flow", caption: "Entrada → servicio / mapping → backend → respuesta", sourceIds: ["wm-services", "wm-overview"] },
  { id: "hybrid", tag: "03 — HÍBRIDO", title: "El control plane puede administrar runtimes en distintos lugares", paragraphs: ["La arquitectura híbrida separa control plane y data plane: algunas capacidades pueden estar alojadas por el servicio y otras desplegadas en la red del cliente como runtimes remotos.", "La conectividad, soberanía, disponibilidad, VPE/VPN, credenciales y ubicación de los datos condicionan el patrón. ‘Híbrido’ no significa que todo deba salir del data center."], businessImpact: "El cliente puede hablar de ubicación de datos, operación y conectividad antes de elegir un patrón SaaS o remoto.", sceneId: "hybrid", caption: "Control plane → runtime cloud / runtime remoto → sistemas", sourceIds: ["wm-architecture", "wm-overview"] },
  { id: "governance", tag: "04 — GOBIERNO", title: "API Gateway convierte una integración en un contrato operable", paragraphs: ["API Gateway aplica políticas de acceso, tokens, cuotas, validación y analítica antes de invocar servicios. Developer Portal ayuda a publicar y consumir APIs con una experiencia gobernada.", "La política debe incluir identidad, versionado, rate limits, errores, logging, secretos y ownership. El gateway protege el acceso, pero no arregla un mapping o una aplicación destino defectuosa."], businessImpact: "El cliente ve la API como producto operable y auditable, no como una URL publicada sin control.", sceneId: "governance", caption: "Consumidor → API Gateway → política → Integration Server", sourceIds: ["wm-gateway", "wm-gateway-components"] },
  { id: "limits", tag: "05 — LÍMITES", title: "La integración falla en contratos, runtimes y versiones tanto como en la red", paragraphs: ["Activa fallos de runtime, política, mapping o interoperabilidad. Cada uno obliga a revisar una capa distinta: ejecución, seguridad, semántica del mensaje o combinación de releases.", "La demo no ejecuta un flujo, no valida contratos, no prueba credenciales ni certifica compatibilidad. El diseño final debe incluir observabilidad, reintentos, DLQ o compensación, seguridad y aceptación de negocio."], businessImpact: "La explicación prepara una conversación de integración real: datos, ownership, seguridad, operación y soporte.", sceneId: "limits", caption: "Activa fallos para descubrir qué contrato o dependencia aún no está validado", sourceIds: ["wm-interoperability", "wm-gateway", "wm-services"] },
];
