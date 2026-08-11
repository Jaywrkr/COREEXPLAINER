"use client";

import { summarizeSourceFreshness } from "@/content/technical-source-catalog";

interface ReviewSource {
  title: string;
  url: string;
  accessedAt: string;
  validity?: "current" | "review-needed";
}

interface TechnicalReviewPacketDownloadProps {
  slug: string;
  title: string;
  scope: string;
  lastReviewedAt: string;
  validationDoc: string;
  sources: ReviewSource[];
  warnings: string[];
}

interface LocalReviewTracking {
  reviewer?: string;
  targetDate?: string;
  notes?: string;
  status?: string;
}

function readLocalTracking(slug: string): LocalReviewTracking | null {
  try {
    return JSON.parse(window.localStorage.getItem(`core-explainer:technical-review:${slug}`) ?? "null") as LocalReviewTracking | null;
  } catch { return null; }
}

function markdownForReview({ slug, title, scope, lastReviewedAt, validationDoc, sources, warnings }: TechnicalReviewPacketDownloadProps, tracking: LocalReviewTracking | null) {
  const checklist = [
    "[ ] Confirmar producto, versión/release, HCL y licenciamiento aplicables.",
    "[ ] Contrastar que el diagrama representa las relaciones y dependencias reales.",
    "[ ] Revisar escenarios de fallo, capacidad remanente, observabilidad y rollback.",
    "[ ] Registrar evidencia del cliente, supuestos y limitaciones que deben mantenerse visibles.",
    "[ ] Documentar responsable, fecha y decisión de revisión en el PR de contenido.",
  ];
  return [
    `# Paquete de revisión técnica — ${title}`,
    "",
    `- Explainer: \`${slug}\``,
    `- Última revisión declarada: ${lastReviewedAt}`,
    `- Ficha técnica en el repositorio: \`${validationDoc}\``,
    "",
    "## Alcance declarado",
    "",
    scope,
    "",
    "## Checklist del especialista",
    "",
    ...checklist,
    "",
    "## Seguimiento local",
    "",
    `- Estado local: ${tracking?.status ?? "unassigned"}`,
    `- Responsable: ${tracking?.reviewer || "(sin asignar)"}`,
    `- Fecha objetivo: ${tracking?.targetDate || "(sin fecha)"}`,
    `- Notas: ${tracking?.notes || "(sin notas)"}`,
    "",
    "## Advertencias del content gate",
    "",
    ...(warnings.length ? warnings.map((warning) => `- ${warning}`) : ["- Sin advertencias semánticas estructurales."]),
    "",
    "## Fuentes consultadas",
    "",
    ...sources.map((source) => {
      const freshness = summarizeSourceFreshness(source);
      return `- [${source.title}](${source.url}) — consultada ${source.accessedAt} — ${freshness.status} (${freshness.reason}), ${freshness.ageDays === null ? "edad no disponible" : `${freshness.ageDays} días`}, revisar antes de ${freshness.dueAt ?? "fecha no disponible"}`;
    }),
    "",
    "La frescura es una señal editorial derivada de la fecha de acceso; no valida compatibilidad, licenciamiento ni el entorno del cliente.",
    "",
    "## Resultado de la revisión",
    "",
    "- Estado propuesto: `pending` hasta que un especialista confirme el contenido.",
    "- Responsable:",
    "- Fecha:",
    "- Cambios requeridos:",
    "- Evidencia adjunta:",
    "",
    "Este paquete no certifica un entorno ni cambia el estado publicado. La aprobación debe ocurrir mediante un cambio revisable en Git/PR.",
    "",
  ].join("\n");
}

export function TechnicalReviewPacketDownload(props: TechnicalReviewPacketDownloadProps) {
  const download = () => {
    const blob = new Blob([markdownForReview(props, readLocalTracking(props.slug))], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `technical-review-${props.slug}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" onClick={download} className="border border-core-border/[0.2] px-2 py-1 text-[0.58rem] font-semibold text-core-text-muted hover:border-core-accent/50 hover:text-core-accent">
      Descargar paquete
    </button>
  );
}
