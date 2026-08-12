# Modos de audiencia y enlaces directos

## Modos de audiencia

Cada explicación ofrece tres niveles sin duplicar la arquitectura visual:

- **Cliente**: prioriza decisiones, impacto y lenguaje de conversación. Muestra
  una idea clave y deja el detalle adicional bajo demanda.
- **Conceptual**: explica cómo se relacionan las piezas principales con todos
  los párrafos de la escena, pero sin convertir la pantalla en una auditoría.
- **Técnico**: añade la ficha de la escena activa con componentes, relaciones,
  tipos de arista, fuentes, evidencia y límites.

Los niveles cambian la profundidad de la explicación, no la veracidad del
contenido. Los tres usan el mismo modelo, las mismas fuentes y las mismas
limitaciones; Técnico no convierte el ejemplo en un diseño de producción.

El selector actualiza `mode=client`, `mode=conceptual` o `mode=technical` en la
URL para que el nivel elegido viaje con el enlace compartido.

En Cliente y Conceptual, el canvas prioriza movimiento, zoom y reproducción.
Las capas, la leyenda, los escenarios de fallo y la integridad técnica se
agrupan en `Más herramientas`; si un enlace abre un escenario o aparece una
alerta de integridad, ese grupo se revela automáticamente. En Técnico, estas
herramientas permanecen visibles.

## Enlaces directos

Una explicación puede abrir una escena concreta con estos parámetros:

```text
/explainer/observability?scene=collection&mode=technical
/explainer/observability?scene=incident&scenario=collector-outage&mode=client
/explainer/observability?scene=signals&mode=conceptual
```

- `scene` usa el `sceneId` declarado por el paso.
- `scenario` usa el ID de un escenario de fallo de esa misma escena.
- `mode` acepta `client`, `conceptual` o `technical`; cualquier otro valor
  vuelve a Cliente.

La interfaz actualiza el enlace al cambiar de paso, escenario o modo y ofrece
“Compartir esta escena” para copiarlo. Los parámetros inválidos se ignoran y
la explicación vuelve a su primer paso sin romper la navegación.

## Criterios de UX

- El enlace debe abrir una explicación funcional aunque el escenario ya no
  exista; no se debe mostrar una página de error por una URL antigua.
- El escenario se restablece al cambiar manualmente de escena.
- Ningún nivel inventa métricas, latencias, SLA ni compatibilidades que el
  contenido o sus fuentes no declaren.
