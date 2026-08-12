import type { TechnicalAuthorityRule } from "./types";

/**
 * IBM rule packs bind an implementation-relevant control to official evidence
 * and to the exact explainer scenes that communicate it. They do not certify
 * a customer environment; that remains blocked until expert review.
 */
export const ibmTechnicalRulePacks: Record<string, TechnicalAuthorityRule[]> = {
  instana: [
    { id: "instana-coverage", control: "Agent/sensor coverage must be established before topology or incident claims are relied on.", sourceIds: ["instana-capabilities", "instana-fullstack"], stepIds: ["signals", "discovery"] },
    { id: "instana-deployment", control: "SaaS versus self-hosted deployment, access and data governance must be scoped before use.", sourceIds: ["instana-deployment"], stepIds: ["limits"] },
    { id: "instana-investigation", control: "Investigation output is a hypothesis and remediation remains subject to approval.", sourceIds: ["instana-investigation"], stepIds: ["investigation"] },
  ],
  turbonomic: [
    { id: "turb-targets", control: "Targets, credentials and discovered supply-chain relationships govern recommendation quality.", sourceIds: ["turb-targets", "turb-hypervisor"], stepIds: ["demand", "supply-chain"] },
    { id: "turb-constraints", control: "Constraints and policies must be evaluated before an action can be considered safe.", sourceIds: ["turb-actions"], stepIds: ["market"] },
    { id: "turb-automation", control: "Automation requires an explicit workflow, approval boundary and rollback plan.", sourceIds: ["turb-workflow"], stepIds: ["automation", "limits"] },
  ],
  webmethods: [
    { id: "wm-interoperability", control: "Runtime and product-version interoperability must be checked before a hybrid topology is approved.", sourceIds: ["wm-interoperability"], stepIds: ["limits"] },
    { id: "wm-runtime", control: "Control-plane/data-plane placement requires a defined connectivity and credential boundary.", sourceIds: ["wm-architecture"], stepIds: ["hybrid"] },
    { id: "wm-api-governance", control: "API policy does not replace mapping, error handling, identity and backend validation.", sourceIds: ["wm-gateway", "wm-gateway-components"], stepIds: ["governance"] },
  ],
  "san-storage": [
    { id: "flashsystem-host-attachment", control: "Host attachment, SAN zoning and multipath require a compatible host and supported path.", sourceIds: ["ibm-host-attachment"], stepIds: ["foundation", "multipath"] },
    { id: "flashsystem-mapping", control: "Volume-to-host mapping is a controlled storage relationship, not an assumed connection.", sourceIds: ["ibm-host-mapping"], stepIds: ["provisioning", "limits"] },
  ],
  "power-aix": [
    { id: "power-lpm", control: "Live Partition Mobility depends on the supported Power/AIX/HMC/VIOS and storage/network prerequisites.", sourceIds: ["ibm-lpm", "ibm-lpm-howto"], stepIds: ["workload", "platform", "data-paths"] },
  ],
  "active-active-dc": [
    { id: "flashsystem-ha", control: "HA policy, quorum and replication state must be distinct from backup and must be validated for the workload.", sourceIds: ["ibm-ha", "ibm-mirrors"], stepIds: ["two-domains", "storage-ha", "limits"] },
  ],
};
