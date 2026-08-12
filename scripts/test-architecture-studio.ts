import assert from "node:assert/strict";
import { normalizeGeneratedDiagram, validateStudioDiagram } from "../src/lib/architecture/studio";

const valid = normalizeGeneratedDiagram({ title: "Prueba", summary: "Prueba", assumptions: [], nodes: [{ id: "host", componentId: "vmware-host", label: "Host", x: 20, y: 40 }, { id: "storage", componentId: "ibm-flashsystem", label: "Storage", x: 70, y: 40 }], connections: [{ id: "fc", from: "host", fromPort: "fc", to: "storage", toPort: "fc", label: "SAN FC" }] });
assert.ok(valid);
assert.equal(validateStudioDiagram(valid).valid, true);

const firstConnection = valid.connections[0];
assert.ok(firstConnection);
const invalid = { ...valid, connections: [{ ...firstConnection, fromPort: "eth", toPort: "fc" }] };
assert.equal(validateStudioDiagram(invalid).valid, false);
assert.equal(normalizeGeneratedDiagram({ nodes: [{ componentId: "not-authorized" }], connections: [] })?.nodes.length, 0);
console.log("Architecture Studio catalog and port validation checks passed.");
