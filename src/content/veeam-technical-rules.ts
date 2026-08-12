import type { TechnicalAuthorityRule } from "./types";

/** Veeam source-to-scene rules for protection and recovery explainers. */
export const veeamTechnicalRulePacks: Record<string, TechnicalAuthorityRule[]> = {
  "veeam-protection": [
    { id: "veeam-workload-method", control: "A workload-specific protection claim must retain the supported method, integration and restore boundary.", sourceIds: ["veeam-overview"], stepIds: ["workloads", "restore"] },
    { id: "veeam-data-pipe", control: "Proxy/data-mover throughput must retain its source, transport and repository dependencies.", sourceIds: ["veeam-architecture", "veeam-repository"], stepIds: ["data-pipe"] },
    { id: "veeam-retention", control: "Repository retention, immutability and tape must remain distinct controls with their own operational requirements.", sourceIds: ["veeam-repository", "veeam-immutable", "veeam-tape", "veeam-tape-support"], stepIds: ["retention", "limits"] },
  ],
  "backup-dr": [
    { id: "veeam-protection-chain", control: "Backup protection claims must retain the supported platform, architecture and repository boundaries.", sourceIds: ["veeam-about", "veeam-architecture", "veeam-vsphere"], stepIds: ["protection"] },
    { id: "veeam-protected-copy", control: "Immutability is a repository and configuration capability, not an automatic ransomware-recovery guarantee.", sourceIds: ["veeam-repository", "veeam-immutability", "veeam-storage"], stepIds: ["copies", "limits"] },
    { id: "veeam-recovery-boundary", control: "A restore claim must preserve the distinction between recovering data and validating a usable application service.", sourceIds: ["veeam-architecture"], stepIds: ["recovery"] },
  ],
};
