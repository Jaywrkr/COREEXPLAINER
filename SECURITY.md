# Seguridad

## Reportar una vulnerabilidad

No publiques detalles de una vulnerabilidad en un issue público. Usa la opción **Report a vulnerability** de la pestaña **Security** del repositorio de GitHub para enviar un reporte privado con:

- versión o commit afectado;
- pasos reproducibles;
- impacto esperado y observado;
- evidencia mínima necesaria para confirmar el problema;
- una propuesta de mitigación, si existe.

Si el reporte privado de GitHub no está habilitado, solicita al administrador del repositorio que lo active antes de compartir detalles sensibles. No incluyas claves, tokens, prompts de clientes ni datos de producción.

## Alcance de la respuesta

El proyecto prioriza confirmar la recepción, reproducir el problema, aplicar una corrección y publicar una nota de seguridad cuando corresponda. Las correcciones pasan por el quality gate de `.github/workflows/quality.yml`.

Las alertas de dependencias se gestionan mediante Dependabot (`.github/dependabot.yml`) y se revisan antes de actualizar una versión mayor del framework.
