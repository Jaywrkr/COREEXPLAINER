# Escenarios interactivos de fallo

## Propósito

Los escenarios de fallo son simulaciones guiadas para explicar dependencias y
condiciones de resiliencia. No son un simulador de producción, un HLD ni una
promesa de disponibilidad.

El contenido vive en `ExplainerMeta.failureScenarios` dentro de
`src/content/types.ts`. El motor solo recibe una lista de IDs y marca esos
nodos como no disponibles; toda interpretación para el cliente debe vivir en
el escenario (`detail`, `limitation` y `affectedNodes`).

## Contrato

Cada escenario debe declarar:

- `id`: identificador estable.
- `sceneId`: escena donde tiene sentido.
- `label` y `summary`: texto breve para el selector.
- `detail`: qué cambia en la simulación y cuál es el comportamiento esperado.
- `limitation`: qué no demuestra y qué condiciones no se están simulando.
- `affectedNodes`: nombres legibles para la explicación.
- `deadNodeIds`: IDs de los nodos que el motor debe marcar como no disponibles.
- `guidedSteps` (opcional): secuencia de observaciÃ³n, diagnÃ³stico, recuperaciÃ³n y
  validaciÃ³n. Cada paso puede declarar `focusNodeIds` para concentrar el diagrama
  en la evidencia relevante.

## Motor de escenarios guiados

Cuando un escenario no tiene `guidedSteps` propios, la aplicaciÃ³n genera una
secuencia base de cuatro fases mediante `src/lib/scenarios/guidedScenario.ts`.
Esto permite que los escenarios existentes sigan siendo Ãºtiles mientras cada
explicaciÃ³n incorpora progresivamente un runbook educativo mÃ¡s especÃ­fico.

El panel mantiene el escenario seleccionado, permite avanzar o volver a una fase
y puede minimizarse sin desactivar la simulaciÃ³n. La fase activa se refleja en
el canvas: los nodos enfocados y sus relaciones permanecen visibles, mientras
el resto se atenÃºa. NingÃºn paso ejecuta comandos, cambia una configuraciÃ³n o
constituye un procedimiento aprobado para producciÃ³n.

## Reglas de precisión

1. Usar lenguaje condicional para HA, recuperación, capacity planning y
   continuidad. Evitar “siempre”, “automático”, “sin interrupción” o
   “garantizado”.
2. Diferenciar plano de gestión, camino de datos y almacenamiento. La caída
   de un componente de gestión no debe describirse automáticamente como caída
   de las aplicaciones.
3. Mantener los escenarios conceptuales y pequeños: deben mostrar una
   relación causal, no intentar reproducir todos los estados de una plataforma.
4. Si el escenario depende de una versión, política, reserva, licencia o
   topología concreta, indicarlo en `detail` o `limitation` y añadirlo a la
   matriz de validación técnica del tema.
5. Restaurar la operación normal al cambiar de escena o seleccionar
   `Restaurar`. Un clic manual en el control de un nodo cancela el escenario
   guiado para que no queden dos fuentes de verdad activas.

## Ejemplo VCF

El ejemplo contiene tres escenarios en la escena `cluster`:

- Falla de un host ESXi.
- Falla de dos hosts, con menor margen de capacidad.
- Pérdida del plano de gestión de vCenter, separada del camino de datos.

La explicación textual y la matriz de validación de VCF siguen siendo la
fuente de verdad técnica. El panel solo hace visibles esas condiciones durante
la conversación y puede minimizarse para devolver espacio visual al diagrama;
minimizarlo no restaura ni desactiva el escenario seleccionado.
