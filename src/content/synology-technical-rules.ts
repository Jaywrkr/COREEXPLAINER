import type { TechnicalAuthorityRule } from "./types";

/** Synology source-to-scene rules for private file-service architecture. */
export const synologyTechnicalRulePacks: Record<string, TechnicalAuthorityRule[]> = {
  "nas-private-cloud": [
    { id: "synology-file-service", control: "File sharing claims must retain protocol, share and service-configuration boundaries.", sourceIds: ["synology-files", "synology-services"], stepIds: ["service", "identity"] },
    { id: "synology-directory-dependency", control: "Directory-backed authorization must retain AD, DNS, NTP and group dependency boundaries.", sourceIds: ["synology-ad"], stepIds: ["identity", "limits"] },
    { id: "synology-ha-boundary", control: "Synology HA protects a defined appliance-service failure domain and does not replace backup or network validation.", sourceIds: ["synology-ha", "synology-ha-limits"], stepIds: ["ha", "limits"] },
  ],
};
