# Fase 2 — Auditoría tecnológica y de trazabilidad

**Fecha:** 2026-08-06  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.54.0

## Objetivo

Evitar que una escena visualmente atractiva publique una topología incoherente o una simulación de fallo que no corresponde con el contrato técnico declarado. La auditoría se aplica al registro común, por lo que cubre todos los temas actuales.

## Controles automatizados aplicados

- Cada nodo debe tener `id`, nombre, posición normalizada entre 0 y 1 y una capacidad positiva cuando la declara.
- `rps` solo acepta valores finitos no negativos y exige al menos una arista saliente; un nodo terminal no se presenta como emisor.
- No se permiten autoaristas ni aristas duplicadas con el mismo origen, destino y tipo.
- Los extremos y tipos de todas las aristas siguen validándose contra los nodos y el contrato del animation spec.
- Un escenario de fallo solo puede retirar nodos existentes; `killable` se reserva para la interacción manual del canvas y no se confunde con la posibilidad técnica de fallar.
- La validación existente continúa exigiendo fuentes HTTPS, fecha de revisión, alcance, referencias por escena y perfiles de integridad para cada tema.

## Hallazgo corregido

La escena `active-active-dc / two-domains` declaraba `Workloads` con `rps`, aunque no tenía ninguna arista saliente. Eso describía un nodo terminal como emisor y podía hacer que la animación no representara el flujo declarado. Se eliminó el `rps` de ese nodo; las cargas siguen mostrando capacidad y reciben las relaciones de los sitios. Durante la revisión también se separó `killable` de los fallos authored: un servicio puede aparecer en un escenario sin ofrecer un botón de apagado manual.

## Alcance y límites

Estos controles detectan incoherencias estructurales y de contrato, no certifican un diseño de producción. La validación de cada afirmación de producto, versión, licencia, HCL, sizing o comportamiento específico continúa dependiendo de las fuentes listadas y de una revisión de experto en la siguiente fase.

## Validación ejecutada

- `npm run typecheck`
- `npm run lint`
- `npm run build`
