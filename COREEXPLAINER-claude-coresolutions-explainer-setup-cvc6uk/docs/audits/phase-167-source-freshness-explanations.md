# Fase 167 — Frescura de fuentes explicable

Fecha: 2026-08-11  
Versión: 0.221.0

## Objetivo

Hacer visible por qué una referencia técnica aparece como vigente o requiere revisión, sin presentar la fecha de acceso como una certificación del producto o del entorno del cliente.

## Cambios aplicados

- `summarizeSourceFreshness` deriva `ageDays`, `dueAt`, `status` y `reason` a partir de la fecha de acceso y la ventana de 180 días.
- La UI de revisión muestra la antigüedad y la fecha sugerida de revisión junto al enlace autorado.
- Las razones se separan explícitamente: dentro de ventana, revisión manual, ventana vencida y fecha inválida.
- Se añadieron regresiones para fechas actuales, vencidas, revisión manual y datos inválidos.

## Límites técnicos

La frescura es una señal editorial calculada localmente. No consulta automáticamente al fabricante, no valida licencias, compatibilidad, configuración ni estado operativo, y no convierte una fuente en evidencia del entorno del cliente. La regla de 180 días es una alerta de mantenimiento; una fuente marcada manualmente para revisión conserva ese estado aunque su fecha sea reciente.

## Verificación

```text
npm run test:source-freshness
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
