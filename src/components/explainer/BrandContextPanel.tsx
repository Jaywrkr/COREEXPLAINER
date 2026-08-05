import type { BrandContextItem } from "@/content/types";

interface BrandContextPanelProps {
  items: BrandContextItem[];
}

/** Makes the commercial context visible without turning it into a product claim. */
export function BrandContextPanel({ items }: BrandContextPanelProps) {
  return (
    <section className="relative shrink-0">
      <details>
        <summary className="flex cursor-pointer list-none items-center gap-1.5 whitespace-nowrap border border-core-border/[0.12] bg-core-panel/60 px-2 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.06em] text-core-text-muted [&::-webkit-details-marker]:hidden">
          <span>Marcas</span>
          <span className="text-core-accent">{items.length}</span>
        </summary>
        <div className="absolute left-0 top-full z-30 mt-1 w-72 border border-core-border/[0.14] bg-core-panel p-3 shadow-lg">
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
