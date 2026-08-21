export type StudioPortType = "ethernet" | "fibre-channel" | "iscsi" | "api" | "management" | "backup";

export interface StudioPort { id: string; label: string; type: StudioPortType; }
export interface StudioCatalogComponent {
  id: string;
  vendor: string;
  name: string;
  kind: "external" | "network" | "security" | "compute" | "storage" | "platform" | "observability" | "backup";
  description: string;
  ports: StudioPort[];
}
export interface StudioNode { id: string; componentId: string; label: string; x: number; y: number; }
export interface StudioConnection { id: string; from: string; fromPort: string; to: string; toPort: string; label: string; }
export interface StudioDiagram { title: string; summary: string; assumptions: string[]; nodes: StudioNode[]; connections: StudioConnection[]; }
export interface StudioValidation { valid: boolean; issues: string[]; }

/** Authoritative logical building blocks. This is intentionally not an HCL or a BOM. */
export const studioCatalog: StudioCatalogComponent[] = [
  { id: "client", vendor: "CORESOLUTIONS", name: "Usuarios / servicio externo", kind: "external", description: "Consumidor, sucursal o sistema externo.", ports: [{ id: "api", label: "API / aplicación", type: "api" }, { id: "eth", label: "Ethernet", type: "ethernet" }] },
  { id: "aruba-cx", vendor: "Aruba HPE", name: "Switch Aruba CX", kind: "network", description: "Conmutación Ethernet de acceso, core o data center.", ports: [{ id: "eth", label: "Ethernet", type: "ethernet" }, { id: "mgmt", label: "Gestión", type: "management" }] },
  { id: "checkpoint", vendor: "Check Point", name: "Security Gateway", kind: "security", description: "Inspección y control de tráfico IP.", ports: [{ id: "inside", label: "Ethernet interno", type: "ethernet" }, { id: "outside", label: "Ethernet externo", type: "ethernet" }, { id: "mgmt", label: "Gestión", type: "management" }] },
  { id: "vmware-host", vendor: "VMware by Broadcom", name: "Host VMware", kind: "compute", description: "Host de virtualización; modelo, NIC, HBA y release se validan en ingeniería.", ports: [{ id: "eth", label: "Ethernet / VMkernel", type: "ethernet" }, { id: "fc", label: "HBA Fibre Channel", type: "fibre-channel" }, { id: "iscsi", label: "iSCSI", type: "iscsi" }, { id: "mgmt", label: "Gestión", type: "management" }, { id: "api", label: "Agente / telemetría", type: "api" }, { id: "backup", label: "Protección / backup", type: "backup" }] },
  { id: "lenovo-server", vendor: "Lenovo", name: "ThinkSystem", kind: "compute", description: "Servidor físico para cómputo o plataforma.", ports: [{ id: "eth", label: "Ethernet", type: "ethernet" }, { id: "fc", label: "HBA Fibre Channel", type: "fibre-channel" }, { id: "iscsi", label: "iSCSI", type: "iscsi" }, { id: "mgmt", label: "Gestión", type: "management" }, { id: "api", label: "Agente / telemetría", type: "api" }, { id: "backup", label: "Protección / backup", type: "backup" }] },
  { id: "ibm-flashsystem", vendor: "IBM", name: "FlashSystem", kind: "storage", description: "Almacenamiento de bloques; protocolo y matriz exactos requieren validación.", ports: [{ id: "fc", label: "Fibre Channel", type: "fibre-channel" }, { id: "iscsi", label: "iSCSI", type: "iscsi" }, { id: "eth", label: "Ethernet", type: "ethernet" }, { id: "mgmt", label: "Gestión", type: "management" }] },
  { id: "veeam", vendor: "Veeam", name: "Veeam Data Platform", kind: "backup", description: "Orquestación de protección y recuperación.", ports: [{ id: "backup", label: "Repositorio / backup", type: "backup" }, { id: "api", label: "API", type: "api" }, { id: "eth", label: "Ethernet", type: "ethernet" }] },
  { id: "instana", vendor: "IBM", name: "Instana", kind: "observability", description: "Observabilidad y correlación de aplicaciones.", ports: [{ id: "api", label: "API / telemetría", type: "api" }] },
  { id: "turbonomic", vendor: "IBM", name: "Turbonomic", kind: "observability", description: "Análisis de recursos y decisiones de optimización.", ports: [{ id: "api", label: "API", type: "api" }] },
  { id: "webmethods", vendor: "IBM", name: "webMethods", kind: "platform", description: "Integración, APIs y eventos gobernados.", ports: [{ id: "api", label: "API / integración", type: "api" }, { id: "eth", label: "Ethernet", type: "ethernet" }] },
];

/** Plain-language explanation of what a link type means, for people who don't read port diagrams for a living. */
export const portTypeExplanation: Record<StudioPortType, string> = {
  ethernet: "Cable de red para el tráfico normal de datos.",
  "fibre-channel": "Cableado dedicado de alta velocidad para acceder al almacenamiento.",
  iscsi: "Acceso a almacenamiento sobre la red Ethernet existente, sin cableado dedicado.",
  api: "Vínculo lógico: un sistema consulta o recibe datos del otro por software, no requiere cable propio.",
  management: "Canal separado para administrar el equipo (consola/gestión), no transporta tráfico de aplicaciones.",
  backup: "Vínculo de protección de datos: copia o replica información hacia este equipo.",
};

export function componentById(id: string) { return studioCatalog.find((component) => component.id === id); }
export function portFor(componentId: string, portId: string) { return componentById(componentId)?.ports.find((port) => port.id === portId); }
export function compatiblePortTypes(left: StudioPortType, right: StudioPortType) {
  return left === right || (left === "management" && right === "ethernet") || (left === "ethernet" && right === "management");
}

