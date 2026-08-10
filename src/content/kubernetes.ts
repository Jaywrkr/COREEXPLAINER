import type { ExplainerMeta, ExplainerStep, FailureScenario } from "./types";
import { brandContext } from "./brand-context";

export const kubernetesFailureScenarios: FailureScenario[] = [
  {
    id: "node-failure",
    sceneId: "failure",
    label: "Falla de nodo",
    summary: "Un nodo deja de ejecutar los Pods que tenía asignados.",
    detail:
      "Los controladores pueden detectar que el estado observado ya no coincide con el deseado y crear o programar reemplazos si existen recursos y una política compatible.",
    limitation:
      "La recuperación depende del workload, volúmenes, topología, capacidad, tolerations y del comportamiento del proveedor del clúster.",
    affectedNodes: ["Nodo worker 1", "Pod frontend 1"],
    deadNodeIds: ["node1"],
  },
  {
    id: "readiness-failure",
    sceneId: "failure",
    label: "Readiness fallida",
    summary: "Un Pod sigue vivo, pero no recibe tráfico del Service.",
    detail:
      "La readiness probe permite que el sistema retire temporalmente el Pod de los endpoints disponibles sin confundir disponibilidad de proceso con capacidad de atender solicitudes.",
    limitation:
      "Una probe mal diseñada puede ocultar tráfico válido o enviar tráfico a una aplicación que todavía no está lista.",
    affectedNodes: ["Readiness probe", "Service"],
    deadNodeIds: ["readiness"],
  },
  {
    id: "image-pull",
    sceneId: "failure",
    label: "ImagePullBackOff",
    summary: "El Pod no puede obtener la imagen requerida.",
    detail:
      "El controlador puede mantener el Pod deseado, pero el contenedor no llega a arrancar si la imagen, el registry o las credenciales no están disponibles.",
    limitation:
      "La causa real puede ser tag inexistente, autenticación, red, rate limit o incompatibilidad de plataforma.",
    affectedNodes: ["Registry de imágenes", "Pod frontend 1"],
    deadNodeIds: ["registry"],
  },
  {
    id: "insufficient-resources",
    sceneId: "scheduling",
    label: "Recursos insuficientes",
    summary: "El scheduler no encuentra un nodo que cumpla los requisitos.",
    detail:
      "Requests, limits, taints, affinity y restricciones de topología pueden dejar un Pod en estado Pending aunque el clúster tenga capacidad parcial.",
    limitation:
      "La demo no calcula bin packing ni reproduce el conjunto completo de plugins y políticas del scheduler.",
    affectedNodes: ["Scheduler", "Pod pendiente"],
    deadNodeIds: ["node1"],
  },
];

