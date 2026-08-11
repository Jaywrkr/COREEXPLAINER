export interface SolutionPattern {
  id: string;
  title: string;
  problem: string;
  outcome: string;
  brands: string[];
  signals: string[];
  evidence: string[];
  risks: string[];
  explainerSlugs: string[];
  lastReviewedAt: string;
}

/** Reusable CORESOLUTIONS patterns; claims remain conceptual until a project assessment confirms them. */
export const solutionPatterns: SolutionPattern[] = [
  {
    id: "resilient-virtual-platform",
    title: "Plataforma virtual resiliente",
    problem: "La continuidad depende de hosts, storage, red, gestión y capacidad que suelen documentarse por separado.",
    outcome: "Un diseño explicable con caminos de gestión y datos, capacidad de recuperación y pruebas de failover.",
    brands: ["VMware/Broadcom", "Lenovo", "IBM", "Aruba HPE"],
    signals: ["hosts saturados", "dependencias de storage no documentadas", "failover nunca probado"],
    evidence: ["HCL y versiones", "capacidad tras fallo", "paths y políticas", "prueba funcional"],
    risks: ["sizing insuficiente", "plano de gestión confundido con camino de datos", "rollback no definido"],
    explainerSlugs: ["vcf", "vsphere-ha", "vsan", "active-active-dc"],
    lastReviewedAt: "2026-08-09",
  },
  {
    id: "observability-to-action",
    title: "Observabilidad orientada a operación",
    problem: "Hay métricas aisladas, pero el equipo no puede conectar síntoma, dependencia, cambio y respuesta.",
    outcome: "Cobertura, correlación, evidencia de incidente y remediación gobernada.",
    brands: ["IBM Instana", "IBM Turbonomic"],
    signals: ["MTTR elevado", "mapas desactualizados", "recomendaciones sin contexto"],
    evidence: ["cobertura de servicios", "trazas y logs", "runbook", "criterio de éxito"],
    risks: ["telemetría incompleta", "automatización sin aprobación", "hipótesis sin evidencia"],
    explainerSlugs: ["instana", "turbonomic", "observability"],
    lastReviewedAt: "2026-08-09",
  },
  {
    id: "governed-hybrid-integration",
    title: "Integración híbrida gobernada",
    problem: "APIs, aplicaciones legacy, eventos y runtimes se conectan sin ownership, contrato ni trazabilidad común.",
    outcome: "Contratos, políticas, runtimes ubicados por dependencia y operación medible.",
    brands: ["IBM webMethods", "Aruba HPE", "Check Point"],
    signals: ["errores de mapping", "versiones incompatibles", "runtimes aislados"],
    evidence: ["contratos", "identidad y políticas", "matriz de ubicación", "observabilidad del flujo"],
    risks: ["rate limits mal definidos", "credenciales sin gobierno", "rollback inexistente"],
    explainerSlugs: ["webmethods", "nsx", "zero-trust"],
    lastReviewedAt: "2026-08-09",
  },
  {
    id: "cyber-resilient-recovery",
    title: "Ciberresiliencia y recuperación",
    problem: "La organización tiene controles de seguridad y copias, pero no demuestra contención y recuperación conjunta.",
    outcome: "Segmentación, detección, copias protegidas, restore y aceptación coordinados.",
    brands: ["Check Point", "Veeam", "IBM", "VMware/Broadcom"],
    signals: ["restore no probado", "ransomware sin ejercicio", "backups accesibles desde producción"],
    evidence: ["inmutabilidad", "aislamiento", "RPO/RTO", "acta de restore"],
    risks: ["credenciales compartidas", "copias contaminadas", "dependencias DNS/identidad omitidas"],
    explainerSlugs: ["ransomware-resilience", "backup-dr", "veeam-protection"],
    lastReviewedAt: "2026-08-09",
  },
  {
    id: "data-center-network-foundation",
    title: "Fundación LAN/SAN para cargas críticas",
    problem: "La aplicación se atribuye a servidores o storage sin explicar fabric, paths, MTU, VLAN y seguridad.",
    outcome: "Conectividad documentada extremo a extremo con separación de dominios y pruebas de pérdida de path.",
    brands: ["Aruba HPE", "IBM", "Lenovo", "VMware/Broadcom"],
    signals: ["rutas asimétricas", "zoning ambiguo", "MTU inconsistente"],
    evidence: ["diagramas de paths", "HCL y firmware", "zoning/mapping", "pruebas de failover"],
    risks: ["LAN y SAN mezcladas conceptualmente", "un único fabric", "cambios sin ventana"],
    explainerSlugs: ["lan-san", "san-storage", "active-active-dc"],
    lastReviewedAt: "2026-08-09",
  },
];
