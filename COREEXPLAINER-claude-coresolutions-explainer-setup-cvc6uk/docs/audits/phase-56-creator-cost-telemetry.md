# Fase 56 — Coste del generador de explainers

Fecha: 2026-08-10  
Versión: 0.110.0

## Resultado

El endpoint `/api/creator` devuelve el uso reportado por el proveedor y reutiliza la estimación configurable de coste. `ExplainerDraftCreator` acumula ese uso con Copilot en la telemetría local y muestra un resumen compacto.

## Integridad del flujo

- Un fallback por falta de configuración, error de red o respuesta inválida no se presenta como generación IA.
- Los fallos cuentan como intentos fallidos, pero no inventan tokens ni coste.
- La clave del proveedor sigue siendo exclusivamente server-side.
- El coste se muestra solo si el despliegue define las dos tarifas por millón de tokens; no hay precios hardcodeados.

## Verificación

Pasaron `npm run typecheck`, `npm run lint` y `npm run build`. La validación de contenido permanece sin errores estructurales y con las 22 revisiones técnicas humanas pendientes declaradas.
