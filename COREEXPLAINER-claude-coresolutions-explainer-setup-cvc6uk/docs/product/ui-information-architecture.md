# Fase 1 — Arquitectura de información del espacio de trabajo

**Rama:** `codex/ui-information-architecture`

**Fecha:** 2026-08-11

## Decisión

El dashboard se organiza por intención y no por tipo interno de componente:

1. **Explorar** — elegir un tema para presentar.
2. **Revisar** — validar fuentes, cobertura, escenarios y preparación técnica.
3. **Crear** — convertir un patrón de proyecto en un borrador revisable.

Explorar es la superficie inicial. Revisar y Crear permanecen disponibles, pero
se revelan bajo demanda para que sus herramientas no compitan con la selección
de temas.

## Cambios de esta fase

- Se añadió una navegación de tres destinos con lenguaje orientado a tareas.
- El catálogo de explicaciones se convirtió en la primera superficie visible.
- Se agruparon las herramientas de revisión en un disclosure nativo accesible.
- Se agrupó el generador de borradores en un disclosure independiente.
- Se conservaron las herramientas existentes; no se eliminó información técnica.
- Los paneles avanzados siguen siendo localizables mediante etiquetas claras.

## No incluido todavía

- Rediseño del interior del explicador.
- Cambio del canvas o de sus overlays.
- Eliminación definitiva de herramientas.
- Telemetría de uso.
- Nuevo sistema de componentes visuales.

## Criterios de aceptación

- Al abrir `/explainer`, el usuario ve primero los temas que puede presentar.
- “Revisar” y “Crear” no muestran todos sus controles hasta que se solicitan.
- Cada superficie tiene un título, una descripción y un destino inequívocos.
- El contenido técnico sigue disponible sin duplicar páginas.
- La navegación funciona con teclado y los disclosures usan elementos HTML
  nativos.
- La ruta mantiene los enlaces existentes a cada explicación.

## Siguiente decisión

La Fase 2 debe aplicar la misma jerarquía dentro de una explicación individual:
una pregunta principal, una explicación breve, un canvas y una acción primaria;
las herramientas secundarias deben pasar a una capa progresiva.
