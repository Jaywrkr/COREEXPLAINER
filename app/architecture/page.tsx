import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureGenerator } from "@/components/architecture/ArchitectureGenerator";
import { ArchitectureStudioGuide } from "@/components/architecture/ArchitectureStudioGuide";
import { solutionPatterns } from "@/content/patterns";

export const metadata: Metadata = { title: "Generador de arquitecturas · CORESOLUTIONS" };

export default function ArchitecturePage() {
  return <main className="mx-auto min-h-screen max-w-6xl px-5 py-7 sm:px-8 sm:py-10"><Link href="/explainer" className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-accent">← Dashboard de explicadores</Link><section className="mt-5 border-b border-core-border/[0.12] pb-7"><p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent">CORESOLUTIONS · Architecture Studio</p><div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div className="max-w-3xl"><h1 className="text-2xl font-bold text-core-text sm:text-3xl">Borradores de arquitectura con control técnico</h1><p className="mt-2 text-sm leading-relaxed text-core-text-secondary">Un espacio independiente de los explainers: convierte discovery en una arquitectura conceptual, con evidencia y pendientes explícitos.</p></div><div className="flex gap-2 font-mono text-[0.58rem] uppercase tracking-[0.06em]"><span className="border border-core-accent/30 px-2 py-1 text-core-accent">Patrones auditados</span><span className="border border-core-border/[0.14] px-2 py-1 text-core-text-muted">Sin cambios reales</span></div></div></section><ArchitectureGenerator patterns={solutionPatterns} /><ArchitectureStudioGuide /></main>;
}
