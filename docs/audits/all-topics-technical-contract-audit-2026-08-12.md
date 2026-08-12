# Auditoría técnica transversal — 2026-08-12

## Resultado

Los 22 explainers registrados tienen al menos una regla que une una fuente técnica con la escena que comunica la afirmación. El comando `npm run audit:technical-contracts` verificó 22/22 sin referencias a fuentes o pasos inexistentes.

| Autoridad | Temas auditados | Resultado estructural |
| --- | --- | --- |
| Broadcom / VMware | VCF, vSphere HA, vSAN, NSX, migración | Reglas fuente→escena presentes |
| IBM | Instana, Turbonomic, webMethods, SAN, Power/AIX, activo-activo | Reglas fuente→escena presentes |
| Veeam | Backup/DR, protección heterogénea | Reglas fuente→escena presentes |
| HPE Aruba Networking | LAN/SAN, SD-WAN | Reglas fuente→escena presentes |
| Check Point | ClusterXL HA | Reglas fuente→escena presentes |
| Synology | NAS privado | Reglas fuente→escena presentes |
| NIST, CISA, Kubernetes, OpenTelemetry | Zero Trust, ransomware, Kubernetes, observabilidad | Reglas fuente→escena presentes |
| Multi-marca | Ciclo de implementación | Reglas fuente→escena presentes |

## Hallazgos

- El gate ahora expone las reglas resueltas por tema para comprobar la cobertura transversal.
- Una regresión falla si se registra un tema sin reglas o si una regla apunta a una fuente o paso inexistente.
- La revisión de fuentes oficiales de IBM detectó una condición de ciclo de vida para webMethods: la disponibilidad de API Gateway y Developer Portal para entornos SaaS nuevos debe confirmarse con IBM antes de convertirla en una decisión de diseño.

## Límites deliberados

- 22/22 significa cobertura estructural de contenido, no certificación de una instalación ni compatibilidad de un cliente.
- Ningún `reviewStatus` se cambió a `reviewed`. Cada tema continúa pendiente de aprobación por especialista, release, modelo, licenciamiento, topología, HCL y evidencia de pruebas del cliente.
- Las fuentes web se consultaron contra documentación oficial; deben volver a confirmarse al elaborar una propuesta, diseño o runbook de producción.

## Operación

```powershell
npm run audit:technical-contracts
npm run test:technical-contract-audit
npm run report:technical-authority
```

El primer comando debe permanecer verde. El último continuará bloqueando publicación técnica hasta que exista revisión humana real.
