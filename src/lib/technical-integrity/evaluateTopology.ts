import type { Scene } from "@/lib/animation-spec/types";
import type {
  TechnicalIntegrityDiagnostic,
  TechnicalIntegrityDomain,
  TechnicalIntegrityReport,
  TechnicalIntegritySceneContract,
} from "@/content/types";

const DEFAULT_PATH_EDGE_KINDS = new Set(["data", "control", "storage", "dependency"]);

function hasEdge(scene: Scene, from: string, to: string, kind: string) {
  return scene.edges.some((edge) => edge.from === from && edge.to === to && edge.kind === kind);
}

function edgeBetween(scene: Scene, from: string, to: string) {
  return scene.edges.find((edge) => edge.from === from && edge.to === to);
}

function findPath(scene: Scene, from: string, to: string, allowedEdgeKinds?: readonly string[]) {
  const allowed = allowedEdgeKinds ? new Set(allowedEdgeKinds) : DEFAULT_PATH_EDGE_KINDS;
  const queue = [from];
  const visited = new Set([from]);

  while (queue.length) {
    const current = queue.shift()!;
    if (current === to) return true;

    for (const edge of scene.edges) {
      if (edge.from !== current || !allowed.has(edge.kind) || visited.has(edge.to)) continue;
      visited.add(edge.to);
      queue.push(edge.to);
    }
  }

  return false;
}

function statusFor(diagnostics: TechnicalIntegrityDiagnostic[]): TechnicalIntegrityReport["status"] {
  if (diagnostics.some((diagnostic) => diagnostic.severity === "error")) return "error";
  if (diagnostics.length > 0) return "warning";
  return "valid";
}

/** Evaluates one scene against its explicit, content-owned technical contract. */
export function evaluateTopologyIntegrity(
  scene: Scene,
  contract: TechnicalIntegritySceneContract | undefined,
  domain: TechnicalIntegrityDomain = "generic",
): TechnicalIntegrityReport | null {
  if (!contract) return null;

  const nodeIds = new Set(scene.nodes.map((node) => node.id));
  const diagnostics: TechnicalIntegrityDiagnostic[] = [];

  for (const requiredNodeId of contract.requiredNodes ?? []) {
    if (nodeIds.has(requiredNodeId)) continue;
    diagnostics.push({
      id: `node-${requiredNodeId}`,
      severity: "error",
      title: "Componente requerido ausente",
      detail: `El diagrama no contiene el componente '${requiredNodeId}' declarado por el contrato técnico.`,
      rationale: "La explicación no puede sostener la arquitectura esperada si falta uno de sus componentes explícitos.",
      nodeIds: [requiredNodeId],
      sourceIds: [],
    });
  }

  for (const rule of contract.requiredEdges ?? []) {
    if (hasEdge(scene, rule.from, rule.to, rule.kind)) continue;
    const actualEdge = edgeBetween(scene, rule.from, rule.to);
    diagnostics.push({
      id: rule.id,
      severity: rule.severity ?? "error",
      title: rule.label,
      detail: actualEdge
        ? `La relación ${rule.from} → ${rule.to} está declarada como '${actualEdge.kind}', pero debería ser '${rule.kind}'.`
        : `Falta la relación ${rule.from} → ${rule.to} (${rule.kind}) en esta escena.`,
      rationale: rule.rationale,
      nodeIds: [rule.from, rule.to].filter((id) => nodeIds.has(id)),
      sourceIds: rule.sourceIds ?? [],
    });
  }

  for (const rule of contract.requiredPaths ?? []) {
    if (nodeIds.has(rule.from) && nodeIds.has(rule.to) && findPath(scene, rule.from, rule.to, rule.allowedEdgeKinds)) {
      continue;
    }
    diagnostics.push({
      id: rule.id,
      severity: rule.severity ?? "error",
      title: rule.label,
      detail: `No existe un camino válido entre ${rule.from} y ${rule.to} con las relaciones declaradas.`,
      rationale: rule.rationale,
      nodeIds: [rule.from, rule.to].filter((id) => nodeIds.has(id)),
      sourceIds: rule.sourceIds ?? [],
    });
  }

  const checkedRules = (contract.requiredNodes?.length ?? 0)
    + (contract.requiredEdges?.length ?? 0)
    + (contract.requiredPaths?.length ?? 0);

  return { domain, status: statusFor(diagnostics), checkedRules, diagnostics };
}
