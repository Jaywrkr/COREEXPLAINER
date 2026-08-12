# Contexto IA — Línea base UX/UI

La referencia de diseño de la aplicación está en
[`docs/product/ui-ux-baseline.md`](../product/ui-ux-baseline.md).

Antes de cambiar componentes de interfaz, una IA debe:

1. Identificar si el cambio pertenece a explorar, presentar, revisar o crear.
2. Mantener el modo cliente libre de herramientas técnicas en el primer nivel.
3. Preferir divulgación progresiva frente a añadir otro panel visible.
4. Evitar títulos, etiquetas, estados o acciones duplicados.
5. Mantener las advertencias de exactitud, vigencia y límites técnicamente
   visibles cuando sean relevantes.
6. Usar movimiento sólo cuando explique una relación o cambio de estado.
7. Comprobar que los overlays no oculten el nodo o texto que explican.
8. Añadir microcopy sencillo para cualquier sigla o término técnico.
9. Actualizar la línea base si una fase cambia el modelo mental del producto.

La secuencia de ramas UX comienza con `codex/ui-ux-baseline` y continúa una fase
por PR. No se deben crear ramas futuras por adelantado.
