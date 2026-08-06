# Fase 3 — Experiencia para cliente y especialista

**Fecha:** 2026-08-06  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.55.0

## Objetivo

Comprobar que la misma explicación sirve para iniciar una conversación con un cliente y para orientar una revisión técnica, sin duplicar ni contradecir el contenido.

## Resultado aplicado

En modo **Cliente** y **Conceptual**, cada escena incorpora el bloque colapsable **Qué debe quedar claro**. Presenta tres preguntas que un facilitador puede comprobar antes de avanzar:

- **Problema:** qué necesidad resume el tema.
- **Recorrido:** qué flujo o relación se está observando.
- **Decisión:** qué impacto, riesgo o siguiente conversación importa.

Los textos se derivan de `tagline`, `caption` y `businessImpact`, por lo que no existe una segunda versión manual de la verdad técnica. El modo **Técnico** conserva la revisión, las fuentes, los contratos de integridad y los límites especializados.

## Cobertura auditada

- 22 temas registrados.
- 22 temas con al menos cuatro pasos narrativos, impacto de negocio y fuentes por paso.
- 22 temas con perfil de integridad técnica por escena.
- 22 temas con alcance y fecha de revisión declarados.

## Criterio de aceptación

Una persona puede explicar qué problema se está tratando, qué camino muestra la escena y qué decisión debería discutir. Un especialista puede cambiar a Técnico y encontrar fuentes, alcance, reglas de topología y limitaciones sin que el modo cliente prometa más de lo que el modelo demuestra.

## Límites

Esta fase valida la estructura de la experiencia, no reemplaza entrevistas con clientes ni la certificación de un fabricante. La siguiente fase debe usar sesiones observadas y registrar dónde una persona se detiene, interpreta mal una flecha o no encuentra la evidencia que necesita.

## Validación ejecutada

- `npm run typecheck`
- `npm run lint`
- `npm run build`
