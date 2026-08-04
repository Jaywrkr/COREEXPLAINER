import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const zeroTrustFailureScenarios: FailureScenario[] = [
  {
    id: "compromised-identity",
    sceneId: "limits",
    label: "Identidad comprometida",
    summary: "La identidad presenta señales de abuso o credenciales robadas.",
    detail:
      "La decisión no debe depender solo de que la contraseña sea válida: las señales de riesgo pueden cambiar el resultado y provocar una denegación, step-up o revocación.",
    limitation:
      "La demo no calcula un score de riesgo ni sustituye MFA, IAM, PAM o un sistema de detección real.",
    affectedNodes: ["Identidad", "Telemetría de riesgo"],
    deadNodeIds: ["identity"],
  },
  {
    id: "device-posture",
    sceneId: "limits",
    label: "Dispositivo no confiable",
    summary: "El dispositivo no cumple la postura requerida.",
    detail:
      "Un dispositivo sin estado de seguridad válido puede perder acceso aunque el usuario se haya autenticado correctamente.",
    limitation:
      "La postura concreta depende de MDM, EDR, sistema operativo, certificados y política del entorno.",
    affectedNodes: ["Dispositivo"],
    deadNodeIds: ["device"],
  },
  {
    id: "overbroad-policy",
    sceneId: "limits",
    label: "Política demasiado amplia",
    summary: "Una regla permite más alcance o privilegio del necesario.",
    detail:
      "Una política mal definida puede convertir un acceso puntual en acceso lateral o privilegiado. El modelo Zero Trust exige revisar sujeto, recurso, acción y contexto.",
    limitation:
      "La demo no representa una matriz completa de RBAC/ABAC ni los permisos internos de cada aplicación.",
    affectedNodes: ["Motor de política"],
    deadNodeIds: ["policy"],
  },
  {
    id: "telemetry-unavailable",
    sceneId: "limits",
    label: "Telemetría no disponible",
    summary: "La decisión pierde señales necesarias para evaluar el contexto.",
    detail:
      "Si las fuentes de identidad, dispositivo o riesgo no están disponibles, el sistema debe aplicar el comportamiento definido para incertidumbre: bloquear, limitar o usar un flujo de recuperación.",
    limitation:
      "No existe un comportamiento universal de fail-open o fail-closed; debe declararse en la política y el diseño del servicio.",
    affectedNodes: ["Telemetría de riesgo"],
    deadNodeIds: ["telemetry"],
  },
];

