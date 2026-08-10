import type { EdgeKind, NodeKind } from "@/lib/animation-spec/types";

export type SemanticRole = "actor" | "control" | "compute" | "storage" | "network" | "service";

export interface SemanticNode {
  id: string;
  name: string;
  kind: NodeKind;
  role: SemanticRole;
  incomingIds: string[];
  outgoingIds: string[];
  isEntryPoint: boolean;
  isExitPoint: boolean;
  hasCapacity: boolean;
  canEmit: boolean;
}

export interface SemanticRelationship {
  from: string;
  to: string;
  kind: EdgeKind;
  meaning: string;
}

export interface SemanticModel {
  nodes: SemanticNode[];
  relationships: SemanticRelationship[];
  entryPointIds: string[];
  exitPointIds: string[];
  isolatedNodeIds: string[];
}
