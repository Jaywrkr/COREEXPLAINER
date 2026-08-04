import type { BrandContextItem } from "@/content/types";

interface BrandContextPanelProps {
  items: BrandContextItem[];
}

/** Makes the commercial context visible without turning it into a product claim. */
export function BrandContextPanel({ items }: BrandContextPanelProps) {
  return (
    <section className="mb-6 border border-core-border/[0.12] bg-core-panel/60">
      <details>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted [&::-webkit-details-marker]:hidden">
          <span>Marcas del patrón</span>
          <span className="text-core-accent">{items.length} relacionadas</span>
        </summary>
        <div className="border-t border-core-border/[0.1] px-3 pb-3 pt-2.5">
          <p className="text-[0.7rem] leading-relaxed text-core-text-secondary">
            Contexto comercial de CoreSolutions; no implica compatibilidad, licencia o sizing automático.
          </p>
          <ul className="mt-3 space-y-2.5">
            {items.map((item) => (
              <li key={item.name} className="border-l-2 border-core-accent/60 pl-2.5">
                <p className="text-[0.7rem] font-semibold text-core-text">{item.name}</p>
                <p className="text-[0.68rem] leading-relaxed text-core-text-secondary">{item.role}</p>
                <p className="text-[0.65rem] leading-relaxed text-core-text-muted">{item.scope}</p>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  );
}
