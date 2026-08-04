/**
 * Content types — the text/copy layer. Deliberately separate from
 * animation-spec.json (visuals) and from layout components. An explainer
 * is the pairing of ExplainerMeta + ExplainerStep[] with an AnimationSpec;
 * none of the three know about each other's internals.
 */

/**
 * Fixed category list for the /explainer dashboard. Adding a category
 * means adding it here — not inventing a free-text string per topic — so
 * the dashboard grouping stays predictable. Extend when a genuinely new
 * category of topic is added, not per-topic.
 */
export type ExplainerCategory = "Virtualización" | "Storage" | "Redes" | "Seguridad" | "Cloud";

export interface ExplainerMeta {
  chip: string;
  title: string;
  tagline: string;
  /** Marcas del portafolio que contextualizan este patrón y sus límites. */
  brandContext: BrandContextItem[];
  storyboardDoc: string;
  technicalValidationDoc: string;
  technicalReview: TechnicalReview;
  reviewStatus: "pending" | "reviewed";
  /** Optional interactive scenarios shown when their scene is active. */
  failureScenarios?: FailureScenario[];
}

export interface BrandContextItem {
  name: string;
  role: string;
  scope: string;
}

/** Traceability metadata shown in the explainer and required by the content gate. */
export interface TechnicalReview {
  /** ISO date when the narrative and its source matrix were last reviewed. */
  lastReviewedAt: string;
  /** Version, release family, or conceptual scope that was checked. */
  scope: string;
  /** Primary sources consulted for the review. */
  sources: TechnicalSource[];
}

export interface TechnicalSource {
  /** Stable key used by each narrated step to cite its supporting sources. */
  id: string;
  title: string;
  url: string;
  /** ISO date when this source was consulted. */
  accessedAt: string;
}

/**
 * A guided, conceptual failure simulation. The engine only applies the
 * declared dead nodes; all user-facing meaning and limitations belong here
 * so the same interaction can be reused by future explainers.
 */
export interface FailureScenario {
  id: string;
  sceneId: string;
  label: string;
  summary: string;
  detail: string;
  limitation: string;
  affectedNodes: string[];
  deadNodeIds: string[];
}

export interface ExplainerStep {
  id: string;
  /** e.g. "01 — EL PROBLEMA" */
  tag: string;
  title: string;
  paragraphs: string[];
  /** Short "what this means for your operation" callout, rendered with the accent rule. */
  businessImpact: string;
  /** Key into AnimationSpec.scenes — which visual topology this step shows. */
  sceneId: string;
  /** Caption shown under the canvas while this step is active. */
  caption: string;
  /** Stable source IDs supporting the claims and diagram in this step. */
  sourceIds: string[];
}
