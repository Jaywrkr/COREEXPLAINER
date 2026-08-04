import type { BrandContextItem } from "./types";

/**
 * Reusable brand context for topic metadata. These are positioning cues, not
 * compatibility claims; each topic's technical review remains authoritative.
 */
export const brandContext = {
  virtualization: [
    { name: "VMware/Broadcom", role: "Plataforma de virtualización", scope: "vSphere, VCF y servicios de la carga; confirmar release y entitlement." },
    { name: "Lenovo", role: "Cómputo del data center", scope: "ThinkSystem como plataforma posible; validar modelo, firmware y sizing." },
    { name: "IBM", role: "Storage empresarial", scope: "FlashSystem como dependencia de datos; validar familia y políticas." },
  ] satisfies BrandContextItem[],
  storage: [
    { name: "VMware/Broadcom", role: "Capa de consumo y políticas", scope: "vSphere/vSAN; validar arquitectura OSA/ESA y versión." },
    { name: "IBM", role: "Almacenamiento empresarial", scope: "FlashSystem como patrón de storage; validar modelo, código y soporte." },
    { name: "Lenovo", role: "Plataforma de servidores/storage", scope: "ThinkSystem como opción de infraestructura; validar HCL y sizing." },
  ] satisfies BrandContextItem[],
  networkSecurity: [
    { name: "VMware/Broadcom", role: "Virtualización y red de workloads", scope: "NSX/VCF como contexto posible; no reemplaza el diseño underlay." },
    { name: "Aruba HPE", role: "Conectividad de data center", scope: "Switching, routing y disponibilidad dependen del diseño real." },
    { name: "Check Point", role: "Seguridad e inspección", scope: "Políticas y puntos de enforcement deben validarse con tráfico real." },
  ] satisfies BrandContextItem[],
  security: [
    { name: "Check Point", role: "Control de acceso y seguridad", scope: "La política concreta, identidad e inspección requieren diseño y pruebas." },
    { name: "Aruba HPE", role: "Conectividad y segmentación", scope: "La red transporta el contexto; no se asume una topología concreta." },
    { name: "VMware/Broadcom", role: "Controles en workloads", scope: "NSX/VCF es un contexto posible; confirmar licencias y alcance." },
  ] satisfies BrandContextItem[],
  cloud: [
    { name: "VMware/Broadcom", role: "Plataforma híbrida posible", scope: "VCF/vSphere puede alojar servicios; validar el entorno objetivo." },
    { name: "Lenovo", role: "Infraestructura física", scope: "ThinkSystem puede soportar la plataforma; validar capacidad y soporte." },
    { name: "Check Point", role: "Seguridad de servicios", scope: "La protección depende de identidad, red y políticas del cliente." },
  ] satisfies BrandContextItem[],
  backupDr: [
    { name: "VMware/Broadcom", role: "Cargas virtualizadas", scope: "vSphere/VCF es el workload de referencia; validar versión y HCL." },
    { name: "Lenovo", role: "Hosts de cómputo", scope: "ThinkSystem representa la plataforma física; validar modelo y sizing." },
    { name: "Veeam", role: "Backup y recuperación", scope: "Veeam Backup & Replication coordina la protección; validar licencia y repositorio." },
    { name: "IBM", role: "Copias y replicación de storage", scope: "FlashSystem aporta un patrón posible; validar Safeguarded Copy y replicación." },
    { name: "Aruba HPE", role: "Red del sitio alterno", scope: "La recuperación depende de conectividad; el diagrama no diseña el underlay." },
    { name: "Check Point", role: "Seguridad de recuperación", scope: "Las reglas deben probarse junto con identidad, DNS y tráfico de aplicación." },
  ] satisfies BrandContextItem[],
};
