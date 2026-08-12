# Storyboard — VMware Cloud Foundation

Ejemplo de referencia usado por el prototipo en `/explainer/vcf`. Puente
entre el guion comercial (prosa) y los archivos de datos
(`src/content/vcf.ts` + `animation-spec.json` en esta misma carpeta).
Contenido validado como explicación conceptual — no es una guía de diseño ni
una promesa de SLA. Revísese contra `docs/ai-context/vcf-technical-validation.md`
antes de usarlo frente a un cliente.

## Estructura narrativa

Problema → Solución → Arquitectura → Resultado. Cuatro pasos, cada uno con
su propia escena visual (topología distinta, no el mismo diagrama con
partes resaltadas — ver decisión D2 en `docs/ai-context/decisions.md`).

---

### Paso 1 — El problema: infraestructura en silos

**Escena**: `silos`. Tres nodos aislados (Cómputo, Storage, Red) sin
ninguna conexión entre sí, más un nodo "Equipo TI" que representa la
coordinación manual. Deliberadamente **sin aristas** — el punto visual es
que no hay automatización conectándolos.

**Mensaje**: en un entorno tradicional, cómputo, almacenamiento y red pueden
administrarse en dominios y consolas separadas. Cualquier cambio que cruce
esos dominios requiere coordinar dependencias, validaciones y ventanas
operativas.

**Impacto de negocio**: escenario ilustrativo; cada dependencia adicional
puede aumentar el tiempo y el riesgo operativo del cambio.

---

### Paso 2 — La solución: una plataforma integrada por software

**Escena**: `unify`. Los mismos tres dominios (Cómputo, vSAN, NSX) ahora
convergen en un nodo central `vcf` (VMware Cloud Foundation) que se
relaciona con las aplicaciones. Las aristas representan integración
conceptual, no un flujo literal de paquetes de aplicación.

**Mensaje**: VCF integra cómputo (vSphere/ESXi), storage (vSAN) y networking
(NSX), junto con servicios de gestión y operación. Esta escena reduce la
plataforma a las capacidades principales; no pretende enumerar todos sus
componentes ni afirmar que existe una única consola para cada tarea.

**Impacto de negocio**: con automatización y servicios preparados, algunos
flujos de aprovisionamiento pueden acelerarse; el resultado depende del
diseño, configuración y operación.

---

### Paso 3 — La arquitectura: un clúster y servicios integrados

**Escena**: `cluster`. Tres hosts ESXi (`killable: true` — se puede
simular la caída de un host en vivo, clic en el botón rojo) forman un
clúster. `vcenter` representa la gestión del inventario y las operaciones de
vSphere; `vsan` y `nsx` representan servicios integrados sobre esa base.
Las aristas son relaciones conceptuales, no un packet walk de producción.

**Mensaje**: los hosts físicos forman un clúster de vSphere; vSAN puede
agregar su almacenamiento local en un datastore compartido; NSX aporta
networking y seguridad definidos por software; vCenter gestiona el inventario
de vSphere. La operación de VCF incorpora componentes adicionales de gestión
y ciclo de vida.

**Impacto de negocio**: vSphere HA puede reiniciar VMs protegidas en hosts
alternos si hay capacidad, visibilidad de storage y políticas compatibles.
Esta escena explica la condición de resiliencia; no garantiza un SLA ni una
migración en vivo.

---

### Paso 4 — El resultado: cargas de trabajo sin fricción

**Escena**: `workloads`. Un nodo `client` (Usuarios, `rps: 5`) envía
tráfico al `cluster` (clúster de cómputo), que hace fan-out hacia tres apps
(`app1`/`app2`/`app3`, cada una `killable: true` y con `capacity: 40`). Un nodo
separado `vcf` representa la gestión y el ciclo de vida del entorno; no está
en el camino de datos de las aplicaciones.

**Mensaje**: las aplicaciones consumen recursos del clúster; vSphere, el
storage compartido y la red abstraen parte de la dependencia de un host
concreto. Agregar un host puede aumentar la capacidad si se cumplen las
condiciones de compatibilidad, configuración y políticas del diseño.

**Impacto de negocio**: un diseño validado permite crecer de forma planificada
sin rediseñar toda la plataforma por cada incremento.

---

## Límites técnicos de esta demo

- La topología es una reducción pedagógica; no representa todos los dominios,
  managers, edge clusters, redes físicas ni servicios de VCF.
- Las aristas no son un recorrido literal de paquetes de producción.
- La recuperación tras una falla depende de HA habilitado, capacidad,
  visibilidad del datastore, reglas de afinidad, prioridades y configuración
  de aislamiento. Ver la matriz de validación y las fuentes oficiales antes
  de convertir este ejemplo en una recomendación de diseño.

## Origen de este ejemplo

Este storyboard y su spec (`animation-spec.json` en esta carpeta) se
derivan del primer prototipo autocontenido (un único archivo `.html`,
construido a mano fuera de este repo para validar el enfoque visual antes de
construir el motor genérico). El motor genérico
(`src/components/explainer/engine/sceneEngine.ts`) reimplementa la misma
lógica de simulación (paquetes, capacidad, fan-out, nodos "matables") de
forma reutilizable para cualquier tema — ver decisión D3 en
`docs/ai-context/decisions.md`.
