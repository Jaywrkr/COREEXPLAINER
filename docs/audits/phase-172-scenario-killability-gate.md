# Fase 172 — Gate de simulabilidad de escenarios

Fecha: 2026-08-11  
Versión: 0.226.0

## Objetivo

Impedir que un escenario de fallo prometa una interacción que la escena no permite ejecutar. `deadNodeIds` representa una acción de simulación; por tanto, cada nodo debe estar declarado explícitamente como `killable`.

## Cambios aplicados

- `validateFailureScenarioKillability` cruza cada nodo caído con el contrato de la escena.
- Un nodo visible pero no simulable produce un error de contenido, no una advertencia silenciosa.
- La regresión cubre un nodo permitido y un nodo sin `killable`.
- La validación completa de los 22 explainers no encontró incumplimientos.

## Límites técnicos

`killable` solo autoriza la interacción conceptual de la animación. No significa que el nodo pueda apagarse en producción, ni que exista una capacidad real de recuperación. La ejecución de la UI sigue siendo local y reversible.

## Verificación

```text
npm run test:failure-simulation-validation
npm run validate:content
npm run typecheck
npm run lint
npm run test:version-consistency
npm run build
```
