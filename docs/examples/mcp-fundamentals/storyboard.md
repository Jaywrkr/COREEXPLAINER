# Storyboard — fundamentos de MCP

## Propósito

Explicar el protocolo Model Context Protocol como una arquitectura de integración general. Este tema no representa proyectos, clientes, aplicaciones internas ni un servidor de CORESOLUTIONS.

## Recorrido visual

1. **Problema:** cada sistema ofrece su propio contrato y obliga al host a crear una integración particular.
2. **Arquitectura:** la persona usa un host de IA; el host crea un cliente MCP por conexión; el servidor MCP adapta un sistema externo.
3. **Capacidades:** recursos entregan contexto, prompts aportan plantillas y herramientas representan funciones invocables con un esquema.
4. **Mensajes:** cliente y servidor inicializan, descubren capacidades e intercambian solicitudes/respuestas estructuradas mediante JSON-RPC.
5. **Límites:** permisos, secretos, validación de entradas, aprobación humana y auditoría siguen siendo responsabilidad de la integración.

## Mensajes que no se deben afirmar

- MCP no da acceso automático a una API, base de datos o sistema.
- MCP no autoriza acciones por sí solo ni reemplaza OAuth, tokens, políticas o aprobación humana.
- Una herramienta descubierta no equivale a una herramienta permitida.
- La simulación no ejecuta llamadas ni valida una instalación real.
