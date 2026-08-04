# Changelog

## [0.13.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre estado deseado, scheduling, Services, rollouts y recuperación.
- Escenarios interactivos para falla de nodo, readiness, descarga de imágenes y recursos insuficientes.
- Storyboard y matriz de validación basados en la documentación oficial de Kubernetes.

## [0.12.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre solicitudes, contexto, decisión, enforcement y límites.
- Escenarios interactivos para identidad comprometida, dispositivo no confiable, política amplia y telemetría ausente.
- Storyboard y matriz de validación basados en NIST SP 800-207 y CISA Zero Trust Maturity Model.

## [0.11.1] - 2026-08-04

- El panel de escenarios de fallo ahora puede minimizarse sin perder el escenario activo.
- Se retiraron los CTAs comerciales de todos los ejemplos y del contrato de contenido.
- Se actualizaron las guías de contenido, marca y contexto para reflejar la navegación técnica.

## [0.11.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre segmentos, overlay, firewall distribuido y gateways.
- Escenarios interactivos para underlay/MTU, scope de reglas, gateway y seguridad de segmentos.
- Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.

## [0.10.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre datastore distribuido, objetos y políticas de storage.
- Escenarios interactivos para fallas de host/disco, capacidad, fault domains y red vSAN.
- Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.

## [0.9.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre vSphere HA y recuperación ante fallos.
- Escenarios interactivos para capacidad, visibilidad de storage y restricciones de políticas.
- Storyboard y matriz de validación técnica con fuentes oficiales de VMware by Broadcom.

## [0.8.0] - 2026-08-04

- Relaciones semánticas para distinguir datos, control, storage, dependencias y fallos.
- Leyenda interactiva con filtros de capas y relaciones por escena.
- Validación del tipo de cada arista antes de publicar una explicación.

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
