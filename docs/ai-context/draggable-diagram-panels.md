# Paneles movibles del diagrama

Desde v0.31.0, la **Leyenda y capas** y los **Escenarios de fallo** son
overlays movibles dentro del espacio visible del diagrama.

## Contrato de interacción

- Cada panel se mueve desde el asa de arrastre de su cabecera; los botones
  internos conservan sus acciones de minimizar, seleccionar y filtrar.
- El movimiento se limita al rectángulo del canvas para que el panel no se
  pierda fuera del área de trabajo.
- Mover un panel no modifica el viewport `{ scale, x, y }`, la topología, la
  animación ni el estado de la simulación.
- El comportamiento vive en `useDraggablePanel.ts`, no en `SceneEngine`, para
  mantener separadas la navegación de interfaz y la lógica visual/técnica.

## Guía para futuras sesiones

Si se añade otro overlay al canvas, reutilizar `useDraggablePanel` y reservar
un asa independiente de los controles del panel. No implementar el arrastre
dentro de `SceneEngine` ni mezclar la posición del overlay con el viewport.
