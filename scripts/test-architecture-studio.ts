import assert from "node:assert/strict";
import { assessDiagramRisks, assessReadiness, normalizeGeneratedDiagram, siteOfLabel, validateStudioDiagram } from "../src/lib/architecture/studio";

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

const overlapping = normalizeGeneratedDiagram({ title: "Solape", summary: "Prueba", assumptions: [], nodes: [{ id: "a", componentId: "vmware-host", label: "A", x: 50, y: 50 }, { id: "b", componentId: "ibm-flashsystem", label: "B", x: 51, y: 50 }, { id: "c", componentId: "veeam", label: "C", x: 50, y: 51 }], connections: [] });
assert.ok(overlapping);
for (let i = 0; i < overlapping!.nodes.length; i++) {
  for (let j = i + 1; j < overlapping!.nodes.length; j++) {
    const a = overlapping!.nodes[i]!, b = overlapping!.nodes[j]!;
    assert.ok(Math.abs(a.x - b.x) >= 19.9 || Math.abs(a.y - b.y) >= 14.9, `${a.label} y ${b.label} quedaron solapados`);
  }
}

const unprotectedRisks = assessDiagramRisks(valid);
assert.equal(unprotectedRisks.length, 1, "Solo el host de cómputo sin backup debe generar aviso (storage no tiene puerto de backup)");
assert.ok(unprotectedRisks.some((risk) => risk.includes("Host")));
assert.ok(!unprotectedRisks.some((risk) => risk.includes("Storage")), "Storage no declara puerto de backup, no debe marcarse como riesgo");

const protectedRisks = assessDiagramRisks(operationalLinks!);
assert.ok(!protectedRisks.some((risk) => risk.includes("Host")), "Host con backup conectado no debe generar aviso");

const autoBackup = normalizeGeneratedDiagram({ title: "Auto backup", summary: "Prueba", assumptions: [], nodes: [{ id: "host1", componentId: "vmware-host", label: "Host 1", x: 20, y: 30 }, { id: "host2", componentId: "lenovo-server", label: "Host 2", x: 20, y: 60 }, { id: "storage", componentId: "ibm-flashsystem", label: "Storage", x: 50, y: 45 }, { id: "veeam", componentId: "veeam", label: "Veeam", x: 80, y: 45 }], connections: [] });
assert.ok(autoBackup);
assert.equal(assessDiagramRisks(autoBackup!).length, 0, "Con Veeam presente, ambos hosts de cómputo deben quedar auto-conectados a backup");
const backupLinks = autoBackup!.connections.filter((c) => c.fromPort === "backup" || c.toPort === "backup");
assert.equal(backupLinks.length, 2, "Debe auto-generarse un enlace de backup por cada nodo de cómputo");
assert.ok(!autoBackup!.connections.some((c) => (c.from === "storage" || c.to === "storage")), "Storage no tiene puerto de backup declarado, no debe conectarse automáticamente");

const spofDiagram = normalizeGeneratedDiagram({ title: "SPOF", summary: "Prueba", assumptions: [], nodes: [{ id: "switch", componentId: "aruba-cx", label: "Switch único", x: 50, y: 20 }, { id: "host1", componentId: "vmware-host", label: "Host 1", x: 25, y: 60 }, { id: "host2", componentId: "vmware-host", label: "Host 2", x: 75, y: 60 }], connections: [{ id: "l1", from: "switch", fromPort: "eth", to: "host1", toPort: "eth", label: "" }, { id: "l2", from: "switch", fromPort: "eth", to: "host2", toPort: "eth", label: "" }] });
const spofRisks = assessDiagramRisks(spofDiagram!);
assert.ok(spofRisks.some((risk) => risk.includes("Switch único")), "Un solo switch con 2+ dependientes debe marcarse como riesgo");

const emptyDiagram = { title: "", summary: "", assumptions: [] as string[], nodes: [], connections: [] };
const blockedReadiness = assessReadiness(emptyDiagram, { valid: false, issues: ["x", "y"] }, []);
assert.equal(blockedReadiness.tone, "blocked");
assert.match(blockedReadiness.label, /2 errores/);

const reviewReadiness = assessReadiness({ ...emptyDiagram, assumptions: ["Se asume enlace 10G disponible."] }, { valid: true, issues: [] }, ["Host sin backup."]);
assert.equal(reviewReadiness.tone, "review");
assert.match(reviewReadiness.label, /Revisar 2 puntos/);

const readyReadiness = assessReadiness(emptyDiagram, { valid: true, issues: [] }, []);
assert.equal(readyReadiness.tone, "ready");

const firstConnection = valid.connections[0];
assert.ok(firstConnection);
const invalid = { ...valid, connections: [{ ...firstConnection, fromPort: "eth", toPort: "fc" }] };
assert.equal(validateStudioDiagram(invalid).valid, false);
assert.equal(normalizeGeneratedDiagram({ nodes: [{ componentId: "not-authorized" }], connections: [] })?.nodes.length, 0);
console.log("Architecture Studio catalog and port validation checks passed.");