export const kubernetesMeta: ExplainerMeta = {
  targetArchitecture: {
    label: "Plataforma Kubernetes operable",
    summary: "El objetivo es que estado deseado, scheduling, red, servicio, rollout y self-healing estén conectados con señales de salud y operación.",
    expectedChanges: [
      "Workloads declarativos con réplicas, constraints y despliegues reproducibles.",
      "Services, ingress y probes representan el camino real de la aplicación.",
      "Rollouts, capacidad y recuperación se validan con observabilidad y criterios de aceptación.",
    ],
    limitations: "CNI, ingress, storage, seguridad, proveedor y versión del clúster deben validarse para cada implementación.",
    sourceIds: ["k8s-architecture", "k8s-scheduler", "k8s-services", "k8s-deployments", "k8s-probes"],
  },
  brandContext: brandContext.cloud,
  chip: "Cloud native · Kubernetes",
  title: "Cómo llega una aplicación a estar disponible en Kubernetes",
  tagline:
    "Una explicación visual de estado deseado, scheduling, Services, rollouts y self-healing.",
  storyboardDoc: "docs/examples/kubernetes/storyboard.md",
  technicalValidationDoc: "docs/ai-context/kubernetes-technical-validation.md",
  technicalReview: {
    lastReviewedAt: "2026-08-04",
    scope: "Kubernetes conceptual y provider-neutral; validar versión, CNI, ingress, storage y servicios del clúster.",
    sources: [
      { id: "k8s-architecture", title: "Arquitectura del clúster", url: "https://kubernetes.io/docs/concepts/architecture/", accessedAt: "2026-08-04" },
      { id: "k8s-scheduler", title: "kube-scheduler", url: "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/", accessedAt: "2026-08-04" },
      { id: "k8s-services", title: "Services", url: "https://kubernetes.io/docs/concepts/services-networking/service/", accessedAt: "2026-08-04" },
      { id: "k8s-ingress", title: "Ingress", url: "https://kubernetes.io/docs/concepts/services-networking/ingress/", accessedAt: "2026-08-04" },
      { id: "k8s-deployments", title: "Deployments", url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/", accessedAt: "2026-08-04" },
      { id: "k8s-probes", title: "Liveness, readiness y startup probes", url: "https://kubernetes.io/docs/concepts/workloads/pods/probes/", accessedAt: "2026-08-04" },
    ],
  },
  reviewStatus: "pending",
  failureScenarios: kubernetesFailureScenarios,
};

export const kubernetesSteps: ExplainerStep[] = [
  {
    id: "desired-state",
    tag: "01 — EL ESTADO DESEADO",
    title: "El manifiesto declara cómo debería verse la aplicación",
    paragraphs: [
      "El equipo declara objetos como Deployment, Service y configuración a través de la API de Kubernetes. El clúster guarda ese estado deseado y sus controladores trabajan para acercar el estado observado a esa declaración.",
      "La declaración no es una lista de comandos ejecutados una sola vez: expresa una intención que Kubernetes continúa reconciliando mientras cambian Pods, nodos y condiciones.",
    ],
    businessImpact:
      "La plataforma convierte parte de la operación en una relación observable entre intención, estado actual y acciones de reconciliación.",
    sceneId: "desired-state",
    caption: "Manifiesto → API → controlador → Pods deseados",
    sourceIds: ["k8s-architecture", "k8s-deployments"],
  },
  {
    id: "scheduling",
    tag: "02 — EL SCHEDULING",
    title: "El scheduler busca un nodo compatible para cada Pod",
    paragraphs: [
      "Un Pod pendiente no se asigna por nombre de servidor: el scheduler filtra y puntúa nodos según recursos, taints, tolerations, affinity y otras restricciones declaradas.",
      "Si ningún nodo satisface las condiciones, el Pod puede permanecer Pending. Tener CPU o memoria total disponible no significa que exista un nodo elegible para esa solicitud.",
    ],
    businessImpact:
      "La capacidad útil depende de cómo se distribuyen las cargas y de las restricciones, no solo de sumar recursos del clúster.",
    sceneId: "scheduling",
    caption: "Pod pendiente → filtros y scoring → nodo elegido",
    sourceIds: ["k8s-scheduler", "k8s-architecture"],
  },
  {
    id: "service",
    tag: "03 — EL SERVICE",
    title: "El Service ofrece un punto estable frente a Pods cambiantes",
    paragraphs: [
      "Los Pods son reemplazables y sus direcciones pueden cambiar. Un Service selecciona endpoints mediante labels y ofrece una abstracción estable para que otros clientes encuentren las réplicas disponibles.",
      "La readiness de cada Pod influye en los endpoints que reciben tráfico. Estar ejecutando no equivale automáticamente a estar listo para atender solicitudes.",
    ],
    businessImpact:
      "La aplicación puede escalar o reemplazar réplicas sin obligar a cada consumidor a conocer la identidad de cada Pod.",
    sceneId: "service",
    caption: "Cliente → Service → endpoints listos → Pods",
    sourceIds: ["k8s-services", "k8s-probes"],
  },
  {
    id: "rollout",
    tag: "04 — EL ROLLOUT",
    title: "Un Deployment coordina el cambio entre versiones",
    paragraphs: [
      "Un Deployment gestiona ReplicaSets y permite avanzar de una versión a otra manteniendo una transición controlada. Durante el rollout pueden coexistir Pods antiguos y nuevos.",
      "La disponibilidad real depende de réplicas, readiness, estrategia, recursos y comportamiento de la aplicación. Un rollout no convierte automáticamente un cambio riesgoso en un cambio sin impacto.",
    ],
    businessImpact:
      "La entrega continua gana una unidad de control y rollback, pero necesita probes, capacidad y observabilidad para saber cuándo avanzar.",
    sceneId: "rollout",
    caption: "Deployment → ReplicaSets → versión anterior / nueva",
    sourceIds: ["k8s-deployments", "k8s-probes"],
  },
  {
    id: "failure",
    tag: "05 — LOS LÍMITES",
    title: "Self-healing depende de señales y capacidad disponible",
    paragraphs: [
      "Si falla un nodo, una probe deja de responder o una imagen no puede descargarse, Kubernetes puede intentar reconciliar el estado, retirar endpoints o crear reemplazos. Cada caso tiene una causa y un resultado distinto.",
      "La plataforma no puede arrancar un Pod sin imagen, programarlo sin un nodo elegible ni garantizar que la aplicación sea correcta solo porque el contenedor está Running.",
    ],
    businessImpact:
      "La operación madura observa estados, eventos, probes y dependencias; no confunde “objeto deseado” con “servicio de negocio saludable”.",
    sceneId: "failure",
    caption: "Nodos · Pods · probes · imágenes · capacidad",
    sourceIds: ["k8s-architecture", "k8s-scheduler", "k8s-probes", "k8s-deployments"],
  },
];
