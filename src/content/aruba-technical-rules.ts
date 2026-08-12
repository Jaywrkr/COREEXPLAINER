import type { TechnicalAuthorityRule } from "./types";

/** HPE Aruba Networking source-to-scene rules for LAN/SAN and SD-WAN. */
export const arubaTechnicalRulePacks: Record<string, TechnicalAuthorityRule[]> = {
  "lan-san": [
    { id: "aruba-network-planes", control: "LAN, SAN and management traffic must retain separate planes and protocol-specific dependencies.", sourceIds: ["aruba-design"], stepIds: ["planes", "lan", "limits"] },
    { id: "aruba-dc-deployment", control: "VLAN, trunk, routing and redundancy claims must stay within the validated design and deployment context.", sourceIds: ["aruba-design", "aruba-deploy"], stepIds: ["lan", "integration", "limits"] },
  ],
  sdwan: [
    { id: "aruba-underlay", control: "SD-WAN must retain explicit underlay transport, routing and measurement dependencies.", sourceIds: ["aruba-orchestrator", "aruba-sdbranch"], stepIds: ["underlay", "overlay"] },
    { id: "aruba-business-intent", control: "Business Intent Overlay and path-selection behavior must remain policy- and measurement-dependent.", sourceIds: ["aruba-orchestrator", "aruba-path-conditioning"], stepIds: ["overlay", "selection", "limits"] },
    { id: "aruba-security-boundary", control: "EdgeConnect connectivity must not be presented as a substitute for separately designed security enforcement.", sourceIds: ["aruba-intro"], stepIds: ["security"] },
  ],
};