export function validateStudioDiagram(diagram: StudioDiagram): StudioValidation {
  const issues: string[] = [];
  const ids = new Set<string>();
  for (const node of diagram.nodes) {
    if (ids.has(node.id)) issues.push(`Nodo duplicado: ${node.label}.`);
    ids.add(node.id);
    if (!componentById(node.componentId)) issues.push(`Componente no autorizado: ${node.componentId}.`);
    if (!Number.isFinite(node.x) || !Number.isFinite(node.y) || node.x < 2 || node.x > 98 || node.y < 4 || node.y > 94) issues.push(`La posición de ${node.label} está fuera del canvas.`);
  }
  for (const connection of diagram.connections) {
    const from = diagram.nodes.find((node) => node.id === connection.from);
    const to = diagram.nodes.find((node) => node.id === connection.to);
    if (!from || !to) { issues.push("Una conexión apunta a un nodo inexistente."); continue; }
    if (from.id === to.id) issues.push(`Una conexión no puede volver al mismo nodo (${from.label}).`);
    const fromPort = portFor(from.componentId, connection.fromPort);
    const toPort = portFor(to.componentId, connection.toPort);
    if (!fromPort || !toPort) { issues.push(`La conexión ${from.label} → ${to.label} usa un puerto no disponible.`); continue; }
    if (!compatiblePortTypes(fromPort.type, toPort.type)) issues.push(`${from.label} (${fromPort.label}) no es compatible con ${to.label} (${toPort.label}).`);
  }
  return { valid: issues.length === 0, issues };
}

export function normalizeGeneratedDiagram(input: unknown): StudioDiagram | null {
  if (!input || typeof input !== "object") return null;
  const candidate = input as Partial<StudioDiagram>;
  if (!Array.isArray(candidate.nodes) || !Array.isArray(candidate.connections)) return null;
  const nodes = candidate.nodes.slice(0, 16).flatMap((node, index) => {
    if (!node || typeof node !== "object") return [];
    const value = node as Partial<StudioNode>;
    if (typeof value.componentId !== "string" || !componentById(value.componentId)) return [];
    const rawX = typeof value.x === "number" ? (value.x >= 0 && value.x <= 1 ? value.x * 100 : value.x) : 12 + ((index % 4) * 25);
    const rawY = typeof value.y === "number" ? (value.y >= 0 && value.y <= 1 ? value.y * 100 : value.y) : 18 + (Math.floor(index / 4) * 30);
    // Layout values from a model are presentation metadata, not a technical claim.
    // Keep every authorized node usable instead of rejecting a technically sound draft.
    const x = Math.max(7, Math.min(93, Number.isFinite(rawX) ? rawX : 50));
    const y = Math.max(8, Math.min(90, Number.isFinite(rawY) ? rawY : 50));
    return [{ id: typeof value.id === "string" && value.id ? value.id.slice(0, 48) : `node-${index + 1}`, componentId: value.componentId, label: typeof value.label === "string" && value.label.trim() ? value.label.trim().slice(0, 72) : componentById(value.componentId)!.name, x, y }];
  });
  const assumptions = Array.isArray(candidate.assumptions) ? candidate.assumptions.filter((item): item is string => typeof item === "string").slice(0, 8) : [];
  const omittedConnectionNotes: string[] = [];
  const connections = candidate.connections.slice(0, 28).flatMap((connection, index) => {
    if (!connection || typeof connection !== "object") return [];
    const value = connection as Partial<StudioConnection>;
    if (![value.from, value.to, value.fromPort, value.toPort].every((item) => typeof item === "string")) return [];
    const from = nodes.find((node) => node.id === value.from);
    const to = nodes.find((node) => node.id === value.to);
    if (!from || !to || from.id === to.id) return [];
    const fromComponent = componentById(from.componentId);
    const toComponent = componentById(to.componentId);
    let fromPort = fromComponent?.ports.find((port) => port.id === value.fromPort);
    let toPort = toComponent?.ports.find((port) => port.id === value.toPort);
    // A model may select a physical port for a logical API/backup relation.
    // Repair only by selecting an already-declared port with the same protocol.
    if (fromPort && (!toPort || !compatiblePortTypes(fromPort.type, toPort.type))) {
      const matches = toComponent?.ports.filter((port) => compatiblePortTypes(fromPort!.type, port.type)) ?? [];
      if (matches.length === 1) toPort = matches[0];
    }
    if (toPort && (!fromPort || !compatiblePortTypes(fromPort.type, toPort.type))) {
      const matches = fromComponent?.ports.filter((port) => compatiblePortTypes(port.type, toPort!.type)) ?? [];
      if (matches.length === 1) fromPort = matches[0];
    }
    if (!fromPort || !toPort || !compatiblePortTypes(fromPort.type, toPort.type)) {
      omittedConnectionNotes.push(`Se omitió la conexión ${from.label} → ${to.label}: falta un puerto compatible confirmado.`);
      return [];
    }
    return [{ id: typeof value.id === "string" && value.id ? value.id.slice(0, 48) : `connection-${index + 1}`, from: from.id, to: to.id, fromPort: fromPort.id, toPort: toPort.id, label: typeof value.label === "string" ? value.label.slice(0, 64) : "" }];
  });
  return { title: typeof candidate.title === "string" ? candidate.title.slice(0, 100) : "Arquitectura conceptual", summary: typeof candidate.summary === "string" ? candidate.summary.slice(0, 500) : "Borrador generado para discovery.", assumptions: [...assumptions, ...omittedConnectionNotes].slice(0, 10), nodes, connections };
}
