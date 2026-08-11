export interface CreatorDraftScene {
  id: string;
  title: string;
  paragraphs: [string, string];
  businessImpact: string;
}

export interface CreatorDraft {
  title: string;
  tagline: string;
  scenes: [CreatorDraftScene, CreatorDraftScene, CreatorDraftScene];
  risks: string[];
  evidenceQuestions: string[];
  validationGaps: string[];
  sourcesToConfirm: string[];
}

export interface CreatorDraftValidation { draft: CreatorDraft | null; issues: string[] }

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
  return cleaned || null;
}

function list(value: unknown, label: string, maxItems = 8): { values: string[]; issues: string[] } {
  if (!Array.isArray(value)) return { values: [], issues: [`${label} debe ser una lista`] };
  const issues: string[] = [];
  const values = value.slice(0, maxItems).flatMap((item, index) => {
    const cleaned = text(item, 500);
    if (!cleaned) { issues.push(`${label}[${index}] debe ser texto no vacío`); return []; }
    return [cleaned];
  });
  if (value.length > maxItems) issues.push(`${label} supera el máximo de ${maxItems} elementos`);
  if (!values.length) issues.push(`${label} no puede estar vacía`);
  return { values, issues };
}

/** Validates and normalizes untrusted model output before it reaches the UI. */
export function validateCreatorDraft(value: unknown): CreatorDraftValidation {
  if (!value || typeof value !== "object") return { draft: null, issues: ["el borrador debe ser un objeto"] };
  const candidate = value as Record<string, unknown>;
  const issues: string[] = [];
  const title = text(candidate.title, 180);
  const tagline = text(candidate.tagline, 400);
  if (!title) issues.push("title debe ser texto no vacío");
  if (!tagline) issues.push("tagline debe ser texto no vacío");
  if (!Array.isArray(candidate.scenes) || candidate.scenes.length !== 3) issues.push("scenes debe contener exactamente 3 escenas");
  const scenes = (Array.isArray(candidate.scenes) ? candidate.scenes : []).slice(0, 3).flatMap((item, index) => {
    if (!item || typeof item !== "object") { issues.push(`scenes[${index}] debe ser un objeto`); return []; }
    const scene = item as Record<string, unknown>;
    const id = text(scene.id, 80); const sceneTitle = text(scene.title, 180); const impact = text(scene.businessImpact, 500);
    const paragraphs = Array.isArray(scene.paragraphs) ? scene.paragraphs : [];
    const first = text(paragraphs[0], 700); const second = text(paragraphs[1], 700);
    if (!id || !sceneTitle || !impact || !first || !second || paragraphs.length !== 2) { issues.push(`scenes[${index}] requiere id, título, 2 párrafos y businessImpact`); return []; }
    return [{ id, title: sceneTitle, paragraphs: [first, second] as [string, string], businessImpact: impact }];
  });
  const risks = list(candidate.risks, "risks"); const evidenceQuestions = list(candidate.evidenceQuestions, "evidenceQuestions"); const validationGaps = list(candidate.validationGaps, "validationGaps"); const sourcesToConfirm = list(candidate.sourcesToConfirm, "sourcesToConfirm");
  issues.push(...risks.issues, ...evidenceQuestions.issues, ...validationGaps.issues, ...sourcesToConfirm.issues);
  if (issues.length || !title || !tagline || scenes.length !== 3) return { draft: null, issues };
  return { draft: { title, tagline, scenes: scenes as CreatorDraft["scenes"], risks: risks.values, evidenceQuestions: evidenceQuestions.values, validationGaps: validationGaps.values, sourcesToConfirm: sourcesToConfirm.values }, issues: [] };
}
