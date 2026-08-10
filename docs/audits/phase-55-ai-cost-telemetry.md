# Fase 55 — Telemetría de coste de IA

Fecha: 2026-08-10  
Versión: 0.109.0

## Resultado

Copilot conserva el límite de tokens y ahora puede exponer un coste estimado por respuesta. La estimación se calcula en el servidor y se transporta con el uso de la respuesta; el panel acumula el total en la telemetría local del navegador.

## Configuración

Definir ambas variables en el entorno del despliegue:

- `AI_INPUT_COST_PER_MILLION_USD`
- `AI_OUTPUT_COST_PER_MILLION_USD`

Los valores son dólares por millón de tokens. Si una variable falta, no es numérica o está fuera de un rango seguro, no se informa coste. No se han hardcodeado precios de proveedor, porque pueden cambiar.

## Límites y trazabilidad

- Es una estimación orientativa basada en los tokens devueltos por el proveedor.
- La telemetría acumulada vive en `localStorage` del navegador; no es facturación ni cuota multiusuario.
- Las tarifas efectivas y la factura deben verificarse en el proveedor de IA.
- La implementación no altera las acciones controladas ni el guard de presupuesto existente.

## Verificación

`npm run validate:content`, `npm run typecheck`, `npm run lint` y `npm run build` deben ejecutarse antes de abrir el PR.
