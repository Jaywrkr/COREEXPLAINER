# Fase 63 — Mantenimiento de dependencias y seguridad

Fecha: 2026-08-10  
Versión: 0.117.0

## Resultado

Se añadieron:

- `.github/dependabot.yml`, con revisión semanal de npm y GitHub Actions y grupos de producción/desarrollo;
- `SECURITY.md`, con un flujo privado para reportar vulnerabilidades y reglas para no exponer secretos o datos de clientes.

## Relación con el quality gate

Cada PR generado por Dependabot pasa por `.github/workflows/quality.yml`: auditoría, content gate, regresiones del guard de IA, typecheck, lint y build. Las actualizaciones mayores continúan sujetas a revisión manual.

## Verificación

El cambio no modifica el runtime. Pasaron `npm run validate:content`, `npm run test:ai-guards`, `npm run typecheck`, `npm run lint` y `npm run build`.
