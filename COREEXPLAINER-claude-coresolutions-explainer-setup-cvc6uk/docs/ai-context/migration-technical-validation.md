# Validación técnica — Migración sin interrupción

**Última revisión:** 2026-08-05
**Estado:** `pending`; requiere revisión de un especialista antes de cambiar a
`reviewed`.

## Alcance

El tema describe un patrón de planificación y ejecución para migraciones de
VMs, storage, LPARs o servicios. No promete cero downtime ni sustituye un
runbook. La estrategia puede ser vMotion/Storage vMotion, cross-vCenter,
PowerVM LPM, replicación o backup/restore según compatibilidad y objetivo.

## Fuentes primarias

| ID | Fuente | Consultada |
|---|---|---|
| `broadcom-vmotion` | [PowerCLI Move-VM](https://developer.broadcom.com/powercli/latest/vmware.vimautomation.core/commands/move-vm/) | 2026-08-05 |
| `broadcom-compatibility` | [Broadcom Compatibility Guide](https://compatibilityguide.broadcom.com/) | 2026-08-05 |
| `broadcom-migration-faults` | [vSphere MigrationFault](https://developer.broadcom.com/xapis/vsphere-web-services-api/latest/vim.fault.MigrationFault.html) | 2026-08-05 |
| `veeam-overview` | [Veeam Backup & Replication overview](https://helpcenter.veeam.com/docs/vbr/userguide/overview.html) | 2026-08-05 |
| `ibm-lpm` | [IBM PowerVM Live Partition Mobility](https://www.ibm.com/docs/en/power10/9028-21B?topic=mobility-benefits-partition) | 2026-08-05 |

## Límites que deben decirse al cliente

- La movilidad depende de versión, licencia, HCL, CPU, red, storage y
  dispositivos conectados.
- Una VM encendida o un job completado no demuestra que la aplicación esté
  disponible y consistente.
- El rollback debe tener punto de retorno, dependencias, responsables y prueba;
  un backup no es un rollback automático.
- El diseño final debe validar el entorno y la ventana concreta del cliente.
