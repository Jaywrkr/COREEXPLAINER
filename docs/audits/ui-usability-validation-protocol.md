# Fase 11 — Protocolo de validación UX/UI

**Fecha de diseño:** 2026-08-11

Este protocolo comprueba si CORESOLUTIONS Technical Explainer ayuda a entender,
presentar y revisar contenido técnico. Las sesiones deben basarse en tareas, no
en opiniones generales sobre si la interfaz “se ve bonita”.

## Perfiles y tareas

| Perfil | Tarea | Resultado esperado |
| --- | --- | --- |
| Cliente principiante | Abrir un tema y explicar qué problema resuelve | Identifica problema, solución y resultado sin abrir herramientas técnicas |
| Vendedor / gerente | Presentar una escena en cinco minutos | Avanza la historia y sabe volver después de profundizar |
| Preventa técnica | Localizar una dependencia y un escenario de fallo | Encuentra nodo, relación, escenario y evidencia |
| Revisor de contenido | Comprobar una afirmación | Encuentra fecha, alcance, fuente y límite |

## Guion de sesión

1. Explicar sólo el objetivo de la tarea.
2. No enseñar la ruta correcta ni nombrar botones previamente.
3. Registrar primer clic, dudas, errores y abandonos.
4. Preguntar qué cree que ocurrió, no si le gustó la pantalla.
5. Repetir la tarea después de una única explicación del sistema.
6. Registrar qué información permaneció invisible y cuál se buscó.

## Métricas

- **Comprensión inicial:** identifica propósito en 5 segundos.
- **Primer clic:** inicia el camino correcto sin ayuda.
- **Comprensión de escena:** describe el cambio en una frase.
- **Profundización:** encuentra fuentes o fallos cuando la tarea lo requiere.
- **Recuperación:** vuelve al recorrido después de cerrar un panel.
- **Carga visual:** cuenta de elementos que la persona interpreta como acciones.
- **Accesibilidad:** completa la tarea con teclado y movimiento reducido.

## Umbrales de decisión

- 4/5 participantes completan la tarea principal sin ayuda.
- 4/5 identifican la acción primaria en el primer intento.
- 0 advertencias técnicas críticas quedan ocultas.
- 0 bloqueos de teclado en acciones equivalentes.
- Si dos perfiles interpretan una etiqueta de forma distinta, se corrige el
  lenguaje antes de añadir nuevas funciones.

## Registro de hallazgo

```text
Perfil:
Tarea:
Escena/tema:
Primer clic:
Qué esperaba la persona:
Qué ocurrió:
Severidad: bloqueante | alta | media | baja
Evidencia observable:
Hipótesis de causa:
Cambio recomendado:
Métrica afectada:
```

## Regla de priorización

1. Bloqueos de comprensión o accesibilidad.
2. Advertencias o límites técnicos que no se encuentran.
3. Acciones primarias ambiguas.
4. Densidad visual y repetición.
5. Preferencias estéticas.

La validación debe repetirse después de cada fase que cambie la jerarquía, el
modo cliente, el canvas o el acceso a evidencia.
