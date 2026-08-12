# Contexto del generador de arquitecturas

`src/lib/architecture/generator.ts` solo puede construir borradores desde `solutionPatterns`. No aceptar texto libre como prueba técnica y no cambiar ningún estado de revisión. Para agregar un patrón, validar sus explainers vinculados y sus marcas mediante el gate existente antes de exponerlo en `/architecture`.
