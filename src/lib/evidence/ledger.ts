import type { ExplainerMeta, ExplainerStep } from "@/content/types";

export type EvidenceKind = "documentary" | "observed" | "hypothesis" | "acceptance";
export type EvidenceProvenance = "authored" | "derived";
export type EvidenceSourceStatus = "current" | "review-needed" | "missing";

export interface EvidenceRecord {
  id: string;
  kind: EvidenceKind;
  claim: string;
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
  const records: EvidenceRecord[] = steps.map((step) => record(meta, {
    id: `step:${step.id}`,
    kind: "documentary",
    claim: clean(step.title),
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
      requestedEvidence: clean(option.evidence),
      sourceIds: unique(option.sourceIds ?? []),
      provenance: "authored",
    }));
  }

  return records;
}

export function validateEvidenceLedger(records: EvidenceRecord[], knownSourceIds: ReadonlySet<string>): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const [index, record] of records.entries()) {
    const label = `evidence[${index}]`;
    if (!record.id.trim()) errors.push(`${label}.id must be non-empty`);
    if (ids.has(record.id)) errors.push(`${label}.id '${record.id}' is duplicated`);
    ids.add(record.id);
    if (!record.claim.trim()) errors.push(`${label}.claim must be non-empty`);
    if (!record.requestedEvidence.trim()) errors.push(`${label}.requestedEvidence must be non-empty`);
    if (!record.sourceIds.length) errors.push(`${label}.sourceIds must contain at least one source`);
    for (const sourceId of record.sourceIds) {
      if (!knownSourceIds.has(sourceId)) errors.push(`${label}.sourceIds references unknown source '${sourceId}'`);
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
