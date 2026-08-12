import assert from "node:assert/strict";
import { validateCreatorDraft } from "../src/lib/ai/creatorContract";

const valid = { title: "Tema", tagline: "Resumen", scenes: [1, 2, 3].map((n) => ({ id: `s${n}`, title: `Escena ${n}`, paragraphs: ["Uno", "Dos"], businessImpact: "Impacto" })), risks: ["Riesgo"], evidenceQuestions: ["Evidencia"], validationGaps: ["Validar"], sourcesToConfirm: ["Fuente"] };
const accepted = validateCreatorDraft(valid);
assert.ok(accepted.draft);
assert.equal(accepted.issues.length, 0);
const rejected = validateCreatorDraft({ ...valid, scenes: valid.scenes.slice(0, 2), risks: [] });
assert.equal(rejected.draft, null);
assert.ok(rejected.issues.some((issue) => issue.includes("exactamente 3")));
const normalized = validateCreatorDraft({ ...valid, title: "  Tema\n con espacios ", scenes: valid.scenes });
assert.equal(normalized.draft?.title, "Tema con espacios");
console.log("Creator draft contract regression checks passed.");
