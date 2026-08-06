import type { AudienceMode } from "./AudienceModeToggle";

interface BeginnerGuideProps {
  mode: AudienceMode;
}

const GUIDE_ITEMS = [
  {
    label: "Tarjetas",
    text: "representan piezas o actores del sistema. No siempre son equipos físicos: también pueden ser servicios, capas o usuarios.",
  },
  {
    label: "Flechas",
    text: "muestran una relación de datos, control, almacenamiento o dependencia. En este contexto no significan necesariamente un cable físico.",
  },
  {
    label: "Puntos en movimiento",
    text: "son una animación conceptual para seguir el recorrido de una actividad. No son tráfico real ni telemetría en tiempo real.",
  },
  {
    label: "Fallo simulado",
    text: "es una hipótesis para conversar sobre resiliencia. No ejecuta cambios ni acciones en la infraestructura del cliente.",
  },
] as const;

export function BeginnerGuide({ mode }: BeginnerGuideProps) {
  if (mode === "technical") return null;

  return (
    <details className="mb-5 border border-core-border/[0.12] bg-core-panel/30 px-3 py-2">
      <summary className="cursor-pointer list-none font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
        Cómo leer este diagrama
      </summary>
      <div className="mt-2.5 space-y-2 border-t border-core-border/[0.1] pt-2.5">
        {GUIDE_ITEMS.map(({ label, text }) => (
          <p key={label} className="text-[0.72rem] leading-relaxed text-core-text-secondary">
            <span className="font-semibold text-core-text">{label}:</span> {text}
          </p>
        ))}
      </div>
    </details>
  );
}
