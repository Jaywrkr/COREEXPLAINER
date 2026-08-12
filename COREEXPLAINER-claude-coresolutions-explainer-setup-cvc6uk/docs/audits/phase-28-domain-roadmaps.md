# Fase 28 — Roadmaps de assessment por dominio

Fecha de revisión: 2026-08-09  
Versión: 0.82.0

## Objetivo

Dar a cada explicación de Instana, Turbonomic y webMethods un recorrido técnico progresivo. El roadmap no puntúa madurez ni reemplaza un assessment real: organiza la conversación, indica qué evidencia pedir y define cuándo una fase está suficientemente comprobada.

## Resultado aplicado

- **Instana:** `coverage` (cobertura y calidad de telemetría), `correlate` (correlación entre señales y servicios), `operate` (guardias, SLO y respuesta operativa).
- **Turbonomic:** `model` (inventario, dependencias y restricciones), `plan` (recomendaciones y simulación de impacto), `govern` (políticas, aprobaciones y ejecución controlada).
- **webMethods:** `contracts` (contratos, APIs y eventos), `runtime` (seguridad, transformación y operación), `operate` (observabilidad, resiliencia y gobierno del ciclo de vida).

Cada fase contiene objetivo, evidencia esperada, criterio de salida y fuentes editoriales existentes. La UI la muestra bajo demanda dentro de la comparación entre arquitectura actual y objetivo, conservando el modo cliente compacto.

## Límites técnicos

El roadmap es contenido autorado y local. No se conecta a Instana, Turbonomic ni webMethods, no inventa métricas y no afirma que una fase esté completada automáticamente. El estado de cada fase sigue siendo una decisión del usuario durante la sesión.

## Siguiente evolución

Conectar explícitamente cada opción del laboratorio de decisiones con las fases de su roadmap para que una recomendación lleve al usuario directamente a la evidencia que debe validar.
