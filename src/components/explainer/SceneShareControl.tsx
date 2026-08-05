"use client";

import { useState } from "react";

interface SceneShareControlProps {
  sceneId: string;
  scenarioId: string | null;
  audienceMode: "client" | "technical";
}

/** Copies an addressable scene/scenario URL without requiring a backend. */
export function SceneShareControl({ sceneId, scenarioId, audienceMode }: SceneShareControlProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const copyLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("scene", sceneId);
    url.searchParams.set("mode", audienceMode);
    if (scenarioId) url.searchParams.set("scenario", scenarioId);
    else url.searchParams.delete("scenario");

    try {
      await navigator.clipboard.writeText(url.toString());
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
    }
  };

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex shrink-0 items-center gap-2 border border-core-border/[0.12] px-2.5 py-1.5 text-left text-[0.62rem] text-core-text-muted transition-colors hover:border-core-accent/50 hover:text-core-text"
      aria-label="Copiar enlace de esta escena"
    >
      <span className="font-mono font-semibold uppercase tracking-[0.07em]">Enlace</span>
      <span className="text-core-accent">
        {status === "copied" ? "Copiado" : status === "error" ? "Manual" : "Copiar"}
      </span>
    </button>
  );
}
