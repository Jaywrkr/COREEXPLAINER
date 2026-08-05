# Validación técnica — Check Point HA

**Última revisión:** 2026-08-05
**Estado:** `pending`; requiere revisión especialista.

## Alcance

El tema usa ClusterXL High Availability de Check Point R82/R82.10 como patrón
visual. No afirma que todas las appliances, versiones, modos VSX, licencias o
topologías soporten las mismas funciones. La aceptación debe incluir tráfico,
VIP, routing, sync, sesiones, VPN, logs y aplicaciones.

## Fuentes primarias

| ID | Fuente | Consultada |
|---|---|---|
| `checkpoint-clusterxl` | [R82 ClusterXL Administration Guide](https://sc1.checkpoint.com/documents/R82/WebAdminGuides/EN/CP_R82_ClusterXL_AdminGuide/CP_R82_ClusterXL_AdminGuide.pdf) | 2026-08-05 |
| `checkpoint-intro` | [Introduction to ClusterXL](https://sc1.checkpoint.com/documents/R82/WebAdminGuides/EN/CP_R82_ClusterXL_AdminGuide/Content/Topics-CXLG/Introduction-to-ClusterXL.htm) | 2026-08-05 |
| `checkpoint-compat` | [Requirements and compatibility](https://sc1.checkpoint.com/documents/R82.10/WebAdminGuides/EN/CP_R82.10_ClusterXL_AdminGuide/Content/Topics-CXLG/ClusterXL-Requirements-and-Compatibility.htm) | 2026-08-05 |
| `checkpoint-install` | [Installing a ClusterXL cluster](https://sc1.checkpoint.com/documents/R82/WebAdminGuides/EN/CP_R82_Installation_and_Upgrade_Guide/Content/Topics-IUG/Installing-ClusterXL-Cluster.htm) | 2026-08-05 |
| `aruba-design` | [Aruba data center design](https://www.arubanetworks.com/techdocs/VSG/docs/040-dc-design/Media/PDF/Aruba_VSG_Data-Center-Design.pdf) | 2026-08-05 |

## Límites

- HA activo/standby no es lo mismo que Load Sharing ni garantiza continuidad
  de todas las sesiones.
- VIP, ARP, routing y sync deben diseñarse y probarse en el entorno real.
- La compatibilidad de miembros, versión, appliance, Gaia, blades y licencias
  debe confirmarse antes de ofertar.
