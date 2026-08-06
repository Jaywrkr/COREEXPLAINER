import type { AnimationSpec, EdgeKind, Scene } from "./types";

const EDGE_KINDS: EdgeKind[] = ["data", "control", "storage", "dependency", "failure"];

export class AnimationSpecError extends Error {}

/**
 * Minimal structural validation for animation-spec.json.
 *
 * This exists so a malformed AI-generated spec fails loudly with a specific
 * reason instead of rendering a broken canvas silently. Extend these checks
 * whenever the schema in types.ts grows — keep them in sync.
 */
export function parseAnimationSpec(raw: unknown): AnimationSpec {
  if (typeof raw !== "object" || raw === null) {
    throw new AnimationSpecError("animation-spec.json must be an object");
  }

  const spec = raw as Record<string, unknown>;

  if (spec.version !== "1.0") {
    throw new AnimationSpecError(`Unsupported animation-spec version: ${String(spec.version)}`);
  }
  if (typeof spec.id !== "string" || !spec.id) {
    throw new AnimationSpecError("animation-spec.json is missing a string 'id'");
  }
  if (typeof spec.title !== "string" || !spec.title) {
    throw new AnimationSpecError("animation-spec.json is missing a string 'title'");
  }
  if (typeof spec.scenes !== "object" || spec.scenes === null) {
    throw new AnimationSpecError("animation-spec.json must define a 'scenes' object");
  }

  for (const [sceneId, scene] of Object.entries(spec.scenes as Record<string, Scene>)) {
    if (!Array.isArray(scene.nodes) || scene.nodes.length === 0) {
      throw new AnimationSpecError(`scene '${sceneId}' must define at least one node`);
    }
    if (!Array.isArray(scene.edges)) {
      throw new AnimationSpecError(`scene '${sceneId}' 'edges' must be an array`);
    }

    const nodeIds = new Set<string>();
    for (const node of scene.nodes) {
      if (typeof node.id !== "string" || !node.id.trim()) {
        throw new AnimationSpecError(`scene '${sceneId}': every node must have a non-empty id`);
      }
      if (typeof node.name !== "string" || !node.name.trim()) {
        throw new AnimationSpecError(`scene '${sceneId}': node '${node.id}' must have a non-empty name`);
      }
      if (nodeIds.has(node.id)) {
        throw new AnimationSpecError(`scene '${sceneId}': duplicate node id '${node.id}'`);
      }
      nodeIds.add(node.id);
      if (!Number.isFinite(node.x) || node.x < 0 || node.x > 1 || !Number.isFinite(node.y) || node.y < 0 || node.y > 1) {
        throw new AnimationSpecError(`scene '${sceneId}': node '${node.id}' must use x/y positions between 0 and 1`);
      }
      if (node.capacity !== undefined && (!Number.isFinite(node.capacity) || node.capacity <= 0)) {
        throw new AnimationSpecError(`scene '${sceneId}': node '${node.id}' capacity must be greater than zero`);
      }
      if (node.rps !== undefined && (!Number.isFinite(node.rps) || node.rps < 0)) {
        throw new AnimationSpecError(`scene '${sceneId}': node '${node.id}' rps cannot be negative`);
      }
      if (node.rps !== undefined && !scene.edges.some((edge) => edge.from === node.id)) {
        throw new AnimationSpecError(`scene '${sceneId}': emitting node '${node.id}' must have at least one outgoing edge`);
      }
    }
    const edgeKeys = new Set<string>();
    for (const edge of scene.edges) {
      if (!nodeIds.has(edge.from)) {
        throw new AnimationSpecError(
          `scene '${sceneId}': edge references unknown node '${edge.from}'`,
        );
      }
      if (!nodeIds.has(edge.to)) {
        throw new AnimationSpecError(`scene '${sceneId}': edge references unknown node '${edge.to}'`);
      }
      if (!EDGE_KINDS.includes(edge.kind)) {
        throw new AnimationSpecError(
          `scene '${sceneId}': edge '${edge.from}' -> '${edge.to}' has unsupported kind '${String(edge.kind)}'`,
        );
      }
      if (edge.from === edge.to) {
        throw new AnimationSpecError(`scene '${sceneId}': edge '${edge.from}' -> '${edge.to}' cannot point to itself`);
      }
      const edgeKey = `${edge.from}|${edge.to}|${edge.kind}`;
      if (edgeKeys.has(edgeKey)) {
        throw new AnimationSpecError(`scene '${sceneId}': duplicate edge '${edge.from}' -> '${edge.to}' (${edge.kind})`);
      }
      edgeKeys.add(edgeKey);
    }
  }

  return spec as unknown as AnimationSpec;
}
