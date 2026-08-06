# Fase 1 — Auditoría de comprensión para principiantes

**Fecha:** 2026-08-06  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.53.0

## Objetivo

Evaluar si una persona sin conocimientos técnicos puede orientarse en una explicación sin confundir el diagrama con una vista operativa de producción. Esta primera fase es una auditoría interna reproducible; no sustituye pruebas con usuarios reales ni una revisión técnica de cada fabricante.

## Persona y recorrido evaluado

Se simuló el recorrido de una persona que:

1. entra al dashboard y abre un tema;
2. intenta identificar qué representa cada tarjeta y qué significa una flecha;
3. observa la animación y decide si está viendo datos reales;
4. abre un escenario de fallo y decide si la aplicación ejecutará un cambio;
5. necesita saber qué puede preguntar o explorar a continuación.

## Hallazgos y acciones aplicadas

| Hallazgo | Riesgo de comprensión | Acción aplicada |
| --- | --- | --- |
| El significado de las tarjetas dependía demasiado de la leyenda. | Una persona podía interpretar todos los nodos como servidores físicos. | Se añadió **Cómo leer este diagrama**, con la diferencia entre componentes físicos, servicios, capas y actores. |
| Una flecha podía leerse como cableado físico. | Se podía explicar una relación conceptual como si fuera una topología física exacta. | La guía indica que las flechas pueden representar datos, control, almacenamiento o dependencia. |
| La animación no declaraba su límite operativo junto al texto principal. | Se podía confundir la demostración con tráfico o monitoreo en vivo. | La guía declara que los puntos en movimiento son una animación conceptual, no telemetría real. |
| El escenario de fallo podía parecer una acción ejecutable. | Un principiante podía creer que el botón cambia infraestructura del cliente. | La guía declara que el fallo es una hipótesis de conversación y no ejecuta cambios reales. |

## Resultado visible

En modo **Cliente** y **Conceptual**, cada explicación muestra una guía compacta y cerrada por defecto titulada **Cómo leer este diagrama**. Se puede abrir sin abandonar la explicación. En modo **Técnico** no se muestra, porque ese modo conserva las herramientas y la evidencia especializada.

## Alcance y límites

- La guía es transversal y no afirma detalles específicos de VMware, VCF, Instana, Turbonomic, webMethods u otras marcas.
- La exactitud tecnológica de cada tema, sus versiones, fuentes y límites se revisará en la Fase 2 mediante la matriz de trazabilidad existente.
- La siguiente auditoría debería probar este recorrido con usuarios reales y medir si pueden explicar el flujo con sus propias palabras.

## Validación ejecutada

- `npm run typecheck`
- `npm run lint`
- `npm run build`
