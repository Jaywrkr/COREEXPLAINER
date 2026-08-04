# Validación técnica — Kubernetes: viaje de una aplicación

## Alcance aprobado

Este tema es una explicación conceptual para conversaciones iniciales con
clientes. Se basa en la documentación oficial de Kubernetes y evita asumir un
proveedor gestionado, una CNI, un ingress controller o una estrategia de
despliegue concreta.

Fuentes primarias revisadas el 04-08-2026:

- [Arquitectura del clúster](https://kubernetes.io/docs/concepts/architecture/)
- [kube-scheduler](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/)
- [Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Liveness, readiness y startup probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/)

## Matriz de afirmaciones

| Área | Decisión técnica | Tratamiento en la demo |
|---|---|---|
| Estado deseado | La API almacena objetos declarativos y los controladores reconcilian el estado observado. | Se separan manifiesto, API, controller y Pods. |
| Scheduling | El scheduler filtra y puntúa nodos según recursos y restricciones. | El Pod pendiente no se asigna por nombre de servidor. |
| Service | Un Service abstrae el acceso a un conjunto de endpoints seleccionados. | El cliente llega al Service, no a la IP estable de un Pod. |
| Readiness | Un Pod puede estar ejecutándose y no estar listo para recibir tráfico. | La readiness controla los endpoints de la escena 3. |
| Deployment | Un Deployment gestiona ReplicaSets y permite una transición entre versiones. | Se dibujan ReplicaSets y Pods viejos/nuevos coexistiendo. |
| Self-healing | Los controladores intentan acercar el estado real al deseado; dependen de recursos y señales. | La escena de fallos evita prometer recuperación universal. |
| Ingress | Ingress es un API para acceso HTTP(S) externo; requiere un Ingress Controller para cumplirlo. | Se deja fuera del primer satélite y se reserva como continuación. |
| Proveedores | EKS, AKS, GKE y clusters propios añaden implementaciones y servicios diferentes. | El lenguaje evita nombrar un proveedor. |

## Reglas para futuras ediciones

1. No decir que Kubernetes “reinicia todo automáticamente” sin explicar el
   controlador, el workload, la capacidad y las dependencias.
2. Diferenciar Pod, ReplicaSet, Deployment, Service, endpoint y nodo.
3. No presentar `Running` como equivalente a saludable o disponible para el
   negocio; explicar readiness y dependencias.
4. Si se agrega storage persistente, Ingress, CNI, autoscaling o service mesh,
   crear un satélite y una matriz técnica específicos.

