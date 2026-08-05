# Storyboard — Check Point en alta disponibilidad

**Revisión:** 2026-08-05
**Estado:** patrón conceptual pendiente de revisión especialista.

## Intención

Mostrar por qué ClusterXL HA requiere más que dos gateways: miembros
compatibles, VIP, sync, rutas, política y pruebas. El ejemplo separa High
Availability de Load Sharing para evitar una promesa comercial incorrecta.

## Escenas

1. **Tráfico:** usuarios, VIP, gateway y servicios.
2. **Miembros:** active/standby y requisitos comunes.
3. **Sincronización:** estado, política y camino de sync.
4. **Failover:** cambio controlado y aceptación.
5. **Límites:** pérdida de sync, VIP, política o miembro.

## Marcas

Check Point es el producto central; Aruba HPE representa la conectividad y
VMware/Broadcom las cargas detrás del gateway. Los nombres de modelos,
licencias y releases quedan fuera del patrón y deben validarse.
