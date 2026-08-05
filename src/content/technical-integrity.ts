import type { EdgeKind } from "@/lib/animation-spec/types";
import type {
  TechnicalIntegrityDomain,
  TechnicalIntegrityProfile,
  TechnicalIntegritySceneContract,
} from "./types";

/** Network contracts for the VCF scenes. These rules validate the model, not a live environment. */
export const vcfTechnicalIntegrity: TechnicalIntegrityProfile = {
  domain: "network",
  assurance: "reviewed",
  scenes: {
    silos: {
      requiredNodes: ["compute", "storage", "network", "it"],
      checkOrphans: false,
    },
    unify: {
      requiredNodes: ["compute", "storage", "network", "vcf", "app"],
      requiredEdges: [
        { id: "vcf-compute", from: "compute", to: "vcf", kind: "dependency", label: "Cómputo conectado a gestión", rationale: "La plataforma necesita representar la dependencia entre la capacidad de cómputo y la gestión de VCF.", sourceIds: ["vcf-platform"] },
        { id: "vcf-storage", from: "storage", to: "vcf", kind: "storage", label: "Storage conectado a la plataforma", rationale: "La capa de storage debe aparecer como dependencia explícita del modelo integrado.", sourceIds: ["vsan-datastore"] },
        { id: "vcf-network", from: "network", to: "vcf", kind: "dependency", label: "Networking conectado a la plataforma", rationale: "El modelo no debe presentar networking como una capacidad aislada de la plataforma.", sourceIds: ["vcf-networking"] },
        { id: "vcf-workload", from: "vcf", to: "app", kind: "data", label: "Camino hacia la carga", rationale: "La escena debe mostrar que la plataforma entrega recursos a la carga de trabajo.", sourceIds: ["vcf-platform"] },
      ],
    },
    cluster: {
      requiredNodes: ["host1", "host2", "host3", "vsan", "nsx", "vcenter"],
      requiredEdges: [
        { id: "vcenter-host1", from: "vcenter", to: "host1", kind: "control", label: "Gestión del host 1", rationale: "vCenter representa el plano de control de las operaciones de vSphere.", sourceIds: ["vsphere-ha-restart"] },
        { id: "vcenter-host2", from: "vcenter", to: "host2", kind: "control", label: "Gestión del host 2", rationale: "Cada host mostrado debe estar conectado al plano de gestión que lo administra.", sourceIds: ["vsphere-ha-restart"] },
        { id: "vcenter-host3", from: "vcenter", to: "host3", kind: "control", label: "Gestión del host 3", rationale: "Cada host mostrado debe estar conectado al plano de gestión que lo administra.", sourceIds: ["vsphere-ha-restart"] },
        { id: "host1-vsan", from: "host1", to: "vsan", kind: "storage", label: "Ruta de storage del host 1", rationale: "El datastore compartido requiere que los hosts participantes tengan la relación de storage representada.", sourceIds: ["vsan-datastore"] },
        { id: "host2-vsan", from: "host2", to: "vsan", kind: "storage", label: "Ruta de storage del host 2", rationale: "El datastore compartido requiere que los hosts participantes tengan la relación de storage representada.", sourceIds: ["vsan-datastore"] },
        { id: "host3-vsan", from: "host3", to: "vsan", kind: "storage", label: "Ruta de storage del host 3", rationale: "El datastore compartido requiere que los hosts participantes tengan la relación de storage representada.", sourceIds: ["vsan-datastore"] },
        { id: "host1-nsx", from: "host1", to: "nsx", kind: "dependency", label: "Transporte de red del host 1", rationale: "La escena debe mostrar que el networking de NSX depende de los hosts que participan en el transporte.", sourceIds: ["vcf-networking"] },
        { id: "host2-nsx", from: "host2", to: "nsx", kind: "dependency", label: "Transporte de red del host 2", rationale: "La escena debe mostrar que el networking de NSX depende de los hosts que participan en el transporte.", sourceIds: ["vcf-networking"] },
        { id: "host3-nsx", from: "host3", to: "nsx", kind: "dependency", label: "Transporte de red del host 3", rationale: "La escena debe mostrar que el networking de NSX depende de los hosts que participan en el transporte.", sourceIds: ["vcf-networking"] },
      ],
    },
    workloads: {
      requiredNodes: ["client", "vcf", "cluster", "app1", "app2", "app3"],
      requiredEdges: [
        { id: "vcf-cluster-control", from: "vcf", to: "cluster", kind: "control", label: "Gestión del clúster", rationale: "La gestión de VCF debe permanecer diferenciada del camino de datos de las cargas.", sourceIds: ["vcf-platform"] },
      ],
      requiredPaths: [
        { id: "client-app1-path", from: "client", to: "app1", label: "Camino cliente → aplicación 1", rationale: "La carga debe tener un camino de datos representado desde el usuario hasta su ejecución.", sourceIds: ["vcf-platform"] },
        { id: "client-app2-path", from: "client", to: "app2", label: "Camino cliente → aplicación 2", rationale: "La carga debe tener un camino de datos representado desde el usuario hasta su ejecución.", sourceIds: ["vcf-platform"] },
        { id: "client-app3-path", from: "client", to: "app3", label: "Camino cliente → aplicación 3", rationale: "La carga debe tener un camino de datos representado desde el usuario hasta su ejecución.", sourceIds: ["vcf-platform"] },
      ],
    },
  },
};

