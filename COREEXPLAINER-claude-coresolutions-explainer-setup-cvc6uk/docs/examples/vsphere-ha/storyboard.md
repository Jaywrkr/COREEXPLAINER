# Storyboard — vSphere HA y recuperación ante fallos

Ejemplo independiente usado por `/explainer/vsphere-ha`. Explica el principio
de protección y reinicio de una VM, no un diseño completo de disponibilidad.
La narrativa y la topología deben leerse junto con
`docs/ai-context/vsphere-ha-technical-validation.md`.

## Estructura narrativa

Protección → Falla → Decisión → Reinicio → Límites. Cada paso utiliza una
escena propia para que el cliente pueda distinguir el evento, las condiciones
de colocación y el resultado observable.

### Paso 1 — Protección normal

**Escena**: `normal`. Una VM corre en `host1`, usa `datastore` y está dentro
del ámbito de observación de HA. `host2` aparece como destino potencial, no
como una migración activa.

**Mensaje**: HA mantiene una relación de protección sobre VMs elegibles y
observa el estado de los hosts. La arquitectura depende también de storage,
red, configuración del clúster y políticas.

### Paso 2 — Falla de host

**Escena**: `host-failure`. `host1` se puede simular como caído. HA debe
interpretar la pérdida de comunicación y distinguir una falla del host de un
escenario de aislamiento o partición antes de actuar.

**Mensaje**: el efecto esperado es una interrupción y un reinicio de la VM en
otro host compatible cuando se cumplen las condiciones. No es vMotion ni
preserva la ejecución en memoria del host que falló.

### Paso 3 — Decisión de colocación

**Escena**: `decision`. HA evalúa tres condiciones pedagógicas: capacidad,
visibilidad del datastore y políticas/restricciones de colocación.

**Mensaje**: el reinicio no es una promesa incondicional. Un host candidato
debe poder registrar y encender la VM, ver el storage requerido y respetar las
reglas aplicables.

### Paso 4 — Reinicio en un host alterno

**Escena**: `restart`. La VM vuelve a registrarse y encenderse en `host2`;
los usuarios ven una interrupción mientras el sistema operativo y la
aplicación arrancan y recuperan sus servicios.

**Mensaje**: HA reduce el trabajo manual de recuperación, pero el tiempo de
restablecimiento depende de detección, selección, arranque de la VM,
dependencias de aplicación y operación posterior.

### Paso 5 — Cuando no hay destino compatible

**Escena**: `limits`. Se muestran recursos insuficientes, storage no visible
y una restricción de política como causas separadas.

**Mensaje**: si ningún host puede satisfacer las condiciones, HA puede no
reiniciar la VM o dejar de reintentarlo según el estado y la configuración.
El diseño debe tratar capacidad, visibilidad y reglas como parte de la
estrategia de recuperación.

## Límites técnicos de esta demo

- Es una reducción conceptual: no modela heartbeat datastores, VMCP/APD,
  admission control, prioridades, redes de gestión ni todos los estados de
  partición/aislamiento.
- Las flechas muestran relaciones semánticas, no un recorrido literal de
  paquetes ni una secuencia exacta de eventos internos.
- Un reinicio de HA implica una interrupción; no equivale a una migración en
  vivo ni garantiza que una aplicación distribuida quede disponible.
- La capacidad de recuperación debe validarse para la versión, configuración
  de clúster, storage, políticas y dependencias del entorno del cliente.

