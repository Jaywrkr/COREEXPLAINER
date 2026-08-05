# Validación técnica — SD-WAN

**Última revisión:** 2026-08-05
**Estado:** `pending`; requiere revisión especialista.

## Alcance

El tema usa HPE Aruba Networking EdgeConnect SD-WAN y Orchestrator 9.5.1 como
referencia conceptual. Underlay, overlay, BIO, path conditioning, routing,
seguridad y HA dependen del modelo, release, licencias, transportes y diseño.

## Fuentes primarias

| ID | Fuente | Consultada |
|---|---|---|
| `aruba-orchestrator` | [Orchestrator 9.5.1 User Guide](https://arubanetworking.hpe.com/techdocs/sdwan-PDFs/user/Orch_UserGuide_R951.pdf) | 2026-08-05 |
| `aruba-sdbranch` | [Validated SD-Branch design](https://arubanetworking.hpe.com/techdocs/VSG/docs/070-sd-branch-design/Media/PDF/Aruba_VSG_SD-Branch-Design.pdf) | 2026-08-05 |
| `aruba-intro` | [About EdgeConnect SD-WAN](https://developer.arubanetworks.com/edgeconnect/docs/intro) | 2026-08-05 |
| `aruba-path-conditioning` | [Path conditioning](https://support.hpe.com/hpesc/public/docDisplay?docId=sf000105657en_us&page=index.html) | 2026-08-05 |
| `checkpoint-clusterxl` | [R82 ClusterXL guide](https://sc1.checkpoint.com/documents/R82/WebAdminGuides/EN/CP_R82_ClusterXL_AdminGuide/CP_R82_ClusterXL_AdminGuide.pdf) | 2026-08-05 |

## Límites

- Un overlay no elimina fallos de los circuitos ni del edge físico.
- Path conditioning mejora tolerancia bajo condiciones concretas y añade
  overhead; no garantiza una calidad fija.
- La decisión de camino depende de clasificación, métricas, umbrales,
  prioridad, routing y seguridad del cliente.
