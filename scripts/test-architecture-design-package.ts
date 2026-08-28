import assert from "node:assert/strict";
import { buildArchitectureDesignPackageMarkdown } from "../src/lib/architecture/designPackage";
import { validateStudioDiagram, type StudioDiagram } from "../src/lib/architecture/studio";

const diagram: StudioDiagram = {
  title: "Protección de ERP",
  summary: "ERP virtualizado con almacenamiento y protección de datos.",
  assumptions: ["Confirmar RPO y RTO con el dueño de la aplicación."],
  nodes: [
    { id: "host", componentId: "vmware-host", label: "Host VMware – Sede 1", x: 20, y: 40 },
    { id: "storage", componentId: "ibm-flashsystem", label: "IBM FlashSystem – Sede 1", x: 70, y: 40 },
  ],
  connections: [{ id: "fc", from: "host", fromPort: "fc", to: "storage", toPort: "fc", label: "SAN FC" }],
};
const validation = validateStudioDiagram(diagram);
const markdown = buildArchitectureDesignPackageMarkdown({ appVersion: "0.253.0", generatedAt: "2026-08-28T12:00:00.000Z", diagram, validation, risks: ["Host VMware – Sede 1 no tiene ninguna conexión de respaldo (backup) en este diagrama."] });

assert.match(markdown, /Paquete de diseño técnico · Protección de ERP/);
assert.match(markdown, /Inventario conceptual/);
assert.match(markdown, /Host VMware – Sede 1/);
assert.match(markdown, /Fibre Channel/);
assert.match(markdown, /Riesgos visibles/);
assert.match(markdown, /Preguntas para discovery y revisión de ingeniería/);
assert.match(markdown, /No es una BOM, HCL, diseño de bajo nivel/);
console.log("Architecture design package export checks passed.");
