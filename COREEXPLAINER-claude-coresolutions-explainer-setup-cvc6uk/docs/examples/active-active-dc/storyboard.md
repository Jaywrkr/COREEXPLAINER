# Storyboard — Data center activo-activo

**Revisión:** 2026-08-04  
**Marcas:** IBM, VMware/Broadcom, Lenovo, Aruba HPE y Check Point.

Este tema representa los proyectos con dos racks o sitios, storage replicado,
red redundante y procedimientos de failover. No afirma que active-active sea
adecuado para cualquier aplicación ni que elimine el impacto de una falla.

1. Dos dominios con hosts, storage, red y quorum.
2. Estado y paths de storage.
3. Red redundante y enlace inter-site.
4. Decisión y runbook de failover.
5. Pruebas de sitio, partición, capacidad y sincronización.

Debe distinguirse de Backup/DR: aquí se explica continuidad de operación y
estado entre dominios; el backup sigue siendo necesario para historial,
errores lógicos y ransomware.