/** Network contracts for the NSX scenes, including underlay/overlay and north-south paths. */
export const nsxTechnicalIntegrity: TechnicalIntegrityProfile = {
  domain: "network",
  assurance: "reviewed",
  scenes: {
    segments: {
      requiredNodes: ["client", "web", "app", "db", "segments", "manager"],
      requiredPaths: [
        { id: "client-db-path", from: "client", to: "db", label: "Camino cliente → base de datos", rationale: "La narrativa de segmentos debe conservar un camino de datos completo entre las capas de la aplicación.", sourceIds: ["nsx-firewall-well-architected"] },
      ],
      requiredEdges: [
        { id: "manager-segments-control", from: "manager", to: "segments", kind: "control", label: "Gestión de segmentos", rationale: "NSX Manager representa el plano de control que define los segmentos lógicos.", sourceIds: ["nsx-transport-nodes"] },
        { id: "segments-web", from: "segments", to: "web", kind: "dependency", label: "Web conectado al segmento", rationale: "Cada workload de la escena debe tener una relación explícita con su red lógica.", sourceIds: ["nsx-transport-nodes"] },
        { id: "segments-app", from: "segments", to: "app", kind: "dependency", label: "Aplicación conectada al segmento", rationale: "Cada workload de la escena debe tener una relación explícita con su red lógica.", sourceIds: ["nsx-transport-nodes"] },
        { id: "segments-db", from: "segments", to: "db", kind: "dependency", label: "Base de datos conectada al segmento", rationale: "Cada workload de la escena debe tener una relación explícita con su red lógica.", sourceIds: ["nsx-transport-nodes"] },
      ],
    },
    overlay: {
      requiredNodes: ["web", "app", "host1", "host2", "geneve", "underlay"],
      requiredEdges: [
        { id: "host1-geneve", from: "host1", to: "geneve", kind: "dependency", label: "TEP del nodo de transporte 1", rationale: "El overlay necesita puntos de transporte representados antes de llegar al underlay.", sourceIds: ["nsx-transport-nodes"] },
        { id: "host2-geneve", from: "host2", to: "geneve", kind: "dependency", label: "TEP del nodo de transporte 2", rationale: "La redundancia visual del transporte debe mantener ambos nodos conectados al overlay.", sourceIds: ["nsx-transport-nodes"] },
        { id: "geneve-underlay", from: "geneve", to: "underlay", kind: "dependency", label: "Overlay soportado por underlay", rationale: "GENEVE no sustituye a la red IP física que transporta los túneles.", sourceIds: ["nsx-geneve-underlay"] },
      ],
      requiredPaths: [
        { id: "overlay-workload-path", from: "web", to: "app", label: "Camino east-west de workloads", rationale: "La escena debe conservar el flujo lógico entre workloads sobre el transporte overlay.", sourceIds: ["nsx-geneve-underlay"] },
      ],
    },
    "east-west": {
      requiredNodes: ["web", "dfw", "app", "db", "policy"],
      requiredEdges: [
        { id: "web-dfw", from: "web", to: "dfw", kind: "data", label: "Web pasa por DFW", rationale: "El punto de enforcement debe estar en el recorrido east-west que se quiere explicar.", sourceIds: ["nsx-dfw-connectivity"] },
        { id: "dfw-app", from: "dfw", to: "app", kind: "data", label: "DFW entrega a aplicación", rationale: "El modelo debe conservar la salida del punto de enforcement hacia la carga.", sourceIds: ["nsx-dfw-connectivity"] },
        { id: "policy-dfw", from: "policy", to: "dfw", kind: "control", label: "Política aplicada en DFW", rationale: "La política y el punto de enforcement deben estar diferenciados como control y datos.", sourceIds: ["nsx-dfw-scope"] },
      ],
    },
    "north-south": {
      requiredNodes: ["client", "tier0", "tier1", "segment", "app", "dfw"],
      requiredPaths: [
        { id: "north-south-path", from: "client", to: "app", label: "Camino north-south", rationale: "El tráfico externo debe recorrer los gateways y el segmento antes de alcanzar la aplicación.", sourceIds: ["nsx-firewall-well-architected"] },
      ],
      requiredEdges: [
        { id: "dfw-app-control", from: "dfw", to: "app", kind: "control", label: "DFW asociado a la carga", rationale: "El DFW controla el workload, pero no reemplaza el routing north-south de los gateways.", sourceIds: ["nsx-firewall-well-architected"] },
      ],
    },
    limits: {
      requiredNodes: ["client", "underlay", "policy", "segment-policy", "gateway", "app"],
    },
  },
};

