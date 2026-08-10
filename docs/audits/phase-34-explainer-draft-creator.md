# Fase 34 — Creador asistido de explainers

Fecha de revisión: 2026-08-09  
Versión: 0.88.0

## Objetivo

Convertir la experiencia de un ingeniero de CORESOLUTIONS en un borrador reutilizable sin permitir que una IA publique arquitectura no revisada.

## Resultado aplicado

El dashboard incluye un formulario para tema, audiencia, marcas/productos y objetivo. El generador devuelve un contrato JSON con:

- título y tagline;
- tres escenas con narrativa e impacto de negocio;
- riesgos;
- preguntas de evidencia;
- gaps de validación;
- fuentes que deben confirmarse.

Con `OPENAI_API_KEY` el endpoint `/api/creator` pide JSON estructurado, español claro y ninguna capacidad inventada. Sin la clave, la app genera una plantilla local para no bloquear el trabajo.

## Gobernanza

El archivo se descarga como JSON editable. No se inserta en el registro de explainers, no se despliega y no se presenta como contenido validado. Antes de incorporarlo hay que completar fuentes, animación, escenarios, integridad técnica y `npm run validate:content`.
