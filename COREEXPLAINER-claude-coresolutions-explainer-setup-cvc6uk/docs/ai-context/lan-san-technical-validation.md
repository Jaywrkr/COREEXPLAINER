# Validación técnica — LAN y SAN integradas

**Última revisión:** 2026-08-04  
**Estado:** `pending`.

| Afirmación | Fuente | Límite |
|---|---|---|
| Aruba documenta VLANs y diseños de data center por familia de switching | [Aruba data center design](https://www.arubanetworks.com/techdocs/VSG/docs/040-dc-design/Media/PDF/Aruba_VSG_Data-Center-Design.pdf), [deploy](https://www.arubanetworks.com/techdocs/VSG/docs/050-dc-deploy/Media/PDF/Aruba_VSG_Data-Center-Deploy.pdf) | Confirmar modelo, versión, VSX/VSF, routing y licencia. |
| FC puede conectar hosts directamente o mediante una fabric conmutada | [IBM host attachment](https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=concepts-host-attachment) | Protocolo, HBA y topología deben ser compatibles. |
| Mapping de volúmenes es distinto de la visibilidad de la fabric | [IBM host mapping](https://www.ibm.com/docs/en/flashsystem-5x00/9.1.0?topic=hosts-host-mapping) | También se necesita multipath, driver, firmware y configuración del host. |
| Lenovo documenta requisitos de HBA, firmware, OS y multipath por protocolo | [Lenovo SAN deployment guide](https://download.lenovo.com/storage/thinksystem_de_series_software_deployment_and_configuration_guide_v1.1.pdf) | La guía aplica a una familia concreta; validar HCL. |

No se promete una topología universal ni que LAN y SAN compartan equipos. Las
pruebas deben recorrer cada plano y su camino de retorno.
