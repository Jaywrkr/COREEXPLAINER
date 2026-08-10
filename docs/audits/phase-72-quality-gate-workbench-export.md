# Fase 72 · Quality gate del Workbench

Fecha: 2026-08-10  
Versión: 0.126.0

## Qué cambia

- GitHub Actions ejecuta `npm run test:workbench-export` después de los guardas de IA.
- El mismo comando queda documentado en el quality gate local de `CONTRIBUTING.md`.
- La prueba es offline y no requiere secretos, navegador ni servicios externos.

## Por qué importa

El Workbench es una salida técnica que puede terminar en tickets, handoffs o revisiones. Proteger su formato en CI evita que una refactorización visual rompa silenciosamente estados, fuentes o límites.

## Verificación

- `npm run test:workbench-export` ✅
- `npm run typecheck` pendiente de ejecutar después de cambios de workflow/documentación.
- `npm run lint` pendiente de ejecutar después de cambios de workflow/documentación.
