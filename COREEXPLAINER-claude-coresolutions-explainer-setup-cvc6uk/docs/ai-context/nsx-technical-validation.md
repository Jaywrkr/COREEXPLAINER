# Validación técnica — NSX: tráfico y microsegmentación

## Alcance aprobado

Este tema es una explicación conceptual para conversaciones iniciales con
clientes. Presenta una vista reducida de segmentos, overlay, Distributed
Firewall y gateways. No es un HLD, una política lista para producción, un
packet walk completo ni una guía de configuración de una release concreta.

La revisión se contrastó con documentación primaria de VMware by Broadcom el
04-08-2026:

- [VMware well-architected design: Gateway Firewalls y Distributed Firewall](https://www.vmware.com/docs/well-architected-design-gateway-firewalls-use-cases-and-scope)
- [NSX transport node profiles y overlay en VCF](https://knowledge.broadcom.com/external/article/316037/cloud-foundation-cluster-nsx-transport-n.html)
- [GENEVE/TEP y underlay incorrecto](https://knowledge.broadcom.com/external/article/436129/traffic-from-virtual-machines-fails-to-r.html)
- [Distributed Firewall: reglas, scope y Applied To](https://knowledge.broadcom.com/external/article/395504)
- [DFW bloqueando tráfico en el punto de enforcement](https://knowledge.broadcom.com/external/article/425834/network-connectivity-issues-on-vms-with.html)
- [Política de seguridad de segmento y DHCP](https://knowledge.broadcom.com/external/article/433269/virtual-machine-network-connectivity-los.html)

## Registro de revisión

- Última revisión: `2026-08-04`.
- Fecha de consulta de las fuentes enlazadas: `2026-08-04`.
- La ficha visible en `/explainer/nsx` replica este alcance y sus enlaces.

## Matriz de afirmaciones

| Área | Decisión técnica | Tratamiento en la demo |
|---|---|---|
| Segmentos | NSX puede definir segmentos lógicos; el transporte físico continúa siendo necesario. | Se separa segmento lógico de underlay. |
| Overlay | TEP, VLAN de transporte, MTU y routing sostienen los túneles GENEVE. | Aparecen como dependencias en la escena de transporte. |
| DFW | El Distributed Firewall protege tráfico east-west con enforcement distribuido en workloads. | Se muestra como decisión conceptual entre web y aplicación/datos. |
| Scope | Applied To y los grupos determinan dónde una regla se aplica y puede cambiar el resultado. | Se incluye como escenario de alcance equivocado. |
| Gateway | Gateway Firewall y DFW no son el mismo punto: uno protege límites/gateway y el otro workloads. | La escena separa north-south de east-west. |
| Tier-0/Tier-1 | Tier-0 representa conectividad northbound; Tier-1 conecta segmentos de workloads según el diseño. | Se muestra un flujo conceptual cliente → T0 → T1 → segmento. |
| Segment security | Una política de segmento puede bloquear dependencias como DHCP aunque el underlay esté activo. | Se incluye como fallo independiente. |
| Diagnóstico | El síntoma de conectividad no identifica por sí solo si la causa es overlay, regla, segmento o gateway. | La última escena separa cuatro clases de fallo. |

## Reglas para futuras ediciones

1. No presentar NSX como una única caja que “hace toda la red”: separar
   control, datapath, DFW, gateways y underlay.
2. No decir que el DFW es un firewall físico central; explicar el punto de
   enforcement distribuido y el alcance de la regla.
3. No fijar MTU, número de reglas, topología T0/T1 o modo HA sin versión,
   plataforma y fuente concretas.
4. Si se agrega NAT, BGP, load balancing, VPN, IDS/IPS o Federation, crear un
   satélite específico en lugar de sobrecargar este ejemplo.
