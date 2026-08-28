# Contexto IA — Interacción del canvas

> **Sincronizado:** 28-08-2026.

El canvas debe ofrecer pan, zoom, selección, Ajustar y Restablecer. Los atajos
son `A`, `0`, `+` y `−`; deben conservar una alternativa mediante botones
visibles. No depender solo del ratón.

El diagrama no debe aparentar que administra la infraestructura del cliente.
La interacción útil se concentra al seleccionar un componente: el Laboratorio
de comprensión explica su rol, muestra sus relaciones modeladas, ofrece una
consola conceptual y permite comprobar conexiones del modelo. Ninguna de esas
acciones es un ping, traceroute, consola remota o comprobación de salud real.

Solo los nodos con `killable: true` pueden usar **Simular interrupción**. La
acción altera el estado visual local del motor, conserva los extremos del
diagrama y puede restaurarse. No habilitarla por decoración: un nodo debe ser
simulable únicamente si representa un fallo que la escena y su contenido saben
explicar.

Mantener los controles de vista compactos. Puertos, capas, escenarios,
integridad y herramientas de operación continúan disponibles bajo Detalle
técnico, no como paneles permanentes sobre el canvas.
