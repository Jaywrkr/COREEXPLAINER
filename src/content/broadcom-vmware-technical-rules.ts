import type { TechnicalAuthorityRule } from "./types";

/** Broadcom/VMware source-to-scene rules for platform and workload mobility topics. */
export const broadcomVmwareTechnicalRulePacks: Record<string, TechnicalAuthorityRule[]> = {
  vcf: [
    { id: "vcf-release-scope", control: "VCF capabilities must be tied to the declared release scope, not a generic platform claim.", sourceIds: ["vcf-91-faq"], stepIds: ["solution"] },
    { id: "vcf-networking", control: "VCF networking/NSX is a platform dependency and not an isolated overlay claim.", sourceIds: ["vcf-networking"], stepIds: ["solution", "architecture"] },
    { id: "vcf-storage", control: "vSAN datastore availability must remain distinct from compute and management.", sourceIds: ["vsan-datastore"], stepIds: ["architecture"] },
  ],
  "vsphere-ha": [
    { id: "ha-restart", control: "HA restart behavior must not be presented as zero-loss or guaranteed application recovery.", sourceIds: ["vsphere-ha-restart"], stepIds: ["normal", "failure", "restart"] },
    { id: "ha-capacity", control: "Admission capacity and datastore visibility must be checked before failover claims.", sourceIds: ["vsphere-ha-capacity"], stepIds: ["normal", "decision", "limits"] },
  ],
  vsan: [
    { id: "vsan-availability", control: "Reduced availability must be evaluated against storage policy and host state, not inferred from cluster count alone.", sourceIds: ["vsan-reduced-availability"], stepIds: ["local-storage", "failure-resync"] },
  ],
  nsx: [
    { id: "nsx-underlay-overlay", control: "Overlay transport must retain an explicit underlay dependency.", sourceIds: ["nsx-geneve-underlay"], stepIds: ["overlay"] },
    { id: "nsx-distributed-firewall", control: "Distributed firewall enforcement must remain distinct from gateway routing.", sourceIds: ["nsx-dfw-connectivity", "nsx-dfw-scope"], stepIds: ["east-west"] },
    { id: "nsx-north-south", control: "North-south traffic must preserve gateway and segment path requirements.", sourceIds: ["nsx-firewall-well-architected"], stepIds: ["north-south"] },
  ],
  migration: [
    { id: "vmotion-prerequisites", control: "Migration depends on the declared version, licensing, network, storage and compatibility prerequisites.", sourceIds: ["broadcom-vmotion", "broadcom-compatibility"], stepIds: ["discovery", "compatibility", "limits"] },
  ],
};
