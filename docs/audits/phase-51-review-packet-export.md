# Fase 51 — Paquete exportable de revisión técnica

Fecha de revisión: 2026-08-10  
Versión: 0.105.0

## Problema

La cola permitía localizar pendientes, pero el especialista debía copiar manualmente el alcance, las fuentes y las advertencias para trabajar fuera de la aplicación.

## Resultado aplicado

`TechnicalReviewPacketDownload` genera en el navegador un archivo `technical-review-<slug>.md` con alcance, fecha, ficha técnica, checklist de producto/release/HCL, diagrama, escenarios, evidencia, advertencias del gate, fuentes y campos de resultado.

## Seguridad editorial

La exportación no hace llamadas externas, no incluye prompts ni secretos y no modifica el estado del explainer. La aprobación continúa dependiendo de un cambio revisable en Git/PR.

## Verificación

- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
