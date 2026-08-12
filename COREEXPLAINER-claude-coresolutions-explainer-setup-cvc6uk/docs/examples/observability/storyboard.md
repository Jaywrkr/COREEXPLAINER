# Storyboard — Observabilidad: de la petición a la evidencia

Ejemplo independiente usado por `/explainer/observability`. Explica cómo una
arquitectura distribuida produce, transporta y correlaciona telemetría. No es
una guía de instalación ni prescribe un backend o una distribución concreta.

## Estructura narrativa

Recorrido → señales → colección → correlación → límites y diagnóstico.

### Paso 1 — El recorrido

**Escena**: `request-path`. Una solicitud cruza gateway, checkout, pagos y una
base de datos.

**Mensaje**: una petición distribuida necesita contexto para reconstruir su
camino completo; mirar cada servicio en aislamiento puede ocultar la causa.

### Paso 2 — Las señales

**Escena**: `signals`. Un servicio instrumentado produce traces, métricas y
logs, cada uno con una pregunta operativa diferente.

**Mensaje**: OpenTelemetry es una capa de instrumentación, generación,
colección y exportación; no es el backend final ni una promesa de que toda
señal tenga la misma semántica.

### Paso 3 — La colección

**Escena**: `collection`. El Collector recibe, procesa y exporta señales por
pipelines.

**Mensaje**: receivers, processors y exporters son etapas explícitas; un
processor puede transformar, enriquecer, filtrar o descartar datos.

### Paso 4 — La correlación

**Escena**: `correlation`. Una alerta basada en métricas lleva al operador a
traces y logs relacionados mediante contexto y trace ID.

**Mensaje**: observabilidad útil significa poder formular preguntas y llegar a
evidencia contextual, considerando sampling, cardinalidad y coste.

### Paso 5 — Límites y diagnóstico

**Escena**: `incident`. Se pueden activar latencia en pagos, caída del
Collector, descarte en un processor o cardinalidad excesiva.

**Mensaje**: un dashboard no garantiza causa raíz. La operación también debe
observar la propia cadena de telemetría y declarar qué se pierde cuando falla.

## Límites técnicos de esta demo

- No modela una distribución específica de OpenTelemetry, un proveedor de
  backend, un lenguaje SDK ni una topología de despliegue (agent, gateway o
  sidecar).
- Las señales se muestran juntas con fines pedagógicos; sus modelos, costes,
  retención y consultas reales dependen del backend y de la configuración.
- La animación no calcula latencia, sampling, cardinalidad ni backpressure; los
  escenarios representan preguntas de diseño, no resultados de un benchmark.
- Un trace, métrica o log perdido no se recupera automáticamente por dibujarlo;
  retries, buffers, límites y seguridad deben validarse en la implementación.
