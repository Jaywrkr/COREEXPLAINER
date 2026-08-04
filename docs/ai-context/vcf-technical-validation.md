# Validación técnica — VMware Cloud Foundation

## Alcance aprobado

Este ejemplo es una explicación conceptual para una conversación inicial con
clientes. No es un HLD, un packet walk, una guía de instalación ni una
promesa de disponibilidad. La escena usa un modelo reducido y debe fijar una
versión objetivo de VCF antes de añadir detalles específicos de release.

La revisión de esta rama se contrastó con documentación primaria de VMware by
Broadcom disponible el 04-08-2026:

- [VMware Cloud Foundation — plataforma y componentes](https://www.vmware.com/products/cloud-infrastructure/vmware-cloud-foundation)
- [VCF 9.1 — preguntas frecuentes](https://www.vmware.com/docs/vmware-cloud-foundation-9-1-general-faqs)
- [VCF Networking (NSX)](https://www.vmware.com/products/cloud-infrastructure/vcf-networking)
- [vSAN — datastore compartido del clúster](https://vdc-download.vmware.com/vmwb-repository/dcr-public/222b124e-7adf-430c-bd3d-fdf3eef99099/976ba686-c3a3-4896-b883-0b01f8acd86b/GUID-21C4005E-CDCF-4FE8-B632-E3D0F5A34483.html)
- [vSphere HA — condiciones de reinicio tras una falla](https://knowledge.broadcom.com/external/article/316525/determining-why-and-which-virtual-machin.html)
- [vSphere HA — fallos por capacidad o visibilidad de storage](https://knowledge.broadcom.com/external/article/441641/vsphere-ha-failover-fails-with-insuffici.html)

## Matriz de afirmaciones

| Área | Tratamiento anterior | Decisión técnica | Estado |
|---|---|---|---|
| Componentes de VCF | “VCF = cómputo + vSAN + NSX” | Mantenerlos como capacidades principales, aclarando que VCF incluye servicios de gestión, operación y otros componentes. | Corregido |
| Consola única | “Todo se administra desde un único panel” | Eliminar la afirmación absoluta. vCenter gestiona inventario/operaciones de vSphere; la operación de VCF usa componentes de gestión y ciclo de vida según release. | Corregido |
| vSAN | “Integra los discos en storage compartido” | Mantener, con la condición “cuando vSAN está habilitado”: agrega storage local de hosts en un datastore compartido. | Corregido |
| NSX | “Despliega la red virtual” | Precisar que aporta networking y seguridad definidos por software; no reemplaza automáticamente toda la red física. | Corregido |
| Falla de host | “Las cargas se reubican automáticamente” | Cambiar a “HA puede reiniciar VMs protegidas” y explicar condiciones: capacidad, datastore accesible, reglas, prioridades y configuración. | Corregido |
| Disponibilidad | “99.97% objetivo” | Retirar la cifra: no queda respaldada por una fuente de producto en este alcance y puede confundirse con un SLA. | Retirado |
| Minutos vs. semanas | Resultado absoluto | Convertirlo en beneficio condicionado: algunos flujos automatizados pueden acelerarse; depende de diseño, catálogo y operación. | Corregido |
| Camino de datos | `Usuarios → VCF → Apps` | Separar gestión de datos: `Usuarios → clúster → Apps`; VCF queda como plano de gestión conceptual. | Corregido |
| Flechas del clúster | vSAN/NSX reportan a vCenter | Cambiar a vCenter → hosts y hosts → servicios; documentar que son relaciones conceptuales, no packet walk. | Corregido |

## Reglas para futuras ediciones

1. Toda cifra, SLA, porcentaje, tiempo o capacidad debe tener una fuente
   explícita y una versión de VCF asociada.
2. No usar “automático”, “sin interrupción”, “único panel” o “sin depender del
   hardware” sin indicar condiciones y límites.
3. Separar siempre plano de gestión, plano de control y camino de datos.
4. Si una arista del spec es pedagógica, declararlo en el storyboard; no
   presentarla como packet walk.
5. Antes de publicar una modificación de VCF, revisar esta matriz con un
   arquitecto o especialista que conozca el entorno objetivo del cliente.
