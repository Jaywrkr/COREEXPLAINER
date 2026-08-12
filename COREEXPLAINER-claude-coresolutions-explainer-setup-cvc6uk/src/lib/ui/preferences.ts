export interface ExplainerUiPreferences {
  leftPanelWidth: number;
  focusMode: boolean;
}

export const MIN_LEFT_PANEL_WIDTH = 320;
export const MAX_LEFT_PANEL_WIDTH = 560;
export const DEFAULT_LEFT_PANEL_WIDTH = 400;

export function normalizeExplainerUiPreferences(value: unknown): ExplainerUiPreferences {
  const parsed = value && typeof value === "object" ? value as Partial<ExplainerUiPreferences> : {};
  const width = typeof parsed.leftPanelWidth === "number" && Number.isFinite(parsed.leftPanelWidth) ? parsed.leftPanelWidth : DEFAULT_LEFT_PANEL_WIDTH;
  return {
    leftPanelWidth: Math.min(MAX_LEFT_PANEL_WIDTH, Math.max(MIN_LEFT_PANEL_WIDTH, width)),
    focusMode: parsed.focusMode === true,
  };
}
