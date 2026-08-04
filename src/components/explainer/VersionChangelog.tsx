"use client";

import { useEffect, useId, useState } from "react";
import { changelogEntries, currentVersion } from "@/content/changelog";

export function VersionChangelog() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen ? (
        <section
          id={dialogId}
          role="dialog"
          aria-label="Changelog del producto"
          className="absolute bottom-12 left-0 w-[calc(100vw-2rem)] max-w-96 border border-core-border/[0.14] bg-core-panel sm:w-96"
        >
          <div className="flex items-start justify-between border-b border-core-border/[0.12] px-4 py-3">
            <div>
              <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-core-accent">
                Changelog
              </p>
              <h2 className="mt-1 text-sm font-bold text-core-text">Historial de versiones</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-2 py-1 font-mono text-xs text-core-text-muted transition-colors hover:bg-core-accent/10 hover:text-core-text"
              aria-label="Cerrar changelog"
            >
              Cerrar
            </button>
          </div>

          <ol className="max-h-[min(30rem,calc(100vh-8rem))] divide-y divide-core-border/[0.09] overflow-y-auto">
            {changelogEntries.map((entry) => (
              <li key={entry.version} className="px-4 py-4">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <h3 className="font-mono text-xs font-semibold text-core-text">v{entry.version}</h3>
                  <time className="font-mono text-[0.62rem] text-core-text-muted">{entry.date}</time>
                </div>
                <p className="mb-2 text-sm font-semibold text-core-text-secondary">{entry.title}</p>
                <ul className="space-y-1.5 text-xs leading-relaxed text-core-text-secondary">
                  {entry.changes.map((change) => (
                    <li key={change} className="flex gap-2">
                      <span aria-hidden="true" className="text-core-accent">—</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={dialogId}
        className="border border-core-border/[0.14] bg-core-panel px-3 py-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-core-text-secondary transition-colors hover:border-core-accent hover:text-core-text"
      >
        Versión v{currentVersion} · cambios
      </button>
    </div>
  );
}
