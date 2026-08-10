import assert from "node:assert/strict";
import { buildWorkbenchMarkdown, isSafeHttpUrl } from "@/lib/workbench/exportMarkdown";

assert.equal(isSafeHttpUrl("https://docs.example.test/source"), true);
assert.equal(isSafeHttpUrl("javascript:alert(1)"), false);

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
      sourceLabels: ["https://docs.example.test/contract", "javascript:alert(1)"],
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
assert.match(markdown, /https:\/\/docs\.example\.test\/contract/);
assert.doesNotMatch(markdown, /javascript:alert/);
assert.doesNotMatch(markdown, /Demo\nsegura/);
assert.doesNotMatch(markdown, /Revisar\nrelaciones/);
console.log("Workbench export regression checks passed.");
