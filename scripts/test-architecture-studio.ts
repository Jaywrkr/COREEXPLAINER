import assert from "node:assert/strict";
import { normalizeGeneratedDiagram, validateStudioDiagram } from "../src/lib/architecture/studio";

const valid = normalizeGeneratedDiagram({ title: "Prueba", summary: "Prueba", assumptions: [], nodes: [{ id: "host", componentId: "vmware-host", label: "Host", x: 20, y: 40 }, { id: "storage", componentId: "ibm-flashsystem", label: "Storage", x: 70, y: 40 }], connections: [{ id: "fc", from: "host", fromPort: "fc", to: "storage", toPort: "fc", label: "SAN FC" }] });
assert.ok(valid);
assert.equal(validateStudioDiagram(valid).valid, true);

const normalizedCoordinates = normalizeGeneratedDiagram({ title: "Coordenadas", summary: "Prueba", assumptions: [], nodes: [{ id: "host", componentId: "vmware-host", label: "Host", x: 0.2, y: 0.4 }], connections: [] });
assert.equal(normalizedCoordinates?.nodes[0]?.x, 20);
assert.equal(normalizedCoordinates?.nodes[0]?.y, 40);

const clampedCoordinates = normalizeGeneratedDiagram({ title: "Canvas", summary: "Prueba", assumptions: [], nodes: [{ id: "host", componentId: "vmware-host", label: "Host", x: 140, y: -10 }], connections: [] });
assert.equal(clampedCoordinates?.nodes[0]?.x, 93);
assert.equal(clampedCoordinates?.nodes[0]?.y, 8);

const operationalLinks = normalizeGeneratedDiagram({ title: "Operación", summary: "Prueba", assumptions: [], nodes: [{ id: "host", componentId: "vmware-host", label: "Host", x: 20, y: 40 }, { id: "instana", componentId: "instana", label: "Instana", x: 70, y: 30 }, { id: "veeam", componentId: "veeam", label: "Veeam", x: 70, y: 60 }], connections: [{ id: "telemetry", from: "instana", fromPort: "api", to: "host", toPort: "api", label: "Telemetría" }, { id: "protection", from: "veeam", fromPort: "backup", to: "host", toPort: "backup", label: "Protección" }] });
assert.ok(operationalLinks);
assert.equal(validateStudioDiagram(operationalLinks).valid, true);

const repairedLogicalLink = normalizeGeneratedDiagram({ title: "Reparación", summary: "Prueba", assumptions: [], nodes: [{ id: "host", componentId: "vmware-host", label: "Host", x: 20, y: 40 }, { id: "instana", componentId: "instana", label: "Instana", x: 70, y: 30 }], connections: [{ id: "telemetry", from: "instana", fromPort: "api", to: "host", toPort: "eth", label: "Telemetría" }] });
assert.equal(repairedLogicalLink?.connections[0]?.toPort, "api");
assert.equal(validateStudioDiagram(repairedLogicalLink!).valid, true);

const overlapping = normalizeGeneratedDiagram({ title: "Solape", summary: "Prueba", assumptions: [], nodes: [{ id: "a", componentId: "vmware-host", label: "A", x: 50, y: 50 }, { id: "b", componentId: "ibm-flashsystem", label: "B", x: 51, y: 50 }, { id: "c", componentId: "veeam", label: "C", x: 50, y: 51 }], connections: [] });
assert.ok(overlapping);
for (let i = 0; i < overlapping!.nodes.length; i++) {
  for (let j = i + 1; j < overlapping!.nodes.length; j++) {
    const a = overlapping!.nodes[i], b = overlapping!.nodes[j];
    assert.ok(Math.abs(a.x - b.x) >= 19.9 || Math.abs(a.y - b.y) >= 14.9, `${a.label} y ${b.label} quedaron solapados`);
  }
}

const firstConnection = valid.connections[0];
assert.ok(firstConnection);
const invalid = { ...valid, connections: [{ ...firstConnection, fromPort: "eth", toPort: "fc" }] };
assert.equal(validateStudioDiagram(invalid).valid, false);
assert.equal(normalizeGeneratedDiagram({ nodes: [{ componentId: "not-authorized" }], connections: [] })?.nodes.length, 0);
console.log("Architecture Studio catalog and port validation checks passed.");
