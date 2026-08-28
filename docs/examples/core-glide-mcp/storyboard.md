# Storyboard — Core Glide MCP

## Alcance

Explicación conceptual del servidor MCP remoto de CORESOLUTIONS que permite a Codex consultar datos operativos de Glide mediante herramientas controladas. No representa una consola de Glide, no ejecuta cambios y no afirma que ningún dato del cliente esté completo o validado.

## Escena 1 — Datos dispersos

Muestra por qué una pregunta sobre un proyecto puede requerir proyectos, actividades, tickets, clientes, personas y certificaciones. `relations.json` representa relaciones y aliases mantenidos por CORESOLUTIONS; no una relación automática nativa de Glide.

## Escena 2 — Consulta controlada

La persona pregunta a Codex. Codex solicita una herramienta MCP declarada; `glide-core-mcp` valida y consulta Glide por HTTPS. Render representa el runtime remoto, no un sistema que posea los datos. La salida es estructurada y de solo lectura.

## Escena 3 — Confianza y límites

La respuesta depende de aliases documentados, permisos y datos correctos. Ante un alias ambiguo la demostración exige validación humana. El escenario de fallo es conceptual y no cambia la plataforma real.

## Escena 4 — Gobierno

La herramienta de solo lectura se separa de su gobierno: alcance de la herramienta, token con mínimo privilegio, datos sensibles y aprobación humana. La escena deja explícito que una futura escritura no forma parte del catálogo auditado.

## Preguntas para discovery

- ¿Qué tablas son fuente de verdad para proyectos, clientes y tickets?
- ¿Quién puede consultar cada tabla y qué información es sensible?
- ¿Qué aliases se mantienen formalmente y quién los aprueba?
- ¿Qué resultados requieren aprobación humana?
- ¿Se contemplan acciones de escritura? Si es así, ¿qué roles, auditoría, confirmación y reversión existen?
