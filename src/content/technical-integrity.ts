import type { TechnicalIntegrityProfile } from "./types";

/** Network contracts for the VCF scenes. These rules validate the model, not a live environment. */
export const vcfTechnicalIntegrity: TechnicalIntegrityProfile = {
  domain: "network",
  scenes: {
    silos: {
      requiredNodes: ["compute", "storage", "network", "it"],
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
