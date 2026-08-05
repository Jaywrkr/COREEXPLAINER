# Validación técnica — Backup y Disaster Recovery

**Última revisión:** 2026-08-04  
**Estado:** `pending` — falta la revisión de un especialista con el entorno,
licencias y releases del cliente.

## Alineación con CORESOLUTIONS

El patrón usa el portafolio documentado en
[`docs/product/portfolio.md`](../product/portfolio.md): VMware/Broadcom para
las cargas virtualizadas, Lenovo para la plataforma, Veeam para protección e
IBM para copias/replicación de storage. Aruba HPE y Check Point se presentan
como dependencias de red y seguridad de la recuperación, no como una
integración automática.

## Matriz de afirmaciones

| Afirmación del explainer | Evidencia consultada | Límite que debe mantenerse |
|---|---|---|
| RPO expresa pérdida aceptable y RTO tiempo objetivo de recuperación | [NIST SP 800-34](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final), [NIST RTO](https://csrc.nist.gov/glossary/term/recovery_time_objective) | Son objetivos de negocio; no son SLA ni resultado garantizado. |
| Veeam coordina backup image-based de VMs VMware usando mecanismos de la plataforma | [Veeam backup overview](https://helpcenter.veeam.com/docs/vbr/userguide/about_backup.html), [VMware support](https://helpcenter.veeam.com/docs/vbr/userguide/platform_support_vm.html) | Confirmar vSphere/VCF, versión, transport mode, aplicación y HCL. |
| La arquitectura separa hosts, proxies/data movers y repositories | [Veeam backup architecture](https://helpcenter.veeam.com/docs/vbr/userguide/backup_architecture.html), [repositories](https://helpcenter.veeam.com/docs/vbr/userguide/backup_repository.html) | El diseño final puede variar por escala, red, tipo de repositorio y licencia. |
| Inmutabilidad y copias aisladas reducen riesgo de borrado/ransomware | [Veeam immutability](https://helpcenter.veeam.com/docs/vbr/userguide/immutability.html), [CISA Ransomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide) | No elimina credenciales comprometidas, errores de política ni necesidad de restore tests. |
| IBM FlashSystem ofrece Safeguarded Copy y snapshots con políticas | [IBM Safeguarded Copy](https://www.ibm.com/docs/en/flashsystem-7x00/9.1.1?topic=flashcopy-configuring-safeguarded-copy-function), [IBM snapshots](https://www.ibm.com/docs/en/flashsystem-7x00/9.1.1?topic=volumes-snapshots) | Confirmar familia FlashSystem, código 9.1.1, retención y administración. |
| Metro/Global Mirror tienen semánticas síncronas/asíncronas diferentes | [IBM replication session types](https://www.ibm.com/docs/en/csm/6.3.15?topic=replication-session-types) | Latencia, distancia y política determinan RPO; no prometer cero pérdida. |
| Lenovo ThinkSystem es una plataforma posible para cómputo/storage | [Lenovo data center solutions](https://www.lenovo.com/us/en/servers-storage/solutions/), [Lenovo + Veeam](https://www.lenovo.com/us/en/servers-storage/solutions/smb/) | Modelo, firmware, capacidad y soporte deben dimensionarse. |
| Recuperar significa validar aplicación y dependencias | [NIST SP 800-34](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final), [CISA advisory](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-352a) | Una copia legible no demuestra servicio utilizable ni cumplimiento del RTO. |

## Decisiones de lenguaje

- Decimos **patrón ilustrativo**, no “arquitectura certificada”.
- Decimos **copia protegida/inmutable** solo cuando la política y el destino
  soportan esa propiedad; un snapshot local no se presenta como backup.
- No mezclamos backup, snapshot y replicación: responden a objetivos y riesgos
  diferentes y pueden coexistir.
- Los escenarios son señales pedagógicas: matar un nodo no ejecuta un fallo
  real ni calcula métricas de producción.

## Fuentes y marcas

La evidencia pública de la relación comercial se mantiene en [perfil público de
CORESOLUTIONS](https://ec.linkedin.com/company/coresolutionssa) y [directorio
IBM Partner Plus](https://www.ibm.com/partnerplus/directory/company/4548). La
lista canónica de marcas y la regla para futuras sesiones están en
[`docs/product/portfolio.md`](../product/portfolio.md).
