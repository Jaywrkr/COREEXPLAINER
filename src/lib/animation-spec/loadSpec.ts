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
      if (nodeIds.has(node.id)) {
        throw new AnimationSpecError(`scene '${sceneId}': duplicate node id '${node.id}'`);
      }
      nodeIds.add(node.id);
    }
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
    }
  }

  return spec as unknown as AnimationSpec;
}
