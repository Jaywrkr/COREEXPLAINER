# Fase 145 — UI de primera lectura

Versión: 0.199.0  
Fecha: 2026-08-11  
Rama: `codex/ui-first-read-pass`

## Objetivo

Reducir la carga visual inicial sin eliminar capacidades: el cliente debe poder entender qué hacer en el diagrama, mientras que las herramientas técnicas permanecen disponibles bajo demanda.

## Cambios aplicados

- Se añadió una guía contextual breve en el lienzo con arrastre, zoom, selección de nodo y atajos. Se muestra una vez por navegador y se puede cerrar.
- Se marcó el cajón de herramientas como contenido “bajo demanda”, reforzando la ruta de lectura principal.
- Se desplazó el panel de escenarios de fallo debajo del diagnóstico técnico y se redujo su altura máxima para que no cubra la arquitectura.

## Criterios de calidad

- No se agregan acciones operativas ni mutaciones externas.
- La preferencia de la guía usa solo `localStorage` y tolera almacenamiento bloqueado.
- Se conserva la accesibilidad: `aside` etiquetado, botón de cierre con nombre accesible y controles existentes de teclado.

## Fuente y revisión

Revisión de código local realizada el 2026-08-11. No cambia el contenido técnico ni sus fuentes; solo su presentación y divulgación.
