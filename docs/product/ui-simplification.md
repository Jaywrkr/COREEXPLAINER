# UI simplification — Calm Interface

## Objetivo

Reducir la carga visual inicial de CORESOLUTIONS Technical Explainer. La primera lectura debe mostrar una sola explicación y un diagrama claro; las capacidades avanzadas permanecen disponibles bajo demanda.

## Decisiones aplicadas

- El modo cliente no duplica el contexto de la escena sobre el lienzo.
- Los controles de zoom, ajuste y animación permanecen colapsados inicialmente.
- El modo presentación aparece como una acción compacta hasta que el usuario lo inicia.
- El inspector técnico inicia cerrado para evitar que integridad, capas y escenarios oculten el diagrama.
- El dashboard es una biblioteca de recorridos, no una consola de operación. Su primera vista solo muestra áreas y temas.
- Creación, revisión, métricas, gobierno y colas internas viven en una única sección cerrada al final del dashboard.
- Las tarjetas de temas no muestran acciones secundarias ni señales de revisión: abrir el recorrido es la única acción primaria.

## Criterio de evolución

No se debe añadir una capacidad visible al primer nivel sin retirar o agrupar otra. Cliente prioriza comprensión; técnico prioriza diagnóstico bajo demanda.
