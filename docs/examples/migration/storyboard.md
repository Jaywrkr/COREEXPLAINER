# Storyboard — Migración sin interrupción

**Revisión:** 2026-08-05
**Estado:** patrón conceptual pendiente de revisión especialista.

## Intención

Explicar a un cliente que una migración segura es una cadena de decisiones:
inventario, compatibilidad, oleadas, validación y rollback. El diagrama evita
prometer “cero downtime” como resultado universal: el impacto depende de la
plataforma, la carga, la red, el storage y las pruebas.

## Escenas

1. **Descubrimiento:** workloads y dependencias antes de tocar infraestructura.
2. **Compatibilidad:** matriz de destino, red, storage, permisos y HCL.
3. **Oleadas:** piloto, servicios relacionados y cargas críticas.
4. **Validación:** aceptación técnica y funcional del servicio.
5. **Límites:** fallos de compatibilidad, red, storage y rollback.

## Marcas en el patrón

VMware/Broadcom representa movilidad de VMs; Lenovo representa hosts; IBM,
storage y Power; Veeam, la red de seguridad. Se deben confirmar release,
licencia, HCL, soporte de aplicación y procedimiento antes de ofertar.
