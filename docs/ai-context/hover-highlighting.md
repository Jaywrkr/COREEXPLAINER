# Resaltado de relaciones

El canvas usa el hover para convertir el grafo en una explicación visual:
cuando el puntero está sobre un nodo, sus aristas y vecinos directos ganan
contraste y el resto de la escena se atenúa.

## Implementación

- `VisualCanvas.tsx` convierte la posición del puntero desde el viewport y
  llama a `SceneEngine.getNodeAt()`.
- `SceneEngine.setHoveredNode()` conserva únicamente el `id` del nodo activo.
- `SceneEngine.drawEdge()` resalta las aristas que tocan ese nodo.
- `SceneEngine.drawNode()` mantiene visible el nodo y sus vecinos y reduce
  la opacidad de los nodos no relacionados.

El estado de hover es efímero: no se guarda, no cambia el spec y se limpia al
salir del canvas, cambiar de escena o cancelar un gesto. El hit-test usa las
mismas coordenadas normalizadas que el clic, por lo que el comportamiento es
coherente con pan y zoom.

El objetivo es dirigir la conversación del cliente (“¿qué depende de esto?”)
sin añadir controles ni copy específicos de VCF al motor genérico.
