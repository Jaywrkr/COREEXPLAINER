export type ProductEventName = "explainer-view" | "scene-view" | "scenario-open" | "scenario-step-reviewed" | "workflow-advance" | "brief-download" | "draft-generate" | "presentation-start" | "presentation-exit" | "focus-toggle" | "campaign-export" | "copilot-action";

export interface ProductEvent { name: ProductEventName; slug?: string; id?: string; at: string }
export interface ProductMetrics {
  totalEvents: number;
  uniqueExplainers: number;
  sceneViews: number;
  explainers: Record<string, number>;
  scenarios: Record<string, number>;
  scenarioStepsReviewed: number;
  workflows: number;
  briefs: number;
  drafts: number;
  presentationsStarted: number;
  presentationsExited: number;
  focusToggles: number;
  campaignExports: number;
  copilotActions: number;
}

const EVENTS_KEY = "core-explainer:product-events";
const MAX_EVENTS = 500;
export const PRODUCT_METRICS_CHANGED_EVENT = "core-explainer:metrics-changed";

export function emptyProductMetrics(): ProductMetrics {
  return { totalEvents: 0, uniqueExplainers: 0, sceneViews: 0, explainers: {}, scenarios: {}, scenarioStepsReviewed: 0, workflows: 0, briefs: 0, drafts: 0, presentationsStarted: 0, presentationsExited: 0, focusToggles: 0, campaignExports: 0, copilotActions: 0 };
}

function clean(value: unknown, max = 160): string | undefined {
  if (typeof value !== "string") return undefined;
  const result = value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
  return result || undefined;
}

export function normalizeProductEvents(value: unknown): ProductEvent[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set<ProductEventName>(["explainer-view", "scene-view", "scenario-open", "scenario-step-reviewed", "workflow-advance", "brief-download", "draft-generate", "presentation-start", "presentation-exit", "focus-toggle", "campaign-export", "copilot-action"]);
  return value.flatMap((candidate) => {
    if (!candidate || typeof candidate !== "object") return [];
    const event = candidate as Partial<ProductEvent>;
    if (!event.name || !allowed.has(event.name) || typeof event.at !== "string") return [];
    const timestamp = Date.parse(event.at);
    if (!Number.isFinite(timestamp)) return [];
    return [{ name: event.name, slug: clean(event.slug), id: clean(event.id), at: new Date(timestamp).toISOString() } satisfies ProductEvent];
  }).slice(-MAX_EVENTS);
}

export function recordProductEvent(event: Omit<ProductEvent, "at">) {
  if (typeof window === "undefined") return;
  try {
    const events = normalizeProductEvents(JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? "[]"));
    events.push({ name: event.name, slug: clean(event.slug), id: clean(event.id), at: new Date().toISOString() });
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
    window.dispatchEvent(new CustomEvent(PRODUCT_METRICS_CHANGED_EVENT));
  } catch { /* local telemetry is best effort */ }
}

export function readProductEvents(): ProductEvent[] {
  if (typeof window === "undefined") return [];
  try { return normalizeProductEvents(JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? "[]")); } catch { return []; }
}

export function buildProductMetrics(events: ProductEvent[]): ProductMetrics {
  const metrics = emptyProductMetrics();
  metrics.totalEvents = events.length;
  metrics.sceneViews = events.filter((event) => event.name === "scene-view").length;
  metrics.uniqueExplainers = new Set(events.map((event) => event.slug).filter(Boolean)).size;
  for (const event of events) {
    if (event.slug) metrics.explainers[event.slug] = (metrics.explainers[event.slug] ?? 0) + 1;
    if (event.name === "scenario-open" && event.id) metrics.scenarios[event.id] = (metrics.scenarios[event.id] ?? 0) + 1;
    if (event.name === "scenario-step-reviewed") metrics.scenarioStepsReviewed += 1;
    if (event.name === "workflow-advance") metrics.workflows += 1;
    if (event.name === "brief-download") metrics.briefs += 1;
    if (event.name === "draft-generate") metrics.drafts += 1;
    if (event.name === "presentation-start") metrics.presentationsStarted += 1;
    if (event.name === "presentation-exit") metrics.presentationsExited += 1;
    if (event.name === "focus-toggle") metrics.focusToggles += 1;
    if (event.name === "campaign-export") metrics.campaignExports += 1;
    if (event.name === "copilot-action") metrics.copilotActions += 1;
  }
  return metrics;
}

export function readProductMetrics(): ProductMetrics { return buildProductMetrics(readProductEvents()); }

export function clearProductMetrics() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(EVENTS_KEY);
    window.dispatchEvent(new CustomEvent(PRODUCT_METRICS_CHANGED_EVENT));
  }
}
