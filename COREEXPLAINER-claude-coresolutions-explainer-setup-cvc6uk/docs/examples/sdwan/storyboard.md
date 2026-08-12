# Storyboard — SD-WAN multisede

**Revisión:** 2026-08-05
**Estado:** patrón conceptual pendiente de revisión especialista.

## Intención

Separar underlay y overlay para explicar cómo EdgeConnect usa múltiples
transportes, Business Intent Overlays, path conditioning y seguridad por
aplicación. El ejemplo no presenta una línea de Internet como equivalente
universal a MPLS.

## Escenas

1. **Underlay:** transportes y mediciones.
2. **Overlay:** intención de negocio por aplicación.
3. **Selección:** métricas, política y camino alterno.
4. **Seguridad:** segmentación, firewall y retorno.
5. **Límites:** brownout, BIO, edge y seguridad.

## Marcas

Aruba HPE es la tecnología central; Check Point representa un control de
seguridad posible y VMware/Broadcom las cargas que consumen conectividad. Los
modelos, releases, circuitos y políticas deben validarse en cada cliente.
