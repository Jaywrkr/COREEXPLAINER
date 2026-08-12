export interface SanitizedAiInput {
  value: string;
  redactions: number;
}

function redact(value: string, pattern: RegExp, replacement: string): { value: string; count: number } {
  let count = 0;
  const next = value.replace(pattern, (...args) => {
    count += 1;
    const groups = args.slice(1, -2) as string[];
    return replacement.replace(/\$([0-9]+)/g, (_, index: string) => groups[Number(index) - 1] ?? "[redacted]");
  });
  return { value: next, count };
}

/**
 * Removes common credentials from text pasted into the read-only AI helper.
 * This is a defense-in-depth boundary, not a DLP product; users must still
 * avoid pasting confidential client data into the explainer.
 */
export function sanitizeAiText(input: string, maxLength: number): SanitizedAiInput {
  let value = input.slice(0, maxLength);
  let redactions = 0;
  for (const [pattern, replacement] of [
    [/\bBearer\s+[A-Za-z0-9._~+/=-]{8,}/gi, "Bearer [redacted]"],
    [/\b(?:sk|rk)-[A-Za-z0-9_-]{12,}\b/g, "[redacted-key]"],
    [/(?:["']?)(\b(?:password|passwd|secret|token|api[_-]?key|authorization)\b)(?:["']?\s*[:=]\s*)("[^"]*"|'[^']*'|[^\s,;]+)/gi, "$1: [redacted]"],
  ] as const) {
    const result = redact(value, pattern, replacement);
    value = result.value;
    redactions += result.count;
  }
  return { value, redactions };
}

export function sanitizeCopilotInput(question: string, context: string): { question: SanitizedAiInput; context: SanitizedAiInput; redactions: number } {
  const sanitizedQuestion = sanitizeAiText(question, 600);
  const sanitizedContext = sanitizeAiText(context, 14_000);
  return { question: sanitizedQuestion, context: sanitizedContext, redactions: sanitizedQuestion.redactions + sanitizedContext.redactions };
}
