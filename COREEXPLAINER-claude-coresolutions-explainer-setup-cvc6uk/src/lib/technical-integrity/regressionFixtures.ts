import type { Scene } from "@/lib/animation-spec/types";
import type { TechnicalIntegritySceneContract } from "@/content/types";
import { evaluateTopologyIntegrity } from "./evaluateTopology";

const baseScene: Scene = {
  nodes: [
    { id: "a", name: "Origen", x: 0.2, y: 0.5, kind: "external" },
    { id: "b", name: "Servicio", x: 0.5, y: 0.5, kind: "workload" },
    { id: "c", name: "Destino", x: 0.8, y: 0.5, kind: "storage" },
  ],
  edges: [
    { from: "a", to: "b", kind: "data" },
    { from: "b", to: "c", kind: "dependency" },
  ],
};

const baseContract: TechnicalIntegritySceneContract = {
  requiredNodes: ["a", "b", "c"],
  requiredEdges: [
    {
      id: "a-to-b-data",
      from: "a",
      to: "b",
      kind: "data",
      label: "Entrada de datos",
      rationale: "El origen debe entregar datos al servicio.",
    },
  ],
  requiredPaths: [
    {
      id: "a-to-c-path",
      from: "a",
      to: "c",
      label: "Camino completo",
      rationale: "El origen debe conservar un camino hasta el destino.",
    },
  ],
};

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(`Technical integrity regression failed: ${message}`);
}

function hasDiagnostic(report: ReturnType<typeof evaluateTopologyIntegrity>, id: string) {
  return Boolean(report?.diagnostics.some((diagnostic) => diagnostic.id === id));
}

/** Build-time fixtures that protect the evaluator from silent regressions. */
export function assertTechnicalIntegrityRegression() {
  const valid = evaluateTopologyIntegrity(baseScene, baseContract, "application", "reviewed");
  expect(valid?.status === "valid", "a valid path and edge must remain valid");

  const wrongKind = evaluateTopologyIntegrity(
    { ...baseScene, edges: [{ from: "a", to: "b", kind: "control" }, baseScene.edges[1]!] },
    baseContract,
  );
  expect(hasDiagnostic(wrongKind, "a-to-b-data"), "a wrong edge kind must be reported");

  const missingNode = evaluateTopologyIntegrity(
    { ...baseScene, nodes: baseScene.nodes.filter((node) => node.id !== "c") },
    baseContract,
  );
  expect(hasDiagnostic(missingNode, "node-c"), "a missing required node must be reported");

  const inactive = evaluateTopologyIntegrity(baseScene, baseContract, "application", "baseline", ["b"]);
  expect(inactive?.inactiveNodeIds.includes("b") === true, "inactive nodes must be included in the report");
  expect(hasDiagnostic(inactive, "a-to-c-path"), "an inactive intermediary must break the required path");

  const orphan = evaluateTopologyIntegrity(
    { ...baseScene, nodes: [...baseScene.nodes, { id: "orphan", name: "Aislado", x: 0.5, y: 0.8, kind: "compute" }] },
    baseContract,
  );
  expect(hasDiagnostic(orphan, "orphan-node-orphan"), "an isolated node must produce a warning");

  const dangling = evaluateTopologyIntegrity(
    { ...baseScene, edges: [...baseScene.edges, { from: "a", to: "missing", kind: "data" }] },
    baseContract,
  );
  expect(hasDiagnostic(dangling, "dangling-edge-a-missing-data"), "a dangling edge must be reported");
}
