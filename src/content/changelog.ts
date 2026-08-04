export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

/**
 * Source of the release information rendered in the global version control.
 * Keep this aligned with package.json and docs/CHANGELOG.md.
 */
export const currentVersion = "0.3.0";

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "0.3.0",
    date: "04 ago 2026",
    title: "Detalle de componentes",
    changes: [
      "Clic en una tarjeta para consultar su función y tipo dentro de la arquitectura.",
      "Ficha contextual con capacidades, emisión y simulación de falla cuando aplica.",
      "La selección se reinicia al cambiar de escena y el clic fuera de un nodo la cierra.",
    ],
  },
  {
    version: "0.2.0",
    date: "04 ago 2026",
    title: "Navegación y trazabilidad",
    changes: [
      "Pan, zoom y restablecimiento de vista en los diagramas.",
      "Indicador global de versión y changelog accesible desde la aplicación.",
      "Documentación de interacción del canvas y de versionado para futuras sesiones.",
    ],
  },
  {
    version: "0.1.0",
    date: "04 ago 2026",
    title: "Prototipo técnico inicial",
    changes: [
      "Explicador interactivo de VMware Cloud Foundation con cuatro pasos.",
      "Simulación de paquetes, capacidad y falla controlada de nodos.",
      "Catálogo de temas, modo claro/oscuro y estructura documental para IA.",
    ],
  },
];
