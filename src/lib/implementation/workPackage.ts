import type { ExplainerMeta, ExplainerStep } from "@/content/types";

export type WorkPackageItemStatus = "required" | "recommended";

export interface ImplementationPrerequisite {
  id: string;
  title: string;
  rationale: string;
  evidence: string;
  sourceIds: string[];
  status: WorkPackageItemStatus;
}

export interface ImplementationWorkstream {
  id: string;
  title: string;
  objective: string;
  tasks: string[];
  acceptanceEvidence: string;
  exitCriteria: string;
  sourceIds: string[];
  scenarioIds: string[];
}

export interface MaintenanceCheck {
  id: string;
  title: string;
  trigger: string;
  evidence: string;
  escalation: string;
  sourceIds: string[];
}

export interface ImplementationWorkPackage {
  schemaVersion: "1.0";
  slug: string;
  title: string;
  appVersion: string;
  generatedAt: string;
  brands: string[];
  readiness: {
    score: number;
    ready: boolean;
    missing: string[];
  };
  prerequisites: ImplementationPrerequisite[];
  workstreams: ImplementationWorkstream[];
  maintenanceChecks: MaintenanceCheck[];
  limitations: string[];
}

interface WorkPackageInput {
  slug: string;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
  appVersion: string;
  generatedAt: string;
}

function clean(value: string, max = 900): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function readinessFor(meta: ExplainerMeta, prerequisites: ImplementationPrerequisite[], workstreams: ImplementationWorkstream[]): ImplementationWorkPackage["readiness"] {
  const checks: Array<[string, boolean]> = [
    ["fuentes técnicas", meta.technicalReview.sources.length > 0],
    ["fuentes vigentes", meta.technicalReview.sources.some((source) => source.validity !== "review-needed")],
    ["prerrequisitos", prerequisites.length > 0],
    ["workstreams", workstreams.length > 0],
    ["evidencia de aceptación", workstreams.every((stream) => Boolean(stream.acceptanceEvidence && stream.exitCriteria))],
    ["escenarios de fallo", Boolean(meta.failureScenarios?.length)],
  ];
  const missing = checks.filter(([, complete]) => !complete).map(([label]) => label);
  return { score: Math.round(((checks.length - missing.length) / checks.length) * 100), ready: missing.length === 0, missing };
}

function buildPrerequisites(meta: ExplainerMeta, steps: ExplainerStep[]): ImplementationPrerequisite[] {
  const firstSourceIds = unique(steps[0]?.sourceIds ?? meta.technicalReview.sources.slice(0, 2).map((source) => source.id));
  const roadmapSourceIds = unique(meta.targetArchitecture?.sourceIds ?? []);
  return [
    {
      id: "scope-and-owners",
      title: "Alcance, responsables y criterio de éxito",
      rationale: "Evita iniciar un cambio técnico sin saber qué servicio se protege, quién decide y cómo se aceptará.",
      evidence: "Servicio afectado, responsables, ventana propuesta, dependencias y criterio de aceptación escritos.",
      sourceIds: firstSourceIds,
      status: "required",
    },
    {
      id: "platform-and-compatibility",
      title: "Plataforma, versiones y compatibilidad",
      rationale: "Las marcas y productos pueden cambiar funciones, HCL, APIs, licencias y límites entre releases.",
      evidence: "Inventario de modelos/versiones, matriz de compatibilidad y fuentes del fabricante revisadas.",
      sourceIds: unique([...firstSourceIds, ...roadmapSourceIds]),
      status: "required",
    },
    {
      id: "rollback-and-observability",
      title: "Rollback, observabilidad y datos de comparación",
      rationale: "Una implementación no se puede evaluar ni revertir con seguridad si no existe una línea base observable.",
      evidence: "Línea base, señales de salud, punto de retorno, responsables y evidencia esperada antes/después.",
      sourceIds: unique(meta.technicalReview.sources.slice(0, 3).map((source) => source.id)),
      status: "recommended",
    },
  ];
}

function buildWorkstreams(meta: ExplainerMeta, steps: ExplainerStep[]): ImplementationWorkstream[] {
  const scenarios = meta.failureScenarios ?? [];
  const authored = meta.targetArchitecture?.roadmap ?? [];
  if (authored.length) {
    return authored.map((phase, index) => ({
      id: phase.id,
      title: clean(phase.title, 180),
      objective: clean(phase.objective),
      tasks: [
        `Revisar la escena ${index + 1} y sus dependencias antes de modificar el entorno.`,
        `Documentar la evidencia de ${clean(phase.evidence)}.`,
        "Registrar supuestos, responsables y límites del alcance.",
      ],
      acceptanceEvidence: clean(phase.evidence),
      exitCriteria: clean(phase.exitCriteria),
      sourceIds: unique(phase.sourceIds ?? []),
      scenarioIds: scenarios.slice(index, index + 1).map((scenario) => scenario.id),
    }));
  }
  return steps.map((step, index) => ({
    id: `step-${step.id}`,
    title: clean(step.title, 180),
    objective: clean(step.businessImpact),
    tasks: [
      `Contrastar el flujo representado en “${clean(step.title, 140)}” con el entorno y sus dependencias.`,
      "Registrar la diferencia entre el estado actual, la hipótesis y el resultado esperado.",
    ],
    acceptanceEvidence: clean(step.businessImpact),
    exitCriteria: index === steps.length - 1 ? "El flujo completo fue revisado y el criterio de aceptación quedó documentado." : "La escena y sus dependencias tienen evidencia suficiente para pasar a la siguiente fase.",
    sourceIds: unique(step.sourceIds),
    scenarioIds: scenarios.slice(index, index + 1).map((scenario) => scenario.id),
  }));
}

