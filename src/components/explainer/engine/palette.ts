/**
 * Canvas rendering can't read Tailwind classes, so the brand palette is
 * duplicated here as raw hex. Keep this in sync with tailwind.config.ts
 * and docs/product/brand.md — those three are the only places color
 * values should be hardcoded.
 */
export const palette = {
  navy: "#01095C",
  accent: "#3B4CCE",
  bg: "#0A0B14",
  panel: "#10111C",
  text: "#F5F6FA",
  textSecondary: "#A9AEC2",
  textMuted: "#6B7086",
  success: "#1F9D55",
  warning: "#D6A419",
  error: "#C23B3B",
} as const;
