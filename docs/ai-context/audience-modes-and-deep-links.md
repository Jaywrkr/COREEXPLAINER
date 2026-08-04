# Modos de audiencia y enlaces directos

## Modos de audiencia

Cada explicación ofrece dos niveles sin duplicar la arquitectura visual:

- **Cliente**: prioriza decisiones, impacto y lenguaje de conversación.
- **Técnico**: añade la ficha de la escena activa con sus componentes,
  relaciones, tipos de arista y cantidad de fuentes citadas.

El modo técnico no convierte el ejemplo en un diseño de producción. El alcance,
las limitaciones y la revisión de fuentes siguen siendo los límites de lo que
se puede afirmar.

El selector actualiza `mode=client` o `mode=technical` en la URL para que el
nivel elegido viaje con el enlace compartido.

## Enlaces directos

Una explicación puede abrir una escena concreta con estos parámetros:

```text
/explainer/observability?scene=collection&mode=technical
/explainer/observability?scene=incident&scenario=collector-outage&mode=client
```

- `scene` usa el `sceneId` declarado por el paso.
- `scenario` usa el ID de un escenario de fallo de esa misma escena.
- `mode` acepta `client` o `technical`; cualquier otro valor vuelve a Cliente.

La interfaz actualiza el enlace al cambiar de paso, escenario o modo y ofrece
“Compartir esta escena” para copiarlo. Los parámetros inválidos se ignoran y
la explicación vuelve a su primer paso sin romper la navegación.

## Criterios de UX

- El enlace debe abrir una explicación funcional aunque el escenario ya no
  exista; no se debe mostrar una página de error por una URL antigua.
- El escenario se restablece al cambiar manualmente de escena.
- El modo técnico expone evidencia y estructura, pero no inventa métricas,
  latencias, SLA ni compatibilidades que el contenido no declare.
