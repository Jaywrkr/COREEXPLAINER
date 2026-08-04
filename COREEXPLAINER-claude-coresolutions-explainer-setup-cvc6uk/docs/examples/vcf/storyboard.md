# Storyboard — VMware Cloud Foundation

Ejemplo de referencia usado por el prototipo en `/explainer/vcf`. Puente
entre el guion comercial (prosa) y los archivos de datos
(`src/content/vcf.ts` + `animation-spec.json` en esta misma carpeta).
Contenido de ejemplo — ajústese al discurso comercial real antes de usarse
frente a un cliente.

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

**Mensaje**: cómputo, almacenamiento y red operan como tres sistemas
separados, cada uno con su consola y su equipo. Cualquier cambio requiere
coordinar los tres a mano.

**Impacto de negocio**: un cambio que debería tomar horas termina tomando
semanas.

---

### Paso 2 — La solución: una plataforma definida por software

**Escena**: `unify`. Los mismos tres dominios (Cómputo, vSAN, NSX) ahora
convergen en un nodo central `vcf` (VMware Cloud Foundation, capacidad
100), que alimenta un nodo `app` (Apps del negocio, `rps: 3`) — se ve
tráfico real fluyendo desde la plataforma unificada hacia las aplicaciones.

**Mensaje**: VCF unifica cómputo, storage (vSAN) y red (NSX) en una sola
plataforma administrada desde un panel único.

**Impacto de negocio**: desplegar una carga de trabajo nueva pasa de
semanas a minutos.

---

### Paso 3 — La arquitectura: un clúster, tres capas

**Escena**: `cluster`. Tres hosts ESXi (`killable: true` — se puede
simular la caída de un host en vivo, clic en el botón rojo) alimentan a
`vsan` y `nsx`, que a su vez reportan a `vcenter` (panel de control,
`rps: 2`). Al "matar" un host, sus aristas dejan de emitir tráfico —
demostración visual honesta de tolerancia a fallas.

**Mensaje**: los hosts físicos forman un clúster; vSAN integra sus discos;
NSX despliega la red virtual; vCenter administra todo desde un solo lugar.

**Impacto de negocio**: ante la falla de un host, las cargas de trabajo se
reubican automáticamente (99.97% de disponibilidad objetivo).

---

### Paso 4 — El resultado: cargas de trabajo sin fricción

**Escena**: `workloads`. Un nodo `client` (Usuarios, `rps: 5`) envía
tráfico a `vcf` (Clúster VCF), que hace fan-out hacia tres apps
(`app1`/`app2`/`app3`, cada una `killable: true` y con `capacity: 40`) —
el tráfico se reparte automáticamente entre ellas.

**Mensaje**: las aplicaciones corren sobre la plataforma sin depender de un
servidor físico específico; agregar un host aumenta la capacidad total sin
rediseñar la arquitectura.

**Impacto de negocio**: la infraestructura escala con la empresa, no al
revés.

---

## Origen de este ejemplo

Este storyboard y su spec (`animation-spec.json` en esta carpeta) se
derivan del primer prototipo autocontenido (un único archivo `.html`,
construido a mano fuera de este repo para validar el enfoque visual antes
de construir el motor genérico). El motor genérico
(`src/components/explainer/engine/sceneEngine.ts`) reimplementa la misma
lógica de simulación (paquetes, capacidad, fan-out, nodos "matables") de
forma reutilizable para cualquier tema — ver decisión D3 en
`docs/ai-context/decisions.md`.
