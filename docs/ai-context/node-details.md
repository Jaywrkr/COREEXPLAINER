# Detalle de nodos

Cada tarjeta del canvas es seleccionable. Al hacer clic, `VisualCanvas` pide
al motor el nodo bajo las coordenadas transformadas y muestra
`NodeDetailCard` sobre el diagrama. Un clic fuera de cualquier tarjeta cierra
la ficha; cambiar de escena también limpia la selección.

## Separación de responsabilidades

- `SceneEngine.handleClick(x, y)` hace hit-test en coordenadas de escena,
  conserva el toggle de matar/revivir y devuelve el `SceneNode` seleccionado.
- `VisualCanvas.tsx` convierte las coordenadas del puntero desde el viewport
  con pan/zoom, escucha la selección y monta la ficha.
- `NodeDetailCard.tsx` contiene solo presentación y copy genérico derivado de
  `NodeKind`, `subtitle`, `capacity`, `rps` y `killable`.
- `ExplainerLayout.tsx` conserva la selección como estado de interfaz y la
  reinicia cuando cambia el paso.

La ficha no agrega campos libres al `animation-spec.json`. Si un tema necesita
explicar algo específico de una arquitectura, primero debe ampliar el
contrato de datos o el contenido validado; no se debe acoplar el motor a VCF.

El clic en el pequeño control de falla de un nodo sigue cambiando su estado y
abre simultáneamente su ficha. Esto permite explicar el componente y probar
su comportamiento en una sola interacción.
