# Validación técnica — Zero Trust: decisión de acceso

## Alcance aprobado

Este tema es una explicación conceptual para conversaciones iniciales con
clientes. Se basa en la arquitectura Zero Trust de NIST y en los pilares de
CISA, pero no es un assessment, una arquitectura IAM/PAM ni una recomendación
de producto.

La revisión se contrastó con fuentes primarias el 04-08-2026:

- [NIST SP 800-207 — Zero Trust Architecture](https://nvlpubs.nist.gov/nistpubs/specialpublications/NIST.SP.800-207.pdf)
- [NIST — componentes y builds de una arquitectura Zero Trust](https://pages.nist.gov/zero-trust-architecture/VolumeB/architecture.html)
- [NIST — publicación de SP 800-207](https://www.nist.gov/news-events/news/2020/08/zero-trust-architecture-nist-publishes)
- [CISA Zero Trust Maturity Model v2](https://www.cisa.gov/sites/default/files/2023-04/CISA_Zero_Trust_Maturity_Model_Version_2_508c.pdf)

## Matriz de afirmaciones

| Área | Decisión técnica | Tratamiento en la demo |
|---|---|---|
| Confianza | No se concede confianza implícita por ubicación de red o sesión previa. | La escena 1 empieza con una solicitud contextual. |
| Activos | El modelo protege recursos y acciones concretas, incluidos servicios y datos. | El recurso aparece como destino explícito. |
| Policy Engine | Evalúa señales y decide permitir, limitar o denegar. | Se representa como motor de política. |
| Policy Administrator | Traduce la decisión hacia el punto que la aplica. | Se separa visualmente en la escena 3. |
| Policy Enforcement Point | Protege el recurso y aplica la decisión. | Se muestra como proxy/gateway/agente conceptual. |
| Señales | Identidad, dispositivo, recurso y telemetría influyen en la decisión. | Se agrupan en la escena 2, sin score universal. |
| Reevaluación | El contexto puede cambiar y provocar limitación o revocación. | La escena 4 conecta telemetría con reevaluación. |
| Pilares | CISA organiza el modelo en identidad, dispositivos, red, aplicaciones/workloads y datos. | La demo se enfoca en identidad/dispositivo/política y deja los demás como alcance de satélites futuros. |

## Reglas para futuras ediciones

1. No reducir Zero Trust a MFA, VPN, microsegmentación o un producto concreto.
2. No prometer acceso continuo: explicar cuándo y cómo se reevalúa.
3. No inventar scores de riesgo, porcentajes de madurez o tiempos de respuesta
   sin una metodología y fuente explícitas.
4. Si se agrega IAM, PAM, ZTNA, datos, APIs o workloads machine-to-machine,
   crear una matriz y escenas específicas para ese alcance.

