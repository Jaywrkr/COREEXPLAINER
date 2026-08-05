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
  ransomware: [
    { name: "Check Point", role: "Prevención, detección y contención", scope: "La protección combina exposición, endpoint, segmentación y políticas; validar productos y cobertura." },
    { name: "VMware/Broadcom", role: "Workloads virtualizados", scope: "La segmentación y las cargas dependen de vSphere/VCF/NSX y su configuración real." },
    { name: "Aruba HPE", role: "Conectividad y aislamiento", scope: "El underlay y los controles de red deben diseñarse y probarse por separado." },
    { name: "Veeam", role: "Copia inmutable y recuperación", scope: "La inmutabilidad depende del repositorio, política, credenciales y licencia." },
    { name: "IBM", role: "Detección y copias protegidas de storage", scope: "FlashSystem puede detectar anomalías y conservar copias; confirmar modelo y código." },
    { name: "Lenovo", role: "Plataforma de reconstrucción", scope: "ThinkSystem representa capacidad para recuperar; validar modelo, firmware y sizing." },
  ] satisfies BrandContextItem[],
  san: [
    { name: "IBM", role: "Storage empresarial", scope: "FlashSystem/Storwize aporta pools, volúmenes y servicios de copia; validar familia y código." },
    { name: "Lenovo", role: "Servidores y HBA", scope: "ThinkSystem representa hosts posibles; validar HBA, firmware, HCL y sizing." },
    { name: "VMware/Broadcom", role: "Consumidor de storage", scope: "vSphere/VCF puede consumir datastores SAN; validar versión, SATP/PSP y soporte." },
    { name: "Aruba HPE", role: "Red LAN y gestión", scope: "La SAN FC puede ser una fabric separada; no se asume que el switching LAN transporte FC." },
  ] satisfies BrandContextItem[],
  veeamProtection: [
    { name: "Veeam", role: "Protección y recuperación", scope: "Backup & Replication coordina workloads soportados; validar edición, licencia y diseño." },
    { name: "VMware/Broadcom", role: "Workloads virtuales", scope: "vSphere/VCF aporta el origen; confirmar versión y consistencia de aplicación." },
    { name: "IBM", role: "AIX, storage y cinta", scope: "IBM Power/FlashSystem/TS4300 son patrones posibles; validar soporte por workload." },
    { name: "Lenovo", role: "Servidores y repositorios", scope: "ThinkSystem puede alojar cargas o repositorios; validar capacidad y HCL." },
    { name: "Synology", role: "NAS y archivos", scope: "NAS puede ser origen o destino; validar integración, permisos y rendimiento." },
  ] satisfies BrandContextItem[],
  activeActive: [
    { name: "IBM", role: "Storage HA y replicación", scope: "FlashSystem ofrece funciones según familia, código y política; validar topología." },
    { name: "VMware/Broadcom", role: "Cargas y clústeres", scope: "vSphere/VCF puede consumir ambos sitios; validar HA, DRS y dependencias." },
    { name: "Lenovo", role: "Cómputo en dos racks", scope: "ThinkSystem representa hosts redundantes; validar firmware, HCL y capacidad." },
    { name: "Aruba HPE", role: "Red redundante", scope: "VSX/LAG o equivalente depende del modelo y diseño; no se asume failover automático." },
    { name: "Check Point", role: "Seguridad de los caminos", scope: "Las reglas y estados de firewall deben probarse durante un cambio de sitio." },
  ] satisfies BrandContextItem[],
  lanSan: [
    { name: "Aruba HPE", role: "LAN de data center", scope: "VLAN, routing, VSX/VSF y LAG dependen del modelo y versión." },
    { name: "IBM", role: "SAN y storage", scope: "FlashSystem y FC requieren zoning, mapping y HCL compatibles." },
    { name: "Lenovo", role: "Servidores y NIC/HBA", scope: "Validar adaptadores, firmware, drivers y paths." },
    { name: "VMware/Broadcom", role: "Hosts y workloads", scope: "vSphere/VCF consume redes LAN y storage según el diseño del cluster." },
    { name: "Check Point", role: "Inspección y seguridad", scope: "El firewall es una capa adicional; no sustituye el diseño de switching o SAN." },
  ] satisfies BrandContextItem[],
  nasCloud: [
    { name: "Synology", role: "NAS y servicios de archivo", scope: "DSM, SMB/NFS, almacenamiento y HA dependen del modelo y versión." },
    { name: "Aruba HPE", role: "Conectividad y acceso", scope: "VLAN, LAG, routing y Wi-Fi son dependencias de la red del cliente." },
    { name: "Check Point", role: "Acceso seguro", scope: "Publicación, segmentación y acceso remoto requieren políticas propias." },
    { name: "Veeam", role: "Protección del NAS", scope: "La cobertura de shares y repositorios depende de versión, licencia y arquitectura." },
    { name: "Lenovo", role: "Cómputo complementario", scope: "Puede alojar servicios asociados; validar capacidad y soporte." },
  ] satisfies BrandContextItem[],
};
