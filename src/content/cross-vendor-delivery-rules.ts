import type { TechnicalAuthorityRule } from "./types";

/** Source-to-scene rules for the multi-vendor delivery lifecycle. */
export const crossVendorDeliveryRulePacks: Record<string, TechnicalAuthorityRule[]> = {
  "implementation-lifecycle": [
    { id: "delivery-discovery", control: "Discovery must retain compatibility, site and agreed-scope prerequisites before installation claims are made.", sourceIds: ["broadcom-compatibility"], stepIds: ["discovery", "rack"] },
    { id: "delivery-integration", control: "Cross-vendor integration must keep host/storage mapping, backup architecture and security installation as separate technical controls.", sourceIds: ["ibm-mapping", "veeam-architecture", "checkpoint-install"], stepIds: ["integration", "acceptance"] },
    { id: "delivery-evidence", control: "Project acceptance must distinguish completed test evidence from remaining risks, documentation and customer sign-off.", sourceIds: ["project-patterns", "veeam-architecture", "checkpoint-install"], stepIds: ["acceptance", "limits"] },
  ],
};
