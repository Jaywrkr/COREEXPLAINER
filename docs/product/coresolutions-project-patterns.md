# Patrones reales de proyectos de CoreSolutions

**Fuente de contexto:** `Proyectos Planificacion.csv` (copia local entregada
por el usuario)  
**Revisión del resumen:** 2026-08-04  
**Propósito:** alimentar el backlog de explainers con capacidades que
CoreSolutions ha implementado en proyectos reales.

## Nota de privacidad y método

Este documento es un resumen sanitizado. No incluye nombres de clientes,
correos, códigos de proyecto, enlaces de imágenes/OPI ni datos operativos
confidenciales. El CSV original contiene 348 registros con código, 226
descripciones, 227 campos de tareas, 19 registros de capacitación y 169
enlaces de imagen.

Los conteos de tecnología de abajo son **coincidencias de palabras clave** y no
una auditoría comercial: un proyecto puede aparecer en varias categorías y una
ausencia de palabra no demuestra que una tecnología no se haya utilizado. Las
fechas del CSV tienen formatos mezclados y no se usan aquí para afirmar
vigencia de versiones.

## Capacidades observadas

| Área | Evidencia recurrente en proyectos | Marcas o tecnologías observadas |
|---|---|---|
| Virtualización | Clústeres, ESXi/vSphere, VDI, ampliación de hosts, migración de VMs y licenciamiento | VMware/Broadcom, Lenovo, Flex System |
| Storage empresarial | Expansión de discos, pools, arreglos, RAID/DRAID, LUNs, mapeo a servidores, migraciones y replicación | IBM FlashSystem, Storwize/V7000/V5000, IBM Power, Lenovo |
| Backup y archivo | Jobs, repositorios, migración de licencias, respaldos de VMs/AIX/NAS, cintas y copias fuera de línea | Veeam, TS4300/LTO, Synology, IBM |
| Red LAN/SAN | Switching, VLAN, trunks, routing, IRF, LAG, FC, multipath, puertos de gestión y cableado | Aruba/HPE, Cisco, IBM SAN |
| Seguridad | Firewalls nuevos o renovados, HA, migración, reglas, prevención de amenazas y puesta en producción | Check Point |
| Servidores y cargas | Rack, firmware, RAID interno, gestión remota, SO, AIX, Oracle y SAP | Lenovo, IBM Power, Oracle, SAP |
| Alta disponibilidad | Dos racks, equipos activo-activo, clústeres, enlaces redundantes, replicación y pruebas de failover | IBM, Lenovo, Aruba/HPE, VMware |
| Servicios de adopción | Transferencia de conocimiento, cursos oficiales, material, certificados, documentación y soporte remoto | CoreSolutions + fabricante |

## Secuencia recurrente de implementación

La mayoría de los alcances siguen una cadena que merece convertirse en
lenguaje visual común para todos los temas:

1. **Descubrimiento y prerrequisitos:** entender el ambiente actual, revisar
   compatibilidad, HCL, energía, rack, puertos, direccionamiento, ventanas y
   dependencias.
2. **Instalación física:** rack, PDUs, cableado eléctrico y de datos, módulos,
   discos, memoria, adaptadores y etiquetado.
3. **Gestión y firmware:** puertos de administración, consolas remotas,
   firmware/microcódigo y licencias.
4. **Configuración de plataforma:** RAID/DRAID, pools, LUNs, VLANs, trunks,
   routing, SAN, FC, multipath, hipervisor, repositorios y políticas.
5. **Integración:** presentar storage a servidores, integrar VMware/Power/AIX,
   conectar LAN/SAN, unir NAS a Active Directory, conectar Veeam y enlazar
   replicación o cintas.
6. **Migración:** mover VMs, datos, LUNs, respaldos, sistemas AIX/Oracle/SAP o
   archivos, con plan y aprobación del cliente.
7. **Pruebas:** conectividad, reconocimiento de LUNs, alta disponibilidad,
   replicación, restore, failover, rendimiento y aceptación de aplicación.
8. **Cierre y adopción:** documentación actualizada, actas, transferencia de
   conocimiento, capacitación y soporte posterior.

## Patrones de arquitectura que debemos poder explicar

### 1. Storage IBM para VMware, IBM Power y servidores x86

Un storage empresarial recibe conexiones SAN de servidores Lenovo, IBM Power o
hosts VMware. El diseño debe hacer visibles los dominios de fallo, arreglos,
pools, LUNs, zoning/multipath, presentación a hosts y criterios de rendimiento.

### 2. Backup heterogéneo con Veeam

