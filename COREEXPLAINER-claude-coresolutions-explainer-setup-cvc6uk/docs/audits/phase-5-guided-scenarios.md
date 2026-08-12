# Fase 5 — Escenarios guiados con ciclo completo

**Fecha:** 2026-08-06  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.57.0

## Objetivo

Evitar que un escenario de fallo sea solo una animación de “nodo apagado”. Para que sea útil en una conversación de arquitectura debe conducir desde el síntoma hasta la evidencia de recuperación.

## Cobertura medida

- 22 de 22 temas declaran al menos un escenario.
- VCF aporta pasos authored con decisiones específicas.
- Los otros temas reciben el fallback compartido de cuatro fases, sin inventar comandos ni acciones de fabricante.

## Contrato aplicado

La publicación falla si un tema no tiene escenarios o si un escenario authored omite una fase:

1. **Observar:** describir el síntoma y los componentes afectados.
2. **Diagnosticar:** formular una hipótesis comprobable y buscar evidencia.
3. **Recuperar:** elegir el runbook aprobado; la demo no ejecuta cambios.
4. **Validar:** comprobar servicio, dependencias, capacidad, logs y criterio de aceptación.

Los pasos genéricos usan los campos `summary`, `detail`, `affectedNodes` y `limitation` del escenario. Cuando un tema necesite una secuencia específica, puede reemplazar el fallback con `guidedSteps` y fuentes propias.

## Límite operativo

La simulación cambia únicamente el estado visual del modelo. No llama APIs, no ejecuta comandos y no autoriza failover, restore, escalamiento ni remediación sobre infraestructura real.

## Validación ejecutada

- `npm run typecheck`
- `npm run lint`
- `npm run build`
