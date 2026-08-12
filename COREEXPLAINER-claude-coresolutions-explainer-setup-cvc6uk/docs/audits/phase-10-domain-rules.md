# Fase 10 - Reglas tecnicas por dominio

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.64.0

## Objetivo

Conectar el motor de escenarios con el contrato tecnico de cada escena. La explicacion ya declara que nodos, relaciones y caminos son necesarios; ahora un fallo puede indicar si rompe una condicion especifica del dominio.

## Implementacion

`evaluateTechnicalRules` recibe el `TechnicalIntegrityReport` de la escena y convierte sus diagnosticos en hallazgos de escenario. Se conserva la severidad (`error` se presenta como critico y `warning` como advertencia), el dominio, la justificacion y la recomendacion escrita por el contenido.

Esto reutiliza una unica fuente de verdad: el mismo contrato que revisa el canvas alimenta la lectura del escenario. No se crean reglas duplicadas por componente ni se inventan afirmaciones sobre el entorno del cliente.

## Resultado visible

Al abrir un escenario y expandir **Reglas y evidencia**, la audiencia puede distinguir entre impacto generico del grafo (camino, relacion o capacidad) y la condicion especifica que el dominio exige (por ejemplo, un camino de storage, una relacion de control o una dependencia de red).

## Limites

El resultado sigue siendo una hipotesis sobre el animation spec y el contrato editorial. No consulta inventario, logs, licencias, metricas ni configuracion real.

## Siguiente fase

Priorizar una matriz de pruebas por dominio y enlazar cada hallazgo con el paso guiado o fuente que permite cerrarlo, empezando por los explainers con mayor uso comercial.

## Validacion

- `npm run typecheck`
- ESLint sobre los archivos modificados
- `npm run build`
