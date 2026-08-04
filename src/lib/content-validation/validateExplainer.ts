import type { AnimationSpec, NodeKind } from "@/lib/animation-spec/types";
import type { ExplainerMeta, ExplainerStep } from "@/content/types";

const MIN_STEPS = 4;
const REQUIRED_KINDS: NodeKind[] = ["control-plane", "compute", "storage", "network", "workload", "external"];

export interface ExplainerValidationInput {
  slug: string;
  meta: ExplainerMeta;
  steps: ExplainerStep[];
  spec: AnimationSpec;
}

export interface ExplainerValidationResult {
  slug: string;
  errors: string[];
  warnings: string[];
}

export class ExplainerContentError extends Error {
  readonly issues: string[];

  constructor(slug: string, issues: string[]) {
    super(`Explainer '${slug}' failed content validation:\n- ${issues.join("\n- ")}`);
    this.name = "ExplainerContentError";
    this.issues = issues;
  }
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasDocumentationPath(value: unknown): value is string {
  return isNonEmptyText(value) && value.startsWith("docs/") && value.endsWith(".md");
}

/**
 * Validates the complete content/visual pairing before it enters the topic
 * registry. This is intentionally stricter than TypeScript: future generated
 * content must have a complete narrative and explicit technical context.
 */
export function validateExplainerContent(input: ExplainerValidationInput): ExplainerValidationResult {
  const { slug, meta, steps, spec } = input;
  const errors: string[] = [];
  const warnings: string[] = [];
  const add = (message: string) => errors.push(message);
  const technicalSourceIds = new Set<string>();

  if (!isNonEmptyText(slug)) add("slug must be a non-empty string");
  for (const [field, value] of Object.entries({
    chip: meta.chip,
    title: meta.title,
    tagline: meta.tagline,
  })) {
    if (!isNonEmptyText(value)) add(`meta.${field} must be a non-empty string`);
  }

  if (!hasDocumentationPath(meta.storyboardDoc)) {
    add("meta.storyboardDoc must point to a Markdown file under docs/");
  }
  if (!hasDocumentationPath(meta.technicalValidationDoc)) {
    add("meta.technicalValidationDoc must point to a Markdown file under docs/");
  }
  if (!meta.technicalReview || typeof meta.technicalReview !== "object") {
    add("meta.technicalReview must declare review date, scope, and sources");
  } else {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.technicalReview.lastReviewedAt)) {
      add("meta.technicalReview.lastReviewedAt must use ISO date format YYYY-MM-DD");
    }
    if (!isNonEmptyText(meta.technicalReview.scope)) {
      add("meta.technicalReview.scope must be a non-empty string");
    }
    if (!Array.isArray(meta.technicalReview.sources) || meta.technicalReview.sources.length === 0) {
      add("meta.technicalReview.sources must contain at least one source");
    } else {
      const sourceUrls = new Set<string>();
      for (const [sourceIndex, source] of meta.technicalReview.sources.entries()) {
        const sourceLabel = `meta.technicalReview.sources[${sourceIndex}]`;
        if (!isNonEmptyText(source.id)) add(`${sourceLabel}.id must be a non-empty string`);
        if (technicalSourceIds.has(source.id)) add(`${sourceLabel}.id '${source.id}' is duplicated`);
        technicalSourceIds.add(source.id);
        if (!isNonEmptyText(source.title)) add(`${sourceLabel}.title must be a non-empty string`);
        if (!isNonEmptyText(source.url) || !source.url.startsWith("https://")) {
          add(`${sourceLabel}.url must be an https URL`);
        }
        if (sourceUrls.has(source.url)) add(`${sourceLabel}.url '${source.url}' is duplicated`);
        sourceUrls.add(source.url);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(source.accessedAt)) {
          add(`${sourceLabel}.accessedAt must use ISO date format YYYY-MM-DD`);
        }
      }
    }
  }
  if (meta.reviewStatus !== "pending" && meta.reviewStatus !== "reviewed") {
    add("meta.reviewStatus must be 'pending' or 'reviewed'");
  }
  if (meta.reviewStatus === "pending") {
    warnings.push("technical review is still pending");
  }

  if (!Array.isArray(steps) || steps.length < MIN_STEPS) {
    add(`steps must contain at least ${MIN_STEPS} steps`);
  }

  const sceneIds = new Set(Object.keys(spec.scenes));
  const stepIds = new Set<string>();
  const referencedSceneIds = new Set<string>();

  for (const [index, step] of steps.entries()) {
    const label = `steps[${index}]`;
    if (!isNonEmptyText(step.id)) add(`${label}.id must be a non-empty string`);
    if (stepIds.has(step.id)) add(`${label}.id '${step.id}' is duplicated`);
    stepIds.add(step.id);
    for (const field of ["tag", "title", "businessImpact", "caption"] as const) {
      if (!isNonEmptyText(step[field])) add(`${label}.${field} must be a non-empty string`);
    }
    if (!Array.isArray(step.paragraphs) || step.paragraphs.length < 2) {
      add(`${label}.paragraphs must contain at least two explanatory paragraphs`);
    } else if (step.paragraphs.some((paragraph) => !isNonEmptyText(paragraph))) {
      add(`${label}.paragraphs cannot contain empty text`);
    }
    if (!sceneIds.has(step.sceneId)) {
      add(`${label}.sceneId '${step.sceneId}' does not exist in the animation spec`);
    }
    if (!Array.isArray(step.sourceIds) || step.sourceIds.length === 0) {
      add(`${label}.sourceIds must cite at least one technical source`);
    } else {
      const stepSourceIds = new Set<string>();
      for (const sourceId of step.sourceIds) {
        if (!isNonEmptyText(sourceId)) add(`${label}.sourceIds cannot contain empty IDs`);
        if (stepSourceIds.has(sourceId)) add(`${label}.sourceIds '${sourceId}' is duplicated`);
        stepSourceIds.add(sourceId);
        if (!technicalSourceIds.has(sourceId)) {
          add(`${label}.sourceIds references unknown technical source '${sourceId}'`);
        }
      }
    }
    referencedSceneIds.add(step.sceneId);
  }

  for (const sceneId of sceneIds) {
    const scene = spec.scenes[sceneId]!;
    const nodeIds = new Set<string>();
    for (const [index, node] of scene.nodes.entries()) {
      const label = `scene '${sceneId}' node[${index}]`;
      if (!isNonEmptyText(node.id)) add(`${label}.id must be a non-empty string`);
      if (nodeIds.has(node.id)) add(`${label}.id '${node.id}' is duplicated`);
      nodeIds.add(node.id);
      if (!isNonEmptyText(node.name)) add(`${label}.name must be a non-empty string`);
      if (!REQUIRED_KINDS.includes(node.kind)) add(`${label}.kind '${node.kind}' is not supported`);
      if (!Number.isFinite(node.x) || node.x < 0 || node.x > 1) add(`${label}.x must be between 0 and 1`);
      if (!Number.isFinite(node.y) || node.y < 0 || node.y > 1) add(`${label}.y must be between 0 and 1`);
    }
  }

  const scenarioIds = new Set<string>();
  for (const [index, scenario] of (meta.failureScenarios ?? []).entries()) {
    const label = `meta.failureScenarios[${index}]`;
    if (!isNonEmptyText(scenario.id)) add(`${label}.id must be a non-empty string`);
    if (scenarioIds.has(scenario.id)) add(`${label}.id '${scenario.id}' is duplicated`);
    scenarioIds.add(scenario.id);
    for (const field of ["label", "summary", "detail", "limitation"] as const) {
      if (!isNonEmptyText(scenario[field])) add(`${label}.${field} must be a non-empty string`);
    }
    if (!sceneIds.has(scenario.sceneId)) {
      add(`${label}.sceneId '${scenario.sceneId}' does not exist in the animation spec`);
      continue;
    }
    const sceneNodeIds = new Set(spec.scenes[scenario.sceneId]!.nodes.map((node) => node.id));
    if (!Array.isArray(scenario.affectedNodes) || scenario.affectedNodes.length === 0) {
      add(`${label}.affectedNodes must contain at least one readable node name`);
    }
    if (!Array.isArray(scenario.deadNodeIds) || scenario.deadNodeIds.length === 0) {
      add(`${label}.deadNodeIds must contain at least one node ID`);
    } else {
      for (const nodeId of scenario.deadNodeIds) {
        if (!sceneNodeIds.has(nodeId)) add(`${label}.deadNodeIds references unknown node '${nodeId}'`);
      }
    }
  }

  for (const sceneId of sceneIds) {
    if (!referencedSceneIds.has(sceneId)) warnings.push(`scene '${sceneId}' is not referenced by any content step`);
  }

  const result = { slug, errors, warnings };
  if (errors.length > 0) throw new ExplainerContentError(slug, errors);
  return result;
}
