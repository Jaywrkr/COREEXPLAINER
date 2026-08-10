# Fase 71 · Contrato testeable de exportación del Workbench

Fecha: 2026-08-10  
Versión: 0.125.0

## Qué cambia

- `buildWorkbenchMarkdown` concentra la forma del paquete técnico en una función sin APIs de navegador.
- La vista actual y el paquete completo comparten el mismo formato.
- Las tareas conservan estado local, detalle, evidencia, IDs de fuente y enlaces.
- La sección de fuentes por confirmar permanece explícita.
- Se evita que títulos o evidencias con saltos de línea rompan el formato Markdown.

## Verificación

- `npm run test:workbench-export` regresión offline ✅
- `npm run typecheck` pendiente de ejecutar
- `npm run lint` pendiente de ejecutar
- `npm run test:ai-guards` pendiente de ejecutar
- `npm run validate:content` pendiente de ejecutar

## Límites

El contrato valida la salida textual, no la exactitud tecnológica del contenido ni la ejecución de tareas en una plataforma real.
