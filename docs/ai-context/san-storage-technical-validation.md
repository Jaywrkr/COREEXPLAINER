# Validación técnica — Storage SAN empresarial

**Última revisión:** 2026-08-04  
**Estado:** `pending` — requiere revisión con modelo exacto de cabina, HBA,
fabric, host y versión de VMware/AIX del cliente.

## Matriz de afirmaciones

| Afirmación | Fuente primaria | Límite |
|---|---|---|
| FlashSystem soporta varios protocolos de host attachment y FC puede ir directo o por fabric conmutada | [IBM host attachment 9.1.1](https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=concepts-host-attachment) | El protocolo soportado depende del hardware; validar SSIC, HBA y firmware. |
| Host mapping controla qué volúmenes son accesibles por WWPN/IQN y puede ser privado o compartido | [IBM mapping volumes to a host](https://www.ibm.com/docs/en/flashsystem-5x00/9.1.0?topic=hosts-host-mapping) | No sustituye zoning, multipath ni permisos del sistema operativo. |
| Un volumen se crea como objeto de storage y se presenta al host mediante mapping | [IBM mkvdisk 9.1.1](https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=commands-mkvdisk) | El nombre “LUN” y la semántica visible dependen del protocolo y host. |
| Múltiples paths necesitan drivers, firmware y política de multipath compatibles | [Lenovo ThinkSystem DE deployment guide](https://download.lenovo.com/storage/thinksystem_de_series_software_deployment_and_configuration_guide_v1.1.pdf) | La guía es de una familia Lenovo; no generalizar a todos los arrays o HBA. |
| VMware/Lenovo requieren validar soporte de plataforma y componentes | [Lenovo ThinkSystem VMware solution guide](https://lenovopress.lenovo.com/lp1265.pdf) | Confirmar versión, ReadyNode/HCL, SATP/PSP y diseño del cliente. |
| Migración de datos y replicación son operaciones distintas | [IBM data migration](https://www.ibm.com/docs/en/flashsystem-9x00/9.1.1?topic=concepts-data-migration), [IBM replication session types](https://www.ibm.com/docs/en/csm/6.3.15?topic=replication-session-types) | La semántica síncrona/asíncrona y el RPO dependen de la sesión y topología. |

## Reglas de lenguaje

- **Zoning** responde “qué puertos pueden verse”; **mapping/masking** responde
  “qué volumen puede usar cada host”.
- **Multipath** mantiene caminos de I/O; no crea otra copia de los datos.
- **RAID/DRAID** organiza protección/capacidad dentro del storage; no es
  replicación entre sitios.
- **Snapshot** puede ser un punto local; no se presenta automáticamente como
  backup histórico o DR.
- **Migración** mueve datos; **replicación** mantiene una relación entre origen
  y destino. La aplicación necesita una estrategia propia.
- No se afirma una integración certificada entre todas las marcas mostradas.

## Relación con CORESOLUTIONS

El patrón está basado en proyectos reales sanitizados en
[`docs/product/coresolutions-project-patterns.md`](../product/coresolutions-project-patterns.md)
y en el contexto de marcas de [`docs/product/portfolio.md`](../product/portfolio.md).
