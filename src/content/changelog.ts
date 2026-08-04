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
export const currentVersion = "0.10.0";

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "0.10.0",
    date: "04 ago 2026",
    title: "Explainer independiente de vSAN",
    changes: [
      "Nuevo tema con cinco escenas sobre datastore distribuido, objetos y políticas de storage.",
      "Escenarios interactivos para fallas de host/disco, capacidad, fault domains y red vSAN.",
      "Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.",
    ],
  },
  {
    version: "0.9.0",
    date: "04 ago 2026",
    title: "Explainer independiente de vSphere HA",
    changes: [
      "Nuevo tema con cinco escenas: protección, falla, decisión, reinicio y límites.",
      "Escenarios interactivos para capacidad, visibilidad de storage y restricciones de políticas.",
      "Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.",
    ],
  },
  {
    version: "0.8.0",
    date: "04 ago 2026",
    title: "Lenguaje visual de diagramas",
    changes: [
      "Relaciones semánticas para distinguir datos, control, storage, dependencias y fallos.",
      "Leyenda interactiva con filtros de capas y relaciones por escena.",
      "Validación del tipo de cada arista antes de publicar una explicación.",
    ],
  },
  {
    version: "0.7.0",
    date: "04 ago 2026",
    title: "Control de calidad de contenido",
    changes: [
      "Validación de estructura, profundidad narrativa y referencias visuales antes de registrar un tema.",
      "Cada explicación declara storyboard, matriz técnica y estado de revisión.",
      "Los errores de contenido hacen fallar la compilación; las revisiones pendientes quedan explícitas.",
    ],
  },
  {
    version: "0.6.0",
    date: "04 ago 2026",
    title: "Modo presentación guiada",
    changes: [
      "Modo presentación con reproducción automática, pausa y reinicio.",
      "Navegación por teclado para avanzar, retroceder y salir de la presentación.",
      "La reproducción se detiene al cambiar manualmente de paso o llegar al final.",
    ],
  },
  {
    version: "0.5.0",
    date: "04 ago 2026",
    title: "Escenarios interactivos de fallo",
    changes: [
      "Escenarios guiados para fallas de uno o varios hosts y del plano de gestión.",
      "Cada escenario explica su efecto, nodos afectados y límites técnicos.",
      "La simulación se puede restaurar y se reinicia al cambiar de escena.",
    ],
  },
  {
    version: "0.4.0",
    date: "04 ago 2026",
    title: "Relaciones visibles",
    changes: [
      "Hover sobre un nodo para resaltar sus conexiones y componentes relacionados.",
      "Los elementos no relacionados se atenúan para concentrar la atención.",
      "El resaltado funciona con pan, zoom y escenas independientes.",
    ],
  },
  {
    version: "0.3.1",
    date: "04 ago 2026",
    title: "Precisión técnica de VCF",
    changes: [
      "Se revisaron copy, storyboard y topología contra fuentes oficiales.",
      "Se eliminaron afirmaciones absolutas sobre consola única, SLA y failover.",
      "Se separaron el camino de datos, el clúster de cómputo y la gestión de VCF.",
    ],
  },
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
