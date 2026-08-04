# Storyboard — NSX: tráfico y microsegmentación

Ejemplo independiente usado por `/explainer/nsx`. Explica cómo se conectan y
protegen workloads con segmentos, overlay, Distributed Firewall y gateways.
No intenta cubrir todo NSX, vDefend, load balancing, VPN, IDS/IPS o Federation.

## Estructura narrativa

Segmento → Transporte → East-west → North-south → Límites. Cada paso cambia
la topología para separar el modelo lógico, el transporte físico y los puntos
de enforcement.

### Paso 1 — Segmentos lógicos

**Escena**: `segments`. Una aplicación de tres capas (web, aplicación y base
de datos) se dibuja sobre segmentos lógicos y bajo el control de NSX Manager.

**Mensaje**: los segmentos permiten expresar redes y dependencias en software.
No sustituyen el underlay físico ni hacen que todas las aplicaciones queden
aisladas automáticamente.

### Paso 2 — Overlay y underlay

**Escena**: `overlay`. Dos transport nodes conectan workloads a un overlay
GENEVE y a una red IP física.

**Mensaje**: el overlay permite transportar segmentos lógicos entre hosts;
TEP, VLAN de transporte, MTU y routing del underlay siguen siendo necesarios.
La escena no es una captura de cada salto interno.

### Paso 3 — Firewall distribuido east-west

**Escena**: `east-west`. El tráfico de web cruza un DFW conceptual antes de
llegar a aplicación o base de datos. Una política y sus grupos determinan el
resultado.

**Mensaje**: el DFW aplica control distribuido cerca de los workloads y sirve
para microsegmentación. La aplicación real de reglas depende del scope,
grupos, servicios, publicación y versión.

### Paso 4 — Gateways north-south

**Escena**: `north-south`. Un cliente externo atraviesa Tier-0, Tier-1 y un
segmento antes de llegar a la aplicación.

**Mensaje**: Gateway Firewall y DFW tienen responsabilidades diferentes. Tier-0
representa la frontera externa; Tier-1 conecta los segmentos de workloads y
puede alojar servicios según el diseño.

### Paso 5 — Límites y diagnóstico

**Escena**: `limits`. Se pueden simular problemas de underlay/MTU, alcance de
regla, política del segmento y gateway.

**Mensaje**: un “NSX no funciona” puede ser una causa de transporte, política,
segmento o routing. La operación debe localizar el punto de enforcement y
separar east-west de north-south antes de corregir.

## Límites técnicos de esta demo

- No modela todos los transport zones, TEP pools, Edge clusters, BGP, NAT,
  load balancer, VPN, IDS/IPS ni Federation.
- Las flechas son una vista pedagógica; no representan cada salto físico,
  lookup, estado de conexión o algoritmo del datapath.
- El DFW se muestra como nodo conceptual para hacer visible la decisión, aunque
  la aplicación se distribuye en los puntos de enforcement de los workloads.
- No se fija una MTU, número de reglas ni modo HA universal; todos dependen de
  versión, plataforma y diseño.

