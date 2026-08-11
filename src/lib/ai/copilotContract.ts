export type CopilotActionType = "open-source" | "activate-scenario";

export interface CopilotAction {
  type: CopilotActionType;
  id: string;
  label: string;
}

export interface CopilotActionAllowlist {
  sourceIds: ReadonlySet<string>;
  scenarioIds: ReadonlySet<string>;
}

/** Normalizes untrusted model prose before it is rendered in the explainer. */
export function sanitizeCopilotMessage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, 5_000);
  return cleaned || null;
}

export interface CopilotMessageReview {
  message: string;
  citedSourceIds: string[];
  status: "context-backed" | "review-needed";
  reasons: string[];
}

const EVIDENCE_FOOTER = /\bevidencia\s+a\s+revisar\b/i;
const ABSOLUTE_CLAIM = /\b(?:garantiza|siempre|nunca|sin\s+downtime|autom(?:ático|ática|atic[oa]s?)|cero\s+(?:impacto|interrupciones?|downtime))\b/i;
const SOURCE_CITATION = /\[fuente:([^\]\s]{1,160})\]/gi;

/**
 * Adds a visible evidence boundary to model prose and reports whether the
 * answer cited an authored source. This never certifies an answer; it keeps
 * unsupported or absolute language visibly in human-review territory.
 */
export function reviewCopilotMessage(value: unknown, knownSourceIds: ReadonlySet<string>): CopilotMessageReview {
  const sanitized = sanitizeCopilotMessage(value) ?? "El copiloto no devolvió una explicación utilizable.";
  const citedSourceIds: string[] = [];
  const reasons: string[] = [];
  for (const match of sanitized.matchAll(SOURCE_CITATION)) {
    const id = match[1]?.trim();
    if (!id) continue;
    if (knownSourceIds.has(id)) citedSourceIds.push(id);
    else reasons.push(`cita desconocida: ${id}`);
  }
  const uniqueCitations = [...new Set(citedSourceIds)];
  if (!uniqueCitations.length) reasons.push("no incluye una cita [fuente:id] de la explicación");
  if (ABSOLUTE_CLAIM.test(sanitized) && !/\b(?:depende|puede|requiere|no\s+(?:se\s+)?garantiza|debe\s+(?:validarse|probarse|medirse))\b/i.test(sanitized)) {
    reasons.push("usa lenguaje absoluto que requiere una limitación o revisión humana");
  }
  let message = sanitized;
  if (!EVIDENCE_FOOTER.test(message)) {
    message += "\n\nEvidencia a revisar: confirma la documentación enlazada y el entorno real antes de tomar decisiones.";
    reasons.push("faltaba el límite de evidencia a revisar");
  }
  return { message, citedSourceIds: uniqueCitations, status: reasons.length ? "review-needed" : "context-backed", reasons };
}

/**
 * Converts untrusted model output into actions that point only at resources
 * already authored by the active explainer. It never accepts URLs or commands.
 */
export function sanitizeCopilotActions(value: unknown, allowlist: CopilotActionAllowlist): CopilotAction[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.flatMap((candidate) => {
    if (!candidate || typeof candidate !== "object") return [];
    const action = candidate as Partial<CopilotAction>;
    if ((action.type !== "open-source" && action.type !== "activate-scenario") || typeof action.id !== "string" || typeof action.label !== "string") return [];
    const id = action.id.trim();
    const label = action.label.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
    if (!id || !label) return [];
    if (action.type === "open-source" && !allowlist.sourceIds.has(id)) return [];
    if (action.type === "activate-scenario" && !allowlist.scenarioIds.has(id)) return [];
    const key = `${action.type}:${id}`;
    if (seen.has(key)) return [];
    seen.add(key);
    return [{ type: action.type, id, label } satisfies CopilotAction];
  }).slice(0, 3);
}

export interface CopilotPolicy {
  mode: "read-only";
  actionTypes: CopilotActionType[];
  estimatedInputTokens: number;
  maxOutputTokens: number;
  estimatedCostUsd?: number;
  costSource?: "environment";
  maxEstimatedCostUsd?: number;
}
