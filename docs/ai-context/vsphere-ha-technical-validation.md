# Validación técnica — vSphere HA y recuperación ante fallos

## Alcance aprobado

Este tema es una explicación conceptual para conversaciones iniciales con
clientes. Describe que vSphere HA puede reiniciar VMs protegidas en hosts
alternos después de una falla, siempre que el clúster pueda detectar la
condición y exista un destino compatible. No es un HLD, una guía de
configuración ni una promesa de RTO, SLA o continuidad sin interrupción.

La revisión se contrastó con documentación primaria de VMware by Broadcom el
04-08-2026:

- [Determining why and which virtual machines vSphere HA restarts](https://knowledge.broadcom.com/external/article/316525/determining-why-and-which-virtual-machin.html)
- [vSphere HA failover fails with insufficient resources or inaccessible storage](https://knowledge.broadcom.com/external/article/441641/vsphere-ha-failover-fails-with-insuffici.html)
- [vSphere HA fails to restart VMs because of cluster rules](https://knowledge.broadcom.com/external/article/439262/vsphere-ha-fails-to-restart-vms-in-a-clu.html)
- [vSphere HA VM failover can stop after maximum restart attempts](https://knowledge.broadcom.com/external/article/432033/vsphere-ha-virtual-machine-failover-fail.html)
- [Multiple-host failure and admission-control capacity](https://knowledge.broadcom.com/external/article/429590/virtual-machines-fail-to-failover-and-re.html)

## Matriz de afirmaciones

| Área | Decisión técnica | Tratamiento en la demo |
|---|---|---|
| Detección | HA decide según la condición observada; pérdida de comunicación no debe describirse automáticamente como una única causa. | La escena de falla menciona distinguir falla, aislamiento o partición. |
| Resultado | HA puede reiniciar VMs protegidas en hosts restantes. | Se usa “puede reiniciar” y no “mueve automáticamente sin interrupción”. |
| Migración | El reinicio tras una falla no conserva la ejecución en memoria como vMotion. | El paso 2 separa explícitamente reinicio de migración en vivo. |
| Capacidad | Un host candidato necesita recursos y la política de admisión/failover debe contemplar la falla. | `capacity` aparece como condición visual y escenario de fallo. |
| Storage | Los hosts potenciales deben tener visibilidad uniforme del datastore requerido para registrar/encender la VM. | `datastore` aparece como dependencia de storage y escenario de “no visible”. |
| Políticas | Afinidad, anti-afinidad y otras restricciones pueden impedir una colocación válida. | `policy` aparece como condición de control y escenario independiente. |
| Reintentos | Si no existe un destino que pueda encender/registrar la VM, HA puede agotar sus reintentos. | La escena de límites evita prometer recuperación garantizada. |
| Tiempo | La demo no fija segundos, minutos, RTO ni SLA. | El texto atribuye el tiempo a detección, selección, arranque y aplicación. |

## Reglas para futuras ediciones

1. Mantener lenguaje condicional: “puede reiniciar” y “si se cumplen las
   condiciones”.
2. No presentar un reinicio de VM como vMotion, fault tolerance o continuidad
   de memoria.
3. Si se agrega VMCP/APD, heartbeat datastore, admission control o una versión
   concreta, añadir una escena y una fuente específica para esa afirmación.
4. Revisar las reglas de colocación y el modelo de storage con un especialista
   del entorno antes de convertir esta demo en una recomendación de diseño.

