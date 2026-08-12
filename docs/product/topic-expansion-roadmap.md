# Roadmap de nuevos explainers CORESOLUTIONS

## Criterio de selección

Los siguientes temas no se proponen para llenar el dashboard. Cada uno conecta varias marcas del portafolio con una conversación que un cliente reconoce: disponibilidad de un servicio, conectividad segura de una sede e integración gobernada. Los tres requieren el mismo contrato fuente→escena, perfil de integridad y revisión especialista que los 22 temas existentes.

## 1. Del SLO al cambio seguro

**Necesidad:** explicar cómo un equipo pasa de detectar degradación de una aplicación a decidir un cambio de capacidad sin automatizar a ciegas.

**Marcas:** IBM Instana, IBM Turbonomic, VMware/Broadcom, Kubernetes y OpenTelemetry.

**Secuencia visual:** servicio y SLO → señal y trazabilidad → hipótesis → recomendación de recurso → guardrail/aprobación → resultado medido.

**Valor:** une observabilidad y optimización en una conversación útil para gerente, SRE e infraestructura. La fuente de IBM confirma que la integración permite revisar y ejecutar acciones de Turbonomic desde Instana, con prerrequisitos de versiones, licencias, roles y configuración; no se presentará como automática por defecto.

**Límite principal:** una recomendación depende de targets, permisos, restricciones, ventanas y rollback. Ninguna animación calculará una acción real ni prometerá cumplimiento de SLO.

## 2. Sucursal segura: acceso, aplicación y camino WAN

**Necesidad:** explicar por qué SD-WAN, firewall, identidad y aplicación no son una única "caja de conectividad".

**Marcas:** HPE Aruba Networking EdgeConnect, Check Point y servicios del data center/VCF.

**Secuencia visual:** usuario/sucursal → underlay → overlay e intención de negocio → inspección y segmentación → aplicación → telemetría/prueba de retorno.

**Valor:** facilita preventa y diseño con clientes multisede sin prometer que SD-WAN reemplaza una política de seguridad o que un túnel demuestra acceso a una aplicación.

**Límite principal:** modelo de edge, release de Orchestrator, circuitos, routing, NAT, inspección y retorno se validan por cliente.

## 3. Producto API: del contrato al servicio operable

**Necesidad:** profundizar en webMethods desde la perspectiva del consumidor de API y del dueño del servicio, no solo de la integración interna.

**Marcas:** IBM webMethods Hybrid Integration, IBM API Connect/webMethods API Gateway, Instana y Check Point como contexto de operación.

**Secuencia visual:** necesidad de negocio → contrato/versionado → publicación y política → runtime/servicio → observabilidad → cambio, deprecación o rollback.

**Valor:** permite hablar con negocio, desarrollo y seguridad sobre ownership, errores, cuotas, credenciales y soporte de una API.

**Límite principal:** la disponibilidad de API Gateway/Developer Portal en un entorno SaaS nuevo se confirma con IBM; no se infiere del uso de una versión anterior ni de un diagrama.

## Orden recomendado

1. **Del SLO al cambio seguro** — máximo valor transversal y reutiliza fuentes/capacidades que ya están auditadas.
2. **Sucursal segura** — conecta redes y seguridad, dos conversaciones comerciales frecuentes.
3. **Producto API** — amplía webMethods después de confirmar la modalidad IBM del cliente.

Antes de crear cada uno: abrir una rama propia, diseñar storyboard, declarar fuentes oficiales y límites, añadir integridad y autoridad, ejecutar `audit:technical-contracts` y mantener `reviewStatus: pending` hasta revisión humana.
