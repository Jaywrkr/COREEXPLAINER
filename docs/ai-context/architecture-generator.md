# Contexto del generador de arquitecturas

`/architecture` es independiente de los explainers. `src/lib/architecture/studio.ts` define el catálogo y la validación local; la IA solo propone datos que pasan por `normalizeGeneratedDiagram` y `validateStudioDiagram`. No aceptar texto libre como prueba técnica, ni permitir que la IA añada componentes, puertos o conexiones fuera del catálogo. La ruta de API no debe exponer ni registrar `OPENAI_API_KEY`.
