# Storyboard — Protección heterogénea con Veeam

**Revisión:** 2026-08-04  
**Patrón:** VMware/VCF, Lenovo, IBM Power/AIX, NAS, repositorios Veeam y cinta.

Este tema amplía Backup/DR: explica la mecánica de una plataforma Veeam cuando
protege cargas heterogéneas, no un DR completo ni una promesa de soporte para
cualquier workload.

1. **Cargas:** cada plataforma tiene método de captura, consistencia y restore.
2. **Data pipe:** origen, Veeam server, proxy/data mover, red y repositorio.
3. **Retención:** repositorio, inmutabilidad, tape job y medio offline.
4. **Restore:** punto, destino, dependencias y aplicación validada.
5. **Límites:** jobs, throughput, repositorio y restauración.

Veeam 13 documenta backups de máquinas virtuales, físicas y cloud, NAS,
plugins de aplicaciones y backup to tape. La licencia, agente, plugin,
repositorio y versión del cliente deben confirmarse antes de diseñar.
