# Storyboard — Zero Trust: decisión de acceso

Ejemplo independiente usado por `/explainer/zero-trust`. Explica el recorrido
de una solicitud desde el sujeto hasta el recurso protegido. No es una guía de
producto, un diseño IAM/PAM ni una certificación de madurez.

## Estructura narrativa

Solicitud → Contexto → Decisión → Enforcement → Límites. Cada escena muestra
una parte distinta del ciclo para evitar reducir Zero Trust a “poner MFA” o a
colocar otro firewall en el perímetro.

### Paso 1 — La solicitud

**Escena**: `request`. Un usuario o servicio solicita una acción sobre un
recurso desde un dispositivo. La identidad y el dispositivo aparecen como
señales de la solicitud, no como confianza permanente.

**Mensaje**: la pregunta es “¿debe permitirse esta acción sobre este recurso
ahora?”, no “¿está dentro de la red corporativa?”.

### Paso 2 — El contexto

**Escena**: `context`. Identidad, postura del dispositivo, sensibilidad del
recurso y telemetría alimentan el motor de política.

**Mensaje**: las señales ayudan a decidir, pero ninguna señal aislada equivale
a autorización. El contexto puede cambiar durante una sesión.

### Paso 3 — La decisión

**Escena**: `decision`. El Policy Engine evalúa y el Policy Administrator
traduce el resultado hacia el punto de enforcement.

**Mensaje**: el resultado puede ser permitir, limitar, pedir una verificación
adicional o denegar. NIST separa conceptualmente decisión y aplicación.

### Paso 4 — El enforcement

**Escena**: `enforcement`. El Policy Enforcement Point protege el recurso y
envía eventos de la sesión para una reevaluación posterior.

**Mensaje**: el enforcement puede vivir en un proxy, gateway, agente, API o
la propia aplicación. La forma concreta depende de la arquitectura.

### Paso 5 — Los límites

**Escena**: `limits`. Se pueden simular identidad comprometida, postura de
dispositivo inválida, política demasiado amplia y telemetría ausente.

**Mensaje**: Zero Trust no elimina el riesgo ni garantiza decisiones perfectas.
Exige inventario, señales confiables, políticas mantenibles, logging y una
respuesta definida cuando falta información.

## Límites técnicos de esta demo

- No modela un proveedor IAM, MFA, PAM, MDM, EDR, CASB, ZTNA o SIEM concreto.
- Las señales y los resultados son conceptuales; no existe un score de riesgo
  calculado ni una política real de producción.
- “Permitir”, “limitar”, “step-up” y “denegar” requieren una definición de
  negocio y técnica por aplicación y recurso.
- La arquitectura no implica que todo el tráfico deba pasar por un único
  proxy central; el enforcement puede distribuirse.

