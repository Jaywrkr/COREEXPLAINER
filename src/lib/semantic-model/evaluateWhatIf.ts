import type { Scene } from "@/lib/animation-spec/types";
import { buildSemanticModel } from "./buildSemanticModel";

export interface WhatIfImpact {
  unavailableNodeIds: string[];
  reachableNodeIds: string[];
  affectedNodeIds: string[];
  brokenRelationshipCount: number;
  status: "contained" | "degraded" | "blocked";
}

/** Evaluates reachability after removing nodes from the conceptual graph. */
export function evaluateWhatIfImpact(scene: Scene, unavailableNodeIds: readonly string[]): WhatIfImpact {
  const model = buildSemanticModel(scene);
  const unavailable = new Set(unavailableNodeIds);
  const available = new Set(model.nodes.map((node) => node.id).filter((id) => !unavailable.has(id)));
  const roots = model.entryPointIds.filter((id) => available.has(id));
  const queue = [...(roots.length ? roots : available)];
  const reachable = new Set<string>();

  while (queue.length) {
    const current = queue.shift()!;
    if (reachable.has(current) || !available.has(current)) continue;
    reachable.add(current);
    const node = model.nodes.find((candidate) => candidate.id === current);
    for (const next of node?.outgoingIds ?? []) {
      if (!reachable.has(next) && available.has(next)) queue.push(next);
    }
  }

  const affectedNodeIds = [...available].filter((id) => !reachable.has(id));
  const brokenRelationshipCount = model.relationships.filter(
    (relationship) => unavailable.has(relationship.from) || unavailable.has(relationship.to),
  ).length;

  return {
    unavailableNodeIds: [...unavailable],
    reachableNodeIds: [...reachable],
    affectedNodeIds,
    brokenRelationshipCount,
    status: affectedNodeIds.length === 0 ? "contained" : roots.length === 0 ? "blocked" : "degraded",
  };
}
