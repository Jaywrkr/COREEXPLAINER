import assert from "node:assert/strict";
import { normalizeGeneratedDiagram, siteOfLabel, validateStudioDiagram } from "../src/lib/architecture/studio";

assert.equal(siteOfLabel("Lenovo Nodo 1 – DC Principal"), "Sede 1");
assert.equal(siteOfLabel("Lenovo Nodo 5 – DC Alterno"), "Sede 2");
assert.equal(siteOfLabel("Switch Aruba CX – Sitio Secundario"), "Sede 2");
assert.equal(siteOfLabel("Veeam Data Platform"), "Data Center");
assert.equal(siteOfLabel("Host VMware – Recuperación de desastres"), "DR Site");

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

const firstConnection = valid.connections[0];
assert.ok(firstConnection);
const invalid = { ...valid, connections: [{ ...firstConnection, fromPort: "eth", toPort: "fc" }] };
assert.equal(validateStudioDiagram(invalid).valid, false);
assert.equal(normalizeGeneratedDiagram({ nodes: [{ componentId: "not-authorized" }], connections: [] })?.nodes.length, 0);
console.log("Architecture Studio catalog and port validation checks passed.");
