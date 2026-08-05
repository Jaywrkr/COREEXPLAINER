# Integridad técnica del modelo

## Propósito

La integridad técnica comprueba que un diagrama representa las dependencias
que su narrativa afirma. No es un monitor de red: no consulta routers,
firewalls, NSX, VCF ni telemetría del cliente.

El flujo actual es:

`AnimationSpec + contrato de reglas → diagnóstico → panel de salud + foco en canvas`

## Contrato

`ExplainerMeta.technicalIntegrity` puede declarar un perfil de dominio y
contratos por escena. Cada contrato puede exigir:

- nodos (`requiredNodes`);
- relaciones exactas (`requiredEdges`), incluyendo su semántica `data`,
  `control`, `storage` o `dependency`;
- caminos (`requiredPaths`) entre dos nodos, ignorando relaciones `failure`
  salvo que una regla indique lo contrario.

Las reglas tienen ID estable, explicación, severidad y fuentes técnicas. El
quality gate comprueba que las escenas, IDs y fuentes existan antes del build.

## Resultado

`evaluateTopologyIntegrity()` devuelve `valid`, `warning` o `error` y una lista
de diagnósticos. Cada diagnóstico conserva el detalle, la razón, los nodos
afectados y las fuentes asociadas. El panel de canvas permite seleccionar un
diagnóstico para enfocar esos nodos sin modificar la animación.

## Cobertura inicial

- VCF: dependencias de plataforma, plano de gestión, storage compartido,
  transporte de red y caminos hacia cargas de trabajo.
- NSX: segmentos, relación underlay/overlay, transporte GENEVE, DFW y camino
  north-south.

Las reglas deben mantenerse explícitas por dominio. No se debe inferir que un
diagrama está correcto solo por tener nodos conectados visualmente: cada nueva
familia tecnológica necesita un contrato revisado contra sus fuentes.

## Evolución segura

1. Añadir reglas estáticas del modelo y probarlas durante el build.
2. Incorporar fixtures de configuraciones exportadas para comparar modelo
   esperado y observado.
3. Solo después conectar inventario o telemetría real, con credenciales,
   versionado y límites de responsabilidad documentados.