Una plataforma Veeam puede proteger VMs VMware y, según alcance y licencia,
otras cargas como AIX, NAS o servidores físicos. El diagrama debe separar
origen, proxy/data mover, repositorio, copia fuera de línea, librería de cintas,
retención y prueba de restauración.

### 3. Dos racks activo-activo

La continuidad se construye con dos dominios físicos, red y storage redundantes,
replicación, rutas alternativas y un procedimiento de failover. El explainer
debe distinguir alta disponibilidad, replicación, backup y recuperación ante
desastre.

### 4. NAS como servicio de archivos y nube privada

Synology aparece como file server, repositorio o nube privada, con RAID,
volúmenes, Active Directory, enlaces agregados, clúster HA y migración de
archivos. Hay que explicar permisos, cuotas, disponibilidad y backup sin
confundir NAS con una plataforma de virtualización.

### 5. Red LAN/SAN integrada

La implementación cruza switching Aruba/HPE o Cisco, VLANs, trunks, routing,
LAG/IRF, FC, SAN y puertos de gestión. El valor pedagógico está en mostrar qué
tráfico va por LAN, qué tráfico va por SAN y dónde una MTU, VLAN, ruta o path
incorrecto rompe la cadena.

### 6. Firewall perimetral e interno en alta disponibilidad

Los proyectos de Check Point incluyen renovación, activación de licencias,
migración, prevención de amenazas, gateway, HA y puesta en producción. El
diagrama debe separar plano de gestión, tráfico norte-sur, tráfico este-oeste,
reglas, inspección y pruebas de retorno.

### 7. IBM Power/AIX con Oracle o SAP

Estos proyectos conectan Power, AIX, storage IBM, SAN, LUNs, replicación,
parches y bases de datos. Es un tema de integración de cargas críticas, no solo
de “instalar un servidor”.

### 8. SD-WAN y red como servicio

Hay proyectos de SD-WAN, switching, APs, SSIDs, VLANs, routing y transferencia
de conocimiento. El explainer debe explicar overlay, underlay, selección de
camino, seguridad, calidad de servicio y operación multisede.

## Backlog derivado del CSV

Prioridad alta:

1. **Cómo funciona un storage SAN empresarial** — IBM FlashSystem, pools,
   RAID/DRAID, LUNs, FC y multipath.
2. **Cómo se protege un entorno VMware, AIX y NAS con Veeam y cinta** —
   repositorios, retención, copias offline y restore.
3. **Cómo se construye un data center activo-activo** — dos racks, red,
   storage, replicación y failover.
4. **Cómo se integra LAN, SAN y servidores** — VLAN, trunks, IRF/LAG, FC,
   zoning y rutas redundantes.
5. **Cómo se migra una plataforma sin detener el negocio** — inventario,
   compatibilidad, plan, oleadas, rollback y aceptación.

Prioridad media:

6. **NAS como nube privada y servicio de archivos** — Synology, AD, HA,
   permisos, cuotas y backup.
7. **Firewall perimetral e interno con Check Point** — HA, políticas,
   inspección y migración.
8. **IBM Power/AIX para cargas Oracle y SAP** — storage, SAN, LUNs,
   replicación y continuidad.
9. **SD-WAN y conectividad multisede** — underlay, overlay, QoS y operación.
10. **Del rack a la aceptación** — ciclo completo de implementación,
   documentación, capacitación y soporte.

El batch inicial de este backlog ya implementó los temas 1, 2, 3 y 4 como
`/explainer/san-storage`, `/explainer/veeam-protection`,
`/explainer/active-active-dc` y `/explainer/lan-san`. El tema de migración y
los siguientes permanecen como la próxima tanda.

## Estado del backlog — 2026-08-05

El batch v0.26.0 incorporÃ³ los patrones 5, 7, 8, 9 y 10 como explainers
independientes: `/explainer/migration`, `/explainer/checkpoint-ha`,
`/explainer/sdwan`, `/explainer/power-aix` y
`/explainer/implementation-lifecycle`. Quedan pendientes las revisiones de
especialista y nuevos temas derivados del CSV.

## Regla para futuros explainers

Un proyecto real puede convertirse en un explainer solo después de separar:

- el patrón reutilizable;
- las marcas que realmente cumplen un papel;
- los pasos de implementación;
- las decisiones y dependencias;
- los fallos posibles;
- lo que es específico del cliente y no debe publicarse.

La fuente de la verdad técnica sigue siendo la documentación oficial de cada
producto y la revisión de un especialista. Este archivo sirve para decidir qué
historias merece la pena explicar, no para declarar que todas las combinaciones
del CSV están certificadas o vigentes.
