# Fase 177 — Gate de URLs de fuentes técnicas

Fecha: 2026-08-11  
Versión: 0.231.0

## Objetivo

Proteger la trazabilidad técnica como objeto confiable. Un `source.url` entra en enlaces, informes y exports; debe ser un enlace HTTPS bien formado y no transportar credenciales incrustadas.

## Cambios aplicados

- `isSafeTechnicalSourceUrl` exige protocolo `https:`, hostname y ausencia de usuario/contraseña.
- `validateExplainerContent` usa la misma regla antes de crear el registry.
- Se rechazan `http:`, `javascript:`, URLs incompletas y formas como `https://user:pass@...`.
- `test:source-url` protege los casos válidos y peligrosos.

## Límites técnicos

El gate no verifica que el dominio sea realmente del fabricante, que el recurso exista o que su contenido respalde el claim. Eso continúa requiriendo revisión humana y frescura de fuente. La validación evita un enlace inseguro o ambiguo, no certifica su autoridad.

## Verificación

```text
npm run test:source-url
npm run validate:content
npm run typecheck
npm run lint
npm run test:version-consistency
npm run build
```
