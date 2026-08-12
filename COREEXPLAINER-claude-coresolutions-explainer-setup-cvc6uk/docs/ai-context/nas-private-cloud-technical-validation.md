# Validación técnica — NAS como servicio de archivos

**Última revisión:** 2026-08-04  
**Estado:** `pending`.

| Afirmación | Fuente | Límite |
|---|---|---|
| DSM ofrece servicios como SMB, NFS, FTP y WebDAV | [Synology file sharing](https://www.synology.com/en-us/dsm/feature/file_sharing), [DSM file services](https://kb.synology.com/en-global/DSM/help/DSM/AdminCenter/file_service_desc?version=7) | Protocolos y funciones dependen de DSM y modelo. |
| Synology HA usa un servidor activo y otro pasivo con IP común | [Synology High Availability](https://kb.synology.com/en-global/DSM/help/HighAvailability/HAManager_desc?version=7) | Requisitos, límites, heartbeat y RTO deben comprobarse. |
| Un NAS puede unirse a Active Directory para servicios de archivos | [Synology AD client](https://kb.synology.com/en-global/DSM/tutorial/How_to_join_my_Synology_NAS_into_Windows_Active_Directory_domain) | DNS, NTP, grupos y ACL del cliente son dependencias. |
| Veeam tiene infraestructura específica para NAS y agentes | [Veeam storage infrastructure](https://helpcenter.veeam.com/docs/vbr/userguide/storage_infrastructure.html?ver=13) | Validar versión, licencia, shares y repositorio. |

No se afirma que RAID o HA sean backup, ni que una IP de cluster garantice que
la aplicación o los permisos estén correctos.
