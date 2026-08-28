# Auditoría de simplificación extrema de explainers

**Fecha:** 28-08-2026

**Alcance:** los 22 explainers de `/explainer/[slug]`.
**Objetivo:** preservar el mensaje de negocio y la corrección técnica, reduciendo
la carga inicial a una idea, un diagrama y una decisión por escena.

## Dictamen

La información técnica tiene valor, pero hoy compite por atención con el
mensaje principal. El shell comparte demasiadas superficies posibles:
selector de audiencia, guía, tarjeta narrativa, herramientas, evidencia,
marcas, trazabilidad, ficha de escena, presentación, navegación, leyenda,
capas, integridad, escenarios y controles de canvas. Aunque parte de ellas ya
se encuentra plegada, la cantidad de nombres y rutas posibles sigue siendo
mayor que la que necesita un cliente para comprender una historia.

La simplificación no elimina datos ni reglas. Cambia su momento de aparición.

## Contrato visual objetivo

### Vista inicial — modo Cliente

Solo debe mostrar, en este orden:

1. **Una frase de problema o resultado.**
2. **Una visualización animada y legible.**
3. **Un impacto para el negocio.**
4. **Una acción:** `Siguiente` o `Ver el riesgo` cuando corresponde.

Quedan fuera de esta primera vista: siglas, leyenda, puertos, fuentes, marcas,
IDs de escena, controles de presentación, feedback, enlaces compartibles,
reglas, escenarios completos y detalles de la implementación.

### Profundización — una puerta, no varias

El único acceso secundario de Cliente será **`Ver detalle técnico`**. Al abrirlo
aparecen tres secciones exclusivas y cerradas por defecto:

- **Arquitectura:** capas, leyenda y nodos seleccionables.
- **Riesgos y validación:** escenario relevante, supuestos y límites.
- **Evidencia:** marcas, fuentes y trazabilidad.

El modo Técnico conserva todas las capacidades, pero las agrupa bajo esas tres
secciones; no muestra múltiples paneles simultáneamente.

## Reglas de reducción comunes

| Elemento actual | Decisión | Razón |
| --- | --- | --- |
| Tres modos (`Cliente`, `Conceptual`, `Técnico`) | Cliente por defecto + `Ver detalle técnico`; el modo Conceptual se absorbe en Cliente | Evita una elección que un cliente no puede interpretar antes de ver el contenido. |
| Tag, contador, título, tagline y guía al mismo tiempo | Solo título breve + progreso discreto | El contexto se repite y desplaza el diagrama. |
| Dos párrafos por escena | Una idea visible; segundo párrafo dentro de detalle | Una escena debe poder entenderse en menos de 15 segundos. |
| Leyenda, capas, integridad y escenarios | Un solo panel contextual del diagrama | Son formas distintas de inspeccionar la misma arquitectura. |
| Herramientas técnicas independientes | Agrupar en `Operar y entregar` | Copilot, workbench, triage, paquetes y workflow no son parte de la explicación inicial. |
| Fuentes, marcas, feedback y compartir | Agrupar en `Evidencia` | No cambian el mensaje de la escena. |
| Escenarios de fallo persistentes | Acción `Ver el riesgo` solo en escenas de riesgo/límites | Evita que un simulador tape la explicación normal. |
| Controles de zoom/presentación | Reducir a iconos con tooltip; presentación en menú | Útiles cuando se presentan, no mientras se aprende. |

## Matriz por tema

Cada tema queda limitado a **tres momentos visibles**. Las escenas restantes no
se borran: se fusionan como transiciones del diagrama o se exponen desde el
detalle técnico.

