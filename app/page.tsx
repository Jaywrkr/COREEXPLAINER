import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <span className="border border-core-accent px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-core-accent">
          CoreSolutions
        </span>
        <h1 className="max-w-2xl text-3xl font-semibold text-core-text sm:text-4xl">
          Technical Explainer
        </h1>
        <p className="max-w-xl text-core-text-secondary">
          Explicaciones visuales interactivas de conceptos técnicos complejos
          para clientes de CoreSolutions. Este es el prototipo inicial de la
          plataforma.
        </p>
      </div>

      <Link
        href="/explainer"
        className="border border-core-accent bg-core-accent/10 px-6 py-3 font-mono text-sm uppercase tracking-wide text-core-text transition-colors hover:bg-core-accent hover:text-core-text"
      >
        Ver explicadores →
      </Link>

      <p className="font-mono text-xs text-core-text-muted">
        Fase inicial · contenido de ejemplo · sin generador IA conectado
      </p>
    </main>
  );
}
