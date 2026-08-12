# Fase 82 · Informe técnico en JSON

Fecha: 2026-08-10  
Versión: 0.136.0

## Qué cambia

- `npm run report:technical-review:json` ejecuta el mismo cálculo del informe con salida JSON.
- Incluye `generatedAt`, resumen, filas ordenadas y la regla de prioridad.
- CI guarda Markdown y JSON en el artefacto de 14 días.

## Uso previsto

La salida JSON permite que una futura interfaz, integración o agente consuma el reporte sin hacer parsing de Markdown. No cambia estados ni ejecuta acciones.

## Límites

El JSON refleja metadatos autorados y el instante de generación. No valida disponibilidad de fuentes, compatibilidad ni exactitud tecnológica.

## Verificación

- `npm run --silent report:technical-review:json` ✅ (22 filas, 22 pendientes).
- `npm run typecheck` ✅
- `npm run lint` ✅
