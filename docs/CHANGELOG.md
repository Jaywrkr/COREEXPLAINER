# Changelog

## [0.31.0] - 2026-08-05

- La leyenda y los escenarios de fallo se pueden arrastrar dentro del espacio del diagrama.
- La explicación izquierda usa una jerarquía más compacta para priorizar escena, narrativa e impacto.
- El arrastre está limitado al canvas y conserva los controles de zoom, simulación y diagnóstico.

## [0.30.0] - 2026-08-05

- Se compactaron el nivel de explicación, el enlace de escena, las marcas y la trazabilidad en la cabecera del tema.
- Cada explicación incorpora un acceso directo para volver al dashboard de temas y el modo presentación ocupa menos espacio.
- La leyenda del diagrama inicia minimizada y el control global de versión es más discreto.

## [0.29.0] - 2026-08-05

- VCF incorpora checkpoints de diagnóstico para contrastar hipótesis sobre HA,
  capacidad, storage y separación entre gestión y camino de datos.
- Cada fase authored puede mostrar fuentes técnicas, fecha de consulta,
  feedback de la opción elegida y un nuevo foco del diagrama.
- El validador comprueba fuentes por fase, opciones de decisión y exactamente
  una lectura recomendada por checkpoint.

## [0.28.0] - 2026-08-05

- Se añadieron fases de observación, diagnóstico, recuperación y validación para recorrer fallos con una narrativa didáctica.
- El diagrama enfoca nodos y relaciones relevantes para la fase activa; el panel conserva evidencia, resultado esperado y limitaciones.
- Los escenarios existentes reciben una guía base compatible; los nuevos escenarios pueden declarar pasos authored y `focusNodeIds`.

## [0.27.0] - 2026-08-05

- Se añadieron los explainers de IBM Instana, IBM Turbonomic e IBM webMethods.
- Cada tema incluye cinco escenas, cuatro escenarios de fallo, fuentes
  primarias revisadas el 2026-08-05 y límites de edición, release y cobertura.
- El portafolio y el contexto de marcas ahora contemplan estas tres familias de
  software IBM para futuras sesiones y propuestas.

## [0.26.0] - 2026-08-05

- Se añadieron cinco explainers: migración sin interrupción, Check Point HA,
  SD-WAN, IBM Power/AIX y ciclo de implementación.
- Cada tema incluye cinco escenas, cuatro escenarios de fallo, contexto de
  marcas y fuentes primarias revisadas el 2026-08-05.
- El batch amplía la conversación hacia migración, cargas críticas,
  conectividad multisede y adopción del cliente.

## [0.25.0] - 2026-08-05

- Se desactivaron los deployments automáticos de Git mediante `vercel.json`.
- Se documentó el flujo de validación local y publicación manual por batch.
- Los PRs y merges ya no deben consumir deployments de Vercel automáticamente.

## [0.24.0] - 2026-08-04

- Batch de cuatro nuevos explainers: protección heterogénea con Veeam, data center activo-activo, integración LAN/SAN y NAS como servicio de archivos.
- Cada tema incluye cinco escenas, cuatro escenarios de fallo, storyboard y matriz técnica con fuentes revisadas el 2026-08-04.
- El batch amplía el catálogo desde Storage SAN hacia backup, continuidad, redes y servicios de archivos basados en proyectos reales.

## [0.20.0] - 2026-08-04

- Nuevo tema independiente de Storage SAN empresarial con cinco escenas sobre capas SAN, provisionamiento, host mapping, multipath, migración y replicación.
- Escenarios interactivos para pérdida de fabric, mapping incorrecto, pool al límite y lag de replicación.
- Nueva categoría Storage y matriz técnica basada en documentación IBM y Lenovo revisada el 2026-08-04.

## [0.19.0] - 2026-08-04

- Se documentaron patrones sanitizados de proyectos reales de CoreSolutions: storage, SAN, VMware, Veeam, redes, seguridad, IBM Power, NAS y alta disponibilidad.
- Se añadió un backlog priorizado de explainers basado en tareas recurrentes de implementación.
- El resumen evita nombres de clientes, correos y enlaces operativos del CSV original.

## [0.18.0] - 2026-08-04

- Nuevo tema de resiliencia frente a ransomware con cinco escenas: prevención, detección, contención, recuperación limpia y validación.
- Escenarios interactivos para movimiento lateral, detección tardía, backups expuestos y restore sin validar.
- Matriz técnica con fuentes CISA, Check Point, Veeam e IBM FlashSystem y límites frente a Backup/DR.

## [0.17.0] - 2026-08-04

- Cada explicación declara las marcas CoreSolutions relacionadas, su función y el límite técnico del patrón.
- La interfaz muestra la ficha “Marcas del patrón” y el quality gate valida el contexto de marca.
- Se documentó el contrato para que futuras sesiones mantengan el contexto comercial.

## [0.16.0] - 2026-08-04

- Nuevo tema independiente de Backup y Disaster Recovery con cinco escenas sobre RPO/RTO, protección Veeam sobre VMware/VCF y Lenovo, copias protegidas IBM, recuperación y pruebas.
- Escenarios interactivos para job fallido, repositorio no disponible, lag de replicación y restauración no probada.
- Registro permanente del portafolio CoreSolutions, fecha de revisión, fuentes y límites técnicos.

## [0.15.0] - 2026-08-04

- Cada explicación puede alternar entre una vista orientada a cliente y una ficha técnica de la escena.
- Los enlaces pueden abrir una escena y un escenario de fallo concretos.
- El botón de compartir copia el contexto actual, incluido el modo de audiencia.

## [0.14.0] - 2026-08-04

- Nuevo tema independiente con cinco escenas sobre recorridos distribuidos, señales, Collector, correlación y límites operativos.
- Escenarios interactivos para latencia, caída del Collector, descarte de telemetría y cardinalidad excesiva.
- Storyboard y matriz de validación basados en la documentación oficial actual de OpenTelemetry y Prometheus.

## [0.13.2] - 2026-08-04

- Cada escena declara las fuentes concretas que respaldan su narrativa y diagrama.
- La ficha de trazabilidad separa las fuentes de la escena de las fuentes generales del tema.
- El quality gate valida IDs únicos y referencias existentes antes de publicar.

## [0.13.1] - 2026-08-04

- Cada explicación muestra la fecha de última revisión y el alcance de versiones o conceptos comprobado.
- Las fuentes primarias aparecen con enlaces directos y fecha de consulta.
- El quality gate bloquea temas sin metadatos de trazabilidad válidos.

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