export const zeroTrustMeta: ExplainerMeta = {
  brandContext: brandContext.security,
  chip: "Seguridad · Zero Trust",
  title: "Cómo se decide cada acceso en Zero Trust",
  tagline:
    "Una explicación visual de identidad, contexto, política, enforcement y respuesta.",
  storyboardDoc: "docs/examples/zero-trust/storyboard.md",
  technicalValidationDoc: "docs/ai-context/zero-trust-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "Arquitectura Zero Trust conceptual basada en NIST SP 800-207 y CISA ZTMM v2; sin producto específico.",
    sources: [
      { id: "nist-800-207", title: "NIST SP 800-207 — Zero Trust Architecture", url: "https://nvlpubs.nist.gov/nistpubs/specialpublications/NIST.SP.800-207.pdf", accessedAt: "2026-08-04" },
      { id: "nist-components", title: "NIST — componentes y builds de Zero Trust", url: "https://pages.nist.gov/zero-trust-architecture/VolumeB/architecture.html", accessedAt: "2026-08-04" },
      { id: "nist-publication", title: "NIST — publicación de SP 800-207", url: "https://www.nist.gov/news-events/news/2020/08/zero-trust-architecture-nist-publishes", accessedAt: "2026-08-04" },
      { id: "cisa-ztmm", title: "CISA Zero Trust Maturity Model v2", url: "https://www.cisa.gov/sites/default/files/2023-04/CISA_Zero_Trust_Maturity_Model_Version_2_508c.pdf", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: zeroTrustFailureScenarios,
};

export const zeroTrustSteps: ExplainerStep[] = [
  {
    id: "request",
    tag: "01 — LA SOLICITUD",
    title: "El acceso comienza con una petición a un recurso",
    paragraphs: [
      "Una persona, servicio o proceso solicita una acción concreta sobre un recurso. Zero Trust no concede confianza implícita por estar dentro de una red, usar una VPN o haber pasado un login anterior.",
      "La solicitud debe identificar quién pide acceso, desde qué dispositivo o workload, a qué recurso y para qué acción. La aplicación y sus APIs también forman parte del límite de protección.",
    ],
    businessImpact:
      "El acceso se puede expresar como una decisión sobre una acción concreta, no como una llave permanente para toda la red.",
    sceneId: "request",
    caption: "Sujeto · dispositivo · acción · recurso",
    sourceIds: ["nist-800-207", "cisa-ztmm"],
  },
  {
    id: "context",
    tag: "02 — EL CONTEXTO",
    title: "La decisión combina identidad, dispositivo y señales",
    paragraphs: [
      "El motor de política reúne señales como identidad autenticada, postura del dispositivo, sensibilidad del recurso, ubicación, hora, riesgo y comportamiento observado.",
      "Estas señales no son una autorización por sí mismas: alimentan una evaluación que puede cambiar durante la sesión o cuando cambia el contexto.",
    ],
    businessImpact:
      "La seguridad deja de depender de una única frontera y puede adaptarse al riesgo de cada solicitud.",
    sceneId: "context",
    caption: "Identidad + dispositivo + recurso + riesgo",
    sourceIds: ["nist-800-207", "nist-components", "cisa-ztmm"],
  },
  {
    id: "decision",
    tag: "03 — LA DECISIÓN",
    title: "El motor de política decide permitir, limitar o denegar",
    paragraphs: [
      "El Policy Engine evalúa la política y el contexto; el Policy Administrator traduce el resultado al punto que debe aplicarlo. NIST separa estas funciones conceptualmente aunque una plataforma pueda implementarlas de distintas maneras.",
      "El resultado no tiene que ser binario: puede requerir autenticación adicional, reducir privilegios, limitar la sesión o negar la acción.",
    ],
    businessImpact:
      "Separar decisión y enforcement ayuda a cambiar políticas sin convertir cada aplicación en una lógica de seguridad aislada.",
    sceneId: "decision",
    caption: "Policy Engine → Policy Administrator → enforcement",
    sourceIds: ["nist-800-207", "nist-components"],
  },
  {
    id: "enforcement",
    tag: "04 — EL ENFORCEMENT",
    title: "El punto de enforcement protege el recurso",
    paragraphs: [
      "El Policy Enforcement Point aplica la decisión cerca del recurso: puede ser un proxy, gateway, agente, servicio, API o control dentro de la aplicación, según la arquitectura.",
      "La sesión permitida sigue observándose. Si cambian la identidad, la postura o el riesgo, el sistema puede reevaluar, limitar o revocar el acceso.",
    ],
    businessImpact:
      "La política acompaña al recurso y a la sesión, en lugar de confiar solo en el segmento de red desde el que llegó la petición.",
    sceneId: "enforcement",
    caption: "Decisión aplicada cerca del recurso · sesión observada",
    sourceIds: ["nist-800-207", "nist-components"],
  },
  {
    id: "limits",
    tag: "05 — LOS LÍMITES",
    title: "Zero Trust necesita señales, políticas y operación",
    paragraphs: [
      "Una identidad comprometida, un dispositivo no conforme, una regla demasiado amplia o una fuente de telemetría ausente pueden cambiar el resultado. El modelo no elimina el riesgo: lo hace visible y gobernable por decisión.",
      "La implementación requiere inventario de recursos, responsables de políticas, fuentes de señal, logging, respuesta y un comportamiento explícito cuando el contexto es incierto.",
    ],
    businessImpact:
      "La madurez se demuestra midiendo qué recursos están protegidos, qué decisiones se explican y cuánto tarda la organización en responder a una señal de riesgo.",
    sceneId: "limits",
    caption: "Identidad · dispositivo · política · telemetría · respuesta",
    sourceIds: ["nist-800-207", "cisa-ztmm", "nist-publication"],
  },
];
