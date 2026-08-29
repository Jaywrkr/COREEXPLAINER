# Validación técnica — Core Glide MCP

**Última revisión:** 2026-08-28  
**Estado:** pendiente de revisión humana final. Este documento describe un modelo conceptual y evidencia de implementación; no certifica permisos, contenido de Glide ni disponibilidad del servicio.

## Límites del tema

- `glide-core-mcp` expone herramientas de consulta y análisis de solo lectura en el alcance auditado.
- MCP separa host, cliente y servidor. Codex puede descubrir e invocar herramientas con esquemas definidos; no obtiene libertad ilimitada sobre Glide.
- Glide y el mapa `relations.json` siguen siendo dependencias de calidad de datos. Un alias no documentado no debe convertirse en una relación afirmada.
- Render representa el alojamiento remoto del servicio activo y es una dependencia de disponibilidad, no una fuente de datos.
- Los tokens son secretos. Antes de una puesta en producción se debe confirmar su alcance, rotación, almacenamiento y migración a `Authorization: Bearer` si corresponde a la implementación real.

## Contratos por escena

| Escena | Relación exigida | Motivo | Fuentes |
|---|---|---|---|
| `distributed-data` | Tablas → `relations.json` → pregunta | Las relaciones y aliases deben ser explícitos para correlacionar registros. | Core Glide MCP, Glide Tables API |
| `controlled-query` | Usuario → Codex → MCP → Glide → respuesta | El flujo representa herramientas MCP controladas y consulta de datos, no navegación libre. | MCP Architecture, MCP Tools, Glide Tables API |
| `confidence` | Resultado → validación humana | La salida de IA requiere revisión cuando las relaciones, permisos o datos no son concluyentes. | Core Glide MCP |
| `guardrails` | Alcance → datos autorizados → respuesta | Los permisos y el esquema restringen lo que se consulta; cualquier escritura requeriría controles adicionales. | MCP Tools, Glide Tables API, Core Glide MCP |

## Controles humanos obligatorios

1. Confirmar las tablas autorizadas y la fuente de verdad para cada dominio.
2. Revisar aliases y relaciones de `relations.json` de manera periódica y trazable.
3. Clasificar datos sensibles antes de enviarlos al contexto de IA.
4. Rotar y limitar tokens; no incluir credenciales en URLs o documentación.
5. No habilitar escritura hasta definir permisos por rol, confirmación explícita, auditoría y reversión.

## Fuentes

- [Architecture — Model Context Protocol](https://modelcontextprotocol.io/specification/2025-06-18/architecture)
- [Tools — Model Context Protocol](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [Glide Tables API](https://help.glideapps.com/en/articles/9297111-glide-tables-api-a-non-developer-guide)
- [CoreSearch / glide-core-mcp](https://github.com/Jaywrkr/CORESEARCH/tree/claude/glide-core-mcp-server-4q6zof/glide-core-mcp)
