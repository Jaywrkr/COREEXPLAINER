# Validación técnica — IBM webMethods

**Última revisión:** 2026-08-05
**Estado:** `pending`; requiere revisión especialista.

## Alcance

El tema usa IBM webMethods Hybrid Integration y productos 11.1 como referencia
conceptual. Cubre Integration Server, API Gateway, Developer Portal, control
plane y runtimes remotos; no afirma disponibilidad regional, paridad funcional,
conectores o licencias para un cliente concreto.

## Fuentes primarias

| ID | Fuente | Consultada |
|---|---|---|
| `wm-overview` | [Hybrid Integration overview](https://www.ibm.com/docs/en/hybrid-integration-lib/hybrid-integration/saas?topic=overview) | 2026-08-05 |
| `wm-architecture` | [Hybrid Integration architecture](https://www.ibm.com/docs/en/hybrid-integration-lib/hybrid-integration/saas?topic=overview-solution-architecture) | 2026-08-05 |
| `wm-interoperability` | [Supported version interoperability](https://www.ibm.com/docs/en/webmethods-integration/webmethods-installer/11.1.0?topic=supported-version-interoperability-webmethods-products) | 2026-08-05 |
| `wm-gateway` | [API Gateway overview](https://www.ibm.com/docs/en/wm-api-gateway-saas/11.1.0?topic=api-gateway-overview) | 2026-08-05 |
| `wm-gateway-components` | [API Gateway components](https://www.ibm.com/docs/en/wam/wm-api-gateway/11.1.0?topic=concepts-api-gateway-components) | 2026-08-05 |
| `wm-services` | [Integration Server services](https://www.ibm.com/docs/en/webmethods-integration/wm-integration-server/11.1.0?topic=operations-about-services) | 2026-08-05 |

## Límites

- El patrón híbrido separa control plane y data plane, pero la ubicación,
  conectividad, región, VPE/VPN y soberanía se validan por arquitectura.
- API Gateway aplica políticas; no garantiza que el backend transforme o
  procese correctamente el mensaje.
- La interoperabilidad depende de releases concretos: Integration Server,
  Gateway, Portal, runtimes y conectores deben revisarse juntos.
