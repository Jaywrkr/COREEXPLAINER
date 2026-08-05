# Validación técnica — IBM Turbonomic

**Última revisión:** 2026-08-05
**Estado:** `pending`; requiere revisión especialista.

## Alcance

El tema usa IBM Turbonomic 8.17.x como referencia conceptual para targets,
supply chain, acciones, workflows y planes. No afirma que una recomendación sea
ejecutable en cualquier entorno ni que todas las acciones estén soportadas por
cada target.

## Fuentes primarias

| ID | Fuente | Consultada |
|---|---|---|
| `turb-targets` | [Configuring targets](https://www.ibm.com/docs/en/tarm/8.17.x?topic=configuration-configuring-targets) | 2026-08-05 |
| `turb-hypervisor` | [Hypervisor targets](https://www.ibm.com/docs/en/tarm/8.17.x?topic=configuration-hypervisor-targets) | 2026-08-05 |
| `turb-actions` | [Action types](https://www.ibm.com/docs/en/tarm/8.17.x?topic=actions-action-types) | 2026-08-05 |
| `turb-workflow` | [Automation workflow](https://www.ibm.com/docs/en/tarm/8.17.x?topic=policies-automation-workflow) | 2026-08-05 |
| `turb-plans` | [Plans: looking to the future](https://www.ibm.com/docs/en/tarm/8.x?topic=reference-plans-looking-future) | 2026-08-05 |
| `turb-pressure` | [Alleviate pressure plan](https://www.ibm.com/docs/en/tarm/8.17.x?topic=types-alleviate-pressure-plan) | 2026-08-05 |

## Límites

- El modelo depende de targets validados, métricas, relaciones, permisos,
  políticas, constraints y ventanas.
- No todas las acciones se ejecutan igual en todos los targets; algunas son
  recomendaciones o requieren workflows externos.
- Un plan what-if es una simulación basada en un snapshot y sus supuestos, no
  una garantía de capacidad o rendimiento futuro.