type BaselineScene = {
  nodes: string[];
  edge?: [from: string, to: string, kind: EdgeKind];
  path?: [from: string, to: string];
  sourceIds?: string[];
};

function baselineContract(sceneId: string, scene: BaselineScene): TechnicalIntegritySceneContract {
  const contract: TechnicalIntegritySceneContract = { requiredNodes: scene.nodes };
  if (scene.edge) {
    const [from, to, kind] = scene.edge;
    contract.requiredEdges = [{
      sourceIds: scene.sourceIds,
      id: `${sceneId}-${from}-${to}`,
      from,
      to,
      kind,
      label: `Relación ${from} → ${to}`,
      rationale: "La relación representa una dependencia explícita del patrón explicado y debe mantenerse visible en el diagrama.",
    }];
  }
  if (scene.path) {
    const [from, to] = scene.path;
    contract.requiredPaths = [{
      sourceIds: scene.sourceIds,
      id: `${sceneId}-${from}-${to}-path`,
      from,
      to,
      label: `Camino ${from} → ${to}`,
      rationale: "El camino comprueba que la escena conserva una ruta técnica entre los componentes que la narrativa conecta.",
    }];
  }
  return contract;
}

function baselineProfile(domain: TechnicalIntegrityDomain, scenes: Record<string, BaselineScene>): TechnicalIntegrityProfile {
  return {
    domain,
    assurance: "baseline",
    scenes: Object.fromEntries(
      Object.entries(scenes).map(([sceneId, scene]) => [sceneId, baselineContract(sceneId, scene)]),
    ),
  };
}

function sourceBackedProfile(domain: TechnicalIntegrityDomain, scenes: Record<string, BaselineScene>): TechnicalIntegrityProfile {
  return { ...baselineProfile(domain, scenes), assurance: "source-backed" };
}

