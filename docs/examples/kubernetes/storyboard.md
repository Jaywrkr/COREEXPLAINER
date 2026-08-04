# Storyboard — Kubernetes: viaje de una aplicación

Ejemplo independiente usado por `/explainer/kubernetes`. Explica el camino
desde una declaración de estado deseado hasta una aplicación accesible. No es
una guía de instalación, un diseño de producción ni un tutorial de un servicio
gestionado como EKS, AKS o GKE.

## Estructura narrativa

Estado deseado → Scheduling → Service → Rollout → Límites y recuperación.
Cada escena cambia la topología para separar control plane, scheduling,
networking y estado de los workloads.

### Paso 1 — Estado deseado

**Escena**: `desired-state`. Un equipo publica un manifiesto en la API. Los
controladores observan la diferencia entre lo deseado y lo que existe y actúan
para reconciliarla.

**Mensaje**: Kubernetes es declarativo y reconciliador; aplicar un manifiesto
no significa que la aplicación esté lista en ese instante.

### Paso 2 — Scheduling

**Escena**: `scheduling`. Un Pod pendiente pasa por el scheduler, que filtra y
puntúa nodos según recursos y restricciones.

**Mensaje**: un clúster puede tener capacidad total y aun así no tener un nodo
elegible para un Pod concreto.

### Paso 3 — Service

**Escena**: `service`. Un cliente llega a un Service y este selecciona
endpoints asociados a Pods mediante labels y estado de readiness.

**Mensaje**: el Service ofrece una abstracción estable frente a Pods
reemplazables; estar `Running` no implica estar listo para tráfico.

### Paso 4 — Rollout

**Escena**: `rollout`. Un Deployment coordina ReplicaSets anterior y nuevo.
Durante la transición pueden coexistir ambas versiones.

**Mensaje**: una estrategia de rollout ayuda a controlar cambios, pero el
resultado depende de readiness, réplicas, capacidad y comportamiento de la
aplicación.

### Paso 5 — Límites y recuperación

**Escena**: `failure`. Se pueden simular caída de nodo, readiness fallida,
imagen no descargable y restricciones de capacidad.

**Mensaje**: self-healing es reconciliación condicionada. Kubernetes puede
intentar corregir el estado, pero no puede inventar capacidad, una imagen,
una red o una aplicación funcional.

## Límites técnicos de esta demo

- No modela CNI, CSI, Ingress Controller, Gateway API, autoscaling, StatefulSet,
  operadores, service mesh, multi-cluster ni un proveedor cloud concreto.
- Las flechas son una vista pedagógica; no representan todos los objetos,
  watchers, kube-proxy, EndpointSlices ni saltos de red.
- Un Service, una probe o un Deployment no garantizan por sí solos una SLO.
  Hay que validar dependencias, datos, capacidad y comportamiento de negocio.
- La recuperación de un Pod con estado, volumen o dependencia externa exige
  un diseño específico que queda fuera de este primer satélite.

