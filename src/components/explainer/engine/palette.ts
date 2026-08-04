/**
 * Canvas rendering can't read CSS variables or Tailwind classes, so the
 * brand palette is duplicated here as raw hex, once per theme. Keep this
 * in sync with app/globals.css (the CSS variable source of truth used by
 * everything outside the canvas) and docs/product/brand.md.
 *
 * Semantic colors (navy/accent/success/warning/error) are intentionally
 * IDENTICAL across themes — only bg/panel/text invert. See
 * docs/product/brand.md ("Modo claro/oscuro").
 */
import type { Theme } from "@/lib/theme/ThemeProvider";

export interface Palette {
  navy: string;
  accent: string;
  bg: string;
  panel: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  warning: string;
  error: string;
}

const dark: Palette = {
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
};

const light: Palette = {
  ...dark,
  bg: "#F5F6FA",
  panel: "#FFFFFF",
  text: "#0A0B14",
  textSecondary: "#3D4152",
};

export const palettes: Record<Theme, Palette> = { dark, light };

/** Re-exported for call sites that only ever run in a dark context (rare). */
export const palette = dark;

/** `#RRGGBB` + 0-1 alpha -> `rgba(...)`. Used for hairline strokes/fills that must adapt per theme. */
export function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
