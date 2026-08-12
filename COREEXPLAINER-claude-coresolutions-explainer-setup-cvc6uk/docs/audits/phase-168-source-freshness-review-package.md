# Fase 168 — Frescura en el paquete de revisión

Fecha: 2026-08-11  
Versión: 0.222.0

## Objetivo

Hacer que la señal de frescura sea utilizable fuera de la pantalla del explainer: un revisor debe poder ver en el informe reproducible qué fuentes requieren atención y por qué.

## Cambios aplicados

- El informe técnico calcula la frescura con el mismo normalizador que usa la UI.
- Cada fuente del JSON incluye `freshness.ageDays`, `freshness.dueAt`, `freshness.status` y `freshness.reason`.
- El Markdown muestra motivo y fecha sugerida de revisión junto a cada enlace.
- El resumen agrega fuentes vigentes, fuentes para revisar y fechas inválidas.
- El contrato del informe pasa a `schemaVersion: 1.4` y sus regresiones cubren también el paquete descargable.

## Límites técnicos

El informe no consulta la web ni verifica automáticamente la documentación del fabricante. `dueAt` es una fecha de mantenimiento editorial derivada de `accessedAt` y la ventana de 180 días. Una fuente vigente no implica que el diseño sea compatible con un entorno concreto; la aprobación continúa requiriendo revisión humana y evidencia del cliente.

## Verificación

```text
npm run test:technical-review-report
npm run test:technical-review-package
npm run test:source-freshness
npm run typecheck
npm run lint
npm run validate:content
npm run test:version-consistency
npm run build
```
