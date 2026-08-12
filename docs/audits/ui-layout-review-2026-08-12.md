# Revisión de layout UI — 2026-08-12

## Alcance

Revisión de los explainers existentes con prioridad en contenido que sale de su espacio, superposición de controles y scroll evitable. No se agregaron temas ni herramientas.

## Ajustes aplicados

- El recorrido de cinco escenas usa una grilla de cinco columnas dentro del canvas, en vez de una franja horizontal que exigía scroll.
- Los controles de vista pueden envolver sus acciones si el ancho disponible disminuye; no fuerzan desborde lateral.
- La ayuda inicial del diagrama se hizo más breve, se ubica por encima del recorrido y se oculta al abrir el inspector técnico, evitando competir con paneles arrastrables.
- La lectura inicial del panel izquierdo se mantiene compacta: título, resumen, idea clave e impacto. El detalle sigue bajo demanda.

## Verificación

- `npm run validate:content`, `npm run typecheck` y `npm run build` deben pasar.
- El binario `agent-browser` no está disponible en la instalación local, por lo que la captura automatizada de navegador queda pendiente para la siguiente sesión que lo tenga disponible. No se interpreta este límite como una aprobación visual total.

## Scroll aceptable

Se conserva scroll vertical únicamente donde el usuario selecciona contenido que puede superar el alto disponible: panel izquierdo, panel de escenarios y paneles técnicos. El canvas y su recorrido intentan acomodarse directamente dentro de su área.
