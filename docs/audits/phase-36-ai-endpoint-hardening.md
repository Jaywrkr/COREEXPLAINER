# Fase 36 — Endpoints IA endurecidos

Fecha de revisión: 2026-08-09  
Versión: 0.90.0

## Objetivo

Evitar que una capacidad de IA pública consuma recursos sin control o deje expuesta la clave del proveedor.

## Controles aplicados

- límite de cuerpo declarado: 18 KB para copiloto y 4 KB para creador;
- límite temporal de 20 solicitudes por IP en 10 minutos por instancia;
- timeout de 25 segundos para llamadas externas;
- `AI_ENDPOINT_ENABLED=false` como interruptor de emergencia;
- respuestas genéricas para errores del proveedor;
- la clave se lee únicamente en servidor y nunca se envía al navegador.

## Límites pendientes

El rate limiting en memoria es una barrera básica y no sustituye un WAF, autenticación o un store distribuido en producción. Antes de exponerlo a clientes reales conviene añadir identidad, cuotas por cuenta y observabilidad de coste.
