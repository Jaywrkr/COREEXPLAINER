# Fase 155 — Contrato del generador de borradores

Versión: 0.209.0  
Fecha: 2026-08-11  
Rama: `codex/creator-draft-contract`

## Objetivo

Evitar que una respuesta incompleta o malformada del modelo se presente como un borrador confiable. El creador debe aceptar solo una estructura mínima y normalizada.

## Cambios aplicados

- `validateCreatorDraft` valida y limpia el objeto recibido del proveedor.
- Exige título, tagline, exactamente tres escenas, dos párrafos por escena e impacto de negocio.
- Exige listas no vacías de riesgos, preguntas de evidencia, gaps de validación y fuentes por confirmar.
- Limita longitudes y elimina saltos de línea no controlados.
- La ruta `/api/creator` devuelve fallback cuando el contrato falla; la UI genera su plantilla local editable.

## Límites

- Validar la forma no valida la exactitud técnica: las fuentes y capacidades siguen requiriendo revisión especialista.
- No se escribe contenido en el catálogo ni se publica automáticamente.

## Revisión

Pasaron `test-creator-contract`, typecheck y lint el 2026-08-11.
