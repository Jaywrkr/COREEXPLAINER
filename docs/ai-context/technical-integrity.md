# Integridad técnica del modelo

## Propósito

La integridad técnica comprueba que un diagrama representa las dependencias que su narrativa afirma. No es un monitor de red ni consulta routers, firewalls, plataformas o telemetría del cliente.

El flujo es:

`AnimationSpec + contrato de reglas → diagnóstico → panel de salud + foco en canvas`

## Contrato

`ExplainerMeta.technicalIntegrity` declara un dominio y contratos por escena. Cada contrato puede exigir:

- nodos (`requiredNodes`);
- relaciones exactas (`requiredEdges`), con semántica `data`, `control`, `storage`, `dependency` o `failure`;
- caminos (`requiredPaths`) entre dos nodos, ignorando fallos cuando se comprueba el camino operativo.

Las reglas tienen ID estable, explicación, severidad y, cuando corresponde, fuentes técnicas. El quality gate comprueba que escenas, IDs y fuentes existan antes del build.

## Resultado

`evaluateTopologyIntegrity()` devuelve `valid`, `warning` o `error` y una lista de diagnósticos. Cada diagnóstico conserva detalle, razón, nodos afectados y fuentes asociadas. El panel permite seleccionar un diagnóstico para enfocar esos nodos sin modificar la animación.

## Cobertura actual

Los 22 explainers del registro tienen un perfil. VCF y NSX conservan las reglas más profundas del primer batch: dependencias de plataforma, plano de gestión, storage compartido, underlay/overlay, GENEVE, DFW y caminos north-south. El resto tiene una línea base explícita por escena que comprueba componentes esenciales, una relación semántica y un camino principal.

| Dominio | Temas incluidos |
| --- | --- |
| Virtualización | vSphere HA, vSAN, IBM Power/AIX |
| Red | VCF, NSX, LAN/SAN, SD-WAN |
| Storage | vSAN, SAN Storage, NAS/Private Cloud |
| Seguridad | Zero Trust, Ransomware Resilience, Check Point HA |
| Observabilidad | Observabilidad, Instana |
| Continuidad | Backup/DR, Veeam Protection, Active-Active DC |
| Delivery | Migración, Implementation Lifecycle |
| Aplicación | Kubernetes, Turbonomic, webMethods |

Una línea base no sustituye la revisión de especialista: evita que el dibujo pierda piezas o relaciones que la explicación necesita. Las reglas deben mantenerse explícitas por dominio y ampliarse con fuentes concretas en cada siguiente batch.

Cada perfil declara también su nivel de garantía:

- `baseline`: contrato semántico inicial para evitar omisiones estructurales;
- `source-backed`: contrato asociado a fuentes específicas por escena, sin presentarlo aún como certificación especialista;
- `reviewed`: reglas contrastadas con una revisión técnica más profunda y fuentes específicas.

El panel muestra esta diferencia como “Cobertura base”, “Con fuentes específicas” o “Revisión profunda” para que el estado Validado no se lea como una certificación de producción.

El batch fuente-backed actual cubre Observability, Instana, Turbonomic,
webMethods, vSAN, SAN Storage, Veeam Protection, Active-Active DC,
NAS/Private Cloud e IBM Power/AIX, usando los catálogos técnicos declarados
por cada tema. Estas asociaciones aportan trazabilidad por escena, pero no se
presentan como certificación de diseño ni sustituyen la validación del entorno
real del cliente.

Cuando una regla declara `sourceIds`, el panel de diagnóstico muestra los
enlaces directos a esas fuentes. La acción de abrir evidencia está separada
del botón que enfoca los nodos, para que consultar documentación no cambie el
estado de la exploración.

La evaluación también recibe los nodos inactivos del escenario o de la falla
manual. Los caminos se calculan excluyendo esos nodos y el panel identifica la
simulación activa. Esto explica el impacto de una falla sobre el modelo sin
afirmar que se haya comprobado una red real.

Cada diagnóstico incluye una recomendación de siguiente paso. Es una
orientación para la conversación —revisar el contrato, validar una dependencia,
seguir recuperación o confirmar una excepción— y nunca ejecuta cambios ni
sustituye el runbook del cliente.

Cuando hay una simulación activa, el panel se abre automáticamente para hacer
visible el impacto. Al limpiar la falla y volver a una escena válida, recupera
su comportamiento compacto.

## Regresiones

`src/lib/technical-integrity/regressionFixtures.ts` ejecuta fixtures durante la
carga del registro. Comprueba un caso válido y mutaciones de tipo de relación,
nodo faltante, camino roto por un nodo inactivo, componente aislado y arista
colgante. Si una modificación del evaluador deja de detectar alguno, el build
falla antes de publicar.

## Evolución segura

1. Añadir reglas estáticas del modelo y probarlas durante el build.
2. Incorporar fixtures de configuraciones exportadas para comparar modelo esperado y observado.
3. Solo después conectar inventario o telemetría real, con credenciales, versionado y límites de responsabilidad documentados.

## Quality gate

Antes de publicar, `validateExplainerContent()` comprueba además que:

- cada escena tenga exactamente un contrato técnico;
- cada contrato declare al menos una comprobación;
- los nodos exigidos por reglas existan en el `animation-spec.json` de esa escena;
- ningún explainer del registro pueda entrar sin un perfil de integridad.

Esto convierte los cambios de diagramas en cambios verificables: si alguien
renombra o elimina un nodo sin actualizar su contrato, `npm run build` falla
antes de llegar a Vercel.

Durante la evaluación en el canvas también se comprueban relaciones colgantes
y componentes sin conexiones. Estos últimos generan una advertencia, no un
error fatal, porque algunas escenas explican deliberadamente el aislamiento;
esas excepciones deben declararse con `checkOrphans: false` y documentar por
qué la desconexión forma parte de la narrativa.
