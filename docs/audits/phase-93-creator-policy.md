# Fase 93 — política del generador de borradores

Versión: 0.147.0  
Fecha: 2026-08-11

## Objetivo

Aplicar al generador de contenidos el mismo rigor de seguridad y costes del Copiloto, dejando claro que una respuesta IA es un borrador educativo y no una publicación ni una ejecución.

## Contrato

`CreatorPolicy` declara:

- `mode: draft-only`.
- tokens de entrada estimados.
- máximo de salida.
- coste estimado solo con tarifas configuradas.

La ruta incluye la política en respuestas exitosas, errores del proveedor y límites de cuota. La UI la muestra junto al formulario y mantiene la plantilla local como fallback.

## Límites

El generador no publica contenido, no modifica el catálogo y no ejecuta acciones de infraestructura. Las fuentes, capacidades, versiones y escenas deben validarse antes de convertir el borrador en un explainer.

## Verificación

- `npm run test:creator-policy` ✅
- `npm run test:copilot-policy` ✅
- `npm run test:ai-guards` ✅
- `npm run typecheck` ✅
