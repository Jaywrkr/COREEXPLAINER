# Portafolio de marcas de CoreSolutions

**Revisión del registro:** 2026-08-04

Este documento es la referencia de contexto comercial para los explainers.
CoreSolutions trabaja con soluciones de data center, virtualización,
almacenamiento, backup y redes respaldadas por **VMware/Broadcom, Lenovo, IBM,
Veeam, Aruba HPE y Check Point**. La lista se contrastó con el perfil público
de [CoreSolutions en LinkedIn](https://ec.linkedin.com/company/coresolutionssa),
el [directorio IBM Partner Plus](https://www.ibm.com/partnerplus/directory/company/4548)
y el [sitio de CoreSolutions](https://www.coresolutions.com.ec/).

El perfil público también identifica a CoreSolutions como **Veeam Value-Added
Reseller Gold**. Es una evidencia pública de posicionamiento comercial, no una
promesa de que cualquier licencia, versión o integración esté disponible para
cualquier cliente.

## Cómo usar la lista

- Priorizar estas marcas cuando el tema lo permita y explicar qué problema
  resuelve cada una.
- Presentar la arquitectura como patrón ilustrativo: compatibilidad, edición,
  licenciamiento, sizing, soporte y diseño final requieren validación del
  entorno del cliente.
- No introducir una marca externa como recomendación por defecto. Si una
  explicación necesita otra tecnología, declararla como dependencia neutral o
  pedir confirmación comercial antes de convertirla en oferta.
- Toda afirmación técnica debe indicar fecha de revisión, versión o familia
  comprobada y enlaces primarios en la matriz del tema.

## Mapa inicial por conversación

| Marca | Papel que puede explicar el sistema | Límite de la explicación |
|---|---|---|
| VMware/Broadcom | vSphere, VCF, HA, vSAN, NSX y cargas virtualizadas | La versión y el entitlement del cliente cambian funciones y soporte. |
| Lenovo | ThinkSystem de cómputo y almacenamiento para el data center | Modelo, firmware, HCL y sizing se validan por diseño. |
| IBM | FlashSystem, copias protegidas y replicación de almacenamiento | La familia, código y topología determinan funciones como Safeguarded Copy. |
| Veeam | Backup, repositorios, copias inmutables y recuperación de workloads | La política final depende de workload, repositorio, RPO/RTO y licencias. |
| Aruba HPE | Conectividad de campus/data center y dependencias de red | La animación no sustituye un diseño de underlay, routing o seguridad. |
| Check Point | Controles de seguridad y segmentación en los caminos de recuperación | Las reglas, inspección y operación deben probarse con el tráfico real. |

## Regla para futuras sesiones

Antes de crear un nuevo tema, leer este archivo y `docs/product/brand.md`.
El tema debe declarar en su storyboard qué marcas aparecen, qué función
representan y qué queda fuera de alcance. La fecha de la última revisión y las
fuentes se mantienen en `technicalReview` de cada tema.

## Tecnologías observadas en proyectos

El resumen de proyectos reales también muestra experiencia con **Synology,
Cisco, IBM Power/AIX, Oracle, SAP, librerías de cinta y Fibre Channel/SAN**.
Estas tecnologías deben considerarse capacidades implementadas o de
integración, pero no deben presentarse automáticamente como marcas
estratégicas actuales ni como una promesa de disponibilidad. Para decidir su
prioridad comercial hay que contrastarlas con la oferta vigente.

La evidencia operativa y el backlog derivado están en
[`docs/product/coresolutions-project-patterns.md`](./coresolutions-project-patterns.md).
