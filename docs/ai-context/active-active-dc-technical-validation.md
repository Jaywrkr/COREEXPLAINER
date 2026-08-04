# Validación técnica — Data center activo-activo

**Última revisión:** 2026-08-04  
**Estado:** `pending`.

| Afirmación | Fuente | Límite |
|---|---|---|
| IBM policy-based HA usa dos sistemas independientes y configura objetos de una partición para alta disponibilidad | [IBM policy-based HA](https://www.ibm.com/docs/en/flashsystem-9x00/9.1.1?topic=replication-high-availability) | Modelo, código, partición, quorum y hosts deben cumplir requisitos. |
| Un volumen espejo puede quedar desincronizado y requerir resync | [IBM mirrored volumes](https://www.ibm.com/docs/en/flashsystem-9x00/9.1.1?topic=volumes-mirrored) | No implica RPO cero ni recuperación automática de aplicación. |
| Las conexiones I/O y partnerships requieren planificación de adaptadores/topología | [IBM planning I/O](https://www.ibm.com/docs/en/flashsystem-9x00/9.1.1?topic=ph-planning-io-connections) | Confirmar protocolo, distancia, firmware y soporte. |
| Aruba documenta diseños de data center con VSX/VSF y LAG según familia | [Aruba data center deploy](https://www.arubanetworks.com/techdocs/VSG/docs/050-dc-deploy/Media/PDF/Aruba_VSG_Data-Center-Deploy.pdf) | No generalizar comandos o capacidades a todos los switches. |
| Veeam mantiene una infraestructura específica para replicación de VMs | [Veeam replication infrastructure](https://helpcenter.veeam.com/docs/vbr/userguide/replication_components.html) | Es distinto de la replicación nativa de storage; validar estrategia. |

La topología no promete SLA, capacidad plena después del fallo ni failover sin
impacto. El runbook, las pruebas y las dependencias de aplicación siguen siendo
necesarios.
