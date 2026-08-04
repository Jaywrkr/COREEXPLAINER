# Storyboard — vSAN y protección de objetos

Ejemplo independiente usado por `/explainer/vsan`. Explica cómo vSAN
representa y protege objetos de una VM; no pretende ser un diseño de discos,
una guía de sizing ni una comparación completa entre OSA y ESA.

## Estructura narrativa

Base local → Objeto → Política → Falla → Límites. Cada paso cambia la
topología para separar la abstracción del datastore, la colocación, la
reconstrucción y las condiciones que pueden impedirla.

### Paso 1 — La base: discos locales y datastore distribuido

**Escena**: `local-storage`. Dos hosts aportan discos locales y vSAN los
presenta como un datastore del clúster. La red y la capacidad forman parte de
la dependencia, aunque el diagrama usa una versión reducida.

**Mensaje**: vSAN abstrae el almacenamiento local para que las VMs consuman
un datastore del clúster. No desaparecen las dependencias de hardware, red,
firmware, configuración y operación.

### Paso 2 — El objeto: datos distribuidos

**Escena**: `object-distribution`. Una VM produce un objeto lógico cuyos
componentes se representan en más de un host antes de llegar al datastore.

**Mensaje**: un VMDK y otros elementos de una VM son objetos con componentes;
la colocación concreta depende de la política. La flecha no es un packet walk
ni muestra cada componente interno.

### Paso 3 — La política: protección solicitada

**Escena**: `policy-placement`. Una VM Storage Policy se aplica al objeto y
la topología muestra tres fault domains como destinos posibles.

**Mensaje**: la política expresa capacidades como tolerancia a fallos y método
de protección. La política aplicada al objeto determina la tolerancia real;
el número visible en una configuración de fault domains no sustituye esa
política.

### Paso 4 — El fallo: disponibilidad reducida y resync

**Escena**: `failure-resync`. Se pueden simular la caída de un host o de un
disco local. El objeto queda relacionado con un componente activo y con un
flujo conceptual de resync.

**Mensaje**: tras una falla, un objeto puede seguir accesible con disponibilidad
reducida si conserva componentes activos. La reconstrucción requiere capacidad,
dominios de fallo y comunicación suficientes; no debe asumirse que empieza o
termina siempre de la misma forma.

### Paso 5 — Los límites: la política necesita un entorno compatible

**Escena**: `limits`. Capacidad de rebuild, fault domains, red vSAN y política
convergen en el estado final del objeto. Cada condición se puede simular como
un fallo independiente.

**Mensaje**: un objeto puede quedar no conforme, sin reconstrucción o
inaccesible cuando las fallas superan la tolerancia o el entorno no puede
cumplir la política. FTT, RAID, topología, versión y arquitectura importan.

## Límites técnicos de esta demo

- No modela disk groups, controladoras, caché, OSA, ESA, stretched clusters,
  witness, MTU ni estados detallados de Skyline Health.
- “Objeto”, “componente” y “resync” son conceptos visuales; las aristas no son
  una secuencia literal de I/O ni una reproducción del algoritmo interno.
- La disponibilidad reducida no equivale a protección completa: una falla
  adicional puede producir un estado distinto según la política.
- No se fija un porcentaje universal de capacidad libre. Los umbrales,
  reservas y requisitos deben validarse para la versión y diseño del cliente.

