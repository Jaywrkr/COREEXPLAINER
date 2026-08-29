# Validación técnica — fundamentos de Model Context Protocol

**Última revisión:** 2026-08-29  
**Estado:** pendiente de revisión humana final. El tema enseña el protocolo; no certifica ninguna implementación, servidor o credencial.

## Hechos que gobiernan el diagrama

| Escena | Relación que debe mantenerse | Límite |
|---|---|---|
| `why-mcp` | Host → MCP → servidores | MCP estandariza la integración, no sustituye las APIs de los sistemas. |
| `architecture` | Persona → host → cliente → servidor → sistema externo | El host contiene clientes MCP y el servidor expone capacidades. |
| `capabilities` | Servidor → recursos/prompts/herramientas | Recursos se leen, prompts guían y herramientas solicitan funciones; no son equivalentes. |
| `message-flow` | Cliente → servidor → catálogo/solicitud → validación → resultado | La comunicación usa mensajes estructurados y el servidor decide qué procesa. |
| `boundaries` | Herramienta → autorización → servidor → sistema | El protocolo no reemplaza identidad, permisos, validación, secretos ni auditoría. |

## Fuentes primarias

- [Architecture — MCP](https://modelcontextprotocol.io/specification/2025-06-18/architecture)
- [Lifecycle — MCP](https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle)
- [Tools — MCP](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [Resources — MCP](https://modelcontextprotocol.io/specification/2025-06-18/server/resources)
- [Prompts — MCP](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts)
- [Authorization — MCP](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
