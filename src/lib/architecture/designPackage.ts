import { componentById, portFor, portTypeExplanation, type StudioDiagram, type StudioPortType, type StudioValidation } from "./studio";

export interface ArchitectureDesignPackageInput {
  appVersion: string;
  generatedAt: string;
  diagram: StudioDiagram;
  validation: StudioValidation;
  risks: string[];
}

function safeText(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function protocolDiscoveryQuestion(type: StudioPortType): string {
  const questions: Record<StudioPortType, string> = {
    ethernet: "Confirmar velocidad, medio/óptica, VLAN, MTU y redundancia física del enlace Ethernet.",
    "fibre-channel": "Confirmar fabrics A/B, switches SAN, zoning, HBA, ópticas y multipath Fibre Channel.",
    iscsi: "Confirmar VLAN dedicada, MTU, rutas, autenticación y multipath iSCSI.",
    api: "Confirmar endpoint, autenticación, permisos, cifrado y propietario de la integración API.",
    management: "Confirmar red de gestión, aislamiento, método de acceso y responsable operativo.",
    backup: "Confirmar RPO/RTO, repositorio, inmutabilidad, retención, ventana y prueba de restauración.",
  };
  return questions[type];
}

/**
 * Creates a deterministic handoff document from a Studio diagram. It records
 * the proposal and its unresolved engineering work without turning a visual
 * model into an implementation approval or a bill of materials.
 */
export function buildArchitectureDesignPackageMarkdown(input: ArchitectureDesignPackageInput): string {
  const { diagram, validation, risks } = input;
  const components = diagram.nodes.map((node) => ({ node, component: componentById(node.componentId) }));
  const vendors = [...new Set(components.flatMap(({ component }) => component ? [component.vendor] : []))];
  const discovery = new Set<string>();

  for (const { node, component } of components) {
    if (!component) {
      discovery.add(`Definir el bloque autorizado que sustituye a “${safeText(node.label)}”.`);
      continue;
    }
    discovery.add(`Confirmar modelo, release/firmware, capacidad, licencias y HCL aplicable para ${component.name} (${component.vendor}).`);
  }
  for (const connection of diagram.connections) {
    const from = diagram.nodes.find((node) => node.id === connection.from);
    const fromPort = from ? portFor(from.componentId, connection.fromPort) : undefined;
    if (fromPort) discovery.add(protocolDiscoveryQuestion(fromPort.type));
  }

  const inventory = components.length
    ? components.map(({ node, component }, index) => `| ${index + 1} | ${safeText(node.label)} | ${component ? `${safeText(component.name)} · ${safeText(component.vendor)}` : "Componente no reconocido"} | ${component ? safeText(component.description) : "Requiere corrección antes de diseño."} |`).join("\n")
    : "| — | Sin equipos | — | El diagrama todavía no contiene bloques. |";
  const connections = diagram.connections.length
    ? diagram.connections.map((connection, index) => {
      const from = diagram.nodes.find((node) => node.id === connection.from);
      const to = diagram.nodes.find((node) => node.id === connection.to);
      const fromPort = from ? portFor(from.componentId, connection.fromPort) : undefined;
      const toPort = to ? portFor(to.componentId, connection.toPort) : undefined;
      const protocol = fromPort?.type ?? "pendiente";
      return `| ${index + 1} | ${safeText(from?.label ?? "Origen desconocido")} → ${safeText(to?.label ?? "Destino desconocido")} | ${safeText(connection.label || protocol)} | ${safeText(fromPort?.label ?? connection.fromPort)} → ${safeText(toPort?.label ?? connection.toPort)} | ${protocol === "pendiente" ? "Validar" : safeText(portTypeExplanation[protocol])} |`;
    }).join("\n")
    : "| — | Sin conexiones | — | — | Definir flujos y medios necesarios. |";

  return [
    `# Paquete de diseño técnico · ${safeText(diagram.title || "Arquitectura conceptual")}`,
    "",
    `CORESOLUTIONS · Versión ${safeText(input.appVersion)} · Generado ${safeText(input.generatedAt)}`,
    "",
    "> Borrador conceptual de discovery/preventa. No es una BOM, HCL, diseño de bajo nivel, configuración ni aprobación de implementación.",
    "",
    "## Resumen ejecutivo",
    safeText(diagram.summary || "Sin resumen declarado."),
    "",
    `- Bloques autorizados: ${diagram.nodes.length}`,
    `- Conexiones modeladas: ${diagram.connections.length}`,
    `- Marcas en alcance: ${vendors.length ? vendors.map(safeText).join("; ") : "sin definir"}`,
    `- Chequeo automático: ${validation.valid ? "sin errores estructurales" : `${validation.issues.length} error(es) por corregir`}`,
    "",
    "## Inventario conceptual",
    "| # | Equipo en el diagrama | Bloque autorizado | Rol conceptual |",
    "| --- | --- | --- | --- |",
    inventory,
    "",
    "## Conexiones y flujos",
    "| # | Extremos | Etiqueta | Puertos | Significado |",
    "| --- | --- | --- | --- | --- |",
    connections,
    "",
    "## Supuestos declarados",
    ...(diagram.assumptions.length ? diagram.assumptions.map((item) => `- ${safeText(item)}`) : ["- Ninguno declarado; completar discovery antes de avanzar."]),
    "",
    "## Riesgos visibles",
    ...(risks.length ? risks.map((item) => `- ${safeText(item)}`) : ["- No se detectaron riesgos por las reglas automáticas actuales. Esto no equivale a una revisión de resiliencia completa."]),
    "",
    "## Validación automática",
    ...(validation.valid ? ["- Los extremos existen y los puertos/modelos lógicos son compatibles según el catálogo Studio."] : validation.issues.map((item) => `- Corregir: ${safeText(item)}`)),
    "",
    "## Preguntas para discovery y revisión de ingeniería",
    ...[...discovery].map((item) => `- ${item}`),
    "",
    "## Pendientes obligatorios antes de implementación",
    "- Validar arquitectura objetivo, sizing, versiones, compatibilidad, HCL, licencias y soporte vigente con fuentes oficiales.",
    "- Confirmar topología física, cableado, ópticas, distancias, energía, redundancia y segmentación de red en el entorno real.",
    "- Acordar seguridad, permisos, continuidad, RPO/RTO, pruebas, ventana de cambio, rollback, responsables y criterios de aceptación.",
    "- Obtener aprobación de ingeniería y del cliente antes de adquirir, configurar o cambiar infraestructura.",
  ].join("\n");
}
