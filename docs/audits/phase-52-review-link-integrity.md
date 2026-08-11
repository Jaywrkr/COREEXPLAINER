# Fase 52 — Integridad de enlaces de revisión

Fecha de revisión: 2026-08-10  
Versión: 0.106.0

## Hallazgo

Los documentos Markdown están dentro del repositorio, no en `public/` ni en una ruta App Router. Un enlace `/docs/...` en Vercel podía producir un 404 aunque el archivo existiera en Git.

## Cambio

- La cola abre `/explainer/<slug>`, una ruta pública real, y muestra la ruta documental como referencia de repositorio.
- El paquete Markdown conserva `docs/...` en código inline en vez de presentarlo como URL web desplegada.

## Verificación

- El build genera las rutas públicas de explainers y no añade una ruta `/docs` inexistente.
- `npm run validate:content`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
