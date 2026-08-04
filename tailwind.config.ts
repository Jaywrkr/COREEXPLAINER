import type { Config } from "tailwindcss";

// CoreSolutions design tokens.
// Single source of truth for color — see docs/product/brand.md before changing any value here.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        core: {
          navy: "#01095C",
          accent: "#3B4CCE",
          bg: "#0A0B14",
          panel: "#10111C",
          text: "#F5F6FA",
          "text-secondary": "#A9AEC2",
          "text-muted": "#6B7086",
          success: "#1F9D55",
          warning: "#D6A419",
          error: "#C23B3B",
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
