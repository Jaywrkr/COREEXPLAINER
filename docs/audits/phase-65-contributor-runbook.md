# Fase 65 — Runbook de contribución

Fecha: 2026-08-10  
Versión: 0.119.0

## Resultado

`CONTRIBUTING.md` reúne en un documento corto las reglas que necesita una nueva sesión de IA o colaborador para continuar sin perder contexto:

- una rama por fase y PR antes del merge;
- documentación y auditoría por cambio visible;
- comandos del quality gate;
- rigor técnico, fuentes, límites y revisión humana;
- protección de secretos y contrato de acciones de IA;
- política de deployments manuales en Vercel.

## Verificación

El cambio es documental y de versionado. Pasaron `npm run validate:content`, `npm run test:ai-guards`, `npm run typecheck`, `npm run lint` y `npm audit --omit=dev --audit-level=high`; el build del commit anterior con el mismo runtime continúa verde.
