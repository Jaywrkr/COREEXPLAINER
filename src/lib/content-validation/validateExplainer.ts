import type { AnimationSpec, NodeKind, Scene } from "@/lib/animation-spec/types";
import type {
  ExplainerMeta,
  ExplainerStep,
  TechnicalIntegrityAssurance,
  TechnicalIntegrityDomain,
  TechnicalIntegrityProfile,
  GuidedScenarioStepKind,
} from "@/content/types";

const MIN_STEPS = 4;
const REQUIRED_KINDS: NodeKind[] = ["control-plane", "compute", "storage", "network", "workload", "external"];
const TECHNICAL_INTEGRITY_DOMAINS: ReadonlySet<TechnicalIntegrityDomain> = new Set([
  "network",
  "virtualization",
  "storage",
  "security",
  "observability",
  "continuity",
  "delivery",
  "application",
  "generic",
]);
const TECHNICAL_INTEGRITY_ASSURANCE: ReadonlySet<TechnicalIntegrityAssurance> = new Set(["baseline", "source-backed", "reviewed"]);

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

function parseIsoDate(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(timestamp) ? null : timestamp;
}

function validateTechnicalIntegrityProfile(
  profile: TechnicalIntegrityProfile,
  scenes: Readonly<Record<string, Scene>>,
  sceneIds: ReadonlySet<string>,
  technicalSourceIds: ReadonlySet<string>,
  add: (message: string) => void,
) {
  if (!TECHNICAL_INTEGRITY_DOMAINS.has(profile.domain)) add("meta.technicalIntegrity.domain is not supported");
  if (!TECHNICAL_INTEGRITY_ASSURANCE.has(profile.assurance)) add("meta.technicalIntegrity.assurance must be 'baseline', 'source-backed' or 'reviewed'");
  const ruleIds = new Set<string>();
  const validateRule = (label: string, id: string, sourceIds: string[] | undefined) => {
    if (!isNonEmptyText(id)) add(`${label}.id must be a non-empty string`);
    if (ruleIds.has(id)) add(`${label}.id '${id}' is duplicated`);
    ruleIds.add(id);
    for (const sourceId of sourceIds ?? []) {
      if (!technicalSourceIds.has(sourceId)) {
        add(`${label}.sourceIds references unknown technical source '${sourceId}'`);
      }
    }
  };

  for (const [sceneId, contract] of Object.entries(profile.scenes)) {
    const sceneLabel = `meta.technicalIntegrity.scenes['${sceneId}']`;
    if (!sceneIds.has(sceneId)) add(`${sceneLabel} references unknown scene`);
    const sceneNodeIds = scenes[sceneId] ? new Set(scenes[sceneId].nodes.map((node) => node.id)) : null;
    if (sceneNodeIds && !contract.requiredNodes?.length && !contract.requiredEdges?.length && !contract.requiredPaths?.length) {
      add(`${sceneLabel} must declare at least one technical check`);
    }
    for (const nodeId of contract.requiredNodes ?? []) {
      if (!isNonEmptyText(nodeId)) add(`${sceneLabel}.requiredNodes cannot contain empty IDs`);
      else if (sceneNodeIds && !sceneNodeIds.has(nodeId)) add(`${sceneLabel}.requiredNodes references unknown node '${nodeId}'`);
    }
    for (const [index, rule] of (contract.requiredEdges ?? []).entries()) {
      validateRule(`${sceneLabel}.requiredEdges[${index}]`, rule.id, rule.sourceIds);
      if (!isNonEmptyText(rule.from) || !isNonEmptyText(rule.to)) add(`${sceneLabel}.requiredEdges[${index}] must define from and to`);
      if (rule.recommendation !== undefined && !isNonEmptyText(rule.recommendation)) add(`${sceneLabel}.requiredEdges[${index}].recommendation must be non-empty when provided`);
      if (sceneNodeIds && isNonEmptyText(rule.from) && !sceneNodeIds.has(rule.from)) add(`${sceneLabel}.requiredEdges[${index}].from references unknown node '${rule.from}'`);
      if (sceneNodeIds && isNonEmptyText(rule.to) && !sceneNodeIds.has(rule.to)) add(`${sceneLabel}.requiredEdges[${index}].to references unknown node '${rule.to}'`);
    }
    for (const [index, rule] of (contract.requiredPaths ?? []).entries()) {
      validateRule(`${sceneLabel}.requiredPaths[${index}]`, rule.id, rule.sourceIds);
      if (!isNonEmptyText(rule.from) || !isNonEmptyText(rule.to)) add(`${sceneLabel}.requiredPaths[${index}] must define from and to`);
      if (rule.recommendation !== undefined && !isNonEmptyText(rule.recommendation)) add(`${sceneLabel}.requiredPaths[${index}].recommendation must be non-empty when provided`);
      if (sceneNodeIds && isNonEmptyText(rule.from) && !sceneNodeIds.has(rule.from)) add(`${sceneLabel}.requiredPaths[${index}].from references unknown node '${rule.from}'`);
      if (sceneNodeIds && isNonEmptyText(rule.to) && !sceneNodeIds.has(rule.to)) add(`${sceneLabel}.requiredPaths[${index}].to references unknown node '${rule.to}'`);
    }
  }

  for (const sceneId of sceneIds) {
    if (!Object.prototype.hasOwnProperty.call(profile.scenes, sceneId)) {
      add(`meta.technicalIntegrity.scenes is missing a contract for scene '${sceneId}'`);
    }
  }
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
  if (!Array.isArray(meta.brandContext) || meta.brandContext.length === 0) {
    add("meta.brandContext must declare at least one portfolio brand");
  } else {
    const brandNames = new Set<string>();
    for (const [brandIndex, brand] of meta.brandContext.entries()) {
      const brandLabel = `meta.brandContext[${brandIndex}]`;
      for (const field of ["name", "role", "scope"] as const) {
        if (!isNonEmptyText(brand[field])) add(`${brandLabel}.${field} must be a non-empty string`);
      }
      if (brandNames.has(brand.name)) add(`${brandLabel}.name '${brand.name}' is duplicated`);
      brandNames.add(brand.name);
    }
  }
  if (!meta.technicalReview || typeof meta.technicalReview !== "object") {
    add("meta.technicalReview must declare review date, scope, and sources");
  } else {
    const reviewTimestamp = parseIsoDate(meta.technicalReview.lastReviewedAt);
    if (reviewTimestamp === null) {
      add("meta.technicalReview.lastReviewedAt must use ISO date format YYYY-MM-DD");
    } else if (reviewTimestamp > Date.now() + 86_400_000) {
      add("meta.technicalReview.lastReviewedAt cannot be in the future");
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
        const accessedTimestamp = parseIsoDate(source.accessedAt);
        if (accessedTimestamp === null) {
          add(`${sourceLabel}.accessedAt must use ISO date format YYYY-MM-DD`);
        } else {
          if (accessedTimestamp > Date.now() + 86_400_000) add(`${sourceLabel}.accessedAt cannot be in the future`);
          if (reviewTimestamp !== null && accessedTimestamp > reviewTimestamp) {
            add(`${sourceLabel}.accessedAt cannot be later than meta.technicalReview.lastReviewedAt`);
          }
        }
        if (!isNonEmptyText(source.publisher)) add(`${sourceLabel}.publisher must identify the publisher or manufacturer`);
        if (!isNonEmptyText(source.product)) add(`${sourceLabel}.product must identify the covered product or standard`);
        if (!isNonEmptyText(source.version)) add(`${sourceLabel}.version must identify a release or state when none is specified`);
        if (!isNonEmptyText(source.reference)) add(`${sourceLabel}.reference must identify the stable source reference`);
        if (source.validity !== "current" && source.validity !== "review-needed") {
          add(`${sourceLabel}.validity must be 'current' or 'review-needed'`);
        } else if (source.validity === "review-needed") {
          warnings.push(`${sourceLabel} is marked review-needed`);
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

  if (meta.technicalIntegrity) {
    validateTechnicalIntegrityProfile(meta.technicalIntegrity, spec.scenes, sceneIds, technicalSourceIds, add);
  }

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
  const requiredScenarioKinds = new Set<GuidedScenarioStepKind>(["observe", "diagnose", "recover", "validate"]);
  if (!Array.isArray(meta.failureScenarios) || meta.failureScenarios.length === 0) {
    add("meta.failureScenarios must contain at least one guided failure scenario");
  }
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

    if (scenario.guidedSteps) {
      if (scenario.guidedSteps.length < 3) {
        add(`${label}.guidedSteps must contain at least three steps when provided`);
      }
      const guidedStepIds = new Set<string>();
      const allowedKinds = new Set(["observe", "diagnose", "recover", "validate"]);
      for (const [stepIndex, guidedStep] of scenario.guidedSteps.entries()) {
        const stepLabel = `${label}.guidedSteps[${stepIndex}]`;
        if (!isNonEmptyText(guidedStep.id)) add(`${stepLabel}.id must be a non-empty string`);
        if (guidedStepIds.has(guidedStep.id)) add(`${stepLabel}.id '${guidedStep.id}' is duplicated`);
        guidedStepIds.add(guidedStep.id);
        if (!allowedKinds.has(guidedStep.kind)) add(`${stepLabel}.kind '${guidedStep.kind}' is not supported`);
        for (const field of ["title", "instruction", "evidence", "expected"] as const) {
          if (!isNonEmptyText(guidedStep[field])) add(`${stepLabel}.${field} must be a non-empty string`);
        }
        if (!Array.isArray(guidedStep.sourceIds) || guidedStep.sourceIds.length === 0) {
          add(`${stepLabel}.sourceIds must cite at least one technical source`);
        } else {
          const stepSourceIds = new Set<string>();
          for (const sourceId of guidedStep.sourceIds) {
            if (!isNonEmptyText(sourceId)) add(`${stepLabel}.sourceIds cannot contain empty IDs`);
            if (stepSourceIds.has(sourceId)) add(`${stepLabel}.sourceIds '${sourceId}' is duplicated`);
            stepSourceIds.add(sourceId);
            if (!technicalSourceIds.has(sourceId)) {
              add(`${stepLabel}.sourceIds references unknown technical source '${sourceId}'`);
            }
          }
        }
        for (const nodeId of guidedStep.focusNodeIds ?? []) {
          if (!sceneNodeIds.has(nodeId)) add(`${stepLabel}.focusNodeIds references unknown node '${nodeId}'`);
        }
        if (guidedStep.decision) {
          if (!isNonEmptyText(guidedStep.decision.question)) {
            add(`${stepLabel}.decision.question must be a non-empty string`);
          }
          if (!Array.isArray(guidedStep.decision.options) || guidedStep.decision.options.length < 2) {
            add(`${stepLabel}.decision.options must contain at least two options`);
          } else {
            const optionIds = new Set<string>();
            const allowedOutcomes = new Set(["recommended", "incomplete", "unsafe"]);
            let recommendedCount = 0;
            for (const [optionIndex, option] of guidedStep.decision.options.entries()) {
              const optionLabel = `${stepLabel}.decision.options[${optionIndex}]`;
              if (!isNonEmptyText(option.id)) add(`${optionLabel}.id must be a non-empty string`);
              if (optionIds.has(option.id)) add(`${optionLabel}.id '${option.id}' is duplicated`);
              optionIds.add(option.id);
              for (const field of ["label", "feedback"] as const) {
                if (!isNonEmptyText(option[field])) add(`${optionLabel}.${field} must be a non-empty string`);
              }
              if (!allowedOutcomes.has(option.outcome)) add(`${optionLabel}.outcome '${option.outcome}' is not supported`);
              if (option.outcome === "recommended") recommendedCount += 1;
              for (const nodeId of option.focusNodeIds ?? []) {
                if (!sceneNodeIds.has(nodeId)) add(`${optionLabel}.focusNodeIds references unknown node '${nodeId}'`);
              }
            }
            if (recommendedCount !== 1) {
              add(`${stepLabel}.decision must contain exactly one recommended option`);
            }
          }
        }
      }
      const guidedKinds = new Set<GuidedScenarioStepKind>(scenario.guidedSteps.map((guidedStep) => guidedStep.kind));
      for (const requiredKind of requiredScenarioKinds) {
        if (!guidedKinds.has(requiredKind)) {
          add(`${label}.guidedSteps must include a '${requiredKind}' phase`);
        }
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
