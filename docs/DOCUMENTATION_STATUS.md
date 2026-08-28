# Estado de la documentación

**Sincronizado:** 28-08-2026 contra `main` (`ddfed21`, versión de trabajo `0.256.0`).

Este índice evita una ambigüedad importante: una fecha de documentación viva
indica cuándo se alineó con el producto; una fecha de auditoría o de fuente
indica cuándo ocurrió realmente esa revisión. No son intercambiables.

## Documentación viva: actualizar con cambios de producto

- [README](../README.md): entrada y rutas principales del repositorio.
- [AI workflow](../AI_WORKFLOW.md): instrucciones para futuras sesiones de IA.
- [Estado del proyecto](./ai-context/project-state.md): situación, límites y
  siguiente punto de partida.
- [Contexto del generador](./ai-context/architecture-generator.md) y
  [guía de Architecture Studio](./product/architecture-generator.md): contrato
  del canvas y de la generación con IA.
- [Tutorial de Architecture Studio](./product/architecture-studio-tutorial.md):
  operación esperada para discovery, preventa y handoff.
- [Versionado y changelog](./ai-context/release-versioning.md): proceso de
  publicación y coherencia de versión.

Al cambiar una capacidad, actualizar el documento vivo afectado, el estado del
proyecto y su marca `Sincronizado`. Si cambia la versión, seguir además el
proceso de `release-versioning.md`.

## Registros históricos: conservar su fecha real

- `docs/CHANGELOG.md`: cada fecha pertenece a una versión ya publicada.
- `docs/audits/`: informes de auditoría y sus hallazgos en la fecha indicada.
- `docs/ai-context/*-technical-validation.md` y
  `docs/ai-context/technical-traceability.md`: revisión técnica, fuentes y
  fecha de consulta.
- `docs/examples/`: material de ejemplo, storyboard y especificaciones que
  documentan un estado concreto del contenido.

Solo actualizar esas fechas cuando se haya realizado de verdad una nueva
revisión de la fuente, prueba, auditoría o contenido. Para una nueva sesión de
IA, esto impide presentar evidencia histórica como si hubiera sido verificada
hoy.
