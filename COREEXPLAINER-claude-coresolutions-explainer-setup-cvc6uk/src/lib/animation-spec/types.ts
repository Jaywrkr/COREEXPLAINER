/**
 * Types for animation-spec.json — the contract between generated content
 * (future AI output) and the rendering engine.
 *
 * This schema is deliberately scene-based: each step of an explanation can
 * swap the ENTIRE node/edge topology, not just toggle highlights on a fixed
 * graph. That mirrors how a human explains a system — "first look at these
 * three isolated pieces, now look at how they merge" — and is what the
 * first hand-built prototype (docs/examples/vcf) already proved works.
 *
 * See docs/ai-context/decisions.md ("AI generates data, not markup") and
 * docs/ai-context/animation-guidelines.md. Do not add free-form HTML/CSS/JS
 * fields here — if the renderer can't express something, extend the
 * schema, don't escape it.
 */

export type NodeKind =
  | "control-plane" // orchestration / management plane — rendered in navy
  | "compute" // servers, hosts — accent blue
  | "storage" // storage layer — muted grey
  | "network" // network layer — secondary grey
  | "workload" // apps / VMs / consumers of the platform — success green
  | "external"; // clients, users, third parties outside the platform — accent blue

/** Semantic relationship shown by an arrow in the diagram. */
export type EdgeKind = "data" | "control" | "storage" | "dependency" | "failure";

export interface SceneNode {
  id: string;
  name: string;
  subtitle?: string;
  /** Position as a 0–1 fraction of the canvas, so scenes are resolution-independent. */
  x: number;
  y: number;
  kind: NodeKind;
  /**
   * Optional capacity ceiling. When set, the node renders a usage bar and
   * accumulates `rx` as packets arrive (see Scene.edges + rps below).
   */
  capacity?: number;
  /** Packets emitted per second along this node's outgoing edges. Omit for passive nodes. */
  rps?: number;
  /** Whether the node can be toggled dead/alive by clicking its status control (fault simulation). */
  killable?: boolean;
}

export interface SceneEdge {
  from: string;
  to: string;
  kind: EdgeKind;
}

export interface Scene {
  nodes: SceneNode[];
  edges: SceneEdge[];
  /** Explicitly true when this scene intentionally introduces disconnected silos. */
  allowIsolatedNodes?: boolean;
}

export interface AnimationSpec {
  version: "1.0";
  id: string;
  title: string;
  /** Scenes keyed by id — steps (see src/content) reference a scene by this key. */
  scenes: Record<string, Scene>;
}
