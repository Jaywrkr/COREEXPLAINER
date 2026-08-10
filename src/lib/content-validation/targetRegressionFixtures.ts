import type { TargetArchitecture } from "@/content/types";
import { validateTargetArchitecture } from "./validateExplainer";

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(`Target architecture regression failed: ${message}`);
}

/** Build-time fixtures that protect authored target validation from regressions. */
export function assertTargetArchitectureRegression() {
  const sources = new Set(["source-a", "source-b"]);
  const valid: TargetArchitecture = {
    label: "Objetivo válido",
    summary: "Resumen",
    expectedChanges: ["Cambio"],
    limitations: "Límite",
    sourceIds: ["source-a"],
  };
  expect(validateTargetArchitecture(valid, sources).length === 0, "a complete target with known sources must pass");

  const unknownSource = { ...valid, sourceIds: ["missing"] };
  expect(validateTargetArchitecture(unknownSource, sources).some((error) => error.includes("unknown technical source")), "unknown target sources must fail");

  const incomplete = { ...valid, label: "", expectedChanges: [] };
  const errors = validateTargetArchitecture(incomplete, sources);
  expect(errors.some((error) => error.includes("label")), "empty target labels must fail");
  expect(errors.some((error) => error.includes("expectedChanges")), "empty target changes must fail");

  const duplicatePhase = {
    ...valid,
    roadmap: [
      { id: "assess", title: "Evaluar", objective: "Objetivo", evidence: "Evidencia", exitCriteria: "Salida" },
      { id: "assess", title: "Repetida", objective: "Objetivo", evidence: "Evidencia", exitCriteria: "Salida" },
    ],
  };
  expect(validateTargetArchitecture(duplicatePhase, sources).some((error) => error.includes("roadmap[1].id")), "duplicate roadmap phases must fail");

  const unknownPhaseSource = {
    ...valid,
    roadmap: [{ id: "assess", title: "Evaluar", objective: "Objetivo", evidence: "Evidencia", exitCriteria: "Salida", sourceIds: ["missing"] }],
  };
  expect(validateTargetArchitecture(unknownPhaseSource, sources).some((error) => error.includes("roadmap[0].sourceIds")), "unknown roadmap sources must fail");
}
