# Storyboard — MCP explicado desde una necesidad humana

## Propósito

Una persona sin conocimientos técnicos debe terminar entendiendo tres ideas:

1. La IA no entra por sí sola a sistemas externos.
2. MCP ofrece una forma común y controlada de conectar esas capacidades.
3. El servidor y los permisos siguen decidiendo qué se puede consultar o ejecutar.

La terminología formal aparece después de comprender el recorrido, no antes.

## Recorrido visual

### 1. La IA está aislada

La persona pide buscar un documento. La IA entiende la pregunta, pero el documento está en otro sistema y no existe una conexión. La ausencia de camino es el problema visual.

### 2. MCP crea el camino

La aplicación de IA usa una conexión MCP; el servidor MCP adapta y controla el acceso al sistema. En detalle técnico, la aplicación es el host y mantiene un cliente MCP para esa conexión.

### 3. La pregunta completa su recorrido

Cada nodo está numerado: pregunta, IA, herramienta, servidor MCP, biblioteca, resultado y respuesta. Esta escena debe ser la demostración principal porque permite seguir causa y efecto sin conocer el protocolo.

### 4. Qué puede ofrecer un servidor

- Leer información: `resources`.
- Usar una guía preparada: `prompts`.
- Solicitar una función: `tools`.

Los nombres cotidianos son principales; los términos MCP quedan como subtítulos y tooltips.

### 5. El permiso conserva el control

La conexión no equivale a autorización. La simulación permite interrumpir el permiso y muestra que la solicitud se detiene antes de consultar el sistema.

## Mensajes prohibidos

- MCP no da acceso automático a archivos, aplicaciones o dispositivos.
- El modelo no se conecta directamente al sistema externo.
- Descubrir una herramienta no significa que pueda ejecutarla.
- JSON-RPC estructura mensajes, pero no reemplaza autenticación, autorización o auditoría.
