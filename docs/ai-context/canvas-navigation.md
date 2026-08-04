# Navegación del canvas

El diagrama de cada explicador tiene un viewport controlado por el usuario.
Esta capa es propia de la interfaz y no forma parte de `animation-spec.json`:
el mismo spec debe verse igual al restablecer la vista o al abrirlo desde una
sesión nueva.

## Interacciones disponibles

- **Arrastrar** con el puntero desplaza el diagrama (pan).
- **Rueda o trackpad** hace zoom alrededor de la posición del puntero.
- Los controles `−`, `+` y **Restablecer** permiten alejar, acercar y volver
  al encuadre inicial. El rango permitido es 65% a 250%.
- Al cambiar de paso/escena, la vista se restablece para que la nueva
  topología siempre comience completamente contextualizada.
- Un clic sin arrastre mantiene la interacción existente de matar/revivir
  nodos que tengan `killable: true`.

## Límite entre UI y motor

`VisualCanvas.tsx` conserva `{ scale, x, y }`, transforma el contexto de
dibujo antes de llamar a `SceneEngine.draw()` y convierte las coordenadas de
clic al espacio original del canvas. `SceneEngine` no conoce el zoom ni el
pan: continúa dibujando e interactuando con la escena en sus coordenadas
normales. Esta separación evita que el estado de navegación contamine el
contrato de contenido o el motor genérico.

Cuando se agreguen nuevas interacciones al diagrama, priorizar cambios en
`VisualCanvas.tsx` si son de presentación/navegación. Solo se debe cambiar
`SceneEngine` si afecta a la simulación o al dibujo de la escena.
