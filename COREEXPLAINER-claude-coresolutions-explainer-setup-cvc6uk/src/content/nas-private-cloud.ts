import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const nasPrivateCloudFailureScenarios: FailureScenario[] = [
  { id: "directory-unavailable", sceneId: "identity", label: "Directorio no disponible", summary: "Los usuarios no pueden autenticarse o resolver sus grupos.", detail: "Un NAS unido a Active Directory depende de DNS, NTP, conectividad y grupos correctos. El recurso puede estar en línea y aun así negar acceso.", limitation: "No se valida un dominio real ni se interpreta un log de autenticación.", affectedNodes: ["directory", "nas"], deadNodeIds: ["directory"] },
  { id: "ha-link-loss", sceneId: "limits", label: "Enlace HA degradado", summary: "El par deja de sincronizarse correctamente.", detail: "Synology High Availability usa un servidor activo y otro pasivo. La salud del cluster, red heartbeat y estado de almacenamiento deben comprobarse antes de un cambio.", limitation: "No se simula el algoritmo de elección ni se certifica un RTO.", affectedNodes: ["heartbeat", "nas-b"], deadNodeIds: ["heartbeat"] },
  { id: "permissions-drift", sceneId: "limits", label: "Permisos no coinciden", summary: "Un usuario ve demasiado o demasiado poco.", detail: "Las ACL locales, grupos de dominio y permisos de shares pueden divergir durante una migración. La disponibilidad del NAS no garantiza autorización correcta.", limitation: "La demo no evalúa ACL, herencia ni grupos reales.", affectedNodes: ["directory", "share"], deadNodeIds: ["directory"] },
  { id: "backup-gap", sceneId: "limits", label: "Share sin protección", summary: "El archivo existe en producción, pero no hay copia recuperable.", detail: "Un NAS como servicio de archivos requiere política de backup, retención, copia fuera de línea o inmutable y pruebas. RAID y HA no sustituyen backup.", limitation: "No se ejecuta un job Veeam ni un restore de archivos.", affectedNodes: ["share", "veeam"], deadNodeIds: ["veeam"] },
];

