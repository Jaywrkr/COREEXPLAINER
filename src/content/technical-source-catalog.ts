import type { TechnicalReview, TechnicalSource } from "./types";

const publisherRules: Array<[RegExp, string]> = [
  [/ibm\.com/i, "IBM"],
  [/broadcom\.com|vmware\.com/i, "Broadcom / VMware"],
  [/checkpoint\.com/i, "Check Point"],
  [/arubanetworks\.com|hpe\.com/i, "HPE Aruba Networking"],
  [/veeam\.com/i, "Veeam"],
  [/kubernetes\.io/i, "Kubernetes"],
  [/nist\.gov/i, "NIST"],
  [/cisa\.gov/i, "CISA"],
  [/opentelemetry\.io/i, "OpenTelemetry"],
  [/prometheus\.io/i, "Prometheus"],
  [/synology\.com/i, "Synology"],
  [/lenovo\.com|lenovo\.cn/i, "Lenovo"],
  [/github\.com/i, "CORESOLUTIONS"],
];

/** Sources older than this window require an explicit fresh review. */
export const SOURCE_FRESHNESS_DAYS = 180;

export interface SourceFreshnessSummary {
  ageDays: number | null;
  dueAt: string | null;
  status: "current" | "review-needed";
  reason: "within-window" | "manual-review" | "outside-window" | "invalid-date";
}

function inferPublisher(source: TechnicalSource): string {
  return publisherRules.find(([pattern]) => pattern.test(source.url))?.[1] ?? "Fuente técnica";
}

function inferProduct(source: TechnicalSource, publisher: string): string {
  const title = source.title;
  if (/zero trust|nist/i.test(title)) return "Zero Trust";
  if (/ransomware/i.test(title)) return "Ransomware resilience";
  if (/kubernetes|kube-/i.test(title)) return "Kubernetes";
  if (/clusterxl/i.test(title)) return "ClusterXL";
  if (/instana/i.test(title)) return "Instana";
  if (/turbonomic/i.test(title)) return "Turbonomic";
  if (/webmethods/i.test(title)) return "webMethods";
  if (/v[sS]phere|vmware|powercli/i.test(title)) return "vSphere";
  if (/vsan/i.test(title)) return "vSAN";
  if (/veeam/i.test(title)) return "Veeam Data Platform";
  if (/flashsystem/i.test(title)) return "IBM FlashSystem";
  if (/aruba|edgeconnect|sd-branch/i.test(title)) return "Aruba Networking";
  if (/synology|nas/i.test(title)) return "Synology DSM / NAS";
  if (/opentelemetry/i.test(title)) return "OpenTelemetry";
  if (/prometheus/i.test(title)) return "Prometheus";
  if (/migration|move-vm/i.test(title)) return "Workload migration";
  if (/project|proyecto|deployment|deploy/i.test(title)) return "Implementation delivery";
  return publisher;
}

function inferVersion(source: TechnicalSource): string {
  const text = `${source.title} ${source.url}`;
  const match = text.match(/\b(?:R\d+(?:\.\d+)?|\d+\.\d+(?:\.\d+)?(?:\.x)?|v\d+(?:\.\d+)?|SP\s*\d{3}-\d{3}|ver(?:sion)?[=\s-]*\d+)\b/i);
  return match?.[0] ?? "Referencia conceptual";
}

function dayDifference(left: string, right: string): number {
  const leftTime = Date.parse(`${left}T00:00:00Z`);
  const rightTime = Date.parse(`${right}T00:00:00Z`);
  if (Number.isNaN(leftTime) || Number.isNaN(rightTime)) return Number.POSITIVE_INFINITY;
  return Math.abs(leftTime - rightTime) / 86_400_000;
}

export function deriveSourceValidity(source: TechnicalSource, today = new Date()): NonNullable<TechnicalSource["validity"]> {
  if (source.validity === "review-needed") return "review-needed";
  const todayIso = today.toISOString().slice(0, 10);
  return dayDifference(todayIso, source.accessedAt) <= SOURCE_FRESHNESS_DAYS ? "current" : "review-needed";
}

/** Explains freshness without changing the source metadata authored in content. */
export function summarizeSourceFreshness(source: Pick<TechnicalSource, "accessedAt" | "validity">, today = new Date()): SourceFreshnessSummary {
  const accessedTime = Date.parse(`${source.accessedAt}T00:00:00Z`);
  const todayTime = Date.parse(`${today.toISOString().slice(0, 10)}T00:00:00Z`);
  if (!Number.isFinite(accessedTime) || !Number.isFinite(todayTime)) {
    return { ageDays: null, dueAt: null, status: "review-needed", reason: "invalid-date" };
  }
  const ageDays = Math.max(0, Math.floor((todayTime - accessedTime) / 86_400_000));
  const dueAt = new Date(accessedTime + SOURCE_FRESHNESS_DAYS * 86_400_000).toISOString().slice(0, 10);
  if (source.validity === "review-needed") return { ageDays, dueAt, status: "review-needed", reason: "manual-review" };
  if (ageDays > SOURCE_FRESHNESS_DAYS) return { ageDays, dueAt, status: "review-needed", reason: "outside-window" };
  return { ageDays, dueAt, status: "current", reason: "within-window" };
}

/**
 * Completes the compact source declarations used by topic files with a
 * consistent catalog view. The fallback is deliberately explicit: when a
 * document does not state a release, the UI says so instead of inventing one.
 */
export function enrichTechnicalReview(review: TechnicalReview): TechnicalReview {
  return {
    ...review,
    sources: review.sources.map((source) => {
      const publisher = source.publisher ?? inferPublisher(source);
      return {
        ...source,
        publisher,
        product: source.product ?? inferProduct(source, publisher),
        version: source.version ?? inferVersion(source),
        reference: source.reference ?? source.id,
        validity: deriveSourceValidity(source),
      };
    }),
  };
}

export function sourceValidityLabel(validity: TechnicalSource["validity"]): string {
  return validity === "review-needed" ? "Revisar" : "Vigente al revisar";
}
