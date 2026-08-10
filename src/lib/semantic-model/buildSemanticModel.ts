import type { EdgeKind, Scene, SceneNode } from "@/lib/animation-spec/types";
import type { SemanticModel, SemanticRelationship, SemanticRole } from "./types";

const ROLE_BY_KIND: Record<SceneNode["kind"], SemanticRole> = {
  external: "actor",
  "control-plane": "control",
  compute: "compute",
  storage: "storage",
  network: "network",
  workload: "service",
};

const RELATIONSHIP_MEANINGS: Record<EdgeKind, string> = {
  data: "transporta datos o tráfico",
  control: "coordina una acción o estado",
  storage: "lee, escribe o replica datos persistentes",
  dependency: "declara una dependencia para prestar el servicio",
  failure: "representa un camino o condición de fallo",
};

/** Builds a semantic view from the same scene contract used by the canvas. */
export function buildSemanticModel(scene: Scene): SemanticModel {
  const incoming = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();
  for (const node of scene.nodes) {
    incoming.set(node.id, []);
    outgoing.set(node.id, []);
  }

  for (const edge of scene.edges) {
    incoming.get(edge.to)?.push(edge.from);
    outgoing.get(edge.from)?.push(edge.to);
  }

  const nodes = scene.nodes.map((node) => {
    const incomingIds = incoming.get(node.id) ?? [];
    const outgoingIds = outgoing.get(node.id) ?? [];
    return {
      id: node.id,
      name: node.name,
      kind: node.kind,
      role: ROLE_BY_KIND[node.kind],
      incomingIds,
      outgoingIds,
      isEntryPoint: incomingIds.length === 0,
      isExitPoint: outgoingIds.length === 0,
      hasCapacity: node.capacity !== undefined,
      canEmit: node.rps !== undefined,
    };
  });

  const relationships: SemanticRelationship[] = scene.edges.map((edge) => ({
    from: edge.from,
    to: edge.to,
    kind: edge.kind,
    meaning: RELATIONSHIP_MEANINGS[edge.kind],
  }));

  return {
    nodes,
    relationships,
    entryPointIds: nodes.filter((node) => node.isEntryPoint).map((node) => node.id),
    exitPointIds: nodes.filter((node) => node.isExitPoint).map((node) => node.id),
    isolatedNodeIds: nodes
      .filter((node) => node.incomingIds.length === 0 && node.outgoingIds.length === 0)
      .map((node) => node.id),
  };
}
