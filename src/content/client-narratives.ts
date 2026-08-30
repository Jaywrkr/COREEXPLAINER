import type { ClientNarrative, ExplainerStep } from "./types";

type NarrativeMap = Record<string, Record<string, ClientNarrative>>;

/**
 * Mandatory first-reading stories. The technical content remains in each
 * topic file; these lines are what a non-specialist sees before asking for
 * deeper detail.
 */
export const clientNarratives: NarrativeMap = {
  vcf: {
    problem: { title: "Cuando cada equipo administra una pieza distinta", lead: "Imagina que ampliar una aplicación exige coordinar servidores, almacenamiento y red por separado.", impact: "El cambio tarda más porque una decisión en una capa puede bloquear a las demás." },
    solution: { title: "Una plataforma reúne esas piezas", lead: "VCF organiza cómputo, almacenamiento, red y gestión como partes de una misma plataforma.", impact: "El equipo puede planificar y operar el conjunto con reglas comunes." },
    architecture: { title: "Así trabajan juntas las piezas", lead: "Los servidores aportan capacidad; la plataforma distribuye las aplicaciones y las conecta con sus datos y su red.", impact: "Cada dependencia queda visible y puede comprobarse antes de una falla." },
    result: { title: "La aplicación deja de depender de una sola máquina", lead: "Una carga puede usar la capacidad del clúster sin quedar atada permanentemente a un servidor físico.", impact: "Crecer o recuperarse resulta más predecible cuando existe capacidad y el diseño fue validado." },
  },
  "vsphere-ha": {
    normal: { title: "La aplicación funciona en uno de varios servidores", lead: "Una máquina virtual está encendida en un host, mientras otros hosts del clúster pueden recibirla si hace falta." },
    failure: { title: "El servidor deja de responder", lead: "El clúster detecta que el host ya no está disponible; la aplicación que vivía allí también se detiene." },
    decision: { title: "El clúster busca dónde volver a encenderla", lead: "Antes de actuar, HA necesita encontrar otro host con capacidad, acceso a los mismos datos y una configuración compatible." },
    restart: { title: "La aplicación arranca nuevamente", lead: "Si encuentra un destino válido, HA vuelve a encender la máquina virtual en otro host; no la mantiene corriendo sin interrupción." },
    limits: { title: "Tener varios servidores no basta", lead: "Sin capacidad libre, datos accesibles o una red correcta, la máquina virtual puede no recuperarse." },
  },
  vsan: {
    "local-storage": { title: "Los discos de varios servidores se presentan como un solo espacio", lead: "vSAN reúne capacidad local del clúster para que las máquinas virtuales no dependan de un único disco o servidor." },
    "object-distribution": { title: "Cada máquina virtual se divide en piezas protegibles", lead: "Sus datos y configuración se guardan como componentes que vSAN puede repartir entre distintos hosts." },
    "policy-placement": { title: "Una regla decide cuánta protección necesita", lead: "La política indica cuántas fallas debe tolerar el objeto y vSAN intenta colocar sus componentes para cumplirla." },
    "failure-resync": { title: "Si una pieza falla, vSAN evalúa qué reconstruir", lead: "El objeto puede seguir accesible con sus componentes restantes y reconstruirse cuando existe capacidad y ubicación válidas." },
    limits: { title: "La protección depende del diseño completo", lead: "Una política no puede compensar por sí sola falta de hosts, dominios de falla mal definidos o capacidad insuficiente." },
  },
  nsx: {
    segments: { title: "Las aplicaciones reciben redes creadas por software", lead: "Dos cargas pueden conectarse a un mismo segmento lógico aunque la red física que las transporta sea más compleja." },
    overlay: { title: "La red virtual viaja sobre la red física", lead: "NSX encapsula el tráfico entre hosts; la red física sigue siendo necesaria para transportar esos paquetes." },
    "east-west": { title: "Se controla el tráfico entre aplicaciones", lead: "El firewall distribuido puede aplicar reglas cerca de cada carga para limitar movimientos laterales dentro del centro de datos." },
    "north-south": { title: "Los gateways conectan con el exterior", lead: "Cuando una aplicación necesita salir o recibir tráfico externo, un gateway une sus segmentos con otras redes." },
    limits: { title: "La regla correcta necesita un camino correcto", lead: "La seguridad lógica no funciona si el transporte, las rutas, los grupos o el alcance de la política están mal definidos." },
  },
  "zero-trust": {
    request: { title: "Cada acceso empieza con una nueva pregunta", lead: "Una persona o aplicación pide entrar a un recurso; estar dentro de la red no concede confianza automática." },
    context: { title: "La decisión mira más que una contraseña", lead: "Se combinan identidad, estado del dispositivo, ubicación, riesgo y sensibilidad del recurso." },
    decision: { title: "Una política decide qué permitir", lead: "Con ese contexto, el sistema puede permitir, limitar, pedir otra verificación o negar el acceso." },
    enforcement: { title: "La decisión se aplica antes del recurso", lead: "Un punto de control hace cumplir la política para que la solicitud no llegue directamente al sistema protegido." },
    limits: { title: "La confianza continua requiere señales confiables", lead: "Identidades incompletas, equipos no administrados o reglas ambiguas producen decisiones débiles." },
  },
  kubernetes: {
    "desired-state": { title: "Primero se declara el resultado esperado", lead: "El equipo describe cuántas copias de la aplicación quiere y qué necesita cada una; Kubernetes intenta mantener ese estado." },
    scheduling: { title: "Kubernetes busca dónde ejecutar cada copia", lead: "El scheduler elige un nodo que tenga recursos y cumpla las restricciones declaradas." },
    service: { title: "Los usuarios reciben una dirección estable", lead: "Aunque las copias de la aplicación cambien, un Service ofrece un punto constante para encontrarlas." },
    rollout: { title: "La nueva versión entra poco a poco", lead: "Un Deployment reemplaza copias anteriores de manera controlada y observa si las nuevas están listas." },
    failure: { title: "Kubernetes reacciona, pero necesita margen", lead: "Puede recrear una copia que falló solo si detecta el problema y encuentra capacidad y dependencias disponibles." },
  },
  observability: {
    "request-path": { title: "Una acción del usuario cruza muchos componentes", lead: "Abrir una pantalla puede pasar por varios servicios y bases de datos antes de producir una respuesta." },
    signals: { title: "Cada señal cuenta una parte diferente", lead: "Las métricas muestran tendencias, los registros describen eventos y las trazas siguen una solicitud de principio a fin." },
    collection: { title: "La evidencia se reúne y se envía", lead: "Un recolector recibe las señales, las organiza y las entrega a la plataforma que las analizará." },
    correlation: { title: "El contexto convierte datos en una explicación", lead: "Al relacionar señales del mismo recorrido, el equipo puede distinguir el síntoma de la causa probable." },
    incident: { title: "Solo se puede investigar lo que fue observado", lead: "Si falta una señal o una dependencia no está cubierta, la historia del incidente queda incompleta." },
  },
  "backup-dr": {
    objectives: { title: "Primero se decide cuánto se puede perder y esperar", lead: "RPO define la pérdida de datos tolerable y RTO el tiempo aceptable para recuperar el servicio." },
    protection: { title: "La política crea copias de las cargas", lead: "Veeam lee las cargas protegidas y guarda puntos de restauración según una programación y retención definidas." },
    copies: { title: "Una copia debe sobrevivir al mismo incidente", lead: "Guardar todo en el mismo dominio deja backup y producción expuestos a una misma falla o ataque." },
    recovery: { title: "Recuperar significa devolver el servicio completo", lead: "No basta con restaurar archivos: también deben funcionar aplicación, datos, identidad, red y dependencias." },
    limits: { title: "Una recuperación no probada sigue siendo una suposición", lead: "Las pruebas demuestran tiempos, orden, acceso a las copias y funcionamiento real del servicio." },
  },
  "ransomware-resilience": {
    prevention: { title: "Primero se reducen las oportunidades de entrada", lead: "Identidad, parches, segmentación y mínimo privilegio disminuyen las rutas que puede aprovechar un atacante." },
    detection: { title: "Una señal debe convertirse en una alerta útil", lead: "El equipo necesita saber qué cambió, dónde ocurrió y qué servicio podría estar afectado." },
    containment: { title: "Se limita el daño sin actuar a ciegas", lead: "Aislar cuentas, equipos o segmentos reduce la propagación mientras se conserva evidencia para investigar." },
    recovery: { title: "Las copias limpias permiten reconstruir", lead: "La recuperación parte de datos protegidos que el atacante no pudo alterar y de un entorno confiable donde restaurarlos." },
    learning: { title: "La prueba revela lo que todavía falta", lead: "Un ejercicio conecta prevención, detección, contención y recuperación para corregir brechas reales." },
  },
  "san-storage": {
    foundation: { title: "La aplicación llega a sus datos atravesando varias capas", lead: "El recorrido va desde la aplicación y el servidor, cruza la red SAN y termina en la cabina de almacenamiento." },
    provisioning: { title: "Crear espacio no significa que el servidor ya pueda usarlo", lead: "Después de crear un volumen, todavía hay que presentarlo al host correcto y permitirle reconocerlo." },
    multipath: { title: "Dos caminos protegen el acceso al mismo dato", lead: "Si una ruta falla, el servidor puede usar otra; ambas deben llegar correctamente al mismo volumen." },
    migration: { title: "Mover datos y mantener una copia son tareas distintas", lead: "Una migración cambia la ubicación; una replicación conserva una relación con otro destino para continuidad." },
    limits: { title: "La cadena se prueba capa por capa", lead: "Retirar un camino, revisar la presentación y validar la aplicación demuestra si la redundancia realmente funciona." },
  },
  "veeam-protection": {
    workloads: { title: "No todas las cargas se protegen igual", lead: "Una máquina virtual, un servidor AIX, un NAS y una cinta requieren métodos y comprobaciones diferentes." },
    "data-pipe": { title: "La copia recorre una cadena", lead: "Los datos salen del origen, son procesados y llegan a un repositorio; una falla en cualquier tramo afecta el resultado." },
    retention: { title: "Guardar, aislar y archivar resuelven riesgos diferentes", lead: "La retención conserva versiones; la inmutabilidad evita cambios y la cinta puede separar una copia físicamente." },
    restore: { title: "El éxito es una aplicación utilizable", lead: "La restauración termina cuando usuarios y dependencias pueden volver a operar, no cuando finaliza una tarea de copia." },
    limits: { title: "La política debe demostrar que puede recuperar", lead: "Pruebas periódicas confirman credenciales, tiempos, integridad de datos y orden de recuperación." },
  },
  "active-active-dc": {
    "two-domains": { title: "Dos sitios deben poder sostener el servicio", lead: "Cada dominio necesita capacidad y dependencias suficientes; dos edificios no equivalen automáticamente a continuidad." },
    "storage-ha": { title: "Los datos deben permanecer accesibles y coherentes", lead: "El servicio necesita caminos y una estrategia de datos que sobrevivan a la pérdida de un dominio." },
    "network-ha": { title: "La red también debe evitar un único punto de falla", lead: "Enlaces duplicados que comparten el mismo equipo o recorrido físico pueden fallar juntos." },
    failover: { title: "Cambiar de sitio exige una decisión coordinada", lead: "Hay que determinar quién toma el control, dónde entran los usuarios y qué estado de datos es válido." },
    limits: { title: "La prueba descubre capacidad y dependencias ocultas", lead: "Un ejercicio controlado revela si quorum, rutas, datos y aplicaciones responden como se esperaba." },
  },
  "lan-san": {
    planes: { title: "Una misma plataforma transporta tráficos distintos", lead: "Usuarios, administración, máquinas virtuales y almacenamiento no necesariamente comparten el mismo camino." },
    lan: { title: "La LAN conecta usuarios y servicios por Ethernet", lead: "Switches, redes virtuales y rutas llevan los paquetes desde su origen hasta la red de destino." },
    san: { title: "La SAN conecta servidores con almacenamiento", lead: "Una red especializada permite que el host vea los puertos de la cabina y luego el volumen autorizado." },
    integration: { title: "La aplicación depende de ambas redes", lead: "El usuario entra por la LAN mientras el servidor consulta sus datos por la SAN y atraviesa controles de seguridad." },
    limits: { title: "Cada camino necesita su propia prueba", lead: "Que la interfaz de usuario responda no demuestra que almacenamiento, gestión y redundancia estén saludables." },
  },
  "nas-private-cloud": {
    service: { title: "Un servicio de archivos es más que una caja con discos", lead: "Los usuarios necesitan nombre, red, identidad, permisos y datos disponibles para abrir un archivo." },
    identity: { title: "La identidad decide quién puede ver cada dato", lead: "El NAS consulta usuarios y grupos antes de permitir una operación sobre una carpeta compartida." },
    ha: { title: "La alta disponibilidad mantiene el servicio, no todas sus dependencias", lead: "Otro controlador puede asumir el servicio, pero red, identidad y clientes también deben seguir funcionando." },
    protection: { title: "RAID, alta disponibilidad y backup no son lo mismo", lead: "Cada mecanismo cubre una falla diferente: discos, servicio o pérdida y corrupción de datos." },
    limits: { title: "La prueba debe empezar desde el usuario", lead: "Abrir, modificar y recuperar archivos confirma la cadena completa mejor que revisar solo el estado del NAS." },
  },
  migration: {
    discovery: { title: "Antes de mover, hay que entender qué depende de qué", lead: "Una aplicación puede necesitar bases de datos, direcciones, certificados, usuarios y sistemas externos que no aparecen en la VM." },
    compatibility: { title: "El destino debe estar listo antes del traslado", lead: "Capacidad, versiones, red, almacenamiento y soporte deben aceptar la carga que llegará." },
    waves: { title: "Se migra por grupos controlados", lead: "Las primeras cargas permiten probar el método antes de exponer aplicaciones más críticas." },
    validation: { title: "La aplicación, no la infraestructura, confirma el éxito", lead: "El servicio debe responder y sus usuarios deben completar funciones reales después del cambio." },
    limits: { title: "Siempre debe existir una salida segura", lead: "Si la validación falla, un rollback probado permite regresar sin improvisar bajo presión." },
  },
  "checkpoint-ha": {
    traffic: { title: "Todo el servicio atraviesa el firewall", lead: "Si el firewall, sus rutas o sus políticas fallan, aplicaciones sanas pueden quedar inaccesibles." },
    members: { title: "Dos equipos comparten una responsabilidad", lead: "Un miembro procesa el tráfico y el otro espera preparado para asumir, con versiones y configuración compatibles." },
    sync: { title: "Compartir estado ayuda a conservar conexiones", lead: "La sincronización permite que el miembro de respaldo conozca parte del contexto que manejaba el activo." },
    failover: { title: "La prueba observa mucho más que el cambio de rol", lead: "También se revisan rutas, sesiones, políticas, administración y comportamiento de las aplicaciones." },
    limits: { title: "Dos firewalls pueden compartir la misma debilidad", lead: "Switches, enlaces, energía, rutas o errores de política comunes todavía pueden interrumpir el servicio." },
  },
  sdwan: {
    underlay: { title: "Primero existen los enlaces reales", lead: "Internet, MPLS o enlaces móviles siguen transportando los datos; SD-WAN observa su calidad." },
    overlay: { title: "Sobre esos enlaces se crea una red con intención", lead: "La empresa define cómo deben conectarse las sedes y qué comportamiento espera para cada aplicación." },
    selection: { title: "Cada aplicación puede tomar un camino diferente", lead: "La política combina prioridad y mediciones para escoger un enlace que cumpla las condiciones necesarias." },
    security: { title: "Elegir camino y proteger tráfico son decisiones unidas", lead: "Cifrado, segmentación, inspección y salida a Internet deben formar parte del mismo diseño." },
    limits: { title: "Una mala medición produce una mala decisión", lead: "Sondas, umbrales o reglas incorrectas pueden enviar tráfico por un camino que no satisface a la aplicación." },
  },
  "power-aix": {
    workload: { title: "La aplicación crítica depende de una cadena completa", lead: "Oracle o SAP necesitan sistema operativo, cómputo, red, almacenamiento e identidad funcionando juntos." },
    platform: { title: "El servidor reparte recursos entre entornos aislados", lead: "PowerVM crea particiones y VIOS les entrega acceso virtualizado a red y almacenamiento." },
    "data-paths": { title: "La partición necesita caminos consistentes", lead: "La carga debe ver sus discos y redes por rutas válidas incluso cuando un componente deja de funcionar." },
    acceptance: { title: "La prueba termina dentro de la aplicación", lead: "Arrancar AIX no basta: Oracle o SAP deben procesar una operación real y el equipo debe poder administrarlos." },
    limits: { title: "La continuidad se demuestra por capas", lead: "Capacidad, versiones, multipath, cluster y procedimientos deben validarse para la carga concreta." },
  },
  "implementation-lifecycle": {
    discovery: { title: "El proyecto comienza entendiendo el resultado esperado", lead: "Antes de instalar, se acuerdan alcance, dependencias, responsables y criterios que demostrarán el éxito." },
    rack: { title: "La base física condiciona toda la solución", lead: "Espacio, energía, enfriamiento, cables y puertos correctos deben existir antes de configurar software." },
    integration: { title: "Las piezas adquieren valor cuando trabajan juntas", lead: "Servidores, red, almacenamiento, seguridad y aplicaciones se conectan y configuran como una cadena." },
    acceptance: { title: "La entrega incluye pruebas y conocimiento", lead: "El cliente recibe evidencia, documentación y capacidad para operar, no solamente equipos encendidos." },
    limits: { title: "Los riesgos deben quedar visibles antes del cierre", lead: "Pendientes, supuestos y excepciones se documentan para que no aparezcan después como sorpresas operativas." },
  },
  instana: {
    journey: { title: "Instana sigue la acción de un usuario", lead: "Una sola solicitud puede atravesar varios servicios; Instana intenta reconstruir ese recorrido y su impacto." },
    signals: { title: "Cada tipo de evidencia responde una pregunta", lead: "Tendencias, eventos y recorridos se combinan para explicar qué pasó, dónde y a quién afectó." },
    discovery: { title: "El mapa se adapta a lo que realmente está ejecutándose", lead: "La plataforma descubre componentes y relaciones para conectar aplicaciones con procesos e infraestructura." },
    investigation: { title: "La plataforma ayuda a construir una hipótesis", lead: "Instana relaciona síntomas, cambios y dependencias; el equipo comprueba la evidencia antes de actuar." },
    limits: { title: "Lo que no se observa queda fuera de la historia", lead: "Sin sensor, permiso, conectividad o retención suficiente, una parte del incidente puede permanecer invisible." },
  },
  turbonomic: {
    demand: { title: "Cada aplicación necesita recursos para mantenerse saludable", lead: "Cuando una carga crece, puede necesitar más CPU, memoria o capacidad en otra ubicación." },
    "supply-chain": { title: "Turbonomic descubre quién entrega cada recurso", lead: "La aplicación depende de máquinas virtuales, hosts, almacenamiento y nube que forman una cadena de suministro." },
    market: { title: "El motor busca una acción que equilibre necesidad y capacidad", lead: "Compara demanda, oferta y restricciones para proponer dónde ajustar, mover o dimensionar recursos." },
    automation: { title: "Una recomendación puede revisarse o automatizarse", lead: "El equipo define qué acciones requieren aprobación y cuáles pueden ejecutarse dentro de límites seguros." },
    limits: { title: "Una simulación no conoce todo el futuro", lead: "Un plan hipotético depende de datos, supuestos y restricciones; debe comprobarse antes de convertirlo en cambio." },
  },
  webmethods: {
    landscape: { title: "Las aplicaciones hablan idiomas distintos", lead: "Sistemas internos, nube, socios y APIs intercambian datos con formatos, reglas y ritmos diferentes." },
    flow: { title: "La integración recibe, transforma y entrega", lead: "webMethods toma un mensaje, aplica reglas y lo envía al destino esperado, registrando lo ocurrido." },
    hybrid: { title: "Las integraciones pueden ejecutarse en distintos lugares", lead: "Un plano común administra runtimes cercanos a cada sistema, ya sea local o en la nube." },
    governance: { title: "Una API necesita reglas para ser operable", lead: "Publicar una entrada no basta: se controlan identidad, consumo, versiones, seguridad y responsables." },
    limits: { title: "Un flujo depende de contratos y sistemas disponibles", lead: "Cambios de formato, credenciales, versiones o destinos pueden romper la integración aunque la red funcione." },
  },
  "mcp-fundamentals": {
    "isolated-ai": { lead: "Imagina que pides a una IA buscar un documento que está dentro de otro sistema: entiende la petición, pero todavía no puede entrar." },
    "common-connector": { lead: "MCP establece una forma común para que la aplicación de IA descubra qué ofrece el sistema conectado." },
    "complete-journey": { lead: "La persona pregunta, la IA elige una capacidad, el sistema devuelve un resultado y la IA lo convierte en una respuesta." },
    capabilities: { lead: "Un servidor MCP puede permitir consultar información, reutilizar una guía o solicitar una función definida." },
    "safe-access": { lead: "MCP describe el camino disponible; autenticación, autorización y consentimiento siguen decidiendo qué puede usarse." },
  },
};

export function attachClientNarratives(slug: string, steps: ExplainerStep[]): ExplainerStep[] {
  const topicNarratives = clientNarratives[slug];
  if (!topicNarratives) throw new Error(`Explainer '${slug}' has no client narrative map`);
  return steps.map((step) => {
    const clientNarrative = topicNarratives[step.id];
    if (!clientNarrative) throw new Error(`Explainer '${slug}' step '${step.id}' has no client narrative`);
    return { ...step, clientNarrative };
  });
}
