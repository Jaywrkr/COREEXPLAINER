# Motor de escenarios guiados

## Objetivo

Convertir un escenario de fallo en una conversacion didactica: primero se
observa el sintoma, despues se formula una hipotesis, se explica la decision
de recuperacion y finalmente se valida el resultado. El motor es una ayuda de
information design para clientes y equipos internos; no ejecuta acciones.

## Flujo de datos

1. `ExplainerMeta.failureScenarios` declara el escenario y, opcionalmente, sus
   pasos `guidedSteps`.
2. `getGuidedScenarioSteps` devuelve los pasos authored o un fallback de cuatro
   fases para contenido legado.
3. `ExplainerLayout` conserva el indice de la fase y lo comparte con el panel y
   el canvas.
4. `FailureScenarioPanel` muestra evidencia, resultado esperado, nodos
   afectados y limitaciones; su navegacion no altera el estado tecnico de la
   simulacion.
5. `SceneEngine.setFocusNodes` atenua componentes no relacionados y resalta los
   nodos y aristas relevantes para la fase activa.

## Contrato de un paso

```ts
{
  id: "diagnose",
  kind: "diagnose",
  title: "Correlaciona la senal",
  instruction: "Relaciona la alerta con el camino de datos.",
  evidence: "Revisa la senal que confirma la dependencia.",
  expected: "Obten una hipotesis comprobable antes de cambiar nada.",
  focusNodeIds: ["collector", "service"],
}
```

`kind` admite `observe`, `diagnose`, `recover` y `validate`. Los pasos authored
deben citar al menos una fuente mediante `sourceIds`; el validador comprueba
IDs unicos, texto no vacio, fuentes existentes y que cada `focusNodeId` exista
en la escena del escenario. Los escenarios con pasos authored deben tener al
menos tres fases; se recomienda cubrir las cuatro.

## Checkpoints de decision

Una fase puede declarar `decision` cuando conviene que el cliente contraste
hipotesis antes de avanzar:

```ts
decision: {
  question: "Que evidencia necesitas antes de afirmar que HA puede recuperar?",
  options: [
    {
      id: "capacity-and-storage",
      label: "Capacidad, storage visible y politicas compatibles",
      feedback: "Es la hipotesis mas completa para este modelo.",
      outcome: "recommended",
      focusNodeIds: ["host2", "vsan"],
    },
  ],
}
```

Cada checkpoint debe tener al menos dos opciones y exactamente una con
`outcome: "recommended"`. `incomplete` y `unsafe` no son respuestas
"incorrectas" universales: indican que falta evidencia o que la afirmacion
seria arriesgada en el alcance de la escena. Al seleccionar una opcion, el
panel muestra el razonamiento y el diagrama puede cambiar su foco.

## Criterios de precision

- Separar evidencia observada de hipotesis y de accion propuesta.
- Usar lenguaje condicional: la recuperacion depende de topologia, capacidad,
  politicas, version, licenciamiento y procedimientos del cliente.
- Explicar el criterio de aceptacion y las dependencias que deben validarse;
  "restaurado" no equivale a "servicio validado".
- Mantener `limitation` visible para evitar que una animacion se interprete como
  garantia de HA, RTO/RPO o automatizacion universal.

## Evolucion recomendada

El fallback garantiza cobertura inmediata para el catalogo existente. Cada
nuevo tema puede reemplazarlo con pasos especificos y fuentes por fase cuando
la narrativa y la revision tecnica esten maduras.