function buildMaintenanceChecks(meta: ExplainerMeta): MaintenanceCheck[] {
  const sourceIds = unique(meta.technicalReview.sources.slice(0, 2).map((source) => source.id));
  return [
    { id: "release-review", title: "Revisar cambios de release y compatibilidad", trigger: "Nueva versión, firmware, licencia o cambio de plataforma.", evidence: "Release notes, matriz de compatibilidad y decisión de mantener/actualizar.", escalation: "Escalar si una capacidad, API o integración deja de estar soportada.", sourceIds },
    { id: "health-baseline", title: "Comparar salud contra la línea base", trigger: "Degradación, alerta repetida o cambio de comportamiento.", evidence: "Métricas, logs, trazas o reportes comparables antes/después.", escalation: "Escalar cuando no se pueda separar síntoma, dependencia y causa probable.", sourceIds },
    { id: "recovery-rehearsal", title: "Revisar recuperación y dependencias", trigger: "Prueba programada, incidente o cambio de arquitectura.", evidence: "Resultado de prueba, tiempos observados, dependencias y acciones pendientes.", escalation: "Escalar si el criterio de recuperación no puede demostrarse con evidencia.", sourceIds },
  ];
}

export function buildImplementationWorkPackage(input: WorkPackageInput): ImplementationWorkPackage {
  const prerequisites = buildPrerequisites(input.meta, input.steps);
  const workstreams = buildWorkstreams(input.meta, input.steps);
  return {
    schemaVersion: "1.0",
    slug: input.slug,
    title: input.meta.title,
    appVersion: clean(input.appVersion, 40),
    generatedAt: clean(input.generatedAt, 80),
    brands: input.meta.brandContext.map((brand) => `${clean(brand.name, 100)} (${clean(brand.role, 160)})`),
    readiness: readinessFor(input.meta, prerequisites, workstreams),
    prerequisites,
    workstreams,
    maintenanceChecks: buildMaintenanceChecks(input.meta),
    limitations: [
      "Artefacto conceptual generado desde contenido autorado; no ejecuta comandos ni modifica infraestructura.",
      "Debe adaptarse al runbook aprobado, al contrato de soporte, a la ventana de cambio y a los permisos del cliente.",
      "La preparación no certifica compatibilidad, capacidad, seguridad ni recuperación del entorno real.",
    ],
  };
}

export function buildImplementationWorkPackageMarkdown(pkg: ImplementationWorkPackage): string {
  const lines = [
    `Versión de la aplicación: ${pkg.appVersion}`,
    `Generado: ${pkg.generatedAt}`,
    `# CORESOLUTIONS · Paquete técnico · ${pkg.title}`,
    `Tema: ${pkg.slug}`,
    `Preparación: ${pkg.readiness.score}% (${pkg.readiness.ready ? "lista para revisión humana" : `faltan: ${pkg.readiness.missing.join(", ")}`})`,
    `Marcas en alcance: ${pkg.brands.join("; ") || "no declaradas"}`,
    "",
    "> Documento conceptual de implementación y mantenimiento. No ejecuta acciones ni certifica un entorno.",
    "",
    "## Prerrequisitos",
    ...pkg.prerequisites.map((item) => `- **${item.title}** [${item.status}] — ${item.rationale} Evidencia: ${item.evidence}. Fuentes: ${item.sourceIds.join(", ") || "confirmar"}.`),
    "",
    "## Workstreams de implementación",
    ...pkg.workstreams.flatMap((stream, index) => [
      `### ${index + 1}. ${stream.title}`,
      `- Objetivo: ${stream.objective}`,
      ...stream.tasks.map((task) => `- Tarea conceptual: ${task}`),
      `- Evidencia de aceptación: ${stream.acceptanceEvidence}`,
      `- Criterio de salida: ${stream.exitCriteria}`,
      `- Escenarios relacionados: ${stream.scenarioIds.join(", ") || "identificar"}`,
      `- Fuentes: ${stream.sourceIds.join(", ") || "confirmar"}`,
      "",
    ]),
    "## Controles de mantenimiento",
    ...pkg.maintenanceChecks.map((check) => `- **${check.title}** — disparador: ${check.trigger} Evidencia: ${check.evidence} Escalar si: ${check.escalation}`),
    "",
    "## Límites",
    ...pkg.limitations.map((limitation) => `- ${limitation}`),
  ];
  return lines.join("\n");
}
