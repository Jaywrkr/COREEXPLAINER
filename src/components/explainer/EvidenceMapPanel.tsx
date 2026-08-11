import type { ExplainerMeta, ExplainerStep } from "@/content/types";
import { buildEvidenceLedger, evidenceKindLabels } from "@/lib/evidence/ledger";

interface EvidenceMapPanelProps {
  meta: ExplainerMeta;
  steps: ExplainerStep[];
  current: number;
  activeScenarioId: string | null;
}

/**
 * Shows the authored evidence contract for the current scene. It deliberately
 * never marks a record as observed or accepted: that distinction belongs to
 * the customer environment and the formal review process.
 */
export function EvidenceMapPanel({ meta, steps, current, activeScenarioId }: EvidenceMapPanelProps) {
  const currentStep = steps[current];
  const ledger = buildEvidenceLedger({ meta, steps });
  const records = ledger.filter((record) => {
    if (record.id === `step:${currentStep?.id}`) return true;
    return Boolean(activeScenarioId && record.id.startsWith(`scenario:${activeScenarioId}:`));
  });
  const sourceById = new Map(meta.technicalReview.sources.map((source) => [source.id, source]));

  return (
    <details className="border-t border-core-border/[0.1] pt-2">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-core-text-muted hover:text-core-text [&::-webkit-details-marker]:hidden">
        <span>Mapa de evidencia</span>
        <span className="text-core-accent">{records.length} registro{records.length === 1 ? "" : "s"}</span>
      </summary>
      <div className="mt-2 space-y-2">
        <p className="border-l-2 border-core-warning/50 pl-2 text-[0.6rem] leading-relaxed text-core-text-muted">
          Contrato de evidencia autorado: indica qué comprobar y con qué fuente. No demuestra que el entorno del cliente ya esté validado.
        </p>
        {records.length ? (
          <ol className="space-y-2">
            {records.map((record) => (
              <li key={record.id} className="border border-core-border/[0.12] bg-core-panel/30 p-2 text-[0.62rem] leading-relaxed">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-mono text-[0.54rem] font-semibold uppercase tracking-[0.06em] text-core-accent">{evidenceKindLabels[record.kind]}</span>
                  <span className="font-mono text-[0.52rem] text-core-text-muted">{record.provenance === "authored" ? "autorado" : "derivado"}</span>
                </div>
                <p className="mt-1 font-semibold text-core-text">{record.claim}</p>
                <p className="mt-1 text-core-text-secondary"><span className="font-semibold text-core-text">Solicitar:</span> {record.requestedEvidence}</p>
                {record.sourceIds.length ? (
                  <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
                    {record.sourceIds.map((sourceId) => {
                      const source = sourceById.get(sourceId);
                      return source ? <a key={sourceId} href={source.url} target="_blank" rel="noreferrer" className="text-core-accent underline decoration-core-accent/30 underline-offset-2 hover:text-core-text">{sourceId}</a> : <span key={sourceId} className="text-core-warning">{sourceId} · fuente no encontrada</span>;
                    })}
                  </div>
                ) : <p className="mt-1 text-core-warning">Sin fuente enlazada; requiere revisión.</p>}
              </li>
            ))}
          </ol>
        ) : <p className="text-[0.62rem] text-core-warning">No hay registros de evidencia para este contexto.</p>}
      </div>
    </details>
  );
}
