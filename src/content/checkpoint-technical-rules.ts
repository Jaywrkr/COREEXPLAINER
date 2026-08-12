import type { TechnicalAuthorityRule } from "./types";

/** Check Point source-to-scene rules for ClusterXL High Availability. */
export const checkpointTechnicalRulePacks: Record<string, TechnicalAuthorityRule[]> = {
  "checkpoint-ha": [
    { id: "checkpoint-service-path", control: "Firewall availability must retain forward and return traffic-path dependencies.", sourceIds: ["checkpoint-intro"], stepIds: ["traffic", "members"] },
    { id: "checkpoint-ha-mode", control: "ClusterXL High Availability must remain distinct from Load Sharing and requires compatible members.", sourceIds: ["checkpoint-intro", "checkpoint-compat"], stepIds: ["members", "limits"] },
    { id: "checkpoint-state-sync", control: "State synchronization, VIP and failover are separate dependencies that require design and test evidence.", sourceIds: ["checkpoint-clusterxl", "checkpoint-install"], stepIds: ["sync", "failover", "limits"] },
  ],
};
