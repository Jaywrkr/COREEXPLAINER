# Validación técnica — MCP explicado de forma progresiva

**Última revisión:** 2026-08-30

**Estado:** pendiente de revisión humana final. La simplificación cambia el orden y el lenguaje, no la arquitectura del protocolo.

## Correspondencia entre lenguaje sencillo y término técnico

| Lenguaje visible primero | Término MCP | Límite técnico |
|---|---|---|
| Aplicación de IA | Host | Aloja la experiencia y crea clientes MCP; no es el servidor conectado. |
| Conexión MCP | Cliente MCP | Mantiene una conexión con un servidor concreto. |
| Servidor MCP | Server | Declara capacidades y adapta el acceso al sistema externo. |
| Leer información | Resource | Contenido que el servidor permite leer como contexto. |
| Usar una guía | Prompt | Plantilla que el usuario o cliente puede seleccionar. |
| Solicitar una función | Tool | Operación con nombre, descripción y esquema de entrada. |

## Contratos por escena

| Escena | Regla |
|---|---|
| `isolated-ai` | La IA entiende la pregunta, pero no existe camino autorizado hacia el documento. |
| `common-connector` | Host, conexión cliente, servidor MCP y sistema conectado conservan responsabilidades separadas. |
| `complete-journey` | La herramienta es seleccionada antes de la validación del servidor; el resultado regresa como evidencia para la respuesta. |
| `capabilities` | Resources, prompts y tools no se presentan como equivalentes. |
| `safe-access` | Descubrimiento, autorización y ejecución permanecen como controles distintos. |

## Fuentes primarias

- [Architecture — MCP](https://modelcontextprotocol.io/specification/2025-06-18/architecture)
- [Lifecycle — MCP](https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle)
- [Tools — MCP](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [Resources — MCP](https://modelcontextprotocol.io/specification/2025-06-18/server/resources)
- [Prompts — MCP](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts)
- [Authorization — MCP](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
