# Contexto del generador de arquitecturas

> **Sincronizado:** 28-08-2026 contra `main` (`fc1c008`). Este documento
> describe controles de producto; no sustituye la HCL, el diseño ni la
> validación humana de una implementación.

`/architecture` es independiente de los explainers. `src/lib/architecture/studio.ts` define el catálogo y la validación local; la IA solo propone datos que pasan por `normalizeGeneratedDiagram` y `validateStudioDiagram`. No aceptar texto libre como prueba técnica, ni permitir que la IA añada componentes, puertos o conexiones fuera del catálogo. La ruta de API no debe exponer ni registrar `OPENAI_API_KEY`.

Una propuesta generada se distribuye por dominios y abre el canvas a pantalla
completa. El usuario puede aplicar zoom, reubicar nodos y ajustar el punto de
quiebre de un cable; esas acciones cambian la lectura del diagrama, nunca los
extremos, puertos o reglas técnicas validadas.
