# Validación técnica — Observabilidad: de la petición a la evidencia

## Alcance aprobado

Este tema es una explicación conceptual y vendor-neutral para conversaciones
con clientes. Usa OpenTelemetry como marco de instrumentación, generación,
colección y exportación; no presenta OpenTelemetry como backend ni asume una
distribución, SDK, proveedor cloud o sistema de alertas concreto.

Fuentes primarias revisadas y consultadas el `2026-08-04`:

- [What is OpenTelemetry?](https://opentelemetry.io/docs/what-is-opentelemetry/)
- [Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/)
- [Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/)
- [Traces](https://opentelemetry.io/docs/concepts/signals/traces/)
- [Metrics](https://opentelemetry.io/docs/concepts/signals/metrics/)
- [Logs](https://opentelemetry.io/docs/concepts/signals/logs/)
- [Collector](https://opentelemetry.io/docs/collector/)
- [Collector architecture](https://opentelemetry.io/docs/collector/architecture/)
- [Sampling](https://opentelemetry.io/docs/concepts/sampling/)
- [Prometheus alerting overview](https://prometheus.io/docs/alerting/latest/overview/)

## Registro de revisión

- Última revisión: `2026-08-04`.
- Fecha de consulta de las fuentes enlazadas: `2026-08-04`.
- Alcance de versiones documentado en la explicación: Collector `v0.157.0` y
  especificación OTel `1.59.0`; confirmar la release objetivo del cliente.
- La ficha visible en `/explainer/observability` replica este alcance y sus
  enlaces, y cada escena muestra sus fuentes específicas.

## Matriz de afirmaciones

| Área | Decisión técnica | Tratamiento en la demo |
|---|---|---|
| Observabilidad | Permite formular preguntas sobre el estado interno a partir de outputs instrumentados. | El recorrido termina en una pregunta operativa, no en un producto concreto. |
| Traces | Una traza representa el camino de una solicitud y está compuesta por spans. | Se dibuja el recorrido distribuido y su correlación posterior. |
| Métricas | Son mediciones agregadas útiles para tendencias, disponibilidad y alertas. | Se separan de traces y logs en la escena de señales. |
| Logs | Registran eventos y ganan contexto cuando se correlacionan con una traza. | Se presentan como evidencia complementaria, no como sustituto universal. |
| Context propagation | Transporta contexto entre servicios para mantener relaciones de una operación. | El trace ID conecta síntoma, spans y logs de la investigación. |
| Collector | Sus pipelines reciben, procesan y exportan señales; los processors pueden transformar o descartar. | La escena de colección separa receivers, processors y exporters. |
| Backend | OpenTelemetry no es un backend de almacenamiento o visualización. | Los backends aparecen como destinos externos a la capa OTel. |
| Sampling/cardinality | Reducen volumen o combinaciones, pero pueden quitar detalle o elevar coste. | Se muestran como límites explícitos en correlación y escenarios de fallo. |
| Alerting | Las reglas y la gestión de notificaciones son responsabilidades separables del almacenamiento de señales. | Alerting conecta una métrica con la investigación de traces y logs sin fijar una plataforma. |

## Reglas para futuras ediciones

1. No decir que OpenTelemetry almacena o visualiza la telemetría: exporta a
   consumidores y backends.
2. Diferenciar trace, span, métrica, log, recurso, contexto y atributo.
3. No prometer causa raíz automática; una señal correlacionada reduce el
   espacio de investigación, pero necesita análisis y contexto.
4. Si se agrega un backend concreto, un lenguaje SDK, un patrón de despliegue o
   una SLO, crear un alcance y una matriz de fuentes específicos.
