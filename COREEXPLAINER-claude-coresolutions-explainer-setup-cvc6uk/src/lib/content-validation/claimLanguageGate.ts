export interface ClaimLanguageField {
  path: string;
  text: string;
  sourceIds?: readonly string[];
}

export interface ClaimLanguageIssue {
  path: string;
  phrase: string;
  message: string;
}

interface AbsoluteClaimRule {
  phrase: string;
  pattern: RegExp;
}

const ABSOLUTE_CLAIM_RULES: readonly AbsoluteClaimRule[] = [
  { phrase: "garantiza", pattern: /\bgarant(?:iza|izan|izar)\b/i },
  { phrase: "siempre", pattern: /\bsiempre\b/i },
  { phrase: "nunca", pattern: /\bnunca\b/i },
  { phrase: "sin downtime", pattern: /\bsin\s+downtime\b/i },
  { phrase: "automático", pattern: /\bautom(?:ático|ática|áticos|áticas|atico|atica|aticos|aticas)\b/i },
  { phrase: "cero impacto", pattern: /\bcero\s+(?:impacto|interrupciones?|downtime)\b/i },
];

// A claim is explicitly qualified when it states a condition, uncertainty or
// limitation close enough to make the absolute wording non-promissory.
const QUALIFICATION_PATTERN = /\b(?:depende|puede|podría|podria|según|segun|requiere|debe\s+validarse|debe\s+probarse|debe\s+medirse|no\s+(?:se\s+)?garantiza|no\s+siempre|no\s+significa|en\s+este\s+diseño|en\s+este\s+diseno|bajo\s+las\s+condiciones|si\s+se\s+configura)\b/i;

/**
 * Finds absolute/promise-like wording that is not backed by a source or an
 * explicit limitation. This is intentionally a warning gate: technical
 * reviewers decide whether a phrase is valid for the actual design/release.
 */
export function findAbsoluteClaimLanguage(fields: readonly ClaimLanguageField[]): ClaimLanguageIssue[] {
  const issues: ClaimLanguageIssue[] = [];

  for (const field of fields) {
    if (!field.text.trim() || (field.sourceIds?.length ?? 0) > 0) continue;
    for (const rule of ABSOLUTE_CLAIM_RULES) {
      if (!rule.pattern.test(field.text) || QUALIFICATION_PATTERN.test(field.text)) continue;
      issues.push({
        path: field.path,
        phrase: rule.phrase,
        message: `absolute claim '${rule.phrase}' needs a source or an explicit limitation`,
      });
    }
  }

  return issues;
}
