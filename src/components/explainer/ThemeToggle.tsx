"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme/ThemeProvider";

/**
 * Global light/dark toggle, mounted once in app/layout.tsx so it's
 * available on every page. Circular icon is a documented exception to the
 * sharp-corners rule (same category as the canvas kill/revive control) —
 * see docs/product/brand.md.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid a hydration mismatch: server render doesn't know the client's
  // resolved theme, so render a neutral placeholder until after mount.
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? (theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro") : "Cambiar tema"}
      className="fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center border border-core-border/[0.14] bg-core-panel text-core-text-secondary transition-colors hover:border-core-accent hover:text-core-text"
    >
      {mounted ? theme === "dark" ? <SunIcon /> : <MoonIcon /> : <span className="block h-4 w-4" />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="12"
          y1="2.5"
          x2="12"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 13.6A8.2 8.2 0 1 1 10.4 4a6.4 6.4 0 0 0 9.6 9.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
