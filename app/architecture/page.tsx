import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureGenerator } from "@/components/architecture/ArchitectureGenerator";

export const metadata: Metadata = { title: "Architecture Studio · CORESOLUTIONS" };

export default function ArchitecturePage() {
  return <main className="mx-auto min-h-screen max-w-7xl px-5 py-7 sm:px-8 sm:py-10">
    <Link href="/explainer" className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-accent">← Dashboard de explicadores</Link>
    <section className="mt-5 border-b border-core-border/[0.12] pb-7"><p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent">CORESOLUTIONS · Architecture Studio</p><div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div className="max-w-3xl"><h1 className="text-2xl font-bold text-core-text sm:text-3xl">Diseña desde el contexto del cliente</h1><p className="mt-2 text-sm leading-relaxed text-core-text-secondary">Un canvas independiente para crear una propuesta conceptual con IA, mover sus equipos y revisar cada conexión antes de presentarla.</p></div><span className="border border-core-border/[0.14] px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.06em] text-core-text-muted">Sin cambios reales</span></div></section>
    <ArchitectureGenerator />
  </main>;
}
