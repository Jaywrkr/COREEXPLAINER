# Storyboard — Storage SAN empresarial

**Revisión:** 2026-08-04  
**Marcas del patrón:** IBM, Lenovo, VMware/Broadcom y Aruba HPE como
dependencia de LAN/gestión.  
**Audiencia:** cliente primero; detalle de paths y mapping en modo Técnico.

## Alcance

Este tema convierte en narrativa visual los trabajos recurrentes del CSV de
proyectos: ampliación y migración de storage, creación de pools y LUNs,
presentación a hosts, SAN FC, multipath, replicación y pruebas.

La topología es conceptual. Una SAN puede usar FC, iSCSI, NVMe-oF o SAS según
el modelo y diseño; aquí se muestra Fibre Channel porque es el patrón que más
claramente aparece en los proyectos revisados. IBM documenta varios protocolos
de host attachment y exige confirmar qué soporta cada configuración de
hardware.

## Secuencia

1. **Capas:** aplicación, host/HBA, fabrics FC, cabina y gestión.
2. **Provisionamiento:** discos → pool → volumen/LUN → host mapping.
3. **Multipath:** dos fabrics y rutas alternativas hacia el mismo volumen.
4. **Datos:** migración y replicación son operaciones diferentes.
5. **Prueba:** retirar paths, revisar mapping, observar capacidad y validar
   replicación y aplicación.

## Límites

- Zoning de la fabric y host mapping/masking de la cabina son controles
  distintos; ambos deben coincidir.
- RAID/DRAID, snapshot, migración y replicación no son sinónimos ni resuelven
  el mismo riesgo.
- El explainer no calcula IOPS, latencia, capacidad usable, HCL, licencias ni
  soporte de una combinación concreta.
- Aruba HPE se presenta como dependencia de LAN/gestión; no se afirma que el
  switching LAN mostrado transporte Fibre Channel.

La matriz completa de fuentes está en
[`docs/ai-context/san-storage-technical-validation.md`](../../ai-context/san-storage-technical-validation.md).
