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
