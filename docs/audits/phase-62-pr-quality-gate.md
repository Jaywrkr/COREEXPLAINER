# Fase 62 — Quality gate automático de PR

Fecha: 2026-08-10  
Versión: 0.116.0

## Resultado

`.github/workflows/quality.yml` ejecuta en GitHub Actions para cada pull request y cada push a `main`:

1. instalación reproducible con `npm ci`;
2. auditoría de dependencias de producción;
3. validación estructural y semántica del contenido;
4. regresiones offline del guard de IA;
5. TypeScript, lint y build de producción.

## Seguridad operativa

- El job declara únicamente `contents: read`.
- No necesita secretos ni llama a OpenAI o Redis.
- Tiene timeout de 10 minutos y cancela ejecuciones anteriores de la misma rama.
- El build no crea despliegues de Vercel; solo valida el artefacto.

## Verificación local

La misma secuencia pasó localmente en Node 24: `npm ci` es la instalación que debe usar el runner, seguida de `npm audit`, `npm run validate:content`, `npm run test:ai-guards`, `npm run typecheck`, `npm run lint` y `npm run build`.
