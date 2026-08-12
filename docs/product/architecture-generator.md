# Generador de arquitecturas conceptuales

La ruta `/architecture` genera un borrador visual únicamente a partir de patrones CORESOLUTIONS ya auditados. El usuario selecciona un patrón, describe objetivo y workload, y confirma la evidencia disponible.

El resultado muestra componentes lógicos, riesgos y pendientes. Si faltan datos, el estado es **Faltan datos**. Aun con todos los checks marcados, el resultado es **Conceptual completo**, no una arquitectura aprobada ni una matriz de compatibilidad.

Cada marca del patrón requiere una ficha mínima: producto, versión, modelo o sitio y fuente oficial/HCL. Un componente incompleto mantiene todo el borrador en estado pendiente.

No selecciona equipos, licencias, releases, firmware, HCL, IPs, reglas, sizing ni topologías de producción. Esos elementos continúan sujetos a diseño y validación humana.
