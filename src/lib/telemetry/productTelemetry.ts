export type ProductEventName = "explainer-view" | "scene-view" | "scenario-open" | "workflow-advance" | "brief-download" | "draft-generate";

export interface ProductEvent { name: ProductEventName; slug?: string; id?: string; at: string }
export interface ProductMetrics { totalEvents: number; explainers: Record<string, number>; scenarios: Record<string, number>; workflows: number; briefs: number; drafts: number }

const EVENTS_KEY = "core-explainer:product-events";
const MAX_EVENTS = 500;

export function recordProductEvent(event: Omit<ProductEvent, "at">) {
  if (typeof window === "undefined") return;
  try {
    const events = JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? "[]") as ProductEvent[];
    events.push({ ...event, at: new Date().toISOString() });
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch { /* local telemetry is best effort */ }
}

export function readProductMetrics(): ProductMetrics {
  const metrics: ProductMetrics = { totalEvents: 0, explainers: {}, scenarios: {}, workflows: 0, briefs: 0, drafts: 0 };
  if (typeof window === "undefined") return metrics;
  try {
    const events = JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? "[]") as ProductEvent[];
    metrics.totalEvents = events.length;
    for (const event of events) {
      if (event.slug) metrics.explainers[event.slug] = (metrics.explainers[event.slug] ?? 0) + 1;
      if (event.name === "scenario-open" && event.id) metrics.scenarios[event.id] = (metrics.scenarios[event.id] ?? 0) + 1;
      if (event.name === "workflow-advance") metrics.workflows += 1;
      if (event.name === "brief-download") metrics.briefs += 1;
      if (event.name === "draft-generate") metrics.drafts += 1;
    }
  } catch { /* return empty metrics */ }
  return metrics;
}

export function clearProductMetrics() { if (typeof window !== "undefined") window.localStorage.removeItem(EVENTS_KEY); }
