# Fase 69 · Validación técnica dentro del Workbench

Fecha: 2026-08-10  
Versión: 0.123.0  
Alcance: soporte conceptual para implementación, mantenimiento y revisión técnica.

## Qué cambia

- Se agrega la vista `Validar` junto a Implementar, Soportar y Mantener.
- Se muestra si el explainer declara revisión humana completada o pendiente.
- Se resume la vigencia de fuentes y se señalan fuentes `review-needed`.
- Cada contrato de integridad de escena declarado en `technicalIntegrity` aparece como tarea con sus reglas y fuentes asociadas.
- La exportación del paquete completo incluye las tareas de Validar y mantiene su estado local.

## Límites

La vista no ejecuta pruebas, no consulta plataformas, no verifica un entorno y no aprueba contenido. Solo transforma metadatos autorados en preguntas verificables para un especialista. Un contrato ausente tampoco prueba que la arquitectura sea correcta.

## Verificación

- `npm run typecheck` pendiente de ejecutar después de los cambios.
- `npm run lint` pendiente de ejecutar después de los cambios.
- `npm run test:ai-guards` pendiente de ejecutar después de los cambios.
- `npm run validate:content` pendiente de ejecutar después de los cambios.
