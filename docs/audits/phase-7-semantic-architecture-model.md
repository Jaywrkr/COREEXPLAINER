# Fase 7 — Modelo semántico de arquitectura

**Fecha:** 2026-08-09  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.61.0

## Objetivo

Pasar de un dibujo de nodos y flechas a una representación que pueda responder qué papel cumple cada componente y cómo entra o sale el flujo de una escena.

## Resultado aplicado

El módulo `src/lib/semantic-model/` deriva un modelo semántico desde el mismo `Scene` usado por el motor visual. No se crea una segunda copia manual de la topología.

Para cada componente identifica:

- rol: actor, control, cómputo, storage, red o servicio;
- entradas y salidas;
- si es punto de entrada o salida;
- si declara capacidad;
- si genera actividad.

Para cada relación conserva su tipo y significado: datos, control, storage, dependencia o fallo.

## Resultado visible

En modo **Técnico**, la ficha de escena incluye el bloque colapsable **Modelo semántico**. Muestra entradas, salidas, rol de cada componente y componentes aislados. Cliente y Conceptual no reciben esta carga adicional.

## Decisión técnica

La semántica se calcula desde `animation-spec` para mantener alineados dibujo, animación, diagnóstico y futura simulación. Los nombres y definiciones no se inventan a partir de texto libre; el rol se deriva del `NodeKind` validado y las relaciones del `EdgeKind` validado.

## Próximo paso

Usar este modelo para reglas de consistencia y análisis what-if: qué dependencias quedan sin camino, qué salidas se pierden cuando falla un nodo y qué evidencia debe revisarse.

## Validación ejecutada

- `npm run typecheck`
- `npm run lint` (sin warnings en los archivos modificados)
- `npm run build`
