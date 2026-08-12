# Validación técnica — IBM Power/AIX

**Última revisión:** 2026-08-05
**Estado:** `pending`; requiere revisión especialista.

## Alcance

El ejemplo es un patrón de integración de PowerVM, VIOS, AIX, SAN, red,
Oracle/SAP y backup. Live Partition Mobility requiere comprobar la matriz
concreta de Power, HMC, VIOS, firmware, storage, red y aplicaciones.

## Fuentes primarias

| ID | Fuente | Consultada |
|---|---|---|
| `ibm-lpm` | [PowerVM Live Partition Mobility](https://www.ibm.com/docs/en/power10/9028-21B?topic=mobility-benefits-partition) | 2026-08-05 |
| `ibm-lpm-howto` | [PowerVM/VIOS LPM how-to](https://www.ibm.com/support/pages/powervmvios-how-perform-live-partition-mobility) | 2026-08-05 |
| `ibm-lpm-concept` | [Live Partition Mobility concept](https://www.ibm.com/docs/en/power7/9117-MMB?topic=features-live-partition-mobility) | 2026-08-05 |
| `ibm-flashsystem` | [FlashSystem host attachment](https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=concepts-host-attachment) | 2026-08-05 |
| `veeam-overview` | [Veeam overview](https://helpcenter.veeam.com/docs/vbr/userguide/overview.html) | 2026-08-05 |

## Límites

- LPM no reemplaza backup, replicación ni un plan de recuperación.
- El movimiento de una LPAR no valida Oracle, SAP, middleware, interfaces ni
  consistencia de aplicación.
- HMC, VIOS, firmware, SAN, red, storage, licencias y soporte deben revisarse
  para el modelo y niveles reales.
