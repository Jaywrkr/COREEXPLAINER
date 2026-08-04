# Changelog

## [0.7.0] - 2026-08-04

- Validación de estructura, profundidad narrativa y referencias visuales antes de registrar un tema.
- Cada explicación declara storyboard, matriz técnica y estado de revisión.
- Los errores de contenido hacen fallar la compilación; las revisiones pendientes quedan explícitas.

## [0.6.0] - 2026-08-04

- Modo presentación con reproducción automática, pausa y reinicio.
- Navegación por teclado para avanzar, retroceder y salir de la presentación.
- La reproducción se detiene al cambiar manualmente de paso o llegar al final.

## [0.5.0] - 2026-08-04

- Escenarios guiados para fallas de uno o varios hosts y del plano de gestión.
- Cada escenario explica su efecto, nodos afectados y límites técnicos.
- La simulación se puede restaurar y se reinicia al cambiar de escena.

## [0.4.0] - 2026-08-04

- Hover sobre un nodo para resaltar sus conexiones y componentes relacionados.
- Los elementos no relacionados se atenúan para concentrar la atención.
- El resaltado funciona con pan, zoom y escenas independientes.

Cambios relevantes del producto, en orden descendente. La misma información
visible dentro de la aplicación vive en `src/content/changelog.ts`.

## [0.3.1] — 2026-08-04

- Se revisaron copy, storyboard y topología contra fuentes oficiales.
- Se eliminaron afirmaciones absolutas sobre consola única, SLA y failover.
- Se separaron el camino de datos, el clúster de cómputo y la gestión de VCF.

## [0.3.0] — 2026-08-04

- Clic en una tarjeta para consultar su función y tipo dentro de la
  arquitectura.
- Ficha contextual con capacidades, emisión y simulación de falla cuando
  aplica.
- La selección se reinicia al cambiar de escena y el clic fuera de un nodo
  la cierra.

## [0.2.0] — 2026-08-04

- Navegación del canvas: pan con arrastre, zoom con rueda/trackpad y
  controles, y restablecimiento de encuadre.
- Indicador flotante de versión en la esquina inferior izquierda y panel de
  changelog accesible con teclado.
- Documentación de navegación del canvas y proceso de versionado.

## [0.1.0] — 2026-08-04

- Base del explicador técnico, ejemplo VCF y motor visual basado en specs.
- Simulación de paquetes, capacidad y fallas de nodos.
- Catálogo de temas, modo claro/oscuro y documentación de arquitectura.
