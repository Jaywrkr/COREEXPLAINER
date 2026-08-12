import type { ExplainerMeta, ExplainerStep } from "@/content/types";

export type EvidenceKind = "documentary" | "observed" | "hypothesis" | "acceptance";
export type EvidenceProvenance = "authored" | "derived";
export type EvidenceSourceStatus = "current" | "review-needed" | "missing";
const EVIDENCE_KINDS: ReadonlySet<string> = new Set(["documentary", "observed", "hypothesis", "acceptance"]);
const EVIDENCE_PROVENANCES: ReadonlySet<string> = new Set(["authored", "derived"]);
const EVIDENCE_SOURCE_STATUSES: ReadonlySet<string> = new Set(["current", "review-needed", "missing"]);

export interface EvidenceRecord {
  id: string;
  kind: EvidenceKind;
  claim: string;
  /** Authoring paths whose assertions are represented by this record. */
  claimPaths: string[];
  requestedEvidence: string;
  sourceIds: string[];
  sourceStatus: Record<string, EvidenceSourceStatus>;
  provenance: EvidenceProvenance;
}

export interface EvidenceLedgerInput {
  meta: ExplainerMeta;
  steps: ExplainerStep[];
}

function clean(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

/** Claim paths must point into the authored explainer contract, never to arbitrary text. */
export function isValidClaimPath(value: string): boolean {
  return /^(?:steps\[\d+\]|failureScenarios\.[A-Za-z0-9:_-]+\.guidedSteps\.[A-Za-z0-9:_-]+|targetArchitecture\.(?:roadmap|decisionOptions)\.[A-Za-z0-9:_-]+)\.[A-Za-z][A-Za-z0-9_]*(?:\[\d+\])?$/.test(value);
}

/**
 * Checks that a syntactically valid path resolves to an authored field. This
 * prevents a manually assembled ledger from pointing at a missing step,
 * scenario, roadmap phase or decision option.
 */
export function resolvesClaimPath(value: string, input: EvidenceLedgerInput): boolean {
  if (!isValidClaimPath(value)) return false;

  const stepMatch = value.match(/^steps\[(\d+)\]\.([A-Za-z][A-Za-z0-9_]*)(?:\[(\d+)\])?$/);
  if (stepMatch) {
    const step = input.steps[Number(stepMatch[1])];
    if (!step) return false;
    const field = stepMatch[2] ?? "";
    if (field === "paragraphs") return stepMatch[3] !== undefined && Boolean(step.paragraphs[Number(stepMatch[3])]);
    return ["title", "businessImpact", "caption"].includes(field);
  }

  const scenarioMatch = value.match(/^failureScenarios\.([A-Za-z0-9:_-]+)\.guidedSteps\.([A-Za-z0-9:_-]+)\.([A-Za-z][A-Za-z0-9_]*)$/);
  if (scenarioMatch) {
    const scenario = input.meta.failureScenarios?.find((candidate) => candidate.id === scenarioMatch[1]);
    const guidedStep = scenario?.guidedSteps?.find((candidate) => candidate.id === scenarioMatch[2]);
    return Boolean(guidedStep && ["title", "instruction", "evidence", "expected"].includes(scenarioMatch[3] ?? ""));
  }

  const targetMatch = value.match(/^targetArchitecture\.(roadmap|decisionOptions)\.([A-Za-z0-9:_-]+)\.([A-Za-z][A-Za-z0-9_]*)$/);
  if (targetMatch) {
    const collection = targetMatch[1] === "roadmap" ? input.meta.targetArchitecture?.roadmap : input.meta.targetArchitecture?.decisionOptions;
    const item = collection?.find((candidate) => candidate.id === targetMatch[2]);
    const fields = targetMatch[1] === "roadmap"
      ? ["objective", "evidence", "exitCriteria"]
      : ["summary", "benefits", "tradeoffs", "evidence"];
    return Boolean(item && fields.includes(targetMatch[3] ?? ""));
  }

  return false;
}

function sourceStatus(meta: ExplainerMeta, sourceIds: string[]): Record<string, EvidenceSourceStatus> {
  const sources = new Map(meta.technicalReview.sources.map((source) => [source.id, source]));
  return Object.fromEntries(sourceIds.map((sourceId) => [sourceId, sources.get(sourceId)?.validity === "current" ? "current" : sources.has(sourceId) ? "review-needed" : "missing"]));
}

function record(meta: ExplainerMeta, base: Omit<EvidenceRecord, "sourceStatus">): EvidenceRecord {
  return { ...base, sourceStatus: sourceStatus(meta, base.sourceIds) };
}

/**
 * Normalizes authored evidence into a typed, read-only ledger. The ledger is
 * descriptive: it does not assert that evidence exists in a real environment.
 */
export function buildEvidenceLedger({ meta, steps }: EvidenceLedgerInput): EvidenceRecord[] {
  const records: EvidenceRecord[] = steps.map((step, stepIndex) => record(meta, {
    id: `step:${step.id}`,
    kind: "documentary",
    claim: clean(step.title),
    claimPaths: [
      `steps[${stepIndex}].title`,
      ...step.paragraphs.map((_, paragraphIndex) => `steps[${stepIndex}].paragraphs[${paragraphIndex}]`),
      `steps[${stepIndex}].businessImpact`,
      `steps[${stepIndex}].caption`,
    ],
    requestedEvidence: clean(step.businessImpact),
    sourceIds: unique(step.sourceIds),
    provenance: "authored",
  }));

  for (const scenario of meta.failureScenarios ?? []) {
    for (const guidedStep of scenario.guidedSteps ?? []) {
      records.push(record(meta, {
        id: `scenario:${scenario.id}:step:${guidedStep.id}`,
        kind: guidedStep.kind === "validate" ? "acceptance" : "observed",
        claim: `${clean(scenario.label)} · ${clean(guidedStep.title)}`,
        claimPaths: [
          `failureScenarios.${scenario.id}.guidedSteps.${guidedStep.id}.title`,
          `failureScenarios.${scenario.id}.guidedSteps.${guidedStep.id}.instruction`,
          `failureScenarios.${scenario.id}.guidedSteps.${guidedStep.id}.evidence`,
          `failureScenarios.${scenario.id}.guidedSteps.${guidedStep.id}.expected`,
        ],
        requestedEvidence: clean(guidedStep.evidence),
        sourceIds: unique(guidedStep.sourceIds ?? []),
        provenance: "authored",
      }));
    }
  }

  for (const phase of meta.targetArchitecture?.roadmap ?? []) {
    records.push(record(meta, {
      id: `roadmap:${phase.id}`,
      kind: "acceptance",
      claim: clean(phase.title),
      claimPaths: [
        `targetArchitecture.roadmap.${phase.id}.objective`,
        `targetArchitecture.roadmap.${phase.id}.evidence`,
        `targetArchitecture.roadmap.${phase.id}.exitCriteria`,
      ],
      requestedEvidence: clean(`${phase.evidence} Salida: ${phase.exitCriteria}`),
      sourceIds: unique(phase.sourceIds ?? []),
      provenance: "authored",
    }));
  }

  for (const option of meta.targetArchitecture?.decisionOptions ?? []) {
    records.push(record(meta, {
      id: `decision:${option.id}`,
      kind: "hypothesis",
      claim: clean(option.title),
      claimPaths: [
        `targetArchitecture.decisionOptions.${option.id}.summary`,
        `targetArchitecture.decisionOptions.${option.id}.benefits`,
        `targetArchitecture.decisionOptions.${option.id}.tradeoffs`,
        `targetArchitecture.decisionOptions.${option.id}.evidence`,
      ],
      requestedEvidence: clean(option.evidence),
      sourceIds: unique(option.sourceIds ?? []),
      provenance: "authored",
    }));
  }

  return records;
}

export function validateEvidenceLedger(records: EvidenceRecord[], knownSourceIds: ReadonlySet<string>, authored?: EvidenceLedgerInput): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const [index, record] of records.entries()) {
    const label = `evidence[${index}]`;
    if (!record.id.trim()) errors.push(`${label}.id must be non-empty`);
    if (ids.has(record.id)) errors.push(`${label}.id '${record.id}' is duplicated`);
    ids.add(record.id);
    if (!record.claim.trim()) errors.push(`${label}.claim must be non-empty`);
    if (!EVIDENCE_KINDS.has(record.kind)) errors.push(`${label}.kind has an invalid value '${String(record.kind)}'`);
    if (!EVIDENCE_PROVENANCES.has(record.provenance)) errors.push(`${label}.provenance has an invalid value '${String(record.provenance)}'`);
    if (!record.claimPaths.length) errors.push(`${label}.claimPaths must contain at least one authoring path`);
    if (new Set(record.claimPaths).size !== record.claimPaths.length) errors.push(`${label}.claimPaths must not contain duplicates`);
    for (const claimPath of record.claimPaths) {
      if (!isValidClaimPath(claimPath)) errors.push(`${label}.claimPaths contains an invalid authoring path '${claimPath}'`);
      else if (authored && !resolvesClaimPath(claimPath, authored)) errors.push(`${label}.claimPaths references a missing authored field '${claimPath}'`);
    }
    if (!record.requestedEvidence.trim()) errors.push(`${label}.requestedEvidence must be non-empty`);
    if (!record.sourceIds.length) errors.push(`${label}.sourceIds must contain at least one source`);
    if (new Set(record.sourceIds).size !== record.sourceIds.length) errors.push(`${label}.sourceIds must not contain duplicates`);
    for (const sourceId of record.sourceIds) {
      if (!knownSourceIds.has(sourceId)) errors.push(`${label}.sourceIds references unknown source '${sourceId}'`);
    }
    const expectedStatusIds = new Set(record.sourceIds);
    for (const sourceId of record.sourceIds) {
      if (!(sourceId in record.sourceStatus)) errors.push(`${label}.sourceStatus is missing source '${sourceId}'`);
      else if (!EVIDENCE_SOURCE_STATUSES.has(record.sourceStatus[sourceId] ?? "")) errors.push(`${label}.sourceStatus has an invalid status for source '${sourceId}'`);
    }
    for (const sourceId of Object.keys(record.sourceStatus)) {
      if (!expectedStatusIds.has(sourceId)) errors.push(`${label}.sourceStatus contains an unexpected source '${sourceId}'`);
    }
  }
  return errors;
}

export const evidenceKindLabels: Record<EvidenceKind, string> = {
  documentary: "Documental",
  observed: "Observada",
  hypothesis: "Hipótesis",
  acceptance: "Aceptación",
};
