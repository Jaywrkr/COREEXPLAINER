import assert from "node:assert/strict";
import { DEFAULT_LEFT_PANEL_WIDTH, MAX_LEFT_PANEL_WIDTH, MIN_LEFT_PANEL_WIDTH, normalizeExplainerUiPreferences } from "../src/lib/ui/preferences";

assert.deepEqual(normalizeExplainerUiPreferences(null), { leftPanelWidth: DEFAULT_LEFT_PANEL_WIDTH, focusMode: false });
assert.equal(normalizeExplainerUiPreferences({ leftPanelWidth: -20 }).leftPanelWidth, MIN_LEFT_PANEL_WIDTH);
assert.equal(normalizeExplainerUiPreferences({ leftPanelWidth: 9999 }).leftPanelWidth, MAX_LEFT_PANEL_WIDTH);
assert.equal(normalizeExplainerUiPreferences({ leftPanelWidth: Number.NaN }).leftPanelWidth, DEFAULT_LEFT_PANEL_WIDTH);
assert.equal(normalizeExplainerUiPreferences({ focusMode: true }).focusMode, true);
console.log("UI preference regression checks passed.");
