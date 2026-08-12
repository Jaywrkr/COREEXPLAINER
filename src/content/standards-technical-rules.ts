import type { TechnicalAuthorityRule } from "./types";

/** Source-to-scene contracts owned by public standards and open communities. */
export const standardsTechnicalRulePacks: Record<string, TechnicalAuthorityRule[]> = {
  "zero-trust": [
    { id: "nist-zt-request-context", control: "Access claims must retain an explicit subject, resource, action and context evaluation boundary.", sourceIds: ["nist-800-207", "cisa-ztmm"], stepIds: ["request", "context", "limits"] },
    { id: "nist-zt-decision-enforcement", control: "Policy decision functions must remain distinct from policy enforcement near the protected resource.", sourceIds: ["nist-800-207", "nist-components"], stepIds: ["decision", "enforcement"] },
  ],
  kubernetes: [
    { id: "k8s-desired-state", control: "Declarative desired state and controller reconciliation must not be presented as one-time command execution.", sourceIds: ["k8s-architecture", "k8s-deployments"], stepIds: ["desired-state", "failure"] },
    { id: "k8s-scheduling", control: "Scheduling must retain declared resource and constraint dependencies; aggregate capacity is not proof of eligibility.", sourceIds: ["k8s-scheduler", "k8s-architecture"], stepIds: ["scheduling", "failure"] },
    { id: "k8s-service-readiness", control: "Service reachability and Pod readiness must remain distinct from a running container or ingress publication.", sourceIds: ["k8s-services", "k8s-ingress", "k8s-probes"], stepIds: ["service", "rollout", "failure"] },
  ],
  observability: [
    { id: "otel-signals-context", control: "Metrics, logs and traces must remain distinct signals correlated through explicit context.", sourceIds: ["otel-primer", "otel-context", "otel-traces", "otel-metrics", "otel-logs"], stepIds: ["request-path", "signals", "correlation"] },
    { id: "otel-collector-pipeline", control: "Collector processing must preserve the receiver, processor and exporter pipeline boundary, including possible loss or transformation.", sourceIds: ["otel-collector", "otel-collector-arch"], stepIds: ["collection", "incident"] },
    { id: "otel-cost-diagnostic-boundary", control: "Sampling and cardinality trade-offs must not be described as automatic root-cause analysis.", sourceIds: ["otel-sampling", "otel-metrics"], stepIds: ["correlation", "incident"] },
  ],
  "ransomware-resilience": [
    { id: "cisa-prevention-containment", control: "Ransomware prevention and containment remain layered risk-reduction activities, not a single-product promise.", sourceIds: ["cisa-guide", "cisa-2025"], stepIds: ["prevention", "containment", "learning"] },
    { id: "cisa-recoverability", control: "Offline or immutable backups and regular recovery testing are separate prerequisites for credible recovery claims.", sourceIds: ["cisa-advisory", "cisa-2025"], stepIds: ["recovery", "learning"] },
  ],
};
