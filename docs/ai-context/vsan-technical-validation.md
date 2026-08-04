# Validación técnica — vSAN y protección de objetos

## Alcance aprobado

Este tema es una explicación conceptual para conversaciones iniciales con
clientes. Presenta vSAN como un datastore distribuido que gestiona objetos y
componentes según políticas de storage. No es una guía de sizing, diseño de
OSA/ESA, configuración de fault domains ni una promesa de disponibilidad.

La revisión se contrastó con documentación primaria de VMware by Broadcom el
04-08-2026:

- [vSAN object health: reduced availability with no rebuild](https://knowledge.broadcom.com/external/article/385514/reduced-availability-with-no-rebuild-in.html)
- [vSAN fault-domain requirements and policy FTT](https://knowledge.broadcom.com/external/article/421094/clarification-on-vsan-fault-domain-failu.html)
- [vSAN component and object model](https://knowledge.broadcom.com/external/article/315507/vsan-component-limit-per-cluster.html)
- [vSAN inaccessible objects after exceeding policy tolerance](https://knowledge.broadcom.com/external/article/389599/vsan-skyline-health-data-health-vsan-o.html)
- [vSAN objects after host failure and insufficient hosts](https://knowledge.broadcom.com/external/article/431247/vsan-objects-in-reduced-availability-wit.html)
- [vSAN object inaccessibility with FTT=0](https://knowledge.broadcom.com/external/article/409448/vsan-object-inaccessible-after-host-fail.html)

## Matriz de afirmaciones

| Área | Decisión técnica | Tratamiento en la demo |
|---|---|---|
| Datastore | vSAN presenta capacidad agregada del clúster; el detalle físico depende de la arquitectura. | Se muestran discos locales y un datastore distribuido sin afirmar una topología concreta. |
| Objetos | Cada VMDK y otros elementos se gestionan como objetos compuestos por componentes. | La escena 2 separa VM, objeto y componentes. |
| Política | La política aplicada al objeto determina la tolerancia y la colocación real. | La política se dibuja como relación de control, no como una propiedad fija del clúster. |
| Fault domains | El número de hosts/dominios debe ser compatible con el método FTT/RAID solicitado. | Se muestran tres dominios como ejemplo conceptual, sin convertirlos en requisito universal. |
| Falla | Un objeto puede quedar accesible en disponibilidad reducida mientras no sea posible reconstruirlo. | La escena de falla separa accesibilidad de resync. |
| Reconstrucción | Resync requiere capacidad libre, recursos, dominios compatibles y comunicación entre hosts. | Los límites aparecen como condiciones independientes y simulables. |
| Inaccesibilidad | Si las fallas exceden la tolerancia de la política o faltan componentes activos, el objeto puede ser inaccesible. | Se evita afirmar que toda VM seguirá disponible después de cualquier falla. |
| Versiones | OSA, ESA, clústeres stretched y releases cambian requisitos y comportamiento observable. | La demo no mezcla detalles internos de esas variantes; se declaran como alcance pendiente. |

## Reglas para futuras ediciones

1. No decir “vSAN replica todo” sin nombrar la política aplicada al objeto y su
   método de tolerancia.
2. Separar siempre accesibilidad, cumplimiento de política y reconstrucción;
   son estados distintos.
3. Si se agrega OSA, ESA, stretched cluster, witness o disk groups, crear una
   escena y una matriz específica para esa variante.
4. No publicar porcentajes de capacidad, límites de componentes o requisitos
   de hosts sin asociarlos a una versión y una fuente concreta.

