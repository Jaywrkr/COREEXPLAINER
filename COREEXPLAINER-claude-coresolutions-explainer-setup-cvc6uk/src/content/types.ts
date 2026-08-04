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
export type ExplainerCategory = "Virtualización" | "Redes" | "Seguridad" | "Cloud";

export interface ExplainerMeta {
  chip: string;
  title: string;
  tagline: string;
  ctaLabel: string;
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
}