/** Baseline contracts for every explainer without a deeper domain profile yet. */
export const technicalIntegrityProfiles: Record<string, TechnicalIntegrityProfile> = {
  vcf: vcfTechnicalIntegrity,
  nsx: nsxTechnicalIntegrity,
  "vsphere-ha": baselineProfile("virtualization", {
    normal: { nodes: ["client", "vm", "host1", "host2", "datastore", "ha"], edge: ["ha", "host1", "control"], path: ["client", "datastore"] },
    "host-failure": { nodes: ["vm", "host1", "host2", "datastore", "ha"], edge: ["ha", "host1", "control"], path: ["ha", "vm"] },
    decision: { nodes: ["ha", "capacity", "datastore", "policy", "host2", "vm"], edge: ["ha", "capacity", "control"], path: ["ha", "vm"] },
    restart: { nodes: ["client", "host2", "datastore", "vm", "app"], edge: ["host2", "vm", "control"], path: ["client", "app"] },
    limits: { nodes: ["ha", "vm", "capacity", "datastore", "policy"], edge: ["ha", "capacity", "control"], path: ["ha", "vm"] },
  }),
  vsan: sourceBackedProfile("storage", {
    "local-storage": { nodes: ["vm", "host1", "host2", "disk1", "disk2", "vsan"], edge: ["disk1", "vsan", "storage"], path: ["vm", "vsan"], sourceIds: ["vsan-components"] },
    "object-distribution": { nodes: ["vm", "object", "component1", "component2", "datastore"], edge: ["object", "component1", "storage"], path: ["vm", "datastore"], sourceIds: ["vsan-components", "vsan-reduced-availability"] },
    "policy-placement": { nodes: ["policy", "object", "domain1", "domain2", "domain3", "placement"], edge: ["policy", "object", "control"], path: ["policy", "placement"], sourceIds: ["vsan-fault-domains", "vsan-components"] },
    "failure-resync": { nodes: ["host1", "disk1", "object", "host2", "resync", "network"], edge: ["object", "resync", "control"], path: ["object", "network"], sourceIds: ["vsan-host-failure", "vsan-reduced-availability"] },
    limits: { nodes: ["object", "capacity", "fault-domains", "network", "policy", "state"], edge: ["object", "policy", "control"], path: ["policy", "state"], sourceIds: ["vsan-fault-domains", "vsan-inaccessible", "vsan-ftt0"] },
  }),
  "zero-trust": sourceBackedProfile("security", {
    request: { nodes: ["subject", "device", "request", "pep", "resource", "identity"], edge: ["request", "pep", "data"], path: ["subject", "resource"], sourceIds: ["nist-800-207", "cisa-ztmm"] },
    context: { nodes: ["identity", "device", "resource", "telemetry", "policy", "decision"], edge: ["policy", "decision", "control"], path: ["identity", "decision"], sourceIds: ["nist-800-207", "nist-components", "cisa-ztmm"] },
    decision: { nodes: ["request", "policy", "administrator", "allow", "deny"], edge: ["request", "policy", "data"], path: ["request", "allow"], sourceIds: ["nist-800-207", "nist-components"] },
    enforcement: { nodes: ["subject", "pep", "resource", "telemetry", "revoke"], edge: ["pep", "resource", "data"], path: ["subject", "resource"], sourceIds: ["nist-800-207", "nist-components"] },
    limits: { nodes: ["subject", "identity", "device", "telemetry", "policy", "resource"], edge: ["subject", "policy", "data"], path: ["subject", "resource"], sourceIds: ["nist-800-207", "cisa-ztmm", "nist-publication"] },
  }),
  kubernetes: baselineProfile("application", {
    "desired-state": { nodes: ["developer", "api", "controller", "pod1", "pod2", "node"], edge: ["api", "controller", "control"], path: ["developer", "node"] },
    scheduling: { nodes: ["pod", "scheduler", "node1", "node2", "constraints"], edge: ["constraints", "scheduler", "control"], path: ["pod", "node1"] },
    service: { nodes: ["client", "service", "endpoints", "pod1", "pod2", "readiness"], edge: ["service", "endpoints", "control"], path: ["client", "pod1"] },
    rollout: { nodes: ["release", "old-rs", "new-rs", "old-pod", "new-pod", "service"], edge: ["release", "new-rs", "control"], path: ["release", "service"] },
    failure: { nodes: ["client", "service", "pod1", "pod2", "node1", "node2", "controller", "registry", "readiness"], edge: ["readiness", "service", "control"], path: ["client", "service"] },
  }),
  observability: sourceBackedProfile("observability", {
    "request-path": { nodes: ["client", "gateway", "checkout", "payment", "database"], edge: ["gateway", "checkout", "data"], path: ["client", "database"], sourceIds: ["otel-traces", "otel-context"] },
    signals: { nodes: ["service", "sdk", "traces", "metrics", "logs", "question"], edge: ["sdk", "traces", "data"], path: ["service", "question"], sourceIds: ["otel-what", "otel-traces", "otel-metrics", "otel-logs"] },
    collection: { nodes: ["services", "collector", "processor", "exporter-traces", "exporter-metrics", "exporter-logs", "backends"], edge: ["collector", "processor", "control"], path: ["services", "backends"], sourceIds: ["otel-collector", "otel-collector-arch"] },
    correlation: { nodes: ["symptom", "metrics-backend", "alerting", "trace-backend", "logs-backend", "operator"], edge: ["metrics-backend", "alerting", "control"], path: ["symptom", "operator"], sourceIds: ["prom-alerting", "otel-traces", "otel-logs"] },
    incident: { nodes: ["client", "gateway", "checkout", "payment", "collector", "processor", "metrics-backend", "trace-backend", "logs-backend"], edge: ["collector", "processor", "control"], path: ["client", "metrics-backend"], sourceIds: ["otel-collector-arch", "otel-traces", "otel-metrics", "otel-logs"] },
  }),
  "backup-dr": sourceBackedProfile("continuity", {
    objectives: { nodes: ["business", "bia", "protection-plan", "evidence"], edge: ["bia", "protection-plan", "control"], path: ["business", "evidence"], sourceIds: ["nist-contingency", "nist-rto"] },
    protection: { nodes: ["vmware", "lenovo", "backup-job", "veeam-repository"], edge: ["backup-job", "veeam-repository", "data"], path: ["vmware", "veeam-repository"], sourceIds: ["veeam-about", "veeam-architecture", "veeam-vsphere"] },
    copies: { nodes: ["veeam-repository", "hardened", "ibm-flashsystem", "security"], edge: ["hardened", "ibm-flashsystem", "storage"], path: ["security", "ibm-flashsystem"], sourceIds: ["veeam-immutability", "ibm-safeguarded", "ibm-snapshots"] },
    recovery: { nodes: ["incident", "decision", "replication", "alternate-site", "application"], edge: ["decision", "replication", "control"], path: ["incident", "application"], sourceIds: ["ibm-replication", "veeam-about", "nist-rto"] },
    limits: { nodes: ["backup-job", "veeam-repository", "replication", "alternate-site", "verification", "application"], edge: ["alternate-site", "verification", "dependency"], path: ["backup-job", "application"], sourceIds: ["veeam-repository", "veeam-immutability", "nist-contingency"] },
  }),
  "ransomware-resilience": sourceBackedProfile("security", {
    prevention: { nodes: ["exposure", "identity", "endpoint", "network", "workloads"], edge: ["identity", "endpoint", "control"], path: ["exposure", "workloads"], sourceIds: ["checkpoint-ransomware", "cisa-guide"] },
    detection: { nodes: ["endpoint", "network", "ibm-storage", "detection", "security-ops"], edge: ["detection", "security-ops", "control"], path: ["endpoint", "security-ops"], sourceIds: ["ibm-ransomware", "checkpoint-ransomware", "cisa-guide"] },
    containment: { nodes: ["security-ops", "segmentation", "identity", "workloads", "backup-admin", "lateral"], edge: ["security-ops", "segmentation", "control"], path: ["security-ops", "workloads"], sourceIds: ["checkpoint-ransomware", "cisa-guide", "cisa-2025"] },
    recovery: { nodes: ["incident", "veeam", "immutable-copy", "clean-room", "application"], edge: ["veeam", "immutable-copy", "data"], path: ["incident", "application"], sourceIds: ["cisa-advisory", "cisa-2025", "veeam-immutability", "veeam-repository", "ibm-security"] },
    learning: { nodes: ["exercise", "clean-room", "verification", "application", "lessons"], edge: ["clean-room", "verification", "dependency"], path: ["exercise", "lessons"], sourceIds: ["cisa-guide", "cisa-advisory", "checkpoint-ransomware", "ibm-security"] },
  }),
  "san-storage": sourceBackedProfile("storage", {
    foundation: { nodes: ["application", "host", "fabric-a", "fabric-b", "array", "management"], edge: ["host", "fabric-a", "data"], path: ["application", "array"], sourceIds: ["ibm-host-attachment", "lenovo-san"] },
    provisioning: { nodes: ["disks", "pool", "volume", "mapping", "host"], edge: ["pool", "volume", "storage"], path: ["disks", "host"], sourceIds: ["ibm-volume", "ibm-host-mapping"] },
    multipath: { nodes: ["host", "hba-a", "hba-b", "fabric-a", "fabric-b", "array-a", "array-b", "volume"], edge: ["hba-a", "fabric-a", "data"], path: ["host", "volume"], sourceIds: ["lenovo-san", "lenovo-vmware", "ibm-host-attachment"] },
    migration: { nodes: ["old-array", "migration", "new-array", "replication", "application"], edge: ["migration", "new-array", "data"], path: ["old-array", "application"], sourceIds: ["ibm-migration", "ibm-replication"] },
    limits: { nodes: ["host", "fabric-a", "mapping", "pool", "replication", "remote-array"], edge: ["mapping", "pool", "storage"], path: ["host", "remote-array"], sourceIds: ["ibm-host-mapping", "ibm-replication", "lenovo-san"] },
  }),
  "veeam-protection": sourceBackedProfile("continuity", {
    workloads: { nodes: ["vmware", "physical", "aix", "nas", "policy", "application"], edge: ["vmware", "policy", "data"], path: ["vmware", "application"], sourceIds: ["veeam-overview"] },
    "data-pipe": { nodes: ["source", "veeam-server", "proxy", "network", "repository"], edge: ["proxy", "network", "data"], path: ["source", "repository"], sourceIds: ["veeam-architecture", "veeam-repository"] },
    retention: { nodes: ["repository", "immutable", "tape-job", "library"], edge: ["repository", "immutable", "storage"], path: ["repository", "library"], sourceIds: ["veeam-repository", "veeam-immutable", "veeam-tape", "veeam-tape-support"] },
    restore: { nodes: ["point", "restore", "network", "storage", "application"], edge: ["point", "restore", "data"], path: ["point", "application"], sourceIds: ["veeam-overview", "veeam-architecture"] },
    limits: { nodes: ["source", "veeam-server", "proxy", "repository", "restore", "tape"], edge: ["proxy", "repository", "data"], path: ["source", "restore"], sourceIds: ["veeam-overview", "veeam-repository", "veeam-immutable"] },
  }),
  "active-active-dc": sourceBackedProfile("continuity", {
    "two-domains": { nodes: ["site-a", "site-b", "inter-site", "quorum", "workloads"], edge: ["inter-site", "quorum", "control"], path: ["site-a", "workloads"], sourceIds: ["ibm-ha", "ibm-io"] },
    "storage-ha": { nodes: ["host-a", "host-b", "array-a", "array-b", "replication", "quorum"], edge: ["array-a", "replication", "storage"], path: ["host-a", "quorum"], sourceIds: ["ibm-ha", "ibm-mirrors"] },
    "network-ha": { nodes: ["hosts", "switch-a", "switch-b", "storage-a", "storage-b", "inter-site"], edge: ["switch-a", "inter-site", "control"], path: ["hosts", "storage-a"], sourceIds: ["aruba-vsx", "ibm-io"] },
    failover: { nodes: ["signal", "decision", "site-a", "site-b", "application"], edge: ["decision", "site-b", "control"], path: ["signal", "application"], sourceIds: ["ibm-mirrors", "veeam-dr"] },
    limits: { nodes: ["site-a", "inter-site", "quorum", "site-b", "storage-link", "workloads"], edge: ["inter-site", "quorum", "control"], path: ["site-a", "workloads"], sourceIds: ["ibm-ha", "ibm-mirrors", "aruba-vsx"] },
  }),
  "lan-san": sourceBackedProfile("network", {
    planes: { nodes: ["users", "management", "lan", "vmware", "san", "storage"], edge: ["lan", "vmware", "data"], path: ["users", "storage"], sourceIds: ["aruba-design", "ibm-host", "lenovo-san"] },
    lan: { nodes: ["host", "switching", "vlan", "routing", "firewall", "service"], edge: ["switching", "vlan", "control"], path: ["host", "service"], sourceIds: ["aruba-design", "aruba-deploy"] },
    san: { nodes: ["hba", "fabric", "array-ports", "mapping", "volume"], edge: ["array-ports", "mapping", "control"], path: ["hba", "volume"], sourceIds: ["ibm-host", "ibm-mapping", "lenovo-san"] },
    integration: { nodes: ["application", "lan", "san", "firewall", "identity", "storage"], edge: ["lan", "firewall", "data"], path: ["application", "storage"], sourceIds: ["aruba-deploy", "ibm-host", "ibm-mapping"] },
    limits: { nodes: ["host", "vlan", "underlay", "fabric", "routing", "service"], edge: ["underlay", "routing", "data"], path: ["host", "service"], sourceIds: ["aruba-design", "aruba-deploy", "ibm-host", "ibm-mapping"] },
  }),
  "nas-private-cloud": sourceBackedProfile("storage", {
    service: { nodes: ["users", "network", "nas", "share", "data"], edge: ["nas", "share", "control"], path: ["users", "data"], sourceIds: ["synology-files", "synology-services"] },
    identity: { nodes: ["user", "directory", "dns", "nas", "share", "access"], edge: ["directory", "nas", "dependency"], path: ["user", "access"], sourceIds: ["synology-ad", "synology-services"] },
    ha: { nodes: ["client", "nas-a", "nas-b", "heartbeat", "cluster-ip", "share"], edge: ["heartbeat", "cluster-ip", "control"], path: ["client", "share"], sourceIds: ["synology-ha", "synology-ha-limits"] },
    protection: { nodes: ["share", "raid", "ha", "veeam", "repository", "restore"], edge: ["veeam", "repository", "data"], path: ["share", "restore"], sourceIds: ["veeam-nas", "synology-files"] },
    limits: { nodes: ["directory", "heartbeat", "nas-b", "share", "veeam", "users"], edge: ["share", "veeam", "data"], path: ["directory", "users"], sourceIds: ["synology-ha", "synology-ad", "veeam-nas"] },
  }),
  migration: baselineProfile("delivery", {
    discovery: { nodes: ["workloads", "dependencies", "inventory", "plan", "source", "destination"], edge: ["inventory", "plan", "control"], path: ["workloads", "destination"] },
    compatibility: { nodes: ["source", "compatibility", "migration-net", "storage", "destination"], edge: ["source", "compatibility", "control"], path: ["source", "destination"] },
    waves: { nodes: ["pilot", "migration-net", "wave", "critical", "backup"], edge: ["migration-net", "wave", "data"], path: ["pilot", "critical"] },
    validation: { nodes: ["infra", "monitoring", "dependencies", "service", "acceptance"], edge: ["monitoring", "service", "data"], path: ["infra", "acceptance"] },
    limits: { nodes: ["inventory", "compatibility", "migration-net", "storage", "rollback", "service"], edge: ["compatibility", "migration-net", "dependency"], path: ["inventory", "service"] },
  }),
  "checkpoint-ha": sourceBackedProfile("security", {
    traffic: { nodes: ["users", "vip", "active", "standby", "service"], edge: ["vip", "active", "data"], path: ["users", "service"], sourceIds: ["checkpoint-intro", "aruba-design"] },
    members: { nodes: ["compatibility", "active", "standby", "vip", "service"], edge: ["compatibility", "active", "control"], path: ["compatibility", "service"], sourceIds: ["checkpoint-intro", "checkpoint-compat"] },
    sync: { nodes: ["active", "policy", "sync", "standby", "service"], edge: ["sync", "standby", "control"], path: ["active", "service"], sourceIds: ["checkpoint-clusterxl", "checkpoint-install"] },
    failover: { nodes: ["active", "vip", "standby", "routing", "service"], edge: ["vip", "standby", "control"], path: ["active", "service"], sourceIds: ["checkpoint-clusterxl", "aruba-design"] },
    limits: { nodes: ["active", "sync", "vip", "policy", "standby", "service"], edge: ["policy", "standby", "control"], path: ["active", "service"], sourceIds: ["checkpoint-clusterxl", "checkpoint-compat", "aruba-design"] },
  }),
  sdwan: sourceBackedProfile("network", {
    underlay: { nodes: ["branch", "mpls", "internet", "lte", "edge", "hub"], edge: ["edge", "hub", "data"], path: ["branch", "hub"], sourceIds: ["aruba-orchestrator", "aruba-sdbranch"] },
    overlay: { nodes: ["application", "bio", "qos", "topology", "underlay"], edge: ["bio", "topology", "control"], path: ["application", "underlay"], sourceIds: ["aruba-sdbranch", "aruba-orchestrator"] },
    selection: { nodes: ["metrics", "policy", "path-selection", "primary", "alternate", "service"], edge: ["path-selection", "primary", "data"], path: ["metrics", "service"], sourceIds: ["aruba-orchestrator", "aruba-path-conditioning"] },
    security: { nodes: ["overlay", "edge", "security", "identity", "application"], edge: ["edge", "security", "data"], path: ["overlay", "application"], sourceIds: ["aruba-intro", "checkpoint-clusterxl"] },
    limits: { nodes: ["underlay", "bio", "path-selection", "edge", "security", "application"], edge: ["bio", "path-selection", "control"], path: ["underlay", "application"], sourceIds: ["aruba-orchestrator", "aruba-path-conditioning", "checkpoint-clusterxl"] },
  }),
  "power-aix": sourceBackedProfile("virtualization", {
    workload: { nodes: ["users", "application", "aix", "powervm", "storage"], edge: ["aix", "powervm", "control"], path: ["users", "storage"], sourceIds: ["ibm-lpm", "ibm-flashsystem"] },
    platform: { nodes: ["hmc", "source", "viOS", "destination", "lpar"], edge: ["source", "lpar", "control"], path: ["hmc", "destination"], sourceIds: ["ibm-lpm", "ibm-lpm-howto"] },
    "data-paths": { nodes: ["lpar", "viOS", "lan", "san", "storage"], edge: ["viOS", "san", "storage"], path: ["lpar", "storage"], sourceIds: ["ibm-lpm-howto", "ibm-flashsystem"] },
    acceptance: { nodes: ["platform", "application", "monitoring", "backup", "acceptance"], edge: ["application", "monitoring", "control"], path: ["platform", "acceptance"], sourceIds: ["ibm-lpm", "veeam-overview"] },
    limits: { nodes: ["hmc", "viOS", "san", "application", "backup", "acceptance"], edge: ["viOS", "san", "storage"], path: ["hmc", "acceptance"], sourceIds: ["ibm-lpm-howto", "ibm-flashsystem", "veeam-overview"] },
  }),
  "implementation-lifecycle": baselineProfile("delivery", {
    discovery: { nodes: ["customer", "prerequisites", "inventory", "scope", "plan"], edge: ["scope", "plan", "control"], path: ["customer", "plan"] },
    rack: { nodes: ["rack", "compute", "storage", "network", "firmware"], edge: ["network", "firmware", "control"], path: ["rack", "firmware"] },
    integration: { nodes: ["compute", "lan", "san", "security", "backup", "service"], edge: ["security", "service", "data"], path: ["compute", "service"] },
    acceptance: { nodes: ["tests", "evidence", "documentation", "operations", "acceptance"], edge: ["documentation", "acceptance", "data"], path: ["tests", "acceptance"] },
    limits: { nodes: ["prerequisites", "rack", "integration", "acceptance", "documentation", "service"], edge: ["acceptance", "documentation", "control"], path: ["prerequisites", "service"] },
  }),
  instana: sourceBackedProfile("observability", {
    journey: { nodes: ["user", "gateway", "service", "database", "dependency", "impact"], edge: ["service", "database", "storage"], path: ["user", "impact"], sourceIds: ["instana-apm", "instana-fullstack"] },
    signals: { nodes: ["service", "agent", "traces", "metrics", "logs", "question"], edge: ["agent", "metrics", "data"], path: ["service", "question"], sourceIds: ["instana-capabilities", "instana-apm"] },
    discovery: { nodes: ["service", "process", "topology", "host", "dependency", "owner"], edge: ["process", "topology", "control"], path: ["service", "owner"], sourceIds: ["instana-capabilities", "instana-fullstack", "instana-cloud"] },
    investigation: { nodes: ["symptom", "investigation", "evidence", "root", "remediation", "service"], edge: ["investigation", "root", "control"], path: ["symptom", "service"], sourceIds: ["instana-investigation", "instana-capabilities"] },
    limits: { nodes: ["agent", "collector", "topology", "investigation", "service", "operator"], edge: ["collector", "topology", "control"], path: ["agent", "operator"], sourceIds: ["instana-deployment", "instana-investigation", "instana-capabilities"] },
  }),
  turbonomic: sourceBackedProfile("application", {
    demand: { nodes: ["application", "demand", "vm", "storage", "health"], edge: ["application", "demand", "control"], path: ["application", "health"], sourceIds: ["turb-hypervisor", "turb-targets"] },
    "supply-chain": { nodes: ["targets", "supply-chain", "application", "compute", "storage"], edge: ["targets", "supply-chain", "control"], path: ["targets", "storage"], sourceIds: ["turb-targets", "turb-hypervisor"] },
    market: { nodes: ["demand", "market", "compute", "storage", "constraints", "action"], edge: ["market", "action", "control"], path: ["demand", "action"], sourceIds: ["turb-actions", "turb-hypervisor"] },
    automation: { nodes: ["recommendation", "policy", "approval", "workflow", "action", "service"], edge: ["policy", "approval", "dependency"], path: ["recommendation", "service"], sourceIds: ["turb-workflow", "turb-actions"] },
    limits: { nodes: ["target", "demand", "market", "constraints", "policy", "action"], edge: ["constraints", "policy", "control"], path: ["target", "action"], sourceIds: ["turb-plans", "turb-pressure", "turb-workflow"] },
  }),
  webmethods: sourceBackedProfile("application", {
    landscape: { nodes: ["api", "applications", "events", "integration", "b2b", "files", "control"], edge: ["integration", "control", "control"], path: ["api", "b2b"], sourceIds: ["wm-overview", "wm-architecture"] },
    flow: { nodes: ["request", "integration", "mapping", "backend", "response"], edge: ["integration", "mapping", "control"], path: ["request", "response"], sourceIds: ["wm-services", "wm-overview"] },
    hybrid: { nodes: ["control", "cloud-runtime", "runtime", "secure-link", "systems"], edge: ["secure-link", "systems", "dependency"], path: ["control", "systems"], sourceIds: ["wm-architecture", "wm-overview"] },
    governance: { nodes: ["consumer", "portal", "gateway", "policy", "integration", "service"], edge: ["gateway", "policy", "control"], path: ["consumer", "service"], sourceIds: ["wm-gateway", "wm-gateway-components"] },
    limits: { nodes: ["runtime", "gateway", "mapping", "compatibility", "backend", "operator"], edge: ["mapping", "compatibility", "dependency"], path: ["runtime", "operator"], sourceIds: ["wm-interoperability", "wm-gateway", "wm-services"] },
  }),
};