| Tema | Tres momentos para Cliente | Mensaje final que no se puede perder | Solo bajo demanda |
| --- | --- | --- | --- |
| VCF | Silos → plataforma integrada → continuidad | Integrar compute, red y storage reduce fricción, pero requiere diseño y operación. | Workload domains, servicios internos, límites. |
| vSphere HA | Falla de host → detección/reinicio → capacidad de recuperación | HA reinicia cargas; no elimina la necesidad de capacidad, storage y pruebas. | Admission control, aislamiento, casos de fallo. |
| vSAN | Discos locales → política de protección → recuperación | La disponibilidad depende de la política y de los dominios de fallo. | Objetos, componentes, FTT y reconstrucción. |
| NSX | Segmentación → política aplicada → operación segura | La seguridad se aplica cerca de la carga y necesita visibilidad y gobierno. | Overlay, gateways, reglas y troubleshooting. |
| Zero Trust | Verificar identidad → limitar acceso → revisar continuamente | La confianza no es permanente; identidad, dispositivo y contexto importan. | Controles, telemetría, excepciones y marcos. |
| Kubernetes | Declarar aplicación → plataforma la ejecuta → recupera según señales | La automatización depende de capacidad y señales correctas. | Scheduler, Services, probes, manifiestos. |
| Observabilidad | Señal → contexto → decisión | Ver datos no basta: hay que relacionarlos con impacto y operación. | Métricas, logs, traces y arquitectura de señal. |
| Backup/DR | Definir RPO/RTO → proteger → probar recuperación | Una copia vale cuando se puede recuperar el servicio dentro del objetivo. | Repositorios, retención, inmutabilidad y runbook. |
| Resiliencia ransomware | Reducir exposición → preservar recuperación → ensayar respuesta | La resiliencia es un conjunto de controles y pruebas, no un producto único. | Hardening, evidencias, dominios de fallo y playbooks. |
| Storage SAN | Host necesita datos → fabric presenta volumen → continuidad medida | Storage requiere un camino explícito y redundante entre host y volumen. | WWPN, zoning, mapping, multipath y HCL. |
| Veeam Protection | Proteger carga → conservar copia recuperable → validar restore | Backup sin restauración probada no demuestra continuidad. | Jobs, repositorios, políticas y capacidades del producto. |
| Active-active DC | Dos sitios → servicio tolera pérdida → operación coordinada | Dos data centers no bastan: datos, red y operación deben estar alineados. | Quórum, replicación, latencia, DNS y split-brain. |
| LAN/SAN | Separar tráficos → conectar host y storage → validar resiliencia | LAN y SAN responden a propósitos distintos y no se deben confundir. | VLAN, VRF, FC fabrics, MTU, zoning y LAG. |
| NAS/private cloud | Datos compartidos → acceso gobernado → protección | El servicio de archivos requiere permisos, rendimiento y protección coherentes. | Protocolos, snapshots, cuotas, AD y backup. |
| Migración | Descubrir dependencia → mover con control → aceptar servicio | Migrar es validar dependencias y recuperación, no solo copiar datos. | Oleadas, herramientas, downtime, rollback y compatibilidad. |
| Check Point HA | Tráfico protegido → miembro asume → servicio se valida | Dos gateways solo aportan continuidad si VIP, sync y rutas funcionan. | ClusterXL, sesiones, interfaces, routing y licencias. |
| SD-WAN | Sedes conectadas → política elige camino → experiencia se mide | La red debe escoger rutas según intención y experiencia, no solo enlace disponible. | Underlay, SLA, seguridad, routing y orquestación. |
| Power AIX | Carga crítica → plataforma estable → continuidad planificada | La plataforma soporta cargas críticas cuando se validan compatibilidad y operación. | LPAR, VIOS, PowerHA, firmware y capacity planning. |
| Ciclo de implementación | Descubrir → integrar → aceptar y transferir | La entrega incluye evidencia y capacidad de operar, no solo equipos instalados. | Rack, cableado, pruebas, documentación y actas. |
| IBM Instana | Usuario afectado → dependencias revelan causa → equipo decide | Instana acelera la hipótesis; no reemplaza cobertura ni decisión humana. | Agentes, señales, retención, IA y despliegue. |
| IBM Turbonomic | Demanda presiona recurso → recomendaciones → guardrails | Optimizar necesita modelo correcto y decisiones gobernadas. | Supply chain, targets, automatización y what-if. |
| IBM webMethods | Sistemas desconectados → flujo gobernado → operación confiable | Integrar requiere contratos, ownership y manejo de fallos, no solo endpoints. | Mapping, runtimes, gateway, versiones y B2B. |

## Criterio editorial por escena

Antes de conservar cualquier texto, control o nodo visible, responder:

1. ¿Ayuda a entender el problema, el mecanismo o la decisión actual?
2. ¿Un usuario sin vocabulario técnico puede repetir el mensaje después de verlo?
3. ¿La información cambia una decisión? Si no, se mueve a detalle o se elimina.

Cada escena Cliente debe tener como máximo:

- 1 título de hasta 60 caracteres.
- 1 frase de hasta 180 caracteres.
- 1 impacto de hasta 140 caracteres.
- 1 acción principal.
- 3–7 nodos principales en el canvas; los demás se agrupan o se muestran al
  abrir Arquitectura.

## Secuencia de implementación recomendada

1. **Shell común:** sustituir los tres modos por Cliente + detalle técnico y
   reagrupar controles bajo Arquitectura, Riesgos y Evidencia.
2. **Canvas cliente:** ocultar por defecto puertos, leyenda, inspector,
   controles avanzados y escenarios; mostrar solo el gesto o acción relevante.
3. **Contenido:** aplicar la matriz anterior a las 22 colecciones de pasos,
   fusionando escenas sin perder las fuentes y los límites técnicos.
4. **Modo técnico:** trasladar herramientas de operación y exportación a un
   único espacio `Operar y entregar`.
5. **Verificación:** ejecutar validación de contenido, autoridad técnica y
   revisión visual por desktop/tablet antes de publicar.

## Límites de esta auditoría

No modifica contenido ni afirmaciones técnicas. Tampoco cambia estados de
revisión humana. Es la especificación para simplificar sin ocultar riesgos,
supuestos, fuentes o límites cuando realmente son necesarios.