export const nasPrivateCloudMeta: ExplainerMeta = {
  chip: "Archivos · NAS como servicio",
  title: "Cómo un NAS se convierte en un servicio de archivos confiable",
  tagline: "Una explicación visual de almacenamiento, red, identidad, permisos, alta disponibilidad y backup para una nube privada de archivos.",
  brandContext: brandContext.nasCloud,
  storyboardDoc: "docs/examples/nas-private-cloud/storyboard.md",
  technicalValidationDoc: "docs/ai-context/nas-private-cloud-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "Patrón conceptual revisado con Synology DSM 7.3, Synology High Availability DSM 7.2–7.4, servicios SMB/NFS, Active Directory y Veeam; confirmar modelo, versión, límites de volumen, red y política de backup.",
    sources: [
      { id: "synology-files", title: "Synology DSM file sharing", url: "https://www.synology.com/en-us/dsm/feature/file_sharing", accessedAt: "2026-08-04" },
      { id: "synology-ha", title: "Synology High Availability", url: "https://kb.synology.com/en-global/DSM/help/HighAvailability/HAManager_desc?version=7", accessedAt: "2026-08-04" },
      { id: "synology-ha-limits", title: "Synology High Availability limitations", url: "https://kb.synology.com/en-global/DSM/help/HighAvailability/limitation?version=7", accessedAt: "2026-08-04" },
      { id: "synology-ad", title: "Synology NAS and Microsoft Active Directory", url: "https://kb.synology.com/en-global/DSM/tutorial/How_to_join_my_Synology_NAS_into_Windows_Active_Directory_domain", accessedAt: "2026-08-04" },
      { id: "synology-services", title: "Synology DSM file services", url: "https://kb.synology.com/en-global/DSM/help/DSM/AdminCenter/file_service_desc?version=7", accessedAt: "2026-08-04" },
      { id: "veeam-nas", title: "Veeam storage infrastructure for NAS", url: "https://helpcenter.veeam.com/docs/vbr/userguide/storage_infrastructure.html?ver=13", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: nasPrivateCloudFailureScenarios,
};

export const nasPrivateCloudSteps: ExplainerStep[] = [
  { id: "service", tag: "01 — EL SERVICIO", title: "Un NAS es más que discos compartidos", paragraphs: ["Un servicio de archivos combina almacenamiento, shares, protocolos, identidad, permisos, red, disponibilidad y backup. DSM soporta protocolos como SMB, NFS, FTP y WebDAV según configuración.", "El diseño debe empezar por usuarios, aplicaciones, tamaño, crecimiento, rendimiento, retención y ubicación; después se eligen RAID, volúmenes y servicios."], businessImpact: "El cliente puede discutir el servicio que necesita, no solo la capacidad bruta del equipo.", sceneId: "service", caption: "Usuarios → red → NAS → share → datos", sourceIds: ["synology-files", "synology-services"] },
  { id: "identity", tag: "02 — IDENTIDAD", title: "Los permisos dependen de identidad y contexto", paragraphs: ["Un NAS unido a Active Directory usa usuarios y grupos del dominio para controlar acceso. DNS, NTP, conectividad y sincronización de grupos son dependencias operativas.", "Un share accesible no significa que todos deban leerlo. El diseño debe separar administración, permisos, herencia, auditoría y acceso remoto."], businessImpact: "La conversación evita exponer shares por comodidad y hace visible quién puede leer, escribir o administrar.", sceneId: "identity", caption: "Usuario → AD/DNS/NTP → grupos → ACL → share", sourceIds: ["synology-ad", "synology-services"] },
  { id: "ha", tag: "03 — DISPONIBILIDAD", title: "HA mantiene un servicio, no elimina sus dependencias", paragraphs: ["Synology High Availability usa un servidor activo y otro pasivo con una IP de cluster para acceder a servicios DSM. La red de heartbeat y los requisitos de ambos equipos son parte del diseño.", "HA protege ciertas fallas del par, pero no reemplaza backup, protección contra borrado lógico, capacidad de red ni la validación de una aplicación que usa los archivos."], businessImpact: "El cliente distingue continuidad del dispositivo, protección del dato y disponibilidad de la red.", sceneId: "ha", caption: "NAS activo ↔ heartbeat ↔ NAS pasivo → IP de cluster", sourceIds: ["synology-ha", "synology-ha-limits"] },
  { id: "protection", tag: "04 — PROTECCIÓN", title: "RAID, HA y backup resuelven riesgos diferentes", paragraphs: ["RAID ayuda ante fallas de discos; HA ayuda ante una falla del servidor del par; backup permite volver a un punto anterior y recuperarse de borrado, corrupción o ransomware.", "Veeam puede integrarse con infraestructura NAS según versión y arquitectura. La política debe definir retención, repositorio, inmutabilidad, copia offline y prueba de restore."], businessImpact: "El cliente deja de considerar que dos NAS o un RAID son suficientes para recuperar cualquier incidente.", sceneId: "protection", caption: "Share → backup → repositorio protegido → restore de archivo", sourceIds: ["veeam-nas", "synology-files"] },
  { id: "limits", tag: "05 — LÍMITES", title: "La prueba debe incluir usuarios, red y datos", paragraphs: ["Activa un fallo para revisar directorio, heartbeat, permisos o backup. La prueba debe comprobar acceso de usuarios, escritura, recuperación, capacidad y documentación.", "El diagrama no calcula cuotas, rendimiento SMB/NFS, ACL ni RTO. Es una guía para descubrir dependencias antes de ofertar o migrar archivos."], businessImpact: "La madurez se demuestra con una restauración y un acceso autorizado reproducibles, no solo con una IP de cluster activa.", sceneId: "limits", caption: "Activa fallos para comprobar identidad, HA, permisos y backup", sourceIds: ["synology-ha", "synology-ad", "veeam-nas"] },
];
