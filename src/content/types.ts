import type { EdgeKind } from "@/lib/animation-spec/types";

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
  /** Optional semantic checks for the topology shown by a scene. */
  technicalIntegrity?: TechnicalIntegrityProfile;
  /** Optional authored target architecture used by current/target comparisons. */
  targetArchitecture?: TargetArchitecture;
}

export interface TargetArchitecture {
  label: string;
  summary: string;
  expectedChanges: string[];
  limitations: string;
  sourceIds?: string[];
  roadmap?: AssessmentRoadmapPhase[];
  decisionOptions?: ArchitectureDecisionOption[];
}

export interface AssessmentRoadmapPhase {
  id: string;
  title: string;
  objective: string;
  evidence: string;
  exitCriteria: string;
  sourceIds?: string[];
}

export interface ArchitectureDecisionOption {
  id: string;
  title: string;
  summary: string;
  benefits: string;
  tradeoffs: string;
  evidence: string;
  sourceIds?: string[];
  roadmapPhaseIds?: string[];
  scenarioIds?: string[];
}

export type TechnicalIntegrityDomain =
  | "network"
  | "virtualization"
  | "storage"
  | "security"
  | "observability"
  | "continuity"
  | "delivery"
  | "application"
  | "generic";
export type TechnicalIntegrityAssurance = "baseline" | "source-backed" | "reviewed";
export type IntegritySeverity = "error" | "warning";

export interface TechnicalIntegrityProfile {
  domain: TechnicalIntegrityDomain;
  assurance: TechnicalIntegrityAssurance;
  scenes: Record<string, TechnicalIntegritySceneContract>;
}

export interface TechnicalIntegritySceneContract {
  requiredNodes?: string[];
  requiredEdges?: TechnicalIntegrityEdgeRule[];
  requiredPaths?: TechnicalIntegrityPathRule[];
  /** Set false only when isolation is the subject being explained. */
  checkOrphans?: boolean;
}

export interface TechnicalIntegrityEdgeRule {
  id: string;
  from: string;
  to: string;
  kind: EdgeKind;
  label: string;
  rationale: string;
  sourceIds?: string[];
  recommendation?: string;
  severity?: IntegritySeverity;
}

export interface TechnicalIntegrityPathRule {
  id: string;
  from: string;
  to: string;
  label: string;
  rationale: string;
  allowedEdgeKinds?: EdgeKind[];
  sourceIds?: string[];
  recommendation?: string;
  severity?: IntegritySeverity;
}

export interface TechnicalIntegrityDiagnostic {
  id: string;
  severity: IntegritySeverity;
  title: string;
  detail: string;
  rationale: string;
  recommendation: string;
  nodeIds: string[];
  sourceIds: string[];
}

export interface TechnicalIntegrityReport {
  domain: TechnicalIntegrityDomain;
  assurance: TechnicalIntegrityAssurance;
  inactiveNodeIds: string[];
  status: "valid" | "warning" | "error";
  checkedRules: number;
  diagnostics: TechnicalIntegrityDiagnostic[];
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
  /** Publisher or manufacturer responsible for the source. */
  publisher?: string;
  /** Product, platform, standard, or service covered by the source. */
  product?: string;
  /** Release, document, or conceptual reference extracted from the source. */
  version?: string;
  /** Stable human-readable reference shown alongside the link. */
  reference?: string;
  /** Whether the source is recent enough for the topic review window. */
  validity?: "current" | "review-needed";
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
  /** Optional authored sequence for the guided diagnosis/recovery flow. */
  guidedSteps?: GuidedScenarioStep[];
}

export type GuidedScenarioStepKind = "observe" | "diagnose" | "recover" | "validate";

export interface GuidedScenarioStep {
  id: string;
  kind: GuidedScenarioStepKind;
  title: string;
  instruction: string;
  evidence: string;
  expected: string;
  /** Nodes emphasized in the diagram while this step is active. */
  focusNodeIds?: string[];
  /** Technical sources supporting this phase of the scenario. */
  sourceIds?: string[];
  /** Optional hypothesis checkpoint for authored, decision-oriented guides. */
  decision?: GuidedScenarioDecision;
}

export type GuidedScenarioDecisionOutcome = "recommended" | "incomplete" | "unsafe";

export interface GuidedScenarioDecision {
  question: string;
  options: GuidedScenarioDecisionOption[];
}

export interface GuidedScenarioDecisionOption {
  id: string;
  label: string;
  feedback: string;
  outcome: GuidedScenarioDecisionOutcome;
  /** Optional focus override after the audience selects this hypothesis. */
  focusNodeIds?: string[];
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
