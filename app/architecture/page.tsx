import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureGenerator } from "@/components/architecture/ArchitectureGenerator";
import { solutionPatterns } from "@/content/patterns";

export const metadata: Metadata = { title: "Generador de arquitecturas · CORESOLUTIONS" };

export default function ArchitecturePage() {
  return <main className="mx-auto min-h-screen max-w-6xl px-5 py-7 sm:px-8 sm:py-10"><Link href="/explainer" className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-accent">← Volver a temas</Link><section className="mb-7 mt-5 max-w-3xl"><p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-core-accent">CORESOLUTIONS · arquitectura asistida</p><h1 className="mt-2 text-2xl font-bold text-core-text sm:text-3xl">Arma un borrador que respeta los límites técnicos</h1><p className="mt-2 text-sm leading-relaxed text-core-text-secondary">Parte de patrones auditados, hace visibles los datos faltantes y conserva la aprobación de ingeniería como un paso separado.</p></section><ArchitectureGenerator patterns={solutionPatterns} /></main>;
}
