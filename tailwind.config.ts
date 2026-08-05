import type { Config } from "tailwindcss";

// CORESOLUTIONS design tokens.
// Values are CSS variables (app/globals.css), not hex, so the palette can
// switch between the dark (default) and light themes — see
// docs/product/brand.md. Written as rgb(var(...) / <alpha-value>) so
// Tailwind opacity modifiers (e.g. bg-core-accent/10) keep working.
const themeColor = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        core: {
          navy: themeColor("--color-navy"),
          accent: themeColor("--color-accent"),
          bg: themeColor("--color-bg"),
          panel: themeColor("--color-panel"),
          text: themeColor("--color-text"),
          "text-secondary": themeColor("--color-text-secondary"),
          "text-muted": themeColor("--color-text-muted"),
          border: themeColor("--color-border"),
          success: themeColor("--color-success"),
          warning: themeColor("--color-warning"),
          error: themeColor("--color-error"),
        },
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px", // reserved for dots / status indicators only
      },
    },
  },
  plugins: [],
};

export default config;
