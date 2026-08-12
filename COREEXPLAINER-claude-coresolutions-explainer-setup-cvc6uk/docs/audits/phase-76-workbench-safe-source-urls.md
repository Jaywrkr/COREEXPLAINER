# Fase 76 · Seguridad de enlaces de fuentes

Fecha: 2026-08-10  
Versión: 0.130.0

## Qué cambia

- `isSafeHttpUrl` acepta únicamente protocolos `http:` y `https:`.
- La UI no crea anchors para URLs inseguras o malformadas.
- El exportador filtra `sourceLabels` antes de incluir referencias URL.
- El test offline rechaza explícitamente `javascript:`.

## Límites

Esto evita enlaces ejecutables por protocolo, pero no valida disponibilidad, reputación, redirecciones ni contenido de la URL. La validación semántica del catálogo sigue siendo obligatoria.

## Verificación

- `npm run test:workbench-export` pendiente de ejecutar.
- `npm run typecheck` pendiente de ejecutar.
- `npm run lint` pendiente de ejecutar.
