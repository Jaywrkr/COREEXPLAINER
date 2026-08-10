import type { Scene } from "@/lib/animation-spec/types";
import { buildSemanticModel } from "@/lib/semantic-model/buildSemanticModel";
import { GlossaryText } from "./GlossaryText";

interface SemanticModelSummaryProps {
  scene: Scene;
}

const ROLE_LABELS = {
  actor: "Actor",
  control: "Control",
  compute: "Cómputo",
  storage: "Storage",
  network: "Red",
  service: "Servicio",
} as const;

/** On-demand semantic interpretation for technical reviewers. */
export function SemanticModelSummary({ scene }: SemanticModelSummaryProps) {
  const model = buildSemanticModel(scene);
  const nodeById = new Map(model.nodes.map((node) => [node.id, node]));

  return (
    <details className="mt-2 border-t border-core-border/[0.1] pt-2">
      <summary className="cursor-pointer list-none font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-text-muted transition-colors hover:text-core-text [&::-webkit-details-marker]:hidden">
        Modelo semántico · {model.nodes.length} componentes · {model.relationships.length} relaciones
      </summary>
      <div className="mt-2 space-y-2 text-[0.64rem] leading-relaxed text-core-text-secondary">
        <p>
          <span className="font-semibold text-core-text">Entradas:</span>{" "}
          <GlossaryText text={model.entryPointIds.map((id) => nodeById.get(id)?.name ?? id).join(" · ") || "ninguna declarada"} />
        </p>
        <p>
          <span className="font-semibold text-core-text">Salidas:</span>{" "}
          <GlossaryText text={model.exitPointIds.map((id) => nodeById.get(id)?.name ?? id).join(" · ") || "ninguna declarada"} />
        </p>
        <div className="border-l-2 border-core-accent/60 pl-2">
          {model.nodes.map((node) => (
            <p key={node.id}>
              <span className="font-semibold text-core-text">{node.name}:</span> {ROLE_LABELS[node.role]} · {node.incomingIds.length} entrada(s) · {node.outgoingIds.length} salida(s)
            </p>
          ))}
        </div>
        {model.isolatedNodeIds.length ? (
          <p className="border-l-2 border-core-warning pl-2 text-core-warning">
            Aislados: {model.isolatedNodeIds.map((id) => nodeById.get(id)?.name ?? id).join(", ")}
          </p>
        ) : null}
      </div>
    </details>
  );
}
