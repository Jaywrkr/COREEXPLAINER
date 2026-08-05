# Validación técnica — Protección heterogénea con Veeam

**Última revisión:** 2026-08-04  
**Estado:** `pending`.

| Afirmación | Fuente | Límite |
|---|---|---|
| Veeam 13 centraliza backup/restore de workloads virtuales, físicos, cloud, NAS y plugins | [Veeam overview](https://helpcenter.veeam.com/docs/vbr/userguide/overview.html) | Confirmar plataforma, agente, plugin, licencia y aplicación. |
| El data pipe usa hosts origen, proxies, repository y data movers | [Veeam architecture](https://helpcenter.veeam.com/docs/vbr/userguide/backup_architecture.html) | Throughput y sizing dependen de concurrencia, red, CPU, storage y transporte. |
| Un repository guarda backup files, VM copies y metadata | [Veeam repositories](https://helpcenter.veeam.com/docs/vbr/userguide/backup_repository.html?ver=13) | No es automáticamente inmutable ni fuera de línea. |
| Tape jobs copian backups existentes y requieren librería/medios compatibles | [Veeam backup to tape](https://helpcenter.veeam.com/docs/vbr/userguide/backup_to_tape_jobs.html?ver=13), [tape support](https://helpcenter.veeam.com/docs/vbr/userguide/system_requirements_tape.html?ver=13) | No se presenta una VM directamente a tape; validar licencia y dispositivo. |
| La inmutabilidad depende del repositorio y configuración | [Veeam immutability](https://helpcenter.veeam.com/docs/vbr/userguide/immutability_hv.html?ver=13) | No demuestra que el punto esté limpio ni que el restore de aplicación funcione. |

La relación con los patrones de proyectos reales está documentada en
[`docs/product/coresolutions-project-patterns.md`](../product/coresolutions-project-patterns.md).
