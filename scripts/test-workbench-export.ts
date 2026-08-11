import assert from "node:assert/strict";
import { buildWorkbenchMarkdown } from "@/lib/workbench/exportMarkdown";

const markdown = buildWorkbenchMarkdown({
  title: "Demo\nsegura",
  slug: "demo",
  brands: ["IBM · observabilidad"],
  complete: true,
  totalCompleted: 1,
  totalItems: 2,
  sections: [{
    label: "Validar",
    items: [{
      id: "validation:1",
      title: "Confirmar contrato",
      detail: "Revisar\nrelaciones",
      evidence: "Fuente y límite",
      sourceIds: [],
      checked: true,
    }],
  }],
  sourcesToConfirm: ["Confirmar contrato · sin fuente declarada"],
});

assert.match(markdown, /paquete completo/);
assert.match(markdown, /Demo segura/);
assert.match(markdown, /Estado local: revisado/);
assert.match(markdown, /Fuentes: confirmar antes de ejecutar/);
assert.match(markdown, /Fuentes a confirmar/);
assert.doesNotMatch(markdown, /Demo\nsegura/);
assert.doesNotMatch(markdown, /Revisar\nrelaciones/);
console.log("Workbench export regression checks passed.");
